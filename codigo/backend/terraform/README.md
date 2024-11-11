# Terraform AWS Setup

Este repositório contém um código Terraform para provisionar recursos na AWS. Siga os passos abaixo para configurar e executar o código.

## Pré-requisitos

Antes de começar, você precisará:

1. Ter uma conta na [AWS](https://aws.amazon.com/).
2. Ter o [Terraform](https://www.terraform.io/downloads.html) instalado em sua máquina.

## Obtendo suas Credenciais AWS

Você precisará das seguintes credenciais da AWS para autenticar o Terraform:

- **Access Key ID**
- **Secret Access Key**
- **Session Token** (se você estiver usando um perfil com MFA)

### Onde Encontrar as Credenciais

1. **Access Key ID e Secret Access Key**:
   - Acesse o [AWS Management Console](https://aws.amazon.com/console/).
   - No canto superior direito, clique em seu nome de usuário e selecione "My Security Credentials".
   - Expanda a seção "Access keys (access key ID and secret access key)".
   - Clique em "Create New Access Key" para gerar uma nova chave ou use uma chave existente. **Certifique-se de copiar o Secret Access Key, pois ele não será mostrado novamente.**

2. **Session Token**:
   - Se você estiver usando um perfil com autenticação de múltiplos fatores (MFA), você precisará gerar um token de sessão. Você pode fazer isso usando a AWS CLI com o seguinte comando:
     ```bash
     aws sts get-session-token --serial-number arn:aws:iam::ACCOUNT_ID:mfa/USERNAME --token-code MFA_CODE
     ```
   - Substitua `ACCOUNT_ID`, `USERNAME` e `MFA_CODE` pelos valores apropriados. O resultado incluirá um `SessionToken`, que você precisará para o Terraform.

## Configuração das Variáveis de Ambiente

Antes de executar o Terraform, exporte suas credenciais da AWS como variáveis de ambiente:

```bash
export AWS_ACCESS_KEY_ID="sua_access_key_id"
export AWS_SECRET_ACCESS_KEY="sua_secret_access_key"
export AWS_SESSION_TOKEN="seu_session_token" # opcional, apenas se você tiver um token de sessão
```
## Executando o Terraform

Siga os passos abaixo para inicializar e aplicar a configuração do Terraform:

1. **Inicializar o Terraform**:
   ```bash
   terraform init
    ```
## Aplicar a Configuração:

Antes de aplicar a configuração, certifique-se de substituir os IDs das AMIs no código pelos IDs das AMIs que você usará para o Bastion Host e o Web Server. Você pode encontrar os IDs apropriados das AMIs no Console de Gerenciamento da AWS, na seção EC2.

```bash
terraform apply
```
   O comando acima solicitará que você revise as alterações que o Terraform fará. Digite yes para confirmar e aplicar as alterações.

## Documentação do Terraform
Para mais informações sobre como usar o Terraform, consulte a documentação oficial do Terraform em https://developer.hashicorp.com/terraform/docs.