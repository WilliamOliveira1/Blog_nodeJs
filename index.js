// importando o express
const express = require('express');
const app = express();

//Rota da controller categories
const categoriesController = require("./controller/categories/CategoriesController");
//Rota da controller articles
const articlesController = require("./controller/articles/ArticlesController");


// importando a connection do banco de dados
const connection = require("./database/database");
// Conectar com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });


//Setar o EJS para renderizar o HTML
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Configurar o body-parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Utilizando as rotas da controller
app.use("/", categoriesController);
app.use("/", articlesController);

//Rotas
app.get("/", (req, res) => {
      res.render("index");
});

app.listen(8080, (error) => {
  if(error) {
    console.error("The server caught an error: " + error);
  }else {
    console.log("The server is running");
  }
});