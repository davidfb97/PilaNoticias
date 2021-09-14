$(document).ready(function() {
	$.get("servidorNoticias.php?action=dameNoticias",function(data){
		//console.log(data);
		var pila= JSON.parse(data);
		var top=8;
		var left=40;
		var index=1;
		for (var i = 0, len = pila.length; i < len; i++){
			//console.log(pila[i]["texto"]);
			//$("#pila" ).append( "<div id='noticia' class='col-lg-2 mt-5 justify-content-center pila zoom' style='margin:20px;'><h5 style='text-align:center'>"+pila[i]["titulo"]+"</h5><div class='row justify-content-center'><img src='"+pila[i]["imagen"]+"' class='imPila'></img></div><p>"+pila[i]["texto"]+"</p></div>" );
			$("#pila" ).append( "<div tabindex='0' id='n"+i+"' name='"+pila[i]["id"]+"' class='pila' onfocus='MouseOver(this)' onfocusout='MouseOut(this)' onkeypress='capturaEvento(this.id)' onmouseover='MouseOver(this);' onmouseout='MouseOut(this);' onclick='navega(this.id)'><center><h5>"+pila[i]["titulo"]+"</h5></center><div class='row justify-content-center'><img alt='"+pila[i]["titulo"]+"' src='"+pila[i]["imagen"]+"' class='imPila'></img></div><p>"+pila[i]["texto"]+"</p></div>" );
			$("#pila" ).append("<div id='indexn"+i+"' style='display:none'></div>");
			//left+=15;
		}
		$("#pila" ).append("<div id='lenPila' style='display:none'>"+pila.length+"</div>");
		poneLeftTopRotaZIndex(pila.length);
		
	});
});

function MouseOver(elem) {
	var id=elem.id;
	var zindex=$("#"+id).css("z-index");
	//console.log(id);
	$("#index"+id).text(zindex);
	$("#"+id).css("z-index",999);
	$("#"+id).css({ transform: 'scale(1.15)' });
}

function MouseOut(elem) {
	var id=elem.id;
	var zindex = document.getElementById("index"+id).innerHTML;
	var lenPila = document.getElementById("lenPila").innerHTML;
	$("#"+id).css("z-index",zindex);
	$("#"+id).css({ transform: 'scale(1)' });
	poneLeftTopRotaZIndex(lenPila);
}



function poneLeftTopRotaZIndex(longitud){
	var mitad=Math.trunc(longitud/2);
	var deg=0;
	var top=8;
	var left=40;
	var index=longitud;
	for(i=mitad; i<longitud;i++){
		$("#n"+i).css({ transform: "rotate("+deg+"deg)" });
		$("#n"+i).css("top",top+"%");
		$("#n"+i).css("left",left+"%");
		$("#n"+i).css("z-index",index);
		index--;
		left+=10;
		deg+=15; top+=4;
	}
	var left=30;
	if(longitud%2==0){ var deg=0; top=8;var index=longitud;}
	else {var deg=-15;top=12;var index=longitud-1;}
	for(i=mitad-1; i>=0;i--){
		$("#n"+i).css({ transform: "rotate("+deg+"deg)" });
		$("#n"+i).css("top",top+"%");
		$("#n"+i).css("left",left+"%");
		$("#n"+i).css("z-index",index);
		index--;
		left-=10;
		deg-=15; top+=4;
	}
}

function navega(id){
	var idNoticia=$("#"+id).attr("name");
	window.location.href="noticia.html?id="+idNoticia;
}

function capturaEvento(id){
	if(event.keyCode==13){
		if(document.activeElement){
			navega(id);
		}
	}
}

function nuevaNoticia(){
	window.location.href="crearNoticia.html";
}