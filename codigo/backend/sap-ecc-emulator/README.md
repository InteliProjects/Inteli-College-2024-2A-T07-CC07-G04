# Executar a Aplicação
> Antes de começar certifique-se de que você tem um `.env`
1. Abra o terminal neste diretorio.
2. Build da imagem Docker `docker build . -t ecc-back`
3. Para executar temos duas opções:

    3. 1. Executar Container com banco de dados local `docker run -d -e DB_USER=xxxx -e DB_PASSWORD=xxxx -e DB_HOST=host.docker.internal -e DB_PORT=xxxx -e DB_NAME=xxxx -p 5000:5000 ecc-back`

    3. 2. Executar Container com arquivo .env `docker run -d --env-file .env -p 5000:5000 ecc-back`
#### *OBS:*  Utilize o arquivo `.env.example` para contruir o .env a ser utilizado pela aplicação.
## Comandos úteis

- para verificar o status dos Containers em execução utilize o comando: `docker ps `

- para finalizar/encerrar o Container em execução utilize o comando: `docker stop id_do_container`

- para pausar Container em execução utilize o comando: `docker pause id_do_container`

- para retomar o Container pausado utilize o comando: `docker unpause id_do_container`
