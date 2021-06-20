// Importar o sequelize
const Sequelize = require('sequelize');
const connection = require("../../database/database");
// Importar Category para o relacionamento de banco de dados
const Category = require("../categories/Category");

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Relacionamento 1 - 1 (Um Article pertence à uma Category)
Article.belongsTo(Category);
// Relacionamento 1 - N (Uma Category tem muitos Article)
Category.hasMany(Article);

// Article.sync({force: true}); para atualizar o banco apenas

module.exports = Article;