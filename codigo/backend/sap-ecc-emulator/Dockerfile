# Usa a imagem oficial do Python 3.12 como base
FROM python:3.12

# Define o diretório de trabalho dentro do contêiner como /sap-ecc-emulator
WORKDIR /sap-ecc-emulator

# Copia o arquivo requirements.txt do host para o diretório de trabalho no contêiner
COPY ./requirements.txt /sap-ecc-emulator

# Instala as dependências listadas no arquivo requirements.txt
RUN pip install -r requirements.txt

# Copia todo o conteúdo do diretório atual do host para o diretório de trabalho no contêiner
COPY . .

# Expõe a porta 5000 (geralmente usada para rodar a aplicação Flask)
EXPOSE 5000

# Expõe a porta 5432 (geralmente usada para se conectar a um banco de dados PostgreSQL)
EXPOSE 5432

# Define o comando padrão que será executado quando o contêiner for iniciado, iniciando a aplicação
CMD ["python", "src/app.py"]
