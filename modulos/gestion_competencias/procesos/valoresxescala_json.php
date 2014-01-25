<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/escalas_evaluacion.class.php");
    require_once("../../../recursos/class/valoracion.class.php");




/*IDENTIFICAR PROCESO
* tipoaccion=1->ingresar nueva competencia
* tipoaccion=0->actualizar competencia
*/

   $proceso=$_SESSION["id_realiza"];
   $tipo_accion=$_REQUEST["accion"];
   $competenciaId=$_REQUEST["idcompetencia"];
   
    $objEscalasEvaluacion=new EscalasEvaluacion();
    $objValoracion=new Valoracion();

    if($objEscalasEvaluacion!=null){//si se creo el objeto

			    	 if(!$objEscalasEvaluacion->open_con())
			    {
			        
			    }
			    elseif ($objEscalasEvaluacion->open_con()) 
							    {
							    	if($tipo_accion==1){	/*ingresa competencia*/						      
							    	$data=$objEscalasEvaluacion->obtener_valorxescala($proceso);
							         }
							         else{/*se actualizara recuperar*/
							         	
							         $data=$objValoracion->obtener_descripcionxvalor($proceso,$competenciaId);

							         	
							         }

							    	
							    	echo json_encode($data);
							    }
		}




?>