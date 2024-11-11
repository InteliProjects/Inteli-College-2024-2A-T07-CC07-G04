# Planos de Teste

&emsp;&emsp;Os testes são partes fundamentais do processo de desenvolvimento de um sistema, independentemente da arquitetura ou tecnologia adotada. Nesse sentido, eles são utilizados para garantir o funcionamento e a qualidade do software desenvolvido, reduzindo os riscos de bugs e erros em ambientes críticos, como o ambiente de produção. Além disso, podem auxiliar até mesmo no processo de desenvolvimento. Os testes explorados neste documento são testes de integração, unitários e de microsserviços. No contexto do projeto, eles buscam, dentro de seus respectivos escopos, verificar as funcionalidades e garantir que os requisitos levantados sejam cumpridos.

## Testes unitarios

&emsp;&emsp;Este tipo de teste tem como objetivo verificar o funcionamento de partes mais específicas do software, como as funções e métodos desenvolvidos. Sendo assim, ele tem esse caráter mais isolado, testando a lógica do código sem envolver outros sistemas externos. Por serem isolados e testarem a lógica do código, eles podem ser úteis no processo de desenvolvimento para a identificação de erros e falhas lógicas, além de serem rápidos de serem executados. Isso possibilita o seu uso durante o desenvolvimento, servindo como base para abordagens como o TDD (Test Driven Development). No entanto, por serem restritos a uma pequena parte da aplicação, esses testes não conseguem capturar possíveis falhas externas, nem falhas de integração entre serviços. 

### Lojas

#### LJ-001

| Caso de Teste                                        | Valor                                                                                          |
|------------------------------------------------------|------------------------------------------------------------------------------------------------|
| **Identificação Única**                              | LJ-001                                                                                       |
| **Descrição**                                        | Teste automatizado para o serviço de lojas. Verifica o comportamento do sistema ao tentar adicionar uma nova loja. |
| **Passos para Execução do Teste**                    | 1. Garantir que o serviço de lojas esteja em execução.<br>2. No terminal, navegar até o caminho: `src/go-backend/testes/`<br>3. Rodar o comando: `go test -run TestLoja` |
| **Resultado Esperado**                               | Uma nova loja criada no sistema.                          |
| **Resultado Obtido**                                 | Loja criada com sucesso.                                                 |
| **Data da Última Execução do Teste**                 | 26/09/2024                                                                                     |

#### LJ-002

| Caso de Teste                                        | Valor                                                                                          |
|------------------------------------------------------|------------------------------------------------------------------------------------------------|
| **Identificação Única**                              | LJ-002                                                                                       |
| **Descrição**                                        | Teste automatizado para o serviço de lojas. Verifica o comportamento do sistema ao tentar deletar uma loja existente. |
| **Passos para Execução do Teste**                    | 1. Garantir que o serviço de lojas esteja em execução.<br>2. No terminal, navegar até o caminho: `src/go-backend/testes/`<br>3. Rodar o comando: `go test -run TestLoja` |
| **Resultado Esperado**                               | A loja deve deixar de existir no sistema.                          |
| **Resultado Obtido**                                 | Loja deletada com sucesso.                                                 |
| **Data da Última Execução do Teste**                 | 26/09/2024                                                                                      |

#### LJ-003

| Caso de Teste                                        | Valor                                                                                          |
|------------------------------------------------------|------------------------------------------------------------------------------------------------|
| **Identificação Única**                              | LJ-003                                                                                       |
| **Descrição**                                        | Teste automatizado para o serviço de lojas. Verifica se o sistema retorna as lojas existentes. |
| **Passos para Execução do Teste**                    | 1. Garantir que o serviço de lojas esteja em execução.<br>2. No terminal, navegar até o caminho: `src/go-backend/testes/`<br>3. Rodar o comando: `go test -run TestLoja` |
| **Resultado Esperado**                               | Deve retornar uma lista com as lojas cadastradas.                         |
| **Resultado Obtido**                                 | Lojas retornadas com sucesso.                                                 |
| **Data da Última Execução do Teste**                 | 26/09/2024                                                                                      |

