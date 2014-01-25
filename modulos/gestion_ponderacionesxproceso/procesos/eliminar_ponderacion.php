<?php
session_start();
     require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/ponderacion.class.php");

$idp=$_REQUEST["id"];

$objponderacion=new ponderacion();
    if($objponderacion!=null){//si se creo el objeto
			    	 if(!$objponderacion->open_con())
			    {  }
			    elseif ($objponderacion->open_con()) 
							    {            
							     $estado=$objponderacion->eliminar_ponderacion($idp);
											         
								       switch ($estado) {
								       	case 1:
								       		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se elimino la ponderacion.');  
								       		break;
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se elimino ! intente de nuevo.');
								       	     break;
								       	}
							    	echo json_encode($data1);
							    }
		}
