<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/empleado.class.php");
/*IDENTIFICAR PROCESO PARA MOSTRAR LOS DEPARTAMENTOS RESPECTIVOS*/
   $proceso=$_SESSION["id_realiza"];
   $jefe=$_REQUEST["codigoJefe"];
   $codigoEval=$_REQUEST["codigoEva"];

    $objEmpleado=new Empleado();

    if($objEmpleado!=null){

			    	 if(!$objEmpleado->open_con())
			    {
			        
			    }
			    elseif ($objEmpleado->open_con()) 
							    {
							      	$data=$objEmpleado->listar_coworkers($proceso,$jefe,$codigoEval);
   
							    	echo json_encode($data);
							    }
		}
