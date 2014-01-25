<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/empleado.class.php");
    require_once("../../../recursos/class/competenciasxempleado.class.php");
    require_once("../../../recursos/class/ponderacionesxempleado.class.php");

$codigo_e=$_REQUEST["codigoempleado"];
$nombre=$_REQUEST['nombre_e'];
$apellido=$_REQUEST['apellido_e'];
$sex=$_REQUEST['sexo'];
$carg=$_REQUEST['cargo'];
$emai=$_REQUEST['email'];
$jefe_s=$_REQUEST["jefe"];
$evalua_jefe=$_REQUEST["evalua"];
$id_realiza=$_SESSION["id_realiza"];

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
							    {// "EXISTE UNA CONEXION A LA BD";
										/*obtengo el codigo del superior antes*/
										$codigosuperiorbefore=$objcompetenciasxEmpleado->get_codigo_superior($codigo_e,$id_realiza);
							            $estado=$objEmpleado->modificar_empleadoEV($codigo_e,$nombre,$apellido,$sex,$carg,$emai,$jefe_s,$evalua_jefe);
										
										  if($estado)
											       {

											         	/*obtener el codigo del superior despues */
											      /*   	$codigosuperiorafter=$objcompetenciasxEmpleado->get_codigo_superior($codigo_e,$id_realiza);
											         $eliminar=true;
											         	if($codigosuperiorbefore==$codigosuperiorafter){		
															
											         	}else{
											         		 if($objcompetenciasxEmpleado->eliminar_evaluador($codigo_e,$codigosuperiorbefore)){
											         		 }else{
											         		 	//print_r("no se elimino el empleado como evaluador del anterior jefe");
											         		 	$eliminar=false;
											         		 }
															if($objcompetenciasxEmpleado->eliminar_evaluador($codigosuperiorbefore,$codigo_e)){
											         		 }else{
											         		 	//print_r("no se elimino el jefe anterior como evaluador del empleado");
											         		 	$eliminar=false;
											         		 }	
											         		// $estado5=$objcompetenciasxEmpleado->eliminar_companeros($codigo_e);										         		 
							                       			 
											         	}
											         	$estado6=$objcompetenciasxEmpleado->registrar_evaluar_empleado($codigo_e,$codigo_e,$id_realiza);
											         	$estado3=$objcompetenciasxEmpleado->registrar_evaluar_empleado('XX010101',$codigo_e,$id_realiza);
											         	$estado7=$objcompetenciasxEmpleado->registrar_evaluar_empleado($jefe_s,$codigo_e,$id_realiza);
											    		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se modifico el empleado.');  
											    		     if(!$eliminar){
											    		     	$data1[] = array('bandera'=>1,'msg'=>'Exito, Se modifico el empleado, pero hubo un problema en la actualizacion de su jefe superior.');  
											    		         }
                                                    */
											    		      /* si cambio de SI A NO solamente*/
											    	/*	      if($evalua_jefe=="S"){
											    		      	/* registrarlo el  como evaluador del jefe. */
											    	/*	      	   $estado2=$objcompetenciasxEmpleado->registrar_evaluar_empleado($codigo_e,$jefe_s,$id_realiza);
											    		      }else{
											    		      	/*eliminar el actual */
											    	/*	      	$objcompetenciasxEmpleado->eliminar__registro_jefe($codigo_e,$id_realiza);
											    		      }
											        */

														if($Pjefe!=0||$Pcoworker!=0||$Pcolaboradores!=0||$Ppersonal!=0)
														{
											    	    	$objponderacionesxempleado=new ponderacionesXempleado();
															if($objponderacionesxempleado->modificar_ponderacionesxempleado($Pjefe,$Pcoworker,$Pcolaboradores,$Ppersonal,$codigo_e))
															  {
																$data1[] = array('bandera'=>1,'msg'=>'Exito, Se actualizo nuevo empleado.');  
															  }else{
															  	$data1[] = array('bandera'=>1,'msg'=>'Exito, No se registraron las ponderaciones.');  
															  }
											    	    }											    		      




											    	}else{
											    		
											    		 $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');
	     										    	 }
							                       
								    
							    	echo json_encode($data1);



							    }
		}




?>