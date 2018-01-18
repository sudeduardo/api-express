# api-express
## Descrição
Projeto para fins de estudo sobre node e mongodb e arquitetura rest em apis
O projeto comporta um api de CRUD simulando um serviço de loja (cliente, produto pedido) com autenticação utilizando jwt

## Bibliotecas  
- **[@sendgrid/mail@6.2.0](https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail)**
- **[bcrypt@1.0.3](https://github.com/kelektiv/node.bcrypt.js)**
- **[body-parser@1.18.2](https://github.com/expressjs/body-parser)**
- **[ejs@2.5.7](https://github.com/tj/ejs)**
- **[express@4.16.2](https://github.com/expressjs/express)**
- **[express-validator@4.3.0](https://github.com/ctavan/express-validator)**
- **[guid@0.0.12](https://github.com/dandean/guid)**
- **[jsonwebtoken@8.1.0](https://github.com/auth0/node-jsonwebtoken)**
- **[mongoose@4.13.9](https://github.com/Automattic/mongoose)**
- **[request@2.83.0"](https://github.com/request/request)**
- **[request-promise@4.2.2](https://github.com/request/request-promise)**

## Instalação
<h2>Configuração do servidor</h2>
<ol>
<li> Clone ou baixe o repositório git clone https://github.com/sudeduardo/api-express.git </li>
<li> Entre dentro de api-express -> "cd api-express"  </li>
<li> Execute "npm install" </li>
<li> Configure o "config.json" dentro de src: <br><li>

```
{
  
    "token_secret": "",
    // Token secreto para geração token no servidor pode ser qualquer valor
    
    "port":"",
    // porta onde ira rodar sua aplicação por default o padrão será 3000
    
    "sendgridKey": "",
    // chave para enviar solicitações de envio de email para o serviço sendgrid

    "mongo_url": "",
    // string de conexão utilizado no mongoose exemplo ->mongodb://localhost:27017/api
    
    "email_validator":"http://api.emailvalidator.co/?AccessKey=KEY_SERVICE_EMAIL_VALIDATOR&EmailAddress={email}&VerificationLevel=3",
    // Para verificação e validação do email é utilizado uma api(http://www.emailvalidator.co/API) que ver se o email realmente existe online
    //Caso queria desativar essa validação comente o middleware no model user em save
     
    "email_sender":"",
    // Email que será o remetente no corpo dos emails enviados pela API do sendgrid
}
```
    

<li> Execute npm start</li>
<li> E verifique a porta configurada </li>
<li> Abra http://localhost:port/</li>
<li> E por padrão	será retornado a resposta </li>
{
  "title": "Node Store API",
  "version": "0.0.1"
}
</ol>

## Rotas da API

|URL|METODO|DESCRIÇÃO|EXEMPLO
 --- | --- | --- | ---
|`/`| GET | Retorna uma informação de teste com informações da API| { "title": "Node Store API", "version": "0.0.1"}
|`products/` | GET | Retorna um json com um todos os produto| [{ "_id": "5a5e5061e665c028b40d53e4","title": "Flor","slug":"flor","price":5},{ "_id": "5a5e5061e665c028b40d543c","title": "Flora","slug":"flora","price":1}]  
|`products/:slug` | GET | slug:Flores-> Retorna um json com um produto que tenha o slug correspondente|[{
  "_id": "5a5e5061e665c028b40d53e4",
  "title": "Flor",
  "slug": "flor",
  "description": "Flor é a estrutura reprodutora característica das plantas angiospérmicas. A função de uma flor é produzir sementes através da reprodução sexuada",
  "price": 5,
  "tags": [
    "Flores",
    "Primavera"
  ]
}] 
|`products/id/:id` | GET | Retorna um json com um produto que tenha o id correspondente 
|`/tags/:tag'` | GET | Retorna um json com todos produto que em suas tags tenha a tag correspondente
|`/` | POST | Se autenticado e os dados envidas conforme os validardore cadastra um novo produto

