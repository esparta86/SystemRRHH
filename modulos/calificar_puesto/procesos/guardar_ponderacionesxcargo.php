<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/competenciasxcargo.class.php");

$id_realiza=$_SESSION["id_realiza"];
$competencias_evaluadas=json_decode(stripcslashes($_REQUEST['ponderaciones']),true);
$idcargo=$_REQUEST["idcargo"];

$objcompetenciasxcargo=new competenciasxcargo();
    if($objcompetenciasxcargo!=null){//si se creo el objeto

			    	 if(!$objcompetenciasxcargo->open_con())
			    {
			      
			    }
			    elseif ($objcompetenciasxcargo->open_con()) 
							    {// "EXISTE UNA CONEXION A LA BD";
 														$estado=true;
 														foreach ($competencias_evaluadas as $item=>$valor) {//GUARDAR CADA PONDERACION
											    	     		$ponderacion=explode("_",$valor);
											    	     		     if(!$objcompetenciasxcargo->guardar_ponderacionxcargos($idcargo,$ponderacion[1],$ponderacion[0]))
							                                            $estado=false;							                                      
							    						            }	

							    						   if($estado==true){
							    						   			$data1[] = array('bandera'=>1,'msg'=>'Exito, Se actualizaron los valores deseables del cargo.. ');  

							    						       }else{
							    						       	$data1[] = array('bandera'=>2,'msg'=>'No se actualizaron los valores deseables ! intente de nuevo.');

							    						       }						    	
							    	echo json_encode($data1);

							    }
		}