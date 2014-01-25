<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/cargo.class.php");
    require_once("../../../recursos/class/competenciasGrupoOcupacional.class.php");




$id_realiza=$_SESSION["id_realiza"];
$competencias_evaluadas=json_decode(stripcslashes($_REQUEST['ponderaciones']),true);
$id_grupoo=$_REQUEST["idgrupo"];



$objcompetenciasGrupoOcupacional=new competenciasGrupoOcupacional();

    if($objcompetenciasGrupoOcupacional!=null){//si se creo el objeto

			    	 if(!$objcompetenciasGrupoOcupacional->open_con())
			    {
			        
			        
			      
			    }
			    elseif ($objcompetenciasGrupoOcupacional->open_con()) 
							    {
							    		
 														$estado=true;
 														foreach ($competencias_evaluadas as $item=>$valor) {//GUARDAR CADA PONDERACION
											    	  	          
											    	     		$ponderacion=explode("_",$valor);

											    	     		    
											    	     		    
											    	     		     if(!$objcompetenciasGrupoOcupacional->guardarPcompetenciasxgrupo_O($ponderacion[0],$ponderacion[1],$id_grupoo))
							                                             $estado=false;							                                      
							    						            }	

							    						   if($estado==true){
							    						   			$data1[] = array('bandera'=>1,'msg'=>'Exito, Se actualizaron las ponderaciones de las competencias. ');  

							    						       }else{
							    						       	$data1[] = array('bandera'=>2,'msg'=>'No se actualizaron las ponderaciones ! intente de nuevo.');


							    						       }						    	
							                       
							     
							    	echo json_encode($data1);

							    	



							    }
		}
		

?>


