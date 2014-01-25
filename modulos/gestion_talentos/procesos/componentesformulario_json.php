<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/opciones_empleado.class.php");

   $proceso=$_SESSION["id_realiza"];
   $codigoempleado=$_REQUEST["empleado"];
   $idcargo=$_REQUEST["idcargopc"];
   $opc=$_REQUEST["opcion"];
   $area=$_REQUEST["area_selec"];

     $objopcionesEmpleado=new opcionesEmpleado();
    if($objopcionesEmpleado!=null){//si se creo el objeto
			    	 if(!$objopcionesEmpleado->open_con())
			    {			       
			    }
			    elseif ($objopcionesEmpleado->open_con()) 
							    {
							    	$data=$objopcionesEmpleado->get_competenciasxArea($codigoempleado,$idcargo,$area);
							    	echo json_encode($data);
							    }
		}

