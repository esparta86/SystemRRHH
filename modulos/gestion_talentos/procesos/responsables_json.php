<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/cargo.class.php");
    

/*IDENTIFICAR PROCESO 
Y EL EMPLEADO 
PARA MOSTRAR LOS CARGOS RESPECTIVOS*/
   $proceso=$_SESSION["id_realiza"];
   
   $objcargo=new cargo();
    if($objcargo!=null){//si se creo el objeto
			    	 if(!$objcargo->open_con())
			    {
	    
			    }
			    elseif ($objcargo->open_con()) 
						    {
							    	$data=$objcargo->cargos_responsables($proceso);
							    	echo json_encode($data);
							    }
		}
