var api = {
    url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/'
};

var cargarPagina = function(){
    cargarTemas();
    $("#crearTema").click(crearTema);
    $("#cancelarBusqueda").click(limpiarBusqueda);
    $("#agregarTema").submit(agregarTema);
    $("#busqueda").submit(filtrarTemas);
};

var $listaTemas = $("#temas");

var cargarTemas = function(){ 
    $.getJSON(api.url,function(temas){ 
        temas.forEach(verTema);
    });
};

var plantillaVer = '<a class="waves-effect waves-light btn respuestas" aria-hidden="true" href="__url_id__"><i class="material-icons">zoom_in</i></a>';

var plantilla = "";

var verTema = function(tema){
    var autor = tema.author_name;
    var titulo = tema.content;
    var respuestas = tema.responses_count;
    var id = tema.id;
    
    plantilla = plantillaVer.replace("__url_id__", "verTopic.html?topic_id=" + id);
   
    //Creacion de fila
    var $tr = $("<tr />");
    //Celda de titulo
    var $tituloTd= $("<td />", {"class": "tituloTema respuestas", "id": id});
    var $tituloA= $("<a />", {"href": "verTopic.html?topic_id="+ id});
    $tituloTd.append($tituloA.text(titulo));
    //Celda de autor
    var $autorTd= $("<td />", {"class": "respuestas"});
    $autorTd.text(autor);
    // Celda de respuestas
    var $respuestasTd = $("<td />", {"class": "respuestas"}).text(respuestas);
    var $verRespuestas = $("<td />").html(plantilla);
    $tr.append($tituloTd).append($autorTd).append($respuestasTd).append($verRespuestas);
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
    imprimir(temasFiltrados);
};

var imprimir = function (temas) {
    numTemas = temas.length;
    $listaTemas.html("");
    var tareasFiltradas = [];
    for(var i=0; i< numTemas; i++){
        $.getJSON(api.url + temas[i].id ,verTema);
    };
};

var limpiarBusqueda = function(){
    $("#buscar").val("");
    $listaTemas.html("");
    cargarTemas();
};


$(document).ready(cargarPagina);