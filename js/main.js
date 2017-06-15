var api = {
    url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/'
};

var cargarPagina = function(){
    cargarTemas();
};

var $listaTemas = $("#temas");

var cargarTemas = function(){ 
    $.getJSON(api.url,function(temas){ 
        temas.forEach(verTema);
    });
};

var verTema = function(tema){
    var autor = tema.author_name;
    var titulo = tema.content;
    var respuestas = tema.responses_count;
   
    //Creacion de fila
    var $tr = $("<tr />");
    //Celda de titulo
    var $tituloTd= $("<td />");
    $tituloTd.text(titulo);
    //Celda de autor
    var $autorTd= $("<td />");
    $autorTd.text(autor);
    // Celda de respuestas
    var $respuestasTd = $("<td />").text(respuestas);
    $tr.append($tituloTd).append($autorTd).append($respuestasTd);
    $listaTemas.append($tr);
    
};



$(document).ready(cargarPagina);