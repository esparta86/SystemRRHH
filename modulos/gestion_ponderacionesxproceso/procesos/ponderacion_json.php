<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/ponderacion.class.php");

    $idem=$_REQUEST["ide"];
   

    $objponderacion=new ponderacion();
    if($objponderacion!=null){
			    	 if(!$objponderacion->open_con())
			    {
			    }
			    elseif ($objponderacion->open_con()) 
							    {
										    	$data=$objponderacion->ver_ponderaciones($idem);
										    	echo json_encode($data);
							    }
		}