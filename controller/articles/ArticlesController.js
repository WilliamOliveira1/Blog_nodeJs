const express = require("express");
const router = express.Router();
const Category = require("../../model/categories/Category");
const Article = require("../../model/articles/Article");
const slugfy = require("slugify");


router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render("admin/articles/index", {
            articles: articles,
        });
    });    
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then( categories => {
        res.render("admin/articles/new", {categories: categories});
    })    
});

router.post("/article/save", (req,res) => {
    let title    = req.body.title;
    let body     = req.body.body;
    let category = req.body.category;

    if(!title || !body) {
        console.error("User tried to save empty Title!");
        res.redirect("/admin/articles");
    }else{
        Article.create({
            title: title,
            slug: slugfy(title),
            body: body,
            categoryId: category
        }).then(() => {
            res.redirect("/admin/articles");
        })
    }
});

router.post("/articles/delete", (req, res) => {
    var id = req.body.id;
    if(id !== undefined) {
        if(!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            });
        }else {
            console.log("id " + id + "is not a number!");
            res.redirect("/admin/articles");
        }
    }else {
        console.log("id " + id + "is undefined!");
        res.redirect("/admin/articles");
    }
});

router.get("/admin/articles/edit/:id", (req, res) => {
    let id = req.params.id;

    if(isNaN(id)) {
        res.redirect("/admin/articles");
    }
    Article.findByPk(id).then(article => {
        if(article !== undefined) {
            res.render("/admin/articles/edit", {article: article})
        }else {
            console.log("id " + id + "is undefined!");
            res.redirect("/admin/articles");
        }
    }).catch(error => {
        console.error("An exception was caught: " + error)
    })
});

module.exports = router;