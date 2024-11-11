# Configurando o k6 Cloud Run

Para configurar a visualização nos dados no grafana, é preciso configurar algumas etapas.

## Pré-requisitos

- Logar com o email do grupo no [Grafana Cloud](https://grafana.com/signup).
- Acessar o terminal da instância

## Passo a Passo

### 1. Acessar o token de acesso

1. Acesse o token da API pela [conta](https://grupo4vivo.grafana.net/a/k6-app/settings/api-token).
2. Copie o token

### 2. Fazer Login no k6 Cloud

1. Abra o terminal.
2. Execute:
   ```bash
   cd codigo/backend/teste-carga
   k6 cloud login 
   #insira o token
   k6 cloud run teste-carga.js
