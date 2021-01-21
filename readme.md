# Desafio Backend R2T - Tech

> Desafio proposto para a vaga de backend.

## Como executar o projeto

- Clone o projeto;
- Execute o comando yarn ou npm install (esse projeto utilizou yarn);

- Para verificar se está tudo ok, execute o comando yarn dev:server
(ou npm run dev:server);

- No arquivo .env.example há os nomes das variáveis ambiente que foram utilizadas
nesse projeto. As chaves de acesso à conta da AWS serão enviadas à parte, por
questões de segurança;

- Há dois tipos de drivers que podem ser utilizados nas variáveis
ambiente: "s3" ou "disk". Ao selecionar disk os arquivos serão salvos no disco
local. Ao selecionar s3, se as chaves de acesso estiverem configuradas corretamente
os arquivos irão para o bucket "desafior2t".

- Utilizando uma ferramenta cliente http, como o Insomnia, por exemplo, crie uma
rota do tipo POST para o endereço http://localhost:3333/files;

- O corpo da solicitação deve ser do tipo Multipart Form.

- O nome do campo deve ser "file", conforme configuração utilizada no Multer;

## Principais ferramentas utilizadas no projeto

- Para configuração de todo o serviço http foi utilizado o framework Express;

- Para realizar o upload local dos arquivos, foi utilizado o Multer;

- Para realizar o redimensionamento das imagens, foi utilizada o lib Sharp;

- Foi fundamental utilizar a SDK da AWS para realizar o upload para o S3. A lib
instalada foi aws-sdk;

- Para configurar o contentType dos arquivos e possibilitar abri-los através do
link no s3, foi utilizada a lib mime;

- A lib dot-env foi utilizada para que a aplicação não tivesse probleas para ler
as variáveis ambiente no arquivo .env;

- Esse utilizou como padrão para seu desenvolvimento o Typescript. As demais
bibliotecas utilizadas no projeto foram basicamente para padronização do código.

## Desafios enfrentados nesse projeto

Como eu não havia utilizado nenhum recurso para redimensionar imagens, de fato
foi um desafio entender e configurar o sharp.

## Fontes de pesquisa para esse projeto

- https://www.npmjs.com/package/sharp

- https://www.npmjs.com/package/mime

- https://medium.com/collabcode/upload-e-compress%C3%A3o-de-imagens-com-nodejs-68109eed066e

- https://www.youtube.com/watch?v=P20RhOjwhx0&ab_channel=ProgramadorBr-Tutoriais

