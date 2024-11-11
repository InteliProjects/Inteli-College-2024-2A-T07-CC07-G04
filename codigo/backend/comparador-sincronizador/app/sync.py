from app.db import conectar_sap, conectar_ecomm

def obter_dados(cursor):
    cursor.execute("SELECT sku, quantidade FROM produtos")
    return {row[0]: row[1] for row in cursor.fetchall()}

def sincronizar_bancos():
    # Conexão ao Banco de Dados SAP
    conexao_sap = conectar_sap()
    cursor_sap = conexao_sap.cursor()

    # Conexão ao Banco de Dados ECOMM
    conexao_ecomm = conectar_ecomm()
    cursor_ecomm = conexao_ecomm.cursor()

    # Obter produtos dos bancos
    produtos_sap = obter_dados(cursor_sap)
    produtos_ecomm = obter_dados(cursor_ecomm)

    # Armazenar resultados da sincronização
    resultados = {
        'inseridos': [],
        'atualizados': [],
        'inalterados': []
    }

    # Sincronizar produtos
    for sku, qtd_sap in produtos_sap.items():
        qtd_ecomm = produtos_ecomm.get(sku)

        if qtd_ecomm is None:
            # Produto não existe no ECOMM, inserir
            cursor_ecomm.execute(
                "INSERT INTO produtos (sku, quantidade) VALUES (%s, %s)",
                (sku, qtd_sap)
            )
            resultados['inseridos'].append({'sku': sku, 'quantidade': qtd_sap})
        elif qtd_sap != qtd_ecomm:
            # Produto existe, atualizar quantidade
            cursor_ecomm.execute(
                "UPDATE produtos SET quantidade = %s WHERE sku = %s",
                (qtd_sap, sku)
            )
            resultados['atualizados'].append({'sku': sku, 'quantidade': qtd_sap})
        else:
            # Quantidades são iguais, não faz nada
            resultados['inalterados'].append({'sku': sku, 'quantidade': qtd_sap})

    # Confirmar transações
    conexao_ecomm.commit()

    # Fechar conexões
    cursor_sap.close()
    conexao_sap.close()
    cursor_ecomm.close()
    conexao_ecomm.close()

    return resultados
