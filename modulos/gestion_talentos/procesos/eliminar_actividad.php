<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/actividades.class.php");

$idC=$_REQUEST['id'];
$objactividades=new actividades ();
    if($objactividades!=null){//si se creo el objeto

			    	 if(!$objactividades->open_con())
			    {
		        
			    }
			    elseif ($objactividades->open_con()) 
							    {
						       	    $estado=$objactividades->eliminar_actividades($idC);
									       	    if($estado){
									       				$data1[] = array('bandera'=>1,'msg'=>'Exito, Se elimino la actividad.');  
								              }else{
									       		        $data1[] = array('bandera'=>2,'msg'=>'Sin Exito, No se elimino la actividad');  
									              }
							       echo json_encode($data1);
							    }
		}
