<?php

/* Parámetros de conexión con la base de datos. */
define('HOST', 'localhost');
define('USER', 'user_ejercicio');
define('PASS', 'pass_ejercicio');
define('DBASE', 'db_ejercicio');

/*@AdministratorPassword33 */

class BaseDatos {
    
    private $conn;

    /**
     * Nuevo intento de conexión con el sistema.
     */
    public function __construct() {
        $this->conn = new mysqli(HOST, USER, PASS, DBASE);
        if ($this->conn->connect_errno) {
            throw new Exception("Error de conexión con la base de datos");
        }
    }

	//Devuelve carrusel de imagenes
	public function dameCarrusel(string $idnoticia){
		$mensajes = [];
		$sql="SELECT imagen FROM carrusel where idnoticia=$idnoticia";
        $query = $this->conn->query($sql);
        while ($row = $query->fetch_assoc()) {
            array_push($mensajes, $row);
        }
        return $mensajes;
	}

    /**
     * Autenticación -modificado recibiendo json-
     */
    public function autenticar(string $json):string {
		$autenticacion = json_decode($json,true);
        $usuario=$autenticacion['usuario'];
        $password=$autenticacion['password'];
        $mensajes = [];
	    $sql = "select password from login where usuario = '$usuario' && password = '$password';";
        return $query = $this->conn->query($sql)->num_rows > 0 ? "true" : "false";
    }

	/**
     * Devuelve noticia por su id
     */
    public function dameNoticia(string $id):array {
		$sql = "select * from noticias where id=$id";
        $query = $this->conn->query($sql);
		$row = $query->fetch_assoc();
		return $row;
    }

    /**
     * Edición de la noticia -modificado recibiendo json-
     */
    public function modificaNoticia(string $json):bool {
		$noticia = json_decode($json,true);
        $id=$noticia['idnoticia'];
        $texto=$noticia['texto'];
		$query = "update noticias SET texto=? WHERE id=?";
        $stmt = $this->conn->prepare($query);
		$stmt->bind_param('si', $texto, $id);
        return $stmt->execute();
    }
	
    /**
     * Refresco de la noticia -por id y solo devolviendo el texto que es lo que nos interesa-
     */
    public function refrescaNoticia(string $id):array {
        $mensajes = [];
		$sql="SELECT texto FROM noticias WHERE id=$id";
        $query = $this->conn->query($sql);
        $row = $query->fetch_assoc();
        return $row;
    }
	
	public function dameNoticias():array {
        $mensajes = [];
		$sql="SELECT * FROM noticias";
        $query = $this->conn->query($sql);
        while ($row = $query->fetch_assoc()) {
            array_push($mensajes, $row);
        }
        return $mensajes;
    }

    /**
     * Refresco de los comentarios -modificada con idnoticia-
     */
    public function refrescaComentarios(int $idnoticia):array {
        $mensajes = [];
		$sql="SELECT * FROM comentarios WHERE noticia=$idnoticia ORDER BY tiempo DESC LIMIT 10";
        $query = $this->conn->query($sql);
        while ($row = $query->fetch_assoc()) {
            array_push($mensajes, $row);
        }
        return $mensajes;
    }
	
	
    /**
     * Nuevo Comentario -modificado con idnoticia i nombre anónimo-
     */
    public function nuevoComentario(string $json):bool {
		$comentario = json_decode($json,true);
        $nombre=$comentario['nombre'];
		if($nombre=="")$nombre="Anónimo";
        $texto=$comentario['texto'];
		$idnoticia=$comentario['idnoticia'];
		$tiempo=date ("Y-m-d H:i:s", time());
        $query = "INSERT INTO comentarios(noticia, nombre, texto, tiempo) VALUES(?, ?, ?, ?)";		
        $stmt = $this->conn->prepare($query);
		$stmt->bind_param('isss', $idnoticia, $nombre, $texto, $tiempo);
        return $stmt->execute();
    }
	
	/**
     * Nueva Noticia
     */
    public function nuevaNoticia(string $titulo,string $texto,string $tmp_name,string $name):bool {
		$imagen="im/".$name;
		move_uploaded_file($tmp_name,$imagen);
        $query = "INSERT INTO noticias(titulo, imagen, texto) VALUES(?, ?, ?)";		
        $stmt = $this->conn->prepare($query);
		$stmt->bind_param('sss', $titulo, $imagen, $texto);
        return $stmt->execute();
    }
	
