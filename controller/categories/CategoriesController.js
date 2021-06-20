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

module.exports = router;