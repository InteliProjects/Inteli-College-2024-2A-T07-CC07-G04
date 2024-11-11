import unittest
import requests

BASE_URL = "http://commerce-lb-782391953.us-east-1.elb.amazonaws.com:5000"

class TestAPI(unittest.TestCase):

    def test_create_update_delete_produto(self):
        # Criar novo produto
        new_produto = {
            "nome": "Celular X",
            "descricao": "Celular de última geração",
            "preco": 2999.99
        }
        response = requests.post(f"{BASE_URL}/produtos", json=new_produto)
        self.assertEqual(response.status_code, 201)
        created_produto = response.json()
        produto_id = created_produto['id']
        
        # Validar criação
        response = requests.get(f"{BASE_URL}/produtos/{produto_id}")
        self.assertEqual(response.status_code, 200)
        produto_data = response.json()
        self.assertEqual(produto_data['descricao'], new_produto['descricao'])

        # Atualizar produto
        update_data = {"preco": 2799.99}
        response = requests.patch(f"{BASE_URL}/produtos/{produto_id}", json=update_data)
        self.assertEqual(response.status_code, 200)

        # Validar atualização
        response = requests.get(f"{BASE_URL}/produtos/{produto_id}")
        self.assertEqual(response.status_code, 200)
        produto_data = response.json()
        self.assertEqual(produto_data['preco'], '2799.99')

        # Excluir produto
        response = requests.delete(f"{BASE_URL}/produtos/{produto_id}")
        self.assertEqual(response.status_code, 200)

        # Validar exclusão
        response = requests.get(f"{BASE_URL}/produtos/{produto_id}")
        self.assertEqual(response.status_code, 404)

    def test_create_update_delete_pedido(self):
        # Criar novo pedido
        new_pedido = {
            "cliente_id": "1",
            "itens": [
                {"produto_id": "123", "quantidade": 2},
                {"produto_id": "124", "quantidade": 1}
            ]
        }
        response = requests.post(f"{BASE_URL}/pedidos", json=new_pedido)
        #self.assertEqual(response.status_code, 201)
        created_pedido = response.json()
        print(created_pedido)
        pedido_id = created_pedido['id']

        # Validar criação
        response = requests.get(f"{BASE_URL}/pedidos/{pedido_id}")
        self.assertEqual(response.status_code, 200)
        pedido_data = response.json()
        self.assertEqual(len(pedido_data['itens']), 2)

        # Atualizar pedido (remover um item)
        update_data = {
            "itens": [{"produto_id": "123", "quantidade": 2}]
        }
        response = requests.patch(f"{BASE_URL}/pedidos/{pedido_id}", json=update_data)
        self.assertEqual(response.status_code, 200)

        # Validar atualização
        response = requests.get(f"{BASE_URL}/pedidos/{pedido_id}")
        self.assertEqual(response.status_code, 200)
        pedido_data = response.json()
        self.assertEqual(len(pedido_data['itens']), 1)

        # Excluir pedido
        response = requests.delete(f"{BASE_URL}/pedidos/{pedido_id}")
        self.assertEqual(response.status_code, 200)

        # Validar exclusão
        response = requests.get(f"{BASE_URL}/pedidos/{pedido_id}")
        self.assertEqual(response.status_code, 404)

    def test_create_update_delete_loja(self):
        # Criar nova loja
        new_loja = {
            "nome": "Loja Teste",
            "endereco": "Rua Ficticia, 123"
        }
        response = requests.post(f"{BASE_URL}/lojas", json=new_loja)
        self.assertEqual(response.status_code, 201)
        created_loja = response.json()
        loja_id = created_loja['id']

        # Validar criação
        response = requests.get(f"{BASE_URL}/lojas/{loja_id}")
        self.assertEqual(response.status_code, 200)
        loja_data = response.json()
        self.assertEqual(loja_data['nome'], new_loja['nome'])

        # Atualizar loja
        update_data = {"endereco": "Rua Atualizada, 456"}
        response = requests.patch(f"{BASE_URL}/lojas/{loja_id}", json=update_data)
        self.assertEqual(response.status_code, 200)

        # Validar atualização
        response = requests.get(f"{BASE_URL}/lojas/{loja_id}")
        self.assertEqual(response.status_code, 200)
        loja_data = response.json()
        self.assertEqual(loja_data['endereco'], "Rua Atualizada, 456")

        # Excluir loja
        response = requests.delete(f"{BASE_URL}/lojas/{loja_id}")
        self.assertEqual(response.status_code, 200)

        # Validar exclusão
        response = requests.get(f"{BASE_URL}/lojas/{loja_id}")
        self.assertEqual(response.status_code, 404)

    def test_create_update_delete_estoque(self):
        # Criar novo estoque
        new_estoque = {
            "produto_id": "123",
            "quantidade": 50,
            "loja_id": "1"
        }
        response = requests.post(f"{BASE_URL}/estoques", json=new_estoque)
        #self.assertEqual(response.status_code, 201)
        created_estoque = response.json()
        estoque_id = created_estoque['produto_id']
        
        # Validar criação
        response = requests.get(f"{BASE_URL}/estoques/{estoque_id}")
        self.assertEqual(response.status_code, 200)
        estoque_data = response.json()
        self.assertEqual(estoque_data['produto_id'], new_estoque['produto_id'])

        # Atualizar estoque
        update_data = {"quantidade": 75}
        response = requests.patch(f"{BASE_URL}/estoques/{estoque_id}", json=update_data)
        self.assertEqual(response.status_code, 200)

        # Validar atualização
        response = requests.get(f"{BASE_URL}/estoques/{estoque_id}")
        self.assertEqual(response.status_code, 200)
        estoque_data = response.json()
        self.assertEqual(estoque_data['quantidade'], 75)

        # Excluir estoque
        response = requests.delete(f"{BASE_URL}/estoques/{estoque_id}")
        self.assertEqual(response.status_code, 200)

        # Validar exclusão
        response = requests.get(f"{BASE_URL}/estoques/{estoque_id}")
        self.assertEqual(response.status_code, 404)

if __name__ == "__main__":
    unittest.main()
