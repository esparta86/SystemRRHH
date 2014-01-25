<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/realiza_escalas_evaluacion.class.php");


    $proceso=$_SESSION["id_realiza"];

    $objEscala=new realizaEscalasEvaluacion();

    if($objEscala!=null){//si se creo el objeto

			    	 if(!$objEscala->open_con())
			    {
			        
			    }
			    elseif ($objEscala->open_con()) 
							    {

							      

							    	$data=$objEscala->obtener_escala_empresa($proceso);
							    	
							    	echo json_encode($data);
							    }
		}




