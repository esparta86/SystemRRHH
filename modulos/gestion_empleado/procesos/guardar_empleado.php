<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/empleado.class.php");

$codigo_e=$_REQUEST["codigoempleado"];
$nombre=$_REQUEST['nombre_e'];
$apellido=$_REQUEST['apellido_e'];
$sex=$_REQUEST['sexo'];
$carg=$_REQUEST['cargo'];
$emai=$_REQUEST['email'];



$objEmpleado=new Empleado();

    if($objEmpleado!=null){//si se creo el objeto

			    	 if(!$objEmpleado->open_con())
			    {
			        
			        //NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE
			      
			    }
			    elseif ($objEmpleado->open_con()) 
							    {// "EXISTE UNA CONEXION A LA BD";

							    	/*VERIFICAR SI HAY UNA SUBCLASIFICACION CON EL MISMO NOMBRE*/
								
								$verifica=$objEmpleado->verificar_empleado($codigo_e);
									
									if($verifica!=0){//existe ya un nombre
										             $data1[]=array('bandera' =>3,'msg'=>'Existe un empleado con ese codigo . Ingrese una diferente' );

									}else{//Intentar registrar competencia
							                         
							                       $estado=$objEmpleado->guardar_empleado($codigo_e,$nombre,$apellido,$sex,$carg,$emai);
											         
											         if($estado){
											    		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se registro el nuevo empleado.');  

											    	}else{
											    		//unsuccefull
											    		 $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');


											    	}

											    	



							           }            
								    //print_r(json_encode($data1));

							    	echo json_encode($data1);
                                    


							    }
		}

?>


