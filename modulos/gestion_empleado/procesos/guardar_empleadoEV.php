<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/empleado.class.php");
    require_once("../../../recursos/class/competenciasxempleado.class.php");
    require_once("../../../recursos/class/ponderacionesxempleado.class.php");
$proceso=$_SESSION["id_realiza"];
$codigo_e=$_REQUEST["codigoempleado"];
$nombre=$_REQUEST['nombre_e'];
$apellido=$_REQUEST['apellido_e'];
$sex=$_REQUEST['sexo'];
$carg=$_REQUEST['cargo'];
$emai=$_REQUEST['email'];
$jefe_s=$_REQUEST["jefe"];
$evalua_jefe=$_REQUEST["evalua"];

$Pjefe=$_REQUEST["pjefe"];
$Pcolaboradores=$_REQUEST["pcolaboradores"];
$Pcoworker=$_REQUEST["pcoworker"];
$Ppersonal=$_REQUEST["ppersonal"];



$objEmpleado=new Empleado();
$objcompetenciasxEmpleado=new competenciasxEmpleado();
    if($objEmpleado!=null){//si se creo el objeto
			    	 if(!$objEmpleado->open_con())
			    {
			    }
			    elseif ($objEmpleado->open_con()) 
							    {
								$verifica=$objEmpleado->verificar_empleado($codigo_e);
									if($verifica!=0){//existe ya un nombre
										             $data1[]=array('bandera' =>3,'msg'=>'Existe un empleado con ese codigo . Ingrese una diferente' );
									}else{//Intentar registrar competencia
							                       $estado=$objEmpleado->guardar_empleadoEV($codigo_e,$nombre,$apellido,$sex,$carg,$emai,$jefe_s,$evalua_jefe);
							                      /*
							                       if($evalua_jefe=='S')
							                       	{
							                       	   $estado2=$objcompetenciasxEmpleado->registrar_evaluar_empleado($codigo_e,$jefe_s,$proceso);
							                        }
							                       /*el valor arbitrario  XX010101 se realiza para distinguir cuando sea evalaucion por plan de sucesion de carrera. */
							                       /*$estado3=$objcompetenciasxEmpleado->registrar_evaluar_empleado('XX010101',$codigo_e,$proceso);
							                       $estado4=$objcompetenciasxEmpleado->registrar_evaluar_empleado($jefe_s,$codigo_e,$proceso);
							                       $estado5=$objcompetenciasxEmpleado->registrar_evaluar_empleado($codigo_e,$codigo_e,$proceso);
										       */
											         if($estado)
											         {
											         	/*
											    		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se registro el nuevo empleado.');  
											    		if(isset($estado2))
											    		{
											    		  if($estado2==1||$estado3==1||$estado4==1||$estado5==1)
											    		    {
										    			         $data1[] = array('bandera'=>1,'msg'=>'Exito, Se registro el nuevo empleado,pero hubo un error en el registro de los evaluadores.');  	
											    	     	}
											    	     }*/
											    	    /*se registra las ponderaciones*/
													    if($Pjefe!=0||$Pcoworker!=0||$Pcolaboradores!=0||$Ppersonal!=0)
											    	    {
															$objponderacionesxempleado=new ponderacionesXempleado();
															if($objponderacionesxempleado->guardar_ponderacionesxempleado($Pjefe,$Pcoworker,$Pcolaboradores,$Ppersonal,$codigo_e)){
																$data1[] = array('bandera'=>1,'msg'=>'Exito, Se registro el nuevo empleado.');  
															  }else{
															  	$data1[] = array('bandera'=>1,'msg'=>'Exito, No se registraron las ponderaciones.');  
															  }
											    	    }											    	     

											    	  }
											    	  else
											    	  {
											    		         $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');
											    	  }

							           }            
							    	echo json_encode($data1);
							    }
		}


