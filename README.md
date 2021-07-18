# Blog_nodeJs
Blog(CRUD) feito com Node.Js

**Instalação do Nodemon**

*a função do nodemon é de não precisar toda vez dar reset no servidor para visualizar mudanças realizadas no código*

> npm install -g nodemon -> instalar globalmente npm install 

> npm install nodemon --save -> para instalar no diretório atual

**Instalação do Ejs**

*Ejs é a view engine*
> npm install ejs --save -> para instalar no diretório atual

***Setar o Ejs para renderizar HTML e usar arquivos estaticos***

```
app.set('view engine', 'ejs');
app.use(express.static('public'));
```
*documentos do EJS*
> https://ejs.co/#docs

**Instalação do body-parser**

> npm install body-parser --save -> para instalar no diretório atual

**Instalação do express**

> npm install express --save

*documento express para rotas*
> https://expressjs.com/pt-br/guide/routing.html

*documento express para API's*
>https://expressjs.com/pt-br/4x/api.html

**Instalação do Sequelize**

*O Sequelize é um ORM(Object/Relational Mapper) baseado em Promise para Node.js e io.js, e suporta os dialetos PostgreSQL, MySQL, MariaDB, SQLite e MSSQL e recursos a transação, relacionamentos, replicação de leitura.*

> npm install --save sequelize

*Para o sequelize trabalhar com MySql*
> npm install --save mysql2

*documentos do Sequelize*
> https://sequelize.org/master/

**Instalação do Slugify**

> npm install --save slugify

**Usando o TinyMCE**

Link para download

> https://www.tiny.cloud/get-tiny/self-hosted/

colocar a pasta do TinyMCE dentro da pasta public

Exemplo:

```
{html}
<space>
{
<textarea id="article" name="body" class="form-control" placeholder="Escreva seu texto aqui"></textarea>
}
```

```
{javascript}
<space>
{
tinymce.init({
    selector: "#article"
});
}
```

Se deseja novos idiomas para o tinyMCE:

> https://www.tiny.cloud/get-tiny/language-packages/

Doc do tinyMCE:

> https://www.tiny.cloud/docs/

