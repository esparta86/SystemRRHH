<?php
if (!isset($_SESSION)) { session_start(); }

$id_usuario=$_SESSION["id_usuario"];
$nombreUsuario=$_SESSION["nombreUsuario"];
$nombreEmpresa=$_SESSION["nombreE"];
$imageempresa="../../recursos/img/empresas/".$_SESSION["imagen"];
$empleado=$_SESSION["empleado"];

header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);

// HTTP/1.0 
header("Pragma: no-cache");
?>
<html>
<head>
<title>Reporte de evalauciones</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" href="../../recursos/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../../recursos/resources/css/style.css" />
<script type="text/javascript" src="../../recursos/js/ext-all.js"></script>
<script type="text/javascript" src="js/reporteEvDesempeno.js"></script> 
<style type="text/css">

.icon-userconfig {
background-image: url('../../recursos/img/group_gear.png');
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
color:#0000FF;"> <b>Bienvenido  </b>  <?php echo $empleado?>
<br>
</p>
<div>
		
		<p><CENTER> <img src="<?php echo $imageempresa; ?>" height="69"></CENTER></p>
			
		
		
</div>
<br>
	<center><div id="interfazrReporte1">

	</div></center>


	
</body>
</html>