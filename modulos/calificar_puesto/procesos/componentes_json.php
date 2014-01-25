<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/competenciasxcargo.class.php");



   $proceso=$_SESSION["id_realiza"];
   $idcargo=$_REQUEST["id_cargo"];
   

    $objcompetenciasxcargo=new competenciasxcargo();

    if($objcompetenciasxcargo!=null){//si se creo el objeto

			    	 if(!$objcompetenciasxcargo->open_con())
			    {
			       
			    }
			    elseif ($objcompetenciasxcargo->open_con()) 
							    {

							      $data=$objcompetenciasxcargo->obtener_competenciasxcargos_s($proceso,$idcargo);
			        	    	  echo json_encode($data);
							    }
		}




?>