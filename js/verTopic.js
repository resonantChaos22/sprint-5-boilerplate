var topicId = getParameterByName('topic_id');
var cargarPagina = function(){
    cargarRespuestas();
    $("#crearRespuesta").click(crearRespuesta);
    $("#cancelar").click(ocultar);
    $("#agregarTema").submit(agregarTema);

    //Solo por propositos de debug
    if(topicId){
    console.log("El topic ID es:"+topicId);
    }
};


var url = {
    respuesta: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/' + topicId,
    responses: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/' + topicId + '/responses'
}; 


$.getJSON(url.respuesta,function(tema){
    $("#tituloRespuesta").text(tema.content);
    $("#autorRespuesta").text(" " +tema.author_name);
});

var cargarRespuestas = function(){
    $.getJSON(url.responses,function(respuestas){
        if(respuestas.length === undefined){
            var $tarjeta = $("<div />", {"class": "card"});
            var $textoTarjeta = $("<div />", {"class": "card-content"}); 
            var $h5Respuesta = $("<h5 />");
            $h5Respuesta.text(respuestas.error);
            $textoTarjeta.append($h5Respuesta);
            $tarjeta.append($textoTarjeta);
            $("#seccRespuestas").append($tarjeta);
        } else{
            respuestas.forEach(verRespuesta);
        }

    });
};

var verRespuesta = function(respuesta){
    var $tarjeta = $("<div />", {"class": "card"});
    var $textoTarjeta = $("<div />", {"class": "card-content"});
    var $h5Autor = $("<h5 />").text("Por: ");
    var $spanAutor = $("<span />");
    var $h5Respuesta = $("<h5 />");
    
    $h5Autor.append($spanAutor.text(respuesta.author_name));
    $h5Respuesta.text(respuesta.content);
    $textoTarjeta.append($h5Autor).append($h5Respuesta);
    $tarjeta.append($textoTarjeta);
    $("#seccRespuestas").append($tarjeta);
};

var crearRespuesta = function() {
    $("#tarjetaAgregar").removeClass("hide");
};

var ocultar = function() {
    $("#tarjetaAgregar").addClass("hide");
};

var agregarTema = function(e) {
    e.preventDefault();
    $("#seccRespuestas").html("");
    var autor = $("#autorAgregar").val();
    var titulo = $("#tituloAgregar").val();
    var respuesta = 0;
    $.post(url.responses, {
        author_name: autor,
        content: titulo
    }, function(respuesta){
        cargarRespuestas(respuesta);
        ocultar();        
    });
};

$(document).ready(cargarPagina);