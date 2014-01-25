<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/escalas_evaluacion.class.php");


    $proceso=$_SESSION["id_realiza"];

    $objEscala=new EscalasEvaluacion();

    if($objEscala!=null){//si se creo el objeto

			    	 if(!$objEscala->open_con())
			    {
			        
			    }
			    elseif ($objEscala->open_con()) 
							    {

							      //echo "EXISTE UNA CONEXION A LA BD";

							    	$data=$objEscala->listar_escalas();
							    	//print_r(json_encode($data));
							    	echo json_encode($data);
							    }
		}




?>