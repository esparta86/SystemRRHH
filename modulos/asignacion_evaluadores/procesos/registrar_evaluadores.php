<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/competenciasxempleado.class.php");

$id_realiza=$_SESSION["id_realiza"];
$codigoempleado=$_REQUEST['codigo_empleado'];
$evaluadores_asociadas=json_decode(stripcslashes($_REQUEST['evaluadores']),true);
$evaluados_asociadas=json_decode(stripcslashes($_REQUEST['evaluados']),true);
$evaluador_externo=$_REQUEST["codigoe_externo"];
$evaluado_externo=$_REQUEST["codigoe_externo2"];
$objcompetenciasxempleado=new competenciasxEmpleado();

   if($objcompetenciasxempleado!=null){//si se creo el objeto

			    	 if(!$objcompetenciasxempleado->open_con())
			    {
			    }
			    elseif ($objcompetenciasxempleado->open_con()) 
							    {
							   $bandera=$objcompetenciasxempleado->registrarEvaluadores($codigoempleado,$evaluadores_asociadas,$id_realiza,$evaluador_externo,$evaluados_asociadas,$evaluado_externo);
						       switch ($bandera) {
						       	case 0:
						       	    $data1[] = array('bandera'=>1,'msg'=>'Exito, Se aplicaron los nuevos cambios.');  
						       		break;
						       	case 1:
						       	    $data1[] = array('bandera'=>2,'msg'=>'Se completo con errores!!, Hubo un problema en la eliminacion de los anteriores evaluadores.Si persiste contacte al administrador del sistema.');  
						       	    break;
						       	 case 2:
						       	  $data1[] = array('bandera'=>3,'msg'=>'Se completo con errores!! Hubo un problema en el ingreso del nuevo evaluador.');  
   						       	   break;
						       	 case 3:
						       	 $data1[] = array('bandera'=>4,'msg'=>'Se completo con errores!! hubo un problema al agregar al jefe superior.');  
						       	   break;
						       	 case 4:
						       	 $data1[] = array('bandera'=>5,'msg'=>'Se completo con errores!! hubo un problema al auto agregarse el evaluador.');  
						       	     break;
						       	 case 5:
						       	 $data1[] = array('bandera'=>6,'msg'=>'Se completo con errores!! hubo un problema al agregar los evaluados.');  
						       	     break;						       	
						       }
							    echo json_encode($data1);
						    }
		}




