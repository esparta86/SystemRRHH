<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/areasxactividad.class.php");
    

/*IDENTIFICAR PROCESO 
Y EL EMPLEADO 
PARA MOSTRAR LOS CARGOS RESPECTIVOS*/
   $proceso=$_SESSION["id_realiza"];
   $id=$_REQUEST["idareaxactividad"];
   $objareasxActividad=new areasxActividad();
    if($objareasxActividad!=null){//si se creo el objeto
			    	 if(!$objareasxActividad->open_con())
			    {
	    
			    }
			    elseif ($objareasxActividad->open_con()) 
						    {
							    	$data=$objareasxActividad->get_areas_a($id);
							    	echo json_encode($data);
							    }
		}
