WK Test | Desenvolvedor Full Stack

Configurações e passos para subir a aplicação

DB MongoDB

Criar uma instância Atlas em (https://cloud.mongodb.com) para poder atualizar o arquivo ".env" do backend da aplicação.

===================

BACKEND

$ npm install

"Copiar conteúdo de .env.example e criar arquivo .env, mudar apenas o apontando para o banco desejado"

$ npx prisma generate

$ npx prisma db push

$ npm run start:dev

==> Para acessar a documentação da API Swagger acessar: http://localhost:3000/docs ou "URL_API/docs"

===================

FRONTEND

