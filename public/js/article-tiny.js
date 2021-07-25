tinymce.init({
    language: 'pt_BR', // string with ''
    selector: "#article",
    plugins: [
        'advlist autolink link image lists print preview hr code codesample charmap emoticons fullscreen insertdatetime legacyoutput media searchreplace table template textpattern toc visualchars visualblocks wordcount'
    ],
    mobile: {
        menubar: true
    },
    init_instance_callback: () => { // carregar para editar o artiigo
        tinymce.get("article").setContent($("#content").html());
    }
});