<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/competencias.class.php");


/*IDENTIFICAR PROCESO PARA MOSTRAR LOS DEPARTAMENTOS RESPECTIVOS*/
   $proceso=$_SESSION["id_realiza"];
   $objComp=new Competencias();
    if($objComp!=null){//si se creo el objeto

			    	 if(!$objComp->open_con())
			    {
			       
			    }
			    elseif ($objComp->open_con()) 
							    {

							      //echo "EXISTE UNA CONEXION A LA BD";

							    	$data=$objComp->ver_competenciasEV($proceso);
							    	//print_r(json_encode($data));
							    	echo json_encode($data);
							    }
		}
