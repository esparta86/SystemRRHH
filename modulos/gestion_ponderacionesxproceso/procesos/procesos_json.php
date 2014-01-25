<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/procesos.class.php");
    $objProceso=new Proceso();
    if($objProceso!=null){
			    	 if(!$objProceso->open_con())
			    {
			    }
			    elseif ($objProceso->open_con()) 
							    {
										    	$data=$objProceso->ver_procesos_evaluacion();
										    	echo json_encode($data);
							    }
		}
