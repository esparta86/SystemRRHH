<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/departamento.class.php");

/*IDENTIFICAR PROCESO PARA MOSTRAR LOS DEPARTAMENTOS RESPECTIVOS*/
   $proceso=$_SESSION["id_realiza"];

    $objDpto=new Departamento();

    if($objDpto!=null){//si se creo el objeto

			    	 if(!$objDpto->open_con())
			    {
			        
			    }
			    elseif ($objDpto->open_con()) 
							    {

							      

							    	$data=$objDpto->ver_departamentosnine_box($proceso);
							    	
							    	echo json_encode($data);
							    }
		}




