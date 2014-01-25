<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    


/*IDENTIFICAR PROCESO PARA MOSTRAR LOS DEPARTAMENTOS RESPECTIVOS*/
   $proceso=$_SESSION["id_realiza"];
   $idproceso=$_SESSION["idproceso"];

   if($idproceso==5){/*proceso plan de seguimiento de carrera*/
   $data1[]=array('bandera'=>1);
   }else{

   	$data1[]=array('bandera'=>0);
   }

echo json_encode($data1);    



?>