
# Requisições pelo Postman

## 1) Introdução

&emsp;&emsp;O objetivo deste relatório é apresentar os resultados de testes realizados no backend da aplicação desenvolvido em Flask. O backend é responsável por gerenciar um conjunto de produtos, permitindo operações de criação, leitura, atualização e exclusão (CRUD) dos dados. A validação do funcionamento correto dos endpoints foi realizada utilizando a plataforma Postman. Todos os testes foram bem-sucedidos, o que indica que a API está funcionando conforme esperado.

## 2) Metodologia
&emsp;&emsp;Os testes foram realizados utilizando a plataforma Postman, que permite a execução de requisições HTTP de maneira automatizada e a verificação das respostas. A API foi desenvolvida utilizando a linguagem Python com o microframework Flask. A seguir, são descritas as requisições realizadas:

GET /produtos: Retorna todos os produtos.
GET /produtos/{id}: Retorna um produto específico com base no ID.
POST /inserirProdutos: Insere um novo produto na lista.
DELETE /removerProduto/{id}: Remove um produto da lista com base no ID.
PATCH /atualizarProduto/{id}: Atualiza os dados de um produto existente com base no ID.
Referência:

## 3) Resultados
Requisição 1: GET /produtos

Objetivo: Recuperar a lista completa de produtos.
Parâmetros e valores utilizados: Nenhum parâmetro foi necessário.
Resultado esperado: Retorno de uma lista JSON contendo todos os produtos.
Resultado obtido: A lista de produtos foi retornada com sucesso.

Requisição 2: GET /produtos/{id}

Objetivo: Recuperar um produto específico baseado no ID.
Parâmetros e valores utilizados: id (inteiro) do produto.
Resultado esperado: Retorno do produto correspondente ao ID especificado.
Resultado obtido: O produto foi retornado corretamente conforme o ID informado.

Requisição 3: POST /inserirProdutos

Objetivo: Inserir um novo produto na lista.
Parâmetros e valores utilizados: JSON contendo as informações do produto.
Resultado esperado: Confirmação da adição do produto e retorno do produto adicionado.
Resultado obtido: O produto foi adicionado com sucesso e os detalhes foram retornados.

Requisição 4: DELETE /removerProduto/{id}

Objetivo: Remover um produto específico da lista com base no ID.
Parâmetros e valores utilizados: id (inteiro) do produto.
Resultado esperado: Confirmação da remoção do produto e retorno do produto removido.
Resultado obtido: O produto foi removido corretamente.

Requisição 5: PATCH /atualizarProduto/{id}

Objetivo: Atualizar as informações de um produto existente com base no ID.
Parâmetros e valores utilizados: id (inteiro) do produto, e JSON com os dados atualizados.
Resultado esperado: Confirmação da atualização e retorno do produto atualizado.
Resultado obtido: O produto foi atualizado com sucesso.

## 4) Conclusão
&emsp;&emsp;O objetivo de testar e validar as operações CRUD do backend foi alcançado com sucesso. Cada endpoint foi testado utilizando a plataforma Postman, e todos os testes retornaram os resultados esperados, confirmando o funcionamento correto da API. A implementação mostrou-se estável e capaz de lidar corretamente com os dados dos produtos, atendendo aos requisitos funcionais estabelecidos.

# Demonstração de execução e operações CRUD com console AWS

&emsp;&emsp;Realizamos uma série de testes utilizando o console da AWS e um navegador para validar o correto funcionamento do backend da aplicação, assim como sua conexão com o banco de dados RDS. Esses testes foram bem-sucedidos e demonstraram a robustez e eficiência das operações CRUD implementadas.

https://github.com/user-attachments/img/0fafb06d-c2a8-4808-964c-8c6e9d6fd81d

&emsp;&emsp;Os resultados dos testes podem ser conferidos na pasta "vídeos" dentro do diretório "docs". A demonstração está disponível nos formatos MKV e MP4, sendo recomendado o formato MKV por oferecer uma qualidade de imagem superior.

# Desmonstração do Front-end implementado em página estática

&emsp;&emsp;O front-end da aplicação foi implementado e está acessível por meio de uma página estática hospedada no serviço S3 da AWS. Essa página oferece uma interface amigável e responsiva para interagir com o backend da aplicação.

https://github.com/user-attachments/img/19a61089-58c8-45a6-add4-5f4637c0e9e2

&emsp;&emsp;A demonstração do front-end também está disponível em vídeo na pasta "vídeos" dentro do diretório "docs". Assim como na demonstração do backend, os vídeos estão disponíveis nos formatos MKV e MP4, sendo recomendada a visualização em MKV para uma melhor qualidade de imagem.
