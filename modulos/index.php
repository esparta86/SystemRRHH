<?php
	//include("../conexiones/connection.php");
	
// HTTP/1.1

if (!isset($_SESSION)) { session_start(); }

$id_usuario=$_SESSION["id_usuario"];
$nombreUsuario=$_SESSION["nombreUsuario"];
$nombreEmpresa=$_SESSION["nombreE"];
$nombreProceso=$_SESSION["nombreP"];
$nombreDpto=$_SESSION["nombreDpto"];

header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);

// HTTP/1.0 
header("Pragma: no-cache");
?>	
<html>
<head>
<title>SISTEMA DE GESTION DE COMPETENCIAS DE RRHH</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!--
<link rel="stylesheet" type="text/css" href="recursos/resources/index.css" />
<link rel="stylesheet" type="text/css" href="recursos/resources/css/ext-all.css" />
<script type="text/javascript" src="recursos/js/ext-all.js"></script>
actualizar los enlaces luego -->



</head>

<body >

<p style="font-size:20px;
background-color:#DFE9F6;
color:#0000FF;"> BIENVENIDO : <b><?php echo $nombreUsuario; ?> UD PERTENCE A :<?php echo $nombreEmpresa; ?> DEPARTAMENTO : <?php echo $nombreDpto; ?>
 </b><br>EL DESARROLLO DEL SISTEMA ESTA EN EJECUCION. ESTA INTERFAZ ES TEMPORAL</p>
 <br>PROCESO : <?php echo $nombreProceso;?>

<br>
<br>
<p>  <hr>
	<h4><a href="gestion_competencias/gestionCompetencias.php" target="_blank"> 1. GESTIONAR COMPETENCIAS PLAN DE SUCESION DE CARRERA</a></h4>
	<h4><a href="gestion_competencias/gestionCompetenciasEV.php" target="_blank"> 2. GESTIONAR COMPETENCIAS EVALUACION DEL DESEMPEÑO</a></h4>
	<h4><a href="gestion_g_ocupacional/gestionGO.php" target="_blank"> 3. GESTION DE GRUPOS OCUPACIONALES (EVALUACION DEL DESEMPEÑO) </a></h4>
	<h4><a href="gestion_departamento/gestionDpto.php" target="_blank"> 4. GESTIÓN DE DEPARTAMENTOS</a></h4>
	<h4><a href="gestion_empleado/gestionEmpleado.php" target="_blank"> 5. GESTIÓN DE EMPLEADOS.</a></h4>
	<h4><a href="gestion_puestos/gestionPuestosEV.php" target="_blank"> 6. GESTIÓN DE PUESTOS.</a></h4>
	<h4><a href="gestion_empresas/gestionEmpresas.php" target="_blank"> 7. GESTIÓN DE EMPRESAS</a></h4>
	<h4><a href="Form_empleados.php" target="_blank"> 8. GESTIÓN DE USUARIOS DEL SISTEMA</a></h4>
	<hr>
</p>
	
</body>
</html>