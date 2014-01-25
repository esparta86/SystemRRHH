<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/actividadesMasivas.class.php");

   $proceso=$_SESSION["id_realiza"];
   $area=$_REQUEST['idarea'];
   $objactividadesMasivas=new actividadesMasivas();
    if($objactividadesMasivas!=null){
			    	 if(!$objactividadesMasivas->open_con())
			    {
			        
			    }
			    elseif ($objactividadesMasivas->open_con()) 
							    {
							    	$data=$objactividadesMasivas->get_actividadesMasivas($proceso,$area);
							    	echo json_encode($data);
							    }
		}
