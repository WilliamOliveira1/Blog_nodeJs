$(".deleteCategory").on("click",function(e) {
    e.preventDefault();
    let decision = confirm("Você deseja deletar esta categoria?");
    if(decision){
        this.submit();
    }
});

$(".deleteArticle").on("click",function(e) {
    e.preventDefault();
    let decision = confirm("Você deseja deletar este artigo?");
    if(decision){
        this.submit();
    }
});