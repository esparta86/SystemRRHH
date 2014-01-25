<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/temasxarea.class.php");
    

/*IDENTIFICAR PROCESO 
Y EL EMPLEADO 
PARA MOSTRAR LOS CARGOS RESPECTIVOS*/
   $proceso=$_SESSION["id_realiza"];
   $id=$_REQUEST["id_area_a"];
   $objtemasxarea=new temasxarea();
    if($objtemasxarea!=null){//si se creo el objeto
			    	 if(!$objtemasxarea->open_con())
			    {
	    
			    }
			    elseif ($objtemasxarea->open_con()) 
						    {
							    	$data=$objtemasxarea->get_temaxarea($id);
							    	echo json_encode($data);
							    }
		}
