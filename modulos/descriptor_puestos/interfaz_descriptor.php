<?php
	//include("../conexiones/connection.php");
	
// HTTP/1.1
if (!isset($_SESSION)) { session_start(); }

$id_usuario=$_SESSION["id_usuario"];
$nombreUsuario=$_SESSION["nombreUsuario"];

header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);

// HTTP/1.0 
header("Pragma: no-cache");
?>
<html>
<head>
<title>SISTEMA DE RRHH</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" href="../../recursos/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../../recursos/resources/css/style.css" />
<script type="text/javascript" src="../../recursos/js/ext-all.js"></script>
 <script type="text/javascript" src="js/interfazDescriptor.js"></script> 


<style type="text/css">
.icon-save {
background-image: url('../../recursos/img/table_save.png');
background-repeat: no-repeat;
.x-tab-default-top ;
.x-tab-inner {
        height: 16px !important;
    }
}

.icon-datos {
background-image: url('../../recursos/img/database_lightning.png');
background-repeat: no-repeat;
.x-tab-default-top ;
.x-tab-inner {
        height: 16px !important;
    }
}

.icon-user_add {
background-image: url('../../recursos/img/user_add.png');
background-repeat: no-repeat;
.x-tab-default-top ;
.x-tab-inner {
        height: 16px !important;
    }
}



.icon-user_delete{
background-image: url('../../recursos/img/user_delete.png');
background-repeat: no-repeat;
.x-tab-default-top ;
.x-tab-inner {
        height: 16px !important;
    }
}


.icon-OK{
background-image: url('../../recursos/img/accept.png');
background-repeat: no-repeat;
.x-tab-default-top ;
.x-tab-inner {
        height: 16px !important;
    }
}


.icon-CANCEL{
background-image: url('../../recursos/img/cancel.png');
background-repeat: no-repeat;
.x-tab-default-top ;
.x-tab-inner {
        height: 16px !important;
    }
}
</style>




</head>

<body >

<p style="font-size:20px;
background-color:#DFE9F6;
color:#0000FF;"> BIENVENIDO : <b><?php echo $nombreUsuario; ?> </b><br>EL DESARROLLO DEL SISTEMA ESTA EN EJECUCION. ESTA INTERFAZ ES TEMPORAL
<br>

</p>

<div>
		
		<p><CENTER><FONT STYLE="color:#0000FF;font-size:24px;"><B>DESCRIPCION DE PUESTOS</B></FONT></CENTER></p>
		<br><!--espacios  -->
		
		
		
</div>
<br>
	<center><div id="interfazGestionAdmin">

	</div></center>


	
</body>
</html>