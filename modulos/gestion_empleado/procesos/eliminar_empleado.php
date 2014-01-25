<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/empleado.class.php");
			
$empleado=$_REQUEST['nombre'];
$ide=$_REQUEST['id'];
$objEmpleado=new Empleado();
    if($objEmpleado!=null){//si se creo el objeto
			    	 if(!$objEmpleado->open_con())
			    {
			    }
			    elseif ($objEmpleado->open_con()) 
							    {
									$verificar=0;
							       if($verificar!=0){//NO ES POSIBLE ELIMINAR EL EMPLEADO
							       	        $data1[]=array('bandera'=>3,'msg'=>'NO, se elimino el empleado: '.$empleado.'. Depende.');

							       }else{//intentar eliminar

							       	    $estado=$objEmpleado->eliminar_empleado($ide);

									       	    if($estado){//exito

									       				$data1[] = array('bandera'=>1,'msg'=>'Exito, Se elimino el empleado:'.$empleado.' con exito');  
									              }else{
									              // sin exito
									       		        $data1[] = array('bandera'=>2,'msg'=>'Sin Exito, No se elimino el usuario : '.$empleado.'. Intente de nuevo');  
									              }




							       }
							       echo json_encode($data1);

							    }
		}
