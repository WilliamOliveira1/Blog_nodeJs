// importando o express
const express = require('express');
const app = express();

//Rota da controller categories
const categoriesController = require("./controller/categories/CategoriesController");
//Rota da controller articles
const articlesController = require("./controller/articles/ArticlesController");


// importando as models Category e Article
const Article = require("./model/articles/Article");
const Category = require("./model/categories/Category");

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
  Article.findAll({
    order: [
      ['id', 'DESC']
    ]
  }).then(articles => {
    Category.findAll().then(categories => {
      res.render("index", {
        articles: articles,
        categories: categories
      });
    });    
  });     
});

app.get("/:slug", (req,res) => { // carrega a pagina do artigo
  let slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug
    }
  }).then(article => {
    if(article !== undefined) {      
      Category.findAll().then(categories => {
        res.render("article", {
          article: article,
          categories: categories
        });
      });    
    }else{
      res.redirect("/");
    }
  }).catch( error => {
    console.error("An exception was caught: " + error)
  })
});

app.get("/category/:slug", (req,res) => { // Carregar na home apenas a categoria selecionada na navbar
  let slug = req.params.slug;
  Category.findOne({
    where: {
      slug: slug
    },
    include: [{model: Article}]
  }).then(category => {
    if(category !== undefined) {      
      Category.findAll().then(categories => {
        res.render("index", {
          articles: category.articles,
          categories: categories
        });
      });    
    }else{
      res.redirect("/");
    }
  }).catch( error => {
    console.error("An exception was caught: " + error)
  })
});

app.listen(8080, (error) => {
  if(error) {
    console.error("The server caught an error: " + error);
  }else {
    console.log("The server is running");
  }
});