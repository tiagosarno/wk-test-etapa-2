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

PS: Tive de implementar utilizando o EXPO devido diversos conflitos que enfrentei para erguer meu ambiente nativo, podendo impactar na não implementação do frontend. Busquei utilizar bibliotecas nativas do react native ou bibliotecas oficiais react.

Requisitos para rodar a aplicação
- Node LTS mais recente
- Android Studio + Emulador

===> Baixar dependências
$ npm install

===> Com o emulador aberto
$ npx expo start
