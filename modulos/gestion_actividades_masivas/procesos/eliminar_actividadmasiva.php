<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/actividadesMasivas.class.php");

$idM=$_REQUEST['id'];
$objactividadesMasivas=new actividadesMasivas();
    if($objactividadesMasivas!=null){//si se creo el objeto

			    	 if(!$objactividadesMasivas->open_con())
			    {
		        
			    }
			    elseif ($objactividadesMasivas->open_con()) 
							    {
						       	    $estado=$objactividadesMasivas->eliminar_actividadesMasiva($idM);
									       	    if($estado){
									       				$data1[] = array('bandera'=>1,'msg'=>'Exito, Se elimino la actividad.');  
								              }else{
									       		        $data1[] = array('bandera'=>2,'msg'=>'Sin Exito, No se elimino la actividad');  
									              }
							       echo json_encode($data1);
							    }
		}
