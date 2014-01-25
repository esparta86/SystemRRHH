<?php
	//include("../conexiones/connection.php");
	
// HTTP/1.1
if (!isset($_SESSION)) { session_start(); }

$id_usuario=$_SESSION["id_usuario"];
$nombreUsuario=$_SESSION["nombreUsuario"];
$nombreEmpresa=$_SESSION["nombreE"];
$imageempresa="../../recursos/img/empresas/".$_SESSION["imagen"];
$nombreProceso=$_SESSION["nombreP"];

header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);

// HTTP/1.0 
header("Pragma: no-cache");
?>
<html>
<head>
<title>Formulario de evaluacion</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" href="../../recursos/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../../recursos/resources/css/style.css" />
<script type="text/javascript" src="../../recursos/js/ext-all.js"></script>
<script type="text/javascript" src="js/interfazMasivos.js"></script>

<style type="text/css">

.icon-key{
background-image: url('../../recursos/img/key.png');
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


.icon-analyse{
background-image: url('../../recursos/img/resultset_next.png');
background-repeat: no-repeat;
.x-tab-default-top ;
.x-tab-inner {
        height: 16px !important;
    }
}


.icon-deleteEmpleado{
background-image: url('../../recursos/img/group_delete.png');
background-repeat: no-repeat;
.x-tab-default-top ;
.x-tab-inner {
        height: 16px !important;
    }
}


.icon-refresh{
background-image: url('../../recursos/img/arrow_refresh.png');
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

.icon-addAct{
background-image: url('../../recursos/img/add.png');
background-repeat: no-repeat;
.x-tab-default-top ;
.x-tab-inner {
        height: 16px !important;
    }
}

.icon-delAct{
background-image: url('../../recursos/img/delete.png');
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
color:#0000FF;"> BIENVENIDO : <b><?php echo $nombreUsuario; ?> </b>
<br>

</p>

<div>
		
		<p><CENTER> <img src="<?php echo $imageempresa; ?>" height="69"> <br><FONT STYLE="color:#0000FF;font-size:24px;"><B> <?php /*echo $nombreProceso; */?> FORMULARIO MASIVO DE ACTIVIDADES DE: <?php echo $nombreEmpresa?></B></FONT></CENTER></p>
		<br><!--espacios  -->
		
		
		
</div>
<br><center>
	<div id="interfazFormMasivo">

	</div>
</center>

	
</body>
</html>