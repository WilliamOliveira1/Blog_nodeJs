const express = require("express");
const router = express.Router();
const Category = require("../../model/categories/Category");
const Article = require("../../model/articles/Article");
const slugfy = require("slugify");
const { default: slugify } = require("slugify");


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
            Category.findAll().then(categories => {
                res.render("admin/articles/edit", {
                    categories: categories,
                    article: article
                });
            });            
        }else {
            console.log("id " + id + "is undefined!");
            res.redirect("/admin/articles");
        }
    }).catch(error => {
        console.error("An exception was caught: " + error)
    })
});


router.post("/article/update", (req, res) => {
    let id       = req.body.id;
    let title    = req.body.title;
    let body     = req.body.body;
    let category = req.body.category;

    Article.update({
        title: title,
        body: body,
        categoryId: category,
        slug: slugify(title)
    }, {where: {
         id: id
    }}).then(() => {
        res.redirect("/admin/articles");
    }).catch(error => {
        console.error("An exception was caught: " + error);
        res.redirect("/admin/articles");
    });
});

router.get("/articles/page/:num", (req, res) => { // sistema de pagina????o do blog
    let page   = req.params.nums;
    let offset = 0;

    if(isNaN(page) || page === 1) {
        offset = 0;
    }else {
        offset = parseInt(page) * 4;
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset
    }).then(articles => {
        let next;
        if(offset+4 >= articles.count) {
            next = false;
        }else {
            next = true;
        }
        let result = {
            next: next,
            articles: articles
        }

        res.json(result);
    });
});

module.exports = router;