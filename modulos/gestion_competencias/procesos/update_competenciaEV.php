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
$competenciaId=$_REQUEST['idcompetencia'];


$F1=0;
$F2=0;
/*verificar si hay cambios en area y subcategoria*/
 //verificar si clasificacion y subcategoria son numericos: si no son numericos significa que no sufrieron cambio
 // se hace esto porque el problem con los combo en la actualizacion

			        if ( !is_numeric($_REQUEST['subcategoria'])) {
			        	$F1=0;
			        	$subcategoria=0; /*cambio el valor de la variable para que sea int y lo acepte el SP*/
			        
			        }else{
			        	$F1=1;
			        }

$objCompetencias=new Competencias();
$objValoracion=new Valoracion();

    if($objCompetencias!=null){//si se creo el objeto

			    	 if(!$objCompetencias->open_con())
			    {
			        
			       
			      
			    }
			    elseif ($objCompetencias->open_con()) 
							    {

							     $estado=$objCompetencias->modificar_competenciaEV($nombrecompetencia,$descripcionComp,$subcategoria,$id_realiza,$idarea,$idtipocompetencia,$competenciaId);
							   
							     
							       if($estado){//exito
							       		   $estado2=true;
											foreach ($descripcionesxvalor as $item=>$valor) {//GUARDAR CADA PONDERACION
											    	  	       	$descripcionValor=explode("_",$valor);
											    	     		     if(!$objValoracion->guardar_descripcionxvaloracion($competenciaId,$descripcionValor[0],$descripcionValor[1]))
							                                            $estado2=false;							                                      
							    						            }

							    		    if($estado2==false){
							    		    	$data1[] = array('bandera'=>3,'msg'=>'Exito, Se modifico la competencia, pero las descripcion de cada valor no se registro correctamente.'); 
							    		    }else{
							    			$data1[] = array('bandera'=>1,'msg'=>'Exito, Se modifico la Competencia.');      	
							    		    }

							       		
							       }else{// sin exito
							       		 $data1[] = array('bandera'=>2,'msg'=>'Sin Exito, No se modifico la Competencia. Intente de nuevo');  
							       }
							    	

							       echo json_encode($data1);

							    }
		}
