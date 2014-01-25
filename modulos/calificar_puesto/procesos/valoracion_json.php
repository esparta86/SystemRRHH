<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/valoracion.class.php");
    


   $proceso=$_SESSION["id_realiza"];
   $idcompetencia=$_REQUEST["idcomp"];
   


    $objValoracion=new Valoracion();

    if($objValoracion!=null){//si se creo el objeto

			    	 if(!$objValoracion->open_con())
			    {
			      
			    }
			    elseif ($objValoracion->open_con()) 
							    {

							      

							    	$data=$objValoracion-> obtener_valoraciones($idcompetencia);
							    	
							    	echo json_encode($data);
							    }
		}




?>