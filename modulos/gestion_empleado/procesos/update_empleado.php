<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/empleado.class.php");
    require_once("../../../recursos/class/competenciasxempleado.class.php");

$proceso=$_SESSION["id_realiza"];
$codigo_e=$_REQUEST["codigoempleado"];
$nombre=$_REQUEST['nombre_e'];
$apellido=$_REQUEST['apellido_e'];
$sex=$_REQUEST['sexo'];
$carg=$_REQUEST['cargo'];
$emai=$_REQUEST['email'];


$jefe_s=$_REQUEST["jefe"];
$evalua_jefe=$_REQUEST["evalua"];

$objEmpleado=new Empleado();
$objcompetenciasxEmpleado=new competenciasxEmpleado();


    if($objEmpleado!=null){//si se creo el objeto

			    	 if(!$objEmpleado->open_con())
			    {
			        
			        
			      
			    }
			    elseif ($objEmpleado->open_con()) 
							    {
							    	    
							    		/*obtener codigo de jefe anterior*/
							    		$codigoSuperior_antes=$objcompetenciasxEmpleado->get_codigo_superior($codigo_e,$proceso);
							    		$estado=$objEmpleado->modificar_empleado($codigo_e,$nombre,$apellido,$sex,$carg,$emai);
										if($estado){
											$codigoSuperior_despues=$objcompetenciasxEmpleado->get_codigo_superior($codigo_e,$proceso);

											  if($codigoSuperior_antes==$codigoSuperior_despues){
											  	/*nadd*/
											  }else{
											  		print_r("eliminar evaluador");

											  }
												if($evalua_jefe=='S'){/*evaluara al jefe.*/
							                       	//$estado2=$objcompetenciasxEmpleado->registrar_evaluar_empleado($codigo_e,$jefe_s,$proceso);
							                       }											  

											    		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se modifico el empleado.');  

											    	}else{
											    		//unsuccefull
											    		 $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');


											    	}
							                       
								    
							    	echo json_encode($data1);



							    }
		}




