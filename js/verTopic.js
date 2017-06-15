var topicId = getParameterByName('topic_id');

//Solo por propositos de debug
if(topicId){
  console.log("El topic ID es:"+topicId);
}

var url = {
   respuesta: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/' + topicId
}; 
console.log(url.respuesta);

$.getJSON(url.respuesta,function(tema){
    $("#tituloRespuesta").text(tema.content);
    $("#autorRespuesta").text(" " +tema.author_name);
});

$.getJSON(url.respuesta+"/responses",function(respuestas){ 
    respuestas.forEach(verRespuesta);
});

var verRespuesta = function(){
    
};