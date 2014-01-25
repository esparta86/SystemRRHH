<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/empleado.class.php");

   $proceso=$_SESSION["id_realiza"];
    $objEmpleado=new Empleado();
    if($objEmpleado!=null){//si se creo el objeto
			    	 if(!$objEmpleado->open_con())
			    {
			    }
			    elseif ($objEmpleado->open_con()) 
							    {
							    	$data=$objEmpleado->ver_empleados($proceso);
							    	echo json_encode($data);
							    }
		}