// Importar o sequelize
const Sequelize = require('sequelize');

// Construindo a conexão com o banco de dados 
// Deve-se criar o banco de dados primeiro
// No nosso caso no MySql Workbench
// Nome do banco de dados vai abaixo - blog_crud
// Nome do usuario - root
// Senha do banco - 123456
const connection = new Sequelize('blog_crud', 'root', '123456', {
    host: 'localhost', // Como está sendo usado localmente
    dialect: 'mysql' // Indicar que vamos usar MySql
});

// Exportando a conexão
module.exports  = connection;