$(document).ready(function() {
	var id=dameIdNoticia();
	dameNoticia(id);
	dameCarrusel();
	paginacionComentarios(1);
	var interval=setInterval(refrescaNoticia,60000);
	$("body").append("<div id='interval' style='display:none'>"+interval+"</div>");
	$('#idnoticia').val(id);
});

function ajustaDivs(){
	//determinaTop();
	var fechaActual=dameHMSActual();
	if(parseInt($('#carrusel').css('height').slice(0,-2))<parseInt($('#comentarios').css('height').slice(0,-2))){
		$('#carrusel').css('height',$('#comentarios').css('height'));
	}
	else{
		$('#comentarios').css('height',$('#carrusel').css('height'));
	}
}

function dameNoticia(id){
	$.get("servidorNoticias.php?action=dameNoticia&id="+id,function(data){
		var noticia=JSON.parse(data);
		$("#noticia").append("<center><h5>"+noticia["titulo"]+"</h5><img alt='"+noticia["titulo"]+"' src='"+noticia["imagen"]+"' class='imPila'></img><div id='texto'><label for='textoNoticia'>Cambia el texto y pulsa fuera del área para que se efectúen los cambios:</label><textarea id='textoNoticia' style='width:80%;height:200px' onblur='actualizaTexto()'>"+noticia["texto"]+"</textarea></div>\
		</center>");
	});
}

function dameCarrusel(){
	var id=dameIdNoticia();
	$.get("servidorNoticias.php?action=dameCarrusel&idnoticia="+id, function(data){
		var carrusel=JSON.parse(data);
		for (var i = 0, len = carrusel.length; i < len; i++){
			$("#listaFotos").append("<img alt='Imagen sobre la noticia' style='padding:15px' src='"+carrusel[i]["imagen"]+"'></img>");
		}
	});
}

function refrescarComentarios(){
	if($('#intervalComentarios').length){
		var antiguoInterval=$('#intervalComentarios').text();
		clearInterval(antiguoInterval);
		var nuevoInterval=setInterval(function(){paginacionComentarios(paginaActual)},$('#refrescoComentarios').val()*1000);
		$('#intervalComentarios').text(nuevoInterval);
	}
	else{
		$("body").append("<div id='intervalComentarios' style='display:none'></div>");
		var nuevoInterval=setInterval(function(){paginacionComentarios(paginaActual)},$('#refrescoComentarios').val()*1000);
		$('#intervalComentarios').text(nuevoInterval);
	}
	
}

function refrescar(){
	var antiguoInterval=$('#interval').text();
	clearInterval(antiguoInterval);
	var nuevoInterval=setInterval(refrescaNoticia,$('#refrescoNoticia').val()*1000);
	$('#interval').text(nuevoInterval);
}

function refrescaNoticia(){
	var fechaActual=dameHMSActual();
	console.log("Refresco Noticia a las "+fechaActual);
	var id=dameIdNoticia();
	$("#textoNoticia").remove();
	$.get("servidorNoticias.php?action=refrescaNoticia&id="+id,function(data){
		var noticia=JSON.parse(data);
		$("#noticia").append("<center><textarea id='textoNoticia' style='width:80%;height:200px' onblur='actualizaTexto()'>"+noticia["texto"]+"</textarea></center>");
	});
}

function dameIdNoticia(){
	//Obtiene id de la noticia a mostrar
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const id = urlParams.get('id');
	return id;
}

function identificarse(){
	var usuario=$("#usuario").val();
	var password=$("#password").val();
	var autenticacion=JSON.stringify({ usuario: usuario, password: password });
	$.post("servidorNoticias.php",{autenticacion:autenticacion,action:"autenticar"},function(data){
		console.log(data);
		if(data=="true"){
			$("div").remove(".formAutenticacion");
			//$("#formAutenticacion").remove();
			$("body").append("<center><div class='formAutenticacion' id='formAutenticacion' style='height:12.5%;'><h4 id='autenticado' style='margin-top:50px'>Estás autenticado como administrador</h4>\
			<div id='userIntroducido' style='display:none'>"+usuario+"</div><div id='passIntroducida' style='display:none'>"+password+"</div><br></div><center>");
		}
		else{
			alert("No has podido autenticarte como administrador");
		}
	});
}

