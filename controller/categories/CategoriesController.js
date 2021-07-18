const express = require("express");
const Category = require("../../model/categories/Category");
const router = express.Router();
const slugfy = require("slugify");


router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) => {
    let title = req.body.title;

    if(title != undefined) {
        Category.create({
            title: title,
            // Exemplo de slug - "Computação e informatica" "Computação-e-informatica"
            slug: slugfy(title)
        })
        .then(() => {
            console.log("Category saved " + slugfy(title));
            res.redirect("/");
        });  
    }else {
        console.log("User tried to save empty data");
        res.redirect("/");
    }
});

router.get("/admin/categories", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", {categories: categories})
    })    
});

router.post("/categories/delete", (req, res) => {
    var id = req.body.id;
    if(id !== undefined) {
        if(!isNaN(id)) {
            Category.destroy({
                where: {
                    id: id
                }                
            }).then(() => {
                res.redirect("/admin/categories");
            });
        }else {
            console.log("id " + id + "is not a number!");
            res.redirect("/admin/categories");
        }
    }else {
        console.log("id " + id + "is undefined!");
        res.redirect("/admin/categories");
    }
});

router.get("/admin/categories/edit/:id", (req, res) => {
    let id = req.params.id;

    if()
    Category.findByPk(id).then(category => {
        if(category !== undefined) {
            res.render("admin/categories/edit", {category: category})
        }else {
            console.log("id " + id + "is undefined!");
            res.redirect("/admin/categories");
        }
    }).catch(error => {
        console.error("An exception was caught: " + error)
    })
});

module.exports = router;