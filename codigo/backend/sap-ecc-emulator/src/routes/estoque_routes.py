from flask import Blueprint, jsonify, request, make_response, send_file,flash
from models.estoque import Estoque
from models.produto import Produto
from werkzeug.utils import secure_filename
from db import db
import pandas as pd
import os
import json

estoque_bp = Blueprint('estoque_bp', __name__)

@estoque_bp.route('/estoques', methods=['GET'])
def get_estoques():
    estoques = Estoque.query.all()
    return jsonify([estoque.to_dict() for estoque in estoques])

@estoque_bp.route('/estoques/<int:id>', methods=['GET'])
def get_estoque(id):
    estoque = Estoque.query.get(id)
    if estoque:
        return jsonify(estoque.to_dict())
    else:
        return make_response(jsonify(message="Estoque não encontrado"), 404)

@estoque_bp.route('/estoques', methods=['POST'])
def create_estoque():
    data = request.json
    estoque = Estoque(**data)
    db.session.add(estoque)
    db.session.commit()
    return jsonify(estoque.to_dict()), 201

@estoque_bp.route('/estoques/<int:id>', methods=['PATCH'])
def update_estoque(id):
    estoque = Estoque.query.get(id)
    if estoque:
        data = request.json
        for key, value in data.items():
            setattr(estoque, key, value)
        db.session.commit()
        return jsonify(estoque.to_dict())
    else:
        return make_response(jsonify(message="Estoque não encontrado"), 404)

@estoque_bp.route('/estoques/<int:id>', methods=['DELETE'])
def delete_estoque(id):
    estoque = Estoque.query.get(id)
    if estoque:
        db.session.delete(estoque)
        db.session.commit()
        return jsonify(message="Estoque excluído")
    else:
        return make_response(jsonify(message="Estoque não encontrado"), 404)

# Nova rota para gerar o Excel
@estoque_bp.route('/estoques/export', methods=['GET'])
def export_estoques_to_excel():
    try:
        # Obtendo todos os estoques
        estoques = Estoque.query.all()
        # Convertendo para lista de dicionários
        estoques_data = [estoque.to_dict() for estoque in estoques]

        # Criando DataFrame do pandas
        df = pd.DataFrame(estoques_data)

        # Definindo o nome do arquivo e o caminho
        excel_filename = "estoques.xlsx"
        file_path = os.path.join(os.getcwd(), excel_filename)

        # Salvando o arquivo Excel
        df.to_excel(file_path, index=False)

        # Enviando o arquivo Excel como resposta
        return {"response": "right"}
    
    except Exception as e:
        return make_response(jsonify(message="Erro ao gerar o arquivo Excel", error=str(e)), 500)

# Nova rota para pegar o estoque interno (em JSON) do arquivo Excel
@estoque_bp.route('/estoques/interno', methods=['GET'])
def get_estoque_interno():
    try:
        # Caminho para o arquivo Excel
        excel_filename = "estoques.xlsx"
        file_path = os.path.join(os.getcwd(), excel_filename)
        
        # Verificar se o arquivo existe
        if not os.path.exists(file_path):
            return make_response(jsonify(message="Arquivo Excel não encontrado"), 404)
        
        # Lendo o arquivo Excel
        df = pd.read_excel(file_path)

        # Convertendo DataFrame para lista de dicionários
        estoques_data = df.to_dict(orient='records')

        # Retornando como JSON
        return jsonify(estoques_data), 200
    except Exception as e:
        return make_response(jsonify(message="Erro ao obter o estoque interno", error=str(e)), 500)
@estoque_bp.route('/estoques/<int:id>/upload', methods=['POST'])
def upload_csv(id):
    try:
        print(id)  # Exibe o ID da loja fornecido na URL
        
        # Obtém o arquivo enviado pelo usuário através de um formulário
        file = request.files['file']

        # Verifica se o nome do arquivo está vazio, indicando que nenhum arquivo foi selecionado
        if file.filename == '':
            return make_response(jsonify(message="arquivo vazio", error=str(e)), 500)

        # Se um arquivo foi fornecido
        if file:
            # Gera um nome de arquivo seguro para salvar no servidor
            filename = secure_filename(file.filename)
            
            # Define o caminho completo para salvar o arquivo no diretório atual
            filepaht = os.path.join(os.getcwd(), filename)
            
            # Salva o arquivo no caminho especificado
            file.save(filepaht)

            # Lê o arquivo CSV e cria um DataFrame do Pandas
            df = pd.read_csv(filepaht)
            
            # Adiciona uma nova coluna 'loja_id' no DataFrame com o valor do ID da loja
            df['loja_id'] = id

            # Itera sobre cada linha do DataFrame
            for i, val in df.iterrows():
                # Imprime as colunas do DataFrame e o valor da primeira coluna da linha atual
                print(df.columns)
                print(df.iloc[i, 0])

                # Verifica se o produto existe no banco de dados com base no ID fornecido na primeira coluna do CSV
                products = Produto.query.get(int(df.iloc[i, 0]))
                
                # Se o produto existe
                if products:
                    # Verifica se há um estoque associado à loja e ao produto no banco de dados
                    estoques = db.session.query(Estoque).filter(
                        Estoque.loja_id == id, 
                        Estoque.produto_id == int(df.iloc[i, 0])
                    ).all()

                    print(estoques)  # Exibe os estoques encontrados

                    # Se não houver nenhum estoque existente, cria um novo registro
                    if not estoques:
                        print(df.iloc[i, 0:3].to_json())
                        print("foi")

                        # Converte a linha do DataFrame para JSON e depois para dicionário
                        data = df.iloc[i, :].to_json()
                        data = json.loads(data)

                        # Cria um novo objeto Estoque com os dados da linha
                        estoque = Estoque(**data)

                        # Adiciona e salva o novo estoque no banco de dados
                        db.session.add(estoque)
                        db.session.commit()
                    else:
                        # Se já existe estoque, atualiza os valores correspondentes
                        for key, value in zip(df.columns, val):
                            setattr(estoques[0], key, value)  # Atualiza os atributos do estoque existente
                        
                        # Salva as alterações no banco de dados
                        db.session.commit()
                else:
                    # Retorna erro se o produto da linha atual do CSV não for encontrado
                    return make_response(jsonify(message=f"Produto da linha {i+1} do csv é inexistente"), 500)

            # Remove o arquivo CSV após o processamento
            os.remove(filepaht)
            
            # Retorna resposta de sucesso
            return {"response": "right"}
    
    # Captura qualquer exceção que ocorra e retorna uma resposta com o erro
    except Exception as e:
        return make_response(jsonify(message="Erro ao carregar arquivo", error=str(e)), 500)