/*function determinaTop(){
	var top=parseFloat($("#noticia").css("top").slice(0,-2))
	var height=parseFloat($("#noticia").css("height").slice(0,-2));
	var comienzo=top+height;
	$("#comentarios").css("top",comienzo+"px");
	$("#carrusel").css("top",comienzo+"px");
}*/

function nuevoComentarioSiEnterKey(){
	if(event.keyCode==13){
		nuevoComentario();
	}
}

function nuevoComentario(){
	var idnoticia=dameIdNoticia();
	var nombre=$("#nombre").val();
	$("#nombre").val("");
	var texto=$('textarea#texto').val();
	$('textarea#texto').val("");
	var obj={"idnoticia":idnoticia, "nombre":nombre, "texto":texto};
	var comentario=JSON.stringify(obj);
	
	$.post("servidorNoticias.php",{action:"nuevoComentario",comentario:comentario},function(data){
		console.log(data);
		if(data=="true"){
			alert("Comentario añadido con éxito");
			$("div").remove(".comentario");
			paginacionComentarios(1);
			//setTimeout(ajustaDivs,1000);
		}
		else{
			alert("Fallo al añadir el comentario...");
		}
	});
}

function actualizaTexto(){
	if($('#autenticado').length){
		var idnoticia=dameIdNoticia();
		var texto=$('textarea#textoNoticia').val();
		var noticia=JSON.stringify({ idnoticia: idnoticia, texto: texto });
		var usuario=$('#userIntroducido').text();
		var password=$('#passIntroducida').text();
		var autenticacion=JSON.stringify({ usuario: usuario, password: password });
		
		$.post("servidorNoticias.php",{action:"modificaNoticia",noticia:noticia,autenticacion:autenticacion},function(data){
			if(data=="true"){
				alert("Noticia modificada con éxito");
			}
			else{
				alert("Error modificando la noticia en BBDD");
			}
		});
	}
	else{
		alert("No puedes modificar el texto de la noticia, solo los admin pueden");
	}
}

function volver(){
	window.location.href="index.html";
}

function dameHMSActual(){
	var fecha = new Date();
	var hms = fecha.getHours() + ":" +fecha.getMinutes() + ":" + fecha.getSeconds();
	return hms;
}

function dameComentariosAjax(){
	var fechaActual=dameHMSActual();
	console.log("Refresco Comentario a las "+fechaActual);
	var idnoticia=dameIdNoticia();
     var result = null;
     $.ajax({
        url: "servidorNoticias.php?action=refrescaComentarios&idnoticia="+idnoticia,
        type: 'get',
        dataType: 'html',
		async: false,
        success: function(data) {
            result = JSON.parse(data);
        } 
     });
     return result;
}

function capturaEvento(){
	if(event.keyCode==13){
		if(document.activeElement){
			volver();
		}
	}
}

//--------------------------------PAGINACIÓN DE COMENTARIOS------------------------------


var paginaActual = 1;
var comentariosPorPagina = 3;

function paginaPrevia()
{
	paginaActual--;
	paginacionComentarios(paginaActual);
	ajustaDivs();
}

function paginaSiguiente()
{
	paginaActual++;
	paginacionComentarios(paginaActual);
	ajustaDivs();
}
    
function paginacionComentarios(pagina)
{
	var comentarios= dameComentariosAjax();
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var pagina_span = document.getElementById("pagina");
 

	$("div").remove(".comentario");
	var limite_iteracion=pagina * comentariosPorPagina;
	if(limite_iteracion>comentarios.length)limite_iteracion=comentarios.length;
	
    for (var i = (pagina-1) * comentariosPorPagina; i < (limite_iteracion); i++) {
		//console.log("itero");
        $("#listaComentarios").append("<div class='comentario'><p style='font-style:italic'>"+comentarios[i]["nombre"]+" publicó a las "+comentarios[i]["tiempo"]+"</p><p>"+comentarios[i]["texto"]+"</p></div>");
    }
	if(numPaginas(comentarios)==0){
		pagina_span.innerHTML = "";
	}
	else{
		pagina_span.innerHTML = "Página " +pagina+" de "+ numPaginas(comentarios);
	}

    if (pagina == 1 || numPaginas(comentarios)==0) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (pagina == numPaginas(comentarios) ||numPaginas(comentarios)==0) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
	setTimeout(ajustaDivs,500);
}

function numPaginas(comentarios)
{
    return Math.ceil(comentarios.length / comentariosPorPagina);
}
