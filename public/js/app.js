$(".deleteCategory").on("click",function(e) {
    e.preventDefault();
    let decision = confirm("Você deseja deletar esta categoria?");
    if(decision){
        this.submit();
    }
});