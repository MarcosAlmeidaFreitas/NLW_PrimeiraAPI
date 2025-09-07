# copiando o node para maquina, o alpine instala somente a versão sem nada do node e renomea como builder
FROM node:22-alpine AS builder

# Cria uma pasta app dentro do sistema 
WORKDIR /app

# copiando a pasta do projeto para dentro da pasta aonde está sendo instalado, 
# importante que ja tenha colocado os arquivos a ser ignorados dentro do arquivo .dockerignore
COPY . ./

RUN npm ci --only=production

EXPOSE 3333

CMD [ "node", "src/server.ts" ]

# depois executar o comando "docker build ." para criar a imagem