<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/competencias.class.php");

/*IDENTIFICAR PROCESO PARA MOSTRAR LOS DEPARTAMENTOS RESPECTIVOS*/
   $proceso=$_SESSION["id_realiza"];
   $idarea=$_REQUEST['id_area'];
   $idactividad=$_REQUEST['idactivity'];
   $masivo=$_REQUEST['masivoid'];

    $objComp=new Competencias();
    if($objComp!=null){//si se creo el objeto
			    	 if(!$objComp->open_con())
			    {
		       
			    }
			    elseif ($objComp->open_con()) 
							    {
							    	$data=$objComp->ver_competenciasActividad($proceso,$idactividad,$idarea,$masivo);
							    	echo json_encode($data);
							    }
		}