### Carrinho

#### CAR-001

| Caso de Teste                                        | Valor                                                                                          |
|------------------------------------------------------|------------------------------------------------------------------------------------------------|
| **Identificação Única**                              | CAR-001                                                                                       |
| **Descrição**                                        | Teste automatizado para o carrinho. Verifica o comportamento do sistema ao adicionar um novo produto ao carrinho |
| **Passos para Execução do Teste**                    | 1. Garantir que o serviço de carrinho esteja em execução.<br>2. No terminal, navegar até o caminho: `src/go-backend/testes/`<br>3. Rodar o comando: `go test -run TestProdutoCarrinho` |
| **Resultado Esperado**                               | O carrinho deve ser atualizado com o novo produto.                          |
| **Resultado Obtido**                                 | Produto adicionado com sucesso.                                                 |
| **Data da Última Execução do Teste**                 | 26/09/2024                                                                                      |

#### CAR-002

| Caso de Teste                                        | Valor                                                                                          |
|------------------------------------------------------|------------------------------------------------------------------------------------------------|
| **Identificação Única**                              | CAR-002                                                                                       |
| **Descrição**                                        | Teste automatizado para o carrinho. Verifica o comportamento do sistema ao remover um produto do carrinho |
| **Passos para Execução do Teste**                    | 1. Garantir que o serviço de carrinho esteja em execução.<br>2. No terminal, navegar até o caminho: `src/go-backend/testes/`<br>3. Rodar o comando: `go test -run TestProdutoCarrinho` |
| **Resultado Esperado**                               | O produto removido deve deixar de existir no carrinho.                          |
| **Resultado Obtido**                                 | Produto removido com sucesso.                                                 |
| **Data da Última Execução do Teste**                 | 26/09/2024                                                                                      |

#### CAR-003

| Caso de Teste                                        | Valor                                                                                          |
|------------------------------------------------------|------------------------------------------------------------------------------------------------|
| **Identificação Única**                              | CAR-003                                                                                       |
| **Descrição**                                        | Teste automatizado para o carrinho. Verifica se o sistema retorna os produtos presentes no carrinho |
| **Passos para Execução do Teste**                    | 1. Garantir que o serviço de carrinho esteja em execução.<br>2. No terminal, navegar até o caminho: `src/go-backend/testes/`<br>3. Rodar o comando: `go test -run TestProdutoCarrinho` |
| **Resultado Esperado**                               | Deve retornar uma lista dos produtos existentes no carrinho.                          |
| **Resultado Obtido**                                 | Produtos retornados com sucesso.                                                 |
| **Data da Última Execução do Teste**                 | 26/09/2024                                                                                      |

#### CAR-004

| Caso de Teste                                        | Valor                                                                                          |
|------------------------------------------------------|------------------------------------------------------------------------------------------------|
| **Identificação Única**                              | CAR-004                                                                                       |
| **Descrição**                                        | Teste automatizado para o carrinho. Verifica o comportamento do sistema ao atualizar a quantidade de um produto no carrinho |
| **Passos para Execução do Teste**                    | 1. Garantir que o serviço de carrinho esteja em execução.<br>2. No terminal, navegar até o caminho: `src/go-backend/testes/`<br>3. Rodar o comando: `go test -run TestProdutoCarrinho` |
| **Resultado Esperado**                               | O carrinho deve ser atualizado com a nova quantidade do produto.                          |
| **Resultado Obtido**                                 | Quantidade do produto atualizada com sucesso.                                                 |
| **Data da Última Execução do Teste**                 | 26/09/2024                                                                                      |

### Produtos

#### PROD-001

| Caso de Teste                                        | Valor                                                                                          |
|------------------------------------------------------|------------------------------------------------------------------------------------------------|
| **Identificação Única**                              | PROD-001                                                                                       |
| **Descrição**                                        | Teste automatizado para o serviço de produtos. Verifica se o sistema retorna todos os produtos cadastrados |
| **Passos para Execução do Teste**                    | 1. Garantir que o serviço de produto esteja em execução.<br>2. No terminal, navegar até o caminho: `src/backend/testes/`<br>3. Rodar o comando: `go test -run TestProdutos` |
| **Resultado Esperado**                               | Deve retornar uma lista de produtos existentes no sistema.                                      |
| **Resultado Obtido** | `[{"descricao":"Apple iPhone 15 256GB Preto 5G Tela 6,1 Câm. Traseira 48+12MP Frontal 12MP","especificacao":"Apple iPhone 15 256GB Preto 5G Tela 6,1 Câm. Traseira 48+12MP Frontal 12MP","id":1,"preco":"5499.00","url":"https://a-static.mlcdn.com.br/800x560/apple-iphone-15-128gb-preto-61-48mp-ios-5g/magazineluiza/238035600/716d868f4d404bfb6f8189c688a8c74f.jpg"}, ...` |
| **Data da Última Execução do Teste** | 27/09/2024 |

### Estoque

#### EST-001

| Caso de Teste                                        | Valor                                                                                          |
|------------------------------------------------------|------------------------------------------------------------------------------------------------|
| **Identificação Única**                              | EST-001                                                                                        |
| **Descrição**                                        | Teste automatizado para o estoque. Verifica como o sistema se comporta ao adicionar novos produtos ao estoque. |
| **Passos para Execução do Teste**                    | 1. Garantir que o serviço de estoque esteja em execução.<br>2. No terminal, navegar até o caminho: `src/backend/testes`.<br>3. Rodar o comando: `TestEstoques` |
| **Resultado Esperado**                               | Um novo estoque deve ser criado no sistema.                                                    |
| **Resultado Obtido** | Produtos Adicionados com Sucesso |
| **Data da Última Execução do Teste** | 27/09/2024 |

## Testes de integração

&emsp;&emsp;Este tipo de teste tem como objetivo verificar a integração entre módulos e componentes do sistema. Dessa forma, ele assegura que as partes do software funcionam bem em conjunto, uma vez que as partes individuais já foram testadas pelos testes unitários. Devido a essa característica de interação entre componentes, é possível capturar problemas que os testes unitários não conseguem identificar, como falhas de comunicação, incompatibilidade de dados e comportamentos inesperados resultantes da interação entre sistemas. 

&emsp;&emsp;Os *scripts* dos testes podem ser encontrados no diretório codigo/backend/tests

&emsp;&emsp;Breve descrição do framework utilizado

| **Caso de Teste**          | **Valor**                                                                                                                                                                                                                                                                             |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Identificação única**    | i001-carregamento de estoque                                                                                                                                                                                                                                                                 |
| **Descrição**              | Realiza o carregamento de estoque de uma loja cadastrada com novos produtos .                                                                                                                                                                                                                 |
| **Dados**                  | csv `teste_carregamento.csv` contendo 5 linhas de produtos  com a quantidade 1 em todas as linhas. Email:"loja@loja.com", Senha:"loja123"                                                                                                                                                                   |
| **Pré-Condição**           | Não há registro de estoque destes produtos para a loja no banco de dados e estar logado com um usuario lojista  de username *** e senha **.                                                                                                                                                                                |
| **Passos para a execução** | 1. Entrar no campo Nome a String "loja@loja.com".<br>2. Entrar no campo Senha a String "loja123".<br>3. clicar no botão de entrar.<br>4. clicar no botão superior esquerdo "adicionar estoque".<br>5. Selecionar o csv `teste_carregamento.csv`. <br>5. clicar no botão carregar.  |
| **Pós-Condição**           | O banco de dados Postgre do site deve registrar na tabela Estoque os campos lojaID, ProdutoID, quantidade e preço com seus respectivos dados descritos dos 5 produtos presentes no csv acima.                                                                                                                                |
| **Resultado esperado**     | Ao clicar no botão "Confirmar", espera-se que o usuario observe os 5 produtos inseridos neste processo ao entrar na home page.                                                         |
| **Resultado do teste**     | .                                                                                                                                                                                                                                                                               |
| **Data do último teste**   |  .                                                                                                                                                                                                                                                                       |

| **Caso de Teste**          | **Valor**                                                                                                                                                                                                                                                                             |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Identificação única**    | i002-compra-sucesso                                                                                                                                                                                                                                                                 |
| **Descrição**              | Realiza a tentativa de compra de um produto presente no carrinho                                                                                                                                                                                                                |
| **Dados**                  | Email:"user1@user.com", Senha:"user123".                                                                                                                                                                    |
| **Pré-Condição**           | Deve ser feito após o carregamento do estoque do teste i001, sendo assim deve possuir os produtos adicionados disponiveis na tela inicial.                                                                                                                                                                                |
| **Passos para a execução** | 1. Entrar no campo Nome a String "user1@user.com".<br>2. Entrar no campo Senha a String "user123".<br>3. clicar no botão de entrar.<br>4. clicar no produto de nome SKU-1234.<br>5. clicar no botão "Adicionar ao Carrinho".<br>6. Clicar no icone de carrinho no canto superior direito.<br>7. clicar no botão  "fechar pedido".<br>8. clicar no botão confirmar.|
| **Pós-Condição**           | O banco de dados deve alterar o estoque da loja, decrementando a quantidade comprada. acima.                                                                                                                                |
| **Resultado esperado**     | Ao clicar no botão "Confirmar", espera-se que o usuario seja redirecionado à pagina inicial e o produto comprado deve desaparecer da lista de produtos disponiveis.                                                         |
| **Resultado do teste**     |      .                                                                                                                                                                                                                                                                          |
| **Data do último teste**   |          .                                                                                                                                                                                                                                       


| **Caso de Teste**          | **Valor**                                                                                                                                                                                                                                                                             |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Identificação única**    | i003-compra-falha                                                                                                                                                                                                                                                                 |
| **Descrição**              | Realiza a tentativa de compra de um produto presente no carrinho, mas que ja foi esgotado                                                                                                                                                                                                                 |
| **Dados**                  | Email:"user2@user.com", Senha:"user123".                                                                                                                                                                    |
| **Pré-Condição**           | Deve conter no carrinho o mesmo produto comprado no teste i002                                                                                                                                                                                  |
| **Passos para a execução** | 1. Entrar no campo Nome a String "user2@user.com".<br>2. Entrar no campo Senha a String "user123".<br>3. clicar no botão de entrar.<br>4. Clicar no icone de carrinho no canto superior direito.<br>5. clicar no botão  "fechar pedido".<br>6. clicar no botão confirmar.| |
| **Pós-Condição**           | O banco de dados Postgre do site deve manter a tabela de estoque inalterada e apenas a de carrinho deve ser esvaziado.                                                                                                                                |
| **Resultado esperado**     | Ao clicar no botão "Confirmar", espera-se que o usuario receba um feedback de erro e em seguida seja redirecionado para a pagina inicial  com o carrinho vazio.                                                         |
| **Resultado do teste**     |               .                                                                                                                                                                                                                                                                 |
| **Data do último teste**   |             .                                                                                                                                                                                                                                    

| **Caso de Teste**          | **Valor**                                                                                                                                                                                                                                                 |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Identificação única**    | i004-simular-frete                                                                                                                                                                                                                                |
| **Descrição**              | Simula o frete e tempo de entrega para um produto selecionado.                                                                                                                                                                                                            |
| **Dados**                  | CEP: "05510-021",Email:"user1@user.com", Senha:"user123".                                                                                                                                                                                           |
| **Pré-Condição**           | deve existir no banco de dados um                                       usuario de mesmo login e senha                                                                                                            |
| **Passos para a execução** | 1. Entrar no campo Nome a String "loja@loja.com".<br>2. Entrar no campo Senha a String "loja123".<br>3. clicar no botão de entrar. <br>4. clicar no produto de nome SKU-1234.<br>5. preencher o campo de cep com "05510-021".<br>6. clicar no botão confirmar ao lado do campo de cep|
| **Pós-Condição**           | O frete sera calculado e tera um tempo de entrega como retorno.                                                                                                                                                                                                               |
| **Resultado esperado**     |Ao clicar no botão "Calcular Frete", espera-se que apareça o tempo de entrega estimado e o preço para o cep informado.                                                                                       |
| **Resultado do teste**     |                    .                                                                                                                                                                                                                                |
| **Data do último teste**   |     .


| **Caso de Teste**          | **Valor**                                                                                                                                                                                                                                                 |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Identificação única**    | i005-login-admin                                                                                                                                                                                                                                 |
| **Descrição**              | Tentativa de login com um usuario do tipo admin                                                                                                                                                                                                              |
| **Dados**                  | Email "admin@admin.com" , Senha:"admin123".                                                                                                                                                                                           |
| **Pré-Condição**           | Há registrado no banco de dados um usuario do mesmo email e senha do tipo admin                                                                                                                                                 |
| **Passos para a execução** | 1. Entrar no campo Nome a String "admin@admin.com".<br>2. Entrar no campo Senha a String "admin123".<br>3. clicar no botão de entrar. |
| **Pós-Condição**           | O banco de dados deve verificar a existencia de um usuario com mesmo email e senha.                                                                                                                                                                                                               |
| **Resultado esperado**     | Ao clicar no botão "entrar", espera-se que o usuario seja redirecionado para a tela principal de administrador do sistema.                                                                                       |
| **Resultado do teste**     |                              O teste foi um sucesso. O login foi efetuado corretamenteao inserir as credenciais requisitadas.                                                                                                                                                                                                                      |
| **Data do último teste**   |        28/09/2024
    

**Registro do caso de teste**
<video src="./Vídeos/integracao-admin.mp4" width="320" height="240" controls></video>

| **Caso de Teste**          | **Valor**                                                                                                                                                                                                                                                 |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Identificação única**    | i006-pedido-loja                                                                                                                                                                                                                                 |
| **Descrição**              | Realiza uma tentativa de compra local em uma loja.                                                                                                                                                                                                              |
| **Dados**                  | Email "loja@loja.com" , Senha:"loja123".                                                                                                                                                                                           |
| **Pré-Condição**           |Há registro no banco de dados de um usuario lojista de mesmo email e senha.                                                                                                                                                 |
| **Passos para a execução** | 1. Entrar no campo Nome a String "loja@loja.com".<br>2. Entrar no campo Senha a String "loja123".<br>3. clicar no botão de entrar.<br>4. selecionar a box do primeiro produto listado no estoque. <br>5. clicar no botão inferior direito "Registrar compra".|
| **Pós-Condição**           | O registro de estoque da loja deve ser alterado, decrementando uma unidade do produto comprado localmente                                                                                                                                                                                                               |
| **Resultado esperado**     | Ao clicar no botão "Registrar compra", espera-se que apareça um feedback de pedido efetuado e este produto seja visivel na pagina de pedidos da interface de lojas.                                                                                       |
| **Resultado do teste**     |                                  .                                                                                                                                                                                                                  |
| **Data do último teste**   |         .

| **Caso de Teste**          | **Valor**                                                                                                                                                                                                                                                                             |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| **Identificação única**    | i007-registrar-loja                                                                                                                                                                                                                                                                 |
| **Descrição**              | Realiza o registro de novas lojas no sistema através da interface de administração.                                                                                                                                                                                                                 |
| **Dados**                  | Lista de lojas com dados: <br>1. "Loja A", "Rua das Flores, 123, São Paulo, SP" <br>2. "Loja B", "Avenida Brasil, 456, Rio de Janeiro, RJ" <br>3. "Loja C", "Rua do Comércio, 789, Belo Horizonte, MG" <br>4. "Loja D", "Praça da Liberdade, 321, Curitiba, PR" <br>5. "Loja E", "Rua da Literatura, 654, Porto Alegre, RS" <br>6. "Loja F", "Avenida das Américas, 987, Recife, PE" <br>7. "Loja G", "Rua das Pedras, 135, Salvador, BA" <br>8. "Loja H", "Rua do Mercado, 246, Fortaleza, CE" <br>9. "Loja I", "Avenida da Saúde, 369, Manaus, AM" <br>10. "Loja J", "Rua do Açúcar, 741, Natal, RN"  |
| **Pré-Condição**           | O usuário deve estar logado como admin com credenciais válidas. Email: "admin@example.com", Senha: "senha-segura".                                                                                                                                                                                |
| **Passos para a execução** | 1. Navegar para a URL da aplicação.<br>2. Preencher o campo Email com "admin@example.com".<br>3. Preencher o campo Senha com "senha-segura".<br>4. Clicar no botão de login.<br>5. Selecionar o ícone de lojas. <br>6. Selecionar o cartão "Adicionar Loja".<br>7. Para cada loja na lista, clicar em "Adicionar Loja", preencher os campos Nome e Endereço, e clicar no botão "Registrar".  |
| **Pós-Condição**           | O banco de dados deve registrar cada nova loja na tabela correspondente, com os campos id, nome e endereço corretamente preenchidos.                                                                                                                                |
| **Resultado esperado**     | Ao final da execução, espera-se que todas as lojas adicionadas estejam visíveis na interface de administração e registradas corretamente no banco de dados.                                                         |
| **Resultado do teste**     | os dados foram inseridos com sucesso, e se mostraram consistentes mesmo após o recarregamento da página                                                                                                                                                                                                                                                               |
| **Data do último teste**   |  28/09/2024                                                                                                                                                                                                                                                                       |


**Registro do caso de teste**
<video src="./Vídeos/integracao-loja.mp4" width="320" height="240" controls></video>


## Testes de microsserviços
&emsp;&emsp;  
| **Caso de Teste**          | **Valor**                                                                                                                                                                                                                                                                               |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Identificação única**    | i003-create-update-delete-produto                                                                                                                                                                                                                                                        |
| **Descrição**              | Realiza a criação, atualização e exclusão de um produto no sistema de microsserviços.                                                                                                                                                                                                      |
| **Dados**                  | Produto: `{"nome": "Celular X", "descricao": "Celular de última geração", "preco": 2999.99}`                                                                                                                                                                                                |
| **Pré-Condição**           | Não há registro de produto com as mesmas características no banco de dados.                                                                                                                                                                                                                 |
| **Passos para a execução** | 1. Fazer um POST para a rota `/produtos` com o JSON do novo produto.<br>2. Verificar a criação com um GET para `/produtos/{produto_id}`.<br>3. Atualizar o preço com PATCH na rota `/produtos/{produto_id}`.<br>4. Verificar a atualização com GET.<br>5. Excluir o produto com DELETE. |
| **Pós-Condição**           | O produto deve ser criado, atualizado e excluído corretamente no banco de dados, com as respectivas validações de cada operação.                                                                                                                                                             |
| **Resultado esperado**     | Criação: Código 201 e o produto é retornado no GET.<br>Atualização: O preço é alterado corretamente no banco.<br>Exclusão: O produto não deve mais existir no GET.                                                                                                                         |
| **Resultado do teste**     | Sucesso. Todos os endpoints responderam conforme esperado, e as operações de criação, atualização e exclusão foram validadas corretamente.                                                                                                                                                 |
| **Data do último teste**   | 26/09/2024                                                                                                                                                                                                                                                                                |

| **Caso de Teste**          | **Valor**                                                                                                                                                                                                                                                                               |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Identificação única**    | i004-create-update-delete-pedido                                                                                                                                                                                                                                                       |
| **Descrição**              | Realiza a criação, atualização e exclusão de um pedido no sistema de microsserviços.                                                                                                                                                                                                    |
| **Dados**                  | Pedido: `{"cliente_id": "1", "itens": [{"produto_id": "123", "quantidade": 2}, {"produto_id": "124", "quantidade": 1}]}`                                                                                                                                                                 |
| **Pré-Condição**           | Produtos com os IDs 123 e 124 precisam existir no banco de dados e ter estoque disponível.                                                                                                                                                                                               |
| **Passos para a execução** | 1. Fazer um POST para a rota `/pedidos` com o JSON do pedido.<br>2. Verificar a criação com um GET para `/pedidos/{pedido_id}`.<br>3. Atualizar o pedido removendo um item com PATCH.<br>4. Verificar a atualização com GET.<br>5. Excluir o pedido com DELETE.                             |
| **Pós-Condição**           | O pedido deve ser criado, atualizado e excluído corretamente no banco de dados, com as respectivas validações de cada operação.                                                                                                                                                           |
| **Resultado esperado**     | Criação: Código 201 e o pedido é retornado no GET.<br>Atualização: O pedido é atualizado corretamente no banco.<br>Exclusão: O pedido não deve mais existir no GET.                                                                                                                       |
| **Resultado do teste**     | Falha. A criação do pedido retornou um código 500 no lugar de 201.                                                                                                                                                                                                                       |
| **Data do último teste**   | 26/09/2024                                                                                                                                                                                                                                                                                |

| **Caso de Teste**          | **Valor**                                                                                                                                                                                                                                                                               |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Identificação única**    | i005-create-update-delete-loja                                                                                                                                                                                                                                                          |
| **Descrição**              | Realiza a criação, atualização e exclusão de uma loja no sistema de microsserviços.                                                                                                                                                                                                      |
| **Dados**                  | Loja: `{"nome": "Loja Teste", "endereco": "Rua Ficticia, 123"}`                                                                                                                                                                                                                          |
| **Pré-Condição**           | Não há registro de loja com as mesmas características no banco de dados.                                                                                                                                                                                                                 |
| **Passos para a execução** | 1. Fazer um POST para a rota `/lojas` com o JSON da nova loja.<br>2. Verificar a criação com um GET para `/lojas/{loja_id}`.<br>3. Atualizar o endereço da loja com PATCH.<br>4. Verificar a atualização com GET.<br>5. Excluir a loja com DELETE.                                          |
| **Pós-Condição**           | A loja deve ser criada, atualizada e excluída corretamente no banco de dados, com as respectivas validações de cada operação.                                                                                                                                                             |
| **Resultado esperado**     | Criação: Código 201 e a loja é retornada no GET.<br>Atualização: O endereço é alterado corretamente no banco.<br>Exclusão: A loja não deve mais existir no GET.                                                                                                                           |
| **Resultado do teste**     | Sucesso. Todas as operações foram validadas corretamente.                                                                                                                                                                                                                                |
| **Data do último teste**   | 26/09/2024                                                                                                                                                                                                                                                                                |

| **Caso de Teste**          | **Valor**                                                                                                                                                                                                                                                                               |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Identificação única**    | i006-create-update-delete-estoque                                                                                                                                                                                                                                                       |
| **Descrição**              | Realiza a criação, atualização e exclusão de um estoque no sistema de microsserviços.                                                                                                                                                                                                    |
| **Dados**                  | Estoque: `{"produto_id": "123", "quantidade": 50, "loja_id": "1"}`                                                                                                                                                                                                                       |
| **Pré-Condição**           | O produto e a loja referenciados precisam existir no banco de dados.                                                                                                                                                                                                                     |
| **Passos para a execução** | 1. Fazer um POST para a rota `/estoques` com o JSON do novo estoque.<br>2. Verificar a criação com um GET para `/estoques/{estoque_id}`.<br>3. Atualizar a quantidade com PATCH.<br>4. Verificar a atualização com GET.<br>5. Excluir o estoque com DELETE.                                   |
| **Pós-Condição**           | O estoque deve ser criado, atualizado e excluído corretamente no banco de dados, com as respectivas validações de cada operação.                                                                                                                                                           |
| **Resultado esperado**     | Criação: Código 201 e o estoque é retornado no GET.<br>Atualização: A quantidade é alterada corretamente no banco.<br>Exclusão: O estoque não deve mais existir no GET.                                                                                                                   |
| **Resultado do teste**     | Falha. A criação do estoque retornou um código 500 no lugar de 201.                                                                                                                                                                                                                      |
| **Data do último teste**   | 26/09/2024                                                                                                                                                                                                                                                                                |
