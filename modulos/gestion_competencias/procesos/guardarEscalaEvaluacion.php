<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/escalas_evaluacion.class.php");

$id_realiza=$_SESSION["id_realiza"];
$escala=$_REQUEST['idescala'];




$objEscalasEvaluacion=new EscalasEvaluacion();

    if($objEscalasEvaluacion!=null){//si se creo el objeto

			    	 if(!$objEscalasEvaluacion->open_con())
			    {
			        
			      
			      
			    }
			    elseif ($objEscalasEvaluacion->open_con()) 
							    {

													/*identificar id antes */							    	                
													
													
													
							                         
							                         $estado=$objEscalasEvaluacion->guardar_escala($escala,$id_realiza);
											         
											         if($estado){
											    		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se registro la escala seleccionada.');  

											    	}else{
											    		//unsuccefull
											    		 $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');


											    	}


							     }            
								    //print_r(json_encode($data1));
							    	echo json_encode($data1);



							    
		}




