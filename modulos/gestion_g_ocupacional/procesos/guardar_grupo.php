<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/grupo_ocupacional.class.php");

$id_realiza=$_SESSION["id_realiza"];

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
									$verifica=$objGrupo->verificar_grupo($nombre_grupo,$id_realiza);
									if($verifica!=0){//existe ya un nombre
										             $data1[]=array('bandera' =>3,'msg'=>' Ya Existe un grupo con el mismo nombre . Ingrese una diferente' );

									}else{//Intentar registrar competencia
							                         
							                         $idG=$objGrupo->guardar_grupo($nombre_grupo,$descripcion_grupo,$id_realiza);

							                 if($idG!=0){
											      
							                 		if(count($competencias_asociadas)!=0)
							                 		{
											    	 $estado=false;
											    	 $i=0;
											    	     
											    	     
											    	     foreach ($competencias_asociadas as $item=>$valor) {//GUARDAR CADA COMPETENCIA
											    	  	          
											    	     		foreach ($valor as $i => $value) {

											    	     			$estado=$objGrupo->guardar_competencia_grupo($value,$idG);	

											    	     		}
							                                        
							                                      
							    						            }

							    						if($estado){
											    		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se registro el grupo ocupacional y sus competencias.');  

											    	        }else{
											    		    //unsuccefull
											    		     $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');


											    	         }

											    }else{
											    	 $data1[] = array('bandera'=>4,'msg'=>'Se registro el grupo ocupacional, sin competencias por el momento.');

											    }


											    }//fin de idG


							           }    

							    echo json_encode($data1);



							    }
		}



?>


