<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/empresa.class.php");

    $objEmpresa=new Empresa();

    if($objEmpresa!=null){

			    	 if(!$objEmpresa->open_con())
			    {
			     
			    }
			    elseif ($objEmpresa->open_con()) 
							    {
										    	$data=$objEmpresa->listar_empresasxidrealiza();
										    	
										    	echo json_encode($data);
							                     

							    }
		}




