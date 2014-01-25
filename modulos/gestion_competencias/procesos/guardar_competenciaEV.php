<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/competencias.class.php");
    require_once("../../../recursos/class/valoracion.class.php");

$id_realiza=$_SESSION["id_realiza"];
$nombrecompetencia=$_REQUEST['nombrecompetencia'];
$descripcionComp=$_REQUEST['descripcionComp'];
$subcategoria=$_REQUEST['subcategoria'];
$idarea=$_REQUEST['area'];
$idtipocompetencia=$_REQUEST['tipocomp'];
$descripcionesxvalor=json_decode(stripcslashes($_REQUEST['descripcionxvalor']),true);



$objCompetencias=new Competencias();
$objValoracion=new Valoracion();

    if($objCompetencias!=null){//si se creo el objeto

			    	 if(!$objCompetencias->open_con())
			    {
			        
			      
			      
			    }
			    elseif ($objCompetencias->open_con()) 
							    {

							    	/*VERIFICAR SI HAY UNA SUBCLASIFICACION CON EL MISMO NOMBRE*/
							$verifica=$objCompetencias->verificar_competenciaEV($nombrecompetencia,$id_realiza);
									if($verifica!=0){//existe ya un nombre
										             $data1[]=array('bandera' =>3,'msg'=>'Existe una competencia con el mismo nombre . Ingrese una diferente' );

									}else{//Intentar registrar competencia
							                         
							                         $estado=$objCompetencias->guardar_competenciaEV($nombrecompetencia,$descripcionComp,$subcategoria,$id_realiza,$idarea,$idtipocompetencia);
											         
											         if($estado){
											         	$estado2=true;
											         	

											         	/*obtener idcompetencia para insertar en valoracion*/
											         	$idcompetencia_ingresada=$objCompetencias->getIdCompetencia($nombrecompetencia,$subcategoria,$id_realiza,$idarea);

								                  foreach ($descripcionesxvalor as $item=>$valor) {//GUARDAR CADA PONDERACION
											    	  	          
											    	     		$descripcionValor=explode("_",$valor);
						    	     		    											    	     		    
											    	     		     if(!$objValoracion->guardar_descripcionxvaloracion($idcompetencia_ingresada,$descripcionValor[0],$descripcionValor[1]))
							                                            $estado=false;							                                      
											    	     				

							    						            }											         	




											    		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se registro la Competencia.');  

											    	}else{
											    		//unsuccefull
											    		 $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');


											    	}


							           }            
								    //print_r(json_encode($data1));
							    	echo json_encode($data1);



							    }
		}




