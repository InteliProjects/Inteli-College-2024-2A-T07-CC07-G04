# Executando a Aplicação
> Antes de começar certifique-se de que você tem um `.env`
1. Build da imagem Docker `docker build . -t go-backend`
2. Executar Container `docker run -p 5000:5000 go-backend`