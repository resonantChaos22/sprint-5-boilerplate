var api = {
    url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/'
};

var cargarPagina = function(){
    cargarTemas();
    $("#crearTema").click(crearTema);
    $("#agregarTema").submit(agregarTema);
    $("#busqueda").submit(filtrarTemas);
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
    var id = tema.id;
   
    //Creacion de fila
    var $tr = $("<tr />", {"data-id": id});
    //Celda de titulo
    var $tituloTd= $("<td />", {"class": "tituloTema", "id": id});
    $tituloTd.text(titulo);
    //Celda de autor
    var $autorTd= $("<td />");
    $autorTd.text(autor);
    // Celda de respuestas
    var $respuestasTd = $("<td />").text(respuestas);
    $tr.append($tituloTd).append($autorTd).append($respuestasTd);
    $listaTemas.append($tr);   
};

var crearTema = function() {
    $("#tarjetaAgregar").removeClass("hide");
};

var agregarTema = function(e) {
    e.preventDefault();
    var autor = $("#autorAgregar").val();
    var titulo = $("#tituloAgregar").val();
    var respuesta = 0;
    $.post(api.url, {
        author_name: autor,
        content: titulo,
        responses_count: respuesta
    }, function(tema){
        console.log(tema);
        verTema(tema);
        $("#tarjetaAgregar").addClass("hide");        
    });
};

var filtrarTemas = function (e) {
	e.preventDefault();
	var criterioBusqueda = $("#buscar").val().toLowerCase();
	var temasFiltrados = $(".tituloTema").filter(function (indice,tema) {
                
        if(tema.innerHTML.toLowerCase().indexOf(criterioBusqueda) >= 0){
            return tema.id;
        }
	});   
    console.log(temasFiltrados);
    imprimir(temasFiltrados);
	//imprimir(temasFiltrados);
};

var imprimir = function (temas) {
    numTemas = temas.length;
    $listaTemas.html("");
    var tareasFiltradas = [];
    for(var i=0; i< numTemas; i++){
        console.log(api.url + temas[i].id)
        $.getJSON(api.url + temas[i].id ,verTema);
    };
};




$(document).ready(cargarPagina);