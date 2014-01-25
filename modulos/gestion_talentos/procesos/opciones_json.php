<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/opciones_empleado.class.php");

/*IDENTIFICAR PROCESO Y EL EMPLEADO PARA MOSTRAR LA OPCION*/
   $proceso=$_SESSION["id_realiza"];
   $empleado=$_REQUEST["codigoempleado"];
   $opc=$_REQUEST["opcion"];
   $objopcionesEmpleado=new opcionesEmpleado();
    if($objopcionesEmpleado!=null){//si se creo el objeto
			    	 if(!$objopcionesEmpleado->open_con())
			    {
			    }
			    elseif ($objopcionesEmpleado->open_con()) 
							    {
							    	$data=$objopcionesEmpleado->get_opcionEmpleado($empleado,$opc);
							    	echo json_encode($data);
							    }
		}
