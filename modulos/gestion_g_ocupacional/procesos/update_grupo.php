<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/grupo_ocupacional.class.php");

$id_realiza=$_SESSION["id_realiza"];
$idGrupo=$_REQUEST['idGrupo'];
$nombre_grupo=$_REQUEST['nombre_g'];
$descripcion_grupo=$_REQUEST['descripcion'];
$competencias_asociadas=json_decode(stripcslashes($_REQUEST['competencias']),true);


$objGrupo=new GrupoOcupacional();

    if($objGrupo!=null){//si se creo el objeto

			    	 if(!$objGrupo->open_con())
			    {
			        
			        //NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE
			      
			    }
			    elseif ($objGrupo->open_con()) 
							    {// "EXISTE UNA CONEXION A LA BD";

							   /*VERIFICAR SI HAY UNA SUBCLASIFICACION CON EL MISMO NOMBRE*/
									
							                         
							   if($objGrupo->update_grupo($nombre_grupo,$descripcion_grupo,$id_realiza,$idGrupo))
                                 {
							                
									      
											    	 $estado=true;
											    	 $i=0;
											    	     
											    	     //print_r(var_dump($competencias_asociadas));
												
												/********************** PROCESO IDENTIFICAR QUE COMPETENCIA NO SE VOLVIERON A ELEGIR ENTONCES BORRARLAS*****************/ 
												/* pequeño bug cuando el array de competencias asociadas es muy pequeño menor a 2*/                                                 
                                                /*obtener vector de competencias before */
                                                  $competencias_before=$objGrupo->get_competencias_grupo($idGrupo,$id_realiza);
                                                  
                                               for ($i=0; $i < count($competencias_before) ; $i++) { 
                                               	  $eliminar=true;//por inicializacion borrarla
                                               	  $idcompetencia=$competencias_before[$i];//get competencia actual
											   	      foreach ($competencias_asociadas as $item=>$valor) 
											   	         {//GUARDAR CADA COMPETENCIA
											    	     		foreach ($valor as $k => $value) {
											    	     			//$estado=$objGrupo->guardar_competencia_grupo($value,$idG);
											    	     			  if($value==$idcompetencia){
 																				//se volvio a elegir NO borrar competencia
											    	     			  	    $eliminar=false;
											    	     			     }

											    	     		}//FIN foreach interno
							                                        
							                                      
							    						 }//fin de primer foreach

							    						 if($eliminar){//eliminar comptencia porque no se encontro en el nuevo array competencias_asociadas
							    						   $estado2=$objGrupo->eliminar_competencia_grupo($idcompetencia,$idGrupo);	
							    						 	if($estado2){

							    						 	}
							    						 	//print_r(var_dump($idcompetencia));
							    						 	//print_r(var_dump($eliminar));
							    						 }

							    					}//fin de for
							    			     /**************************************************************************/

                                                 /*luego agregar las nuevas*/

                                                 foreach ($competencias_asociadas as $item=>$valor) {//GUARDAR CADA COMPETENCIA
											    	     		foreach ($valor as $k => $value) {
											    	     	   $estado=$objGrupo->modificar_competencia_grupo($value,$idGrupo);
											    	     		}
											    	     	}




							    						if($estado){
											    		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se actualizo el grupo ocupacional y sus competencias.');  

											    	}else{
											    		//unsuccefull
											    		 $data1[] = array('bandera'=>2,'msg'=>'No se Actualizo ! intente de nuevo.');


											    	}
											    	$objGrupo->procesar_competenciasxempleado($idGrupo,$id_realiza);


								}else{
									$data1[] = array('bandera'=>2,'msg'=>'No se Actualizo ! intente de nuevo.');									
								}			    


							              

							    echo json_encode($data1);



							    }
		}

?>


