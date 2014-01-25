<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/competenciasxempleado.class.php");


$id_realiza=$_SESSION["id_realiza"];
$evaluador=$_SESSION["codigoEmpleado"];
$competencias_evaluadas=json_decode(stripcslashes($_REQUEST['evaluacion']),true);
$codigo_empleado_evaluado=$_REQUEST["codigoe"];


$objcompetenciasxEmpleado=new competenciasxEmpleado();
    if($objcompetenciasxEmpleado!=null){//si se creo el objeto
			    	 if(!$objcompetenciasxEmpleado->open_con())
			    {
			    }
			    elseif ($objcompetenciasxEmpleado->open_con()) 
							    {// "EXISTE UNA CONEXION A LA BD";
 														$estado=true;
 														foreach ($competencias_evaluadas as $item=>$valor) {//GUARDAR CADA PONDERACION
											    	     		$ponderacion=explode("_",$valor);
											    	     		     if(!$objcompetenciasxEmpleado->guardar_evaluacionxempleadoPLAN($ponderacion[0],$codigo_empleado_evaluado,$ponderacion[1]))
							                                           $estado=false;							                                      

							    						            }	
							    						   if($estado==true){
							 
							    						   			$data1[] = array('bandera'=>1,'msg'=>'Exito, Perfecto. Se registro la evaluacion. ');  

							    						       }else{
							    						       	$data1[] = array('bandera'=>2,'msg'=>'No se actualizaron los valores deseables ! intente de nuevo.');
							    						       }					    	
								    
							    	echo json_encode($data1);
							    }
		}
