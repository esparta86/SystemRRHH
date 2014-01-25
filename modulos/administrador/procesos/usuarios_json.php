<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/usuario.class.php");

    $idrealiza=$_REQUEST["idr"];
    $objUsuario=new Usuario();
    if($objUsuario!=null){
			    	 if(!$objUsuario->open_con())
			    {
			    }
			    elseif ($objUsuario->open_con()) 
							    {
										    	$data=$objUsuario->listar_usuario($idrealiza);
										    	echo json_encode($data);
							    }
		}