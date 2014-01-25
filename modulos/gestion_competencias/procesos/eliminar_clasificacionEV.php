<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/areas_evaluaciond.class.php");
			
$clasificacion=$_REQUEST['nombre'];
$idC=$_REQUEST['id'];


$objArea=new AreaEV();

    if($objArea!=null){//si se creo el objeto

			    	 if(!$objArea->open_con())
			    {
			        
			        //NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE
			      
			    }
			    elseif ($objArea->open_con()) 
							    {// "EXISTE UNA CONEXION A LA BD";


							       /*VERIFICAR PRIMERAMENTE SI EXISTEN COMPETENCIAS QUE DEPENDEN DELA SUBCATEGORIA */
							       $verificar=$objArea->check_clasificacion($idC);

							       if($verificar!=0){//NO ES POSIBLE ELIMINAR EL DEPARTAMENTO

							       	        $data1[]=array('bandera'=>3,'msg'=>'NO, se elimino la clasificacion: '.$clasificacion.'. Elimine primero los COMPETENCIAS que dependen de la clasificacion.');

							       }else{//intentar eliminar

							       	    $estado=$objArea->eliminar_clasificacion($idC);

									       	    if($estado){//exito

									       				$data1[] = array('bandera'=>1,'msg'=>'Exito, Se elimino la clasificacion.');  
									              }else{
									              // sin exito
									       		        $data1[] = array('bandera'=>2,'msg'=>'Sin Exito, No se elimino la clasificacion : '.$clasificacion.'. Intente de nuevo');  
									              }




							       }
							       echo json_encode($data1);

							    }
		}