	/**
     * Nuevas Imágenes carrusel
     */
    public function nuevasImagenes(array $files,string $idnoticia):bool {
		/*echo "<pre>";
		print_r($files);*/
		foreach ($files as $file){
			$imagen="im/".$idnoticia."/".$file['name'];
			$path = "im/".$idnoticia."/";
			if (!is_dir($path)) {
				mkdir($path);
			}
			move_uploaded_file($file['tmp_name'],$imagen);
			$query = "INSERT INTO carrusel(idnoticia, imagen) VALUES(?, ?)";		
			$stmt = $this->conn->prepare($query);
			$stmt->bind_param('ss', $idnoticia, $imagen);
			$ret=$stmt->execute();
			if(!$ret) return false;
		}
		return true;
    }
	
}

$db = new BaseDatos();


/* Autenticación. */
if (isset($_POST['action']) && $_POST['action'] === "autenticar") {
	print $db->autenticar($_POST['autenticacion']);
}


/* Modificación de la noticia. */
if (isset($_POST['action']) && $_POST['action'] === "modificaNoticia") {
	if($db->autenticar($_POST['autenticacion']) == "true"){
		if (!$db->modificaNoticia($_POST['noticia'])) {
			http_response_code(400);
			die("{ 'status': 'error' }");
		} else {
			print("true");
		}
	}
}

/* Nueva Noticia. */
if (isset($_POST['action']) && $_POST['action'] === "nuevaNoticia") {
	if (!$db->nuevaNoticia($_POST['titulo'],$_POST['texto'],$_FILES['imagen']["tmp_name"],$_FILES['imagen']["name"])) {
		echo "<script> alert('Algo fue mal insertando la noticia...'); 
		window.location.replace('http://localhost/noticias/crearNoticia.html');</script>";
	} else {
		echo "<script> alert('Noticia añadida correctamente'); 
		window.location.replace('http://localhost/noticias/');</script>";
	}
}

/* Nuevas Imágenes carrusel. */
if (isset($_POST['action']) && $_POST['action'] === "nuevasImagenes") {
	extract($_POST);
	//echo "<pre>"; print_r( $_FILES['imagenes']);
	$files=reordena($_FILES['imagenes']);
	//echo "<pre>"; print_r( $files);
	if (!$db->nuevasImagenes($files,$_POST['idnoticia'])) {
		echo "<script> alert('Algo fue mal insertando la/las imagenes en BBDD...'); 
		window.location.replace('http://localhost/noticias/noticia.html?id=$idnoticia');</script>";
	} else {
		echo "<script> alert('Imagen/es añadidas correctamente'); 
		window.location.replace('http://localhost/noticias/noticia.html?id=$idnoticia');</script>";
	}
}

/* Nuevo Comentario. */
if (isset($_POST['action']) && $_POST['action'] === "nuevoComentario") {
	if (!$db->nuevoComentario($_POST['comentario'])) {
		http_response_code(400);
		die("{ 'status': 'error' }");
	} else {
		print("true");
	}
}

/* Devuelve noticia por id */
if (isset($_GET['action']) && $_GET['action'] === "dameNoticia") {	
	print json_encode($db->dameNoticia($_GET['id']));
}

/* Refresco de la noticia. */
if (isset($_GET['action']) && $_GET['action'] === "refrescaNoticia") {	
	print json_encode($db->refrescaNoticia($_GET['id']));
}

if (isset($_GET['action']) && $_GET['action'] === "dameNoticias") {	
	print json_encode($db->dameNoticias());
}


/* Refresco de los comentarios. */
if (isset($_GET['action']) && $_GET['action'] === "refrescaComentarios") {	
	print json_encode($db->refrescaComentarios($_GET['idnoticia']));
}

/* Dame carrusel de fotografías por id noticia */
if (isset($_GET['action']) && $_GET['action'] === "dameCarrusel") {	
	print json_encode($db->dameCarrusel($_GET['idnoticia']));
}

function reordena($arr){
    foreach($arr as $key => $all){
        foreach($all as $i => $val){
            $new[$i][$key] = $val;   
        }   
    }
    return $new;
}

?>