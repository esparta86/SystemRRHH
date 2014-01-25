<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/grupo_ocupacional.class.php");

   $idrealiza=$_REQUEST["id_realiza"];

   $objGrupo=new GrupoOcupacional();
    if($objGrupo!=null){
         if(!$objGrupo->open_con())
			    {
			        
			    }
			    elseif ($objGrupo->open_con()) 
							    {
							    	$data=$objGrupo->ver_gruposOcupacionalesCargos($idrealiza);
							    	echo json_encode($data);
							    }
		}




?>