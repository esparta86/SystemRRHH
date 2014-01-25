<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/cargo.class.php");


    $proceso=$_SESSION["id_realiza"];
    $objCargo=new cargo();

    if($objCargo!=null){//si se creo el objeto

			    	 if(!$objCargo->open_con())
			    {
			        //$jsondata['bandera']    = 3;
			        //$jsondata['mensaje']    = "NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE";
			      // echo "NO EXISTE UNA CONEXION A LA BD, INTENTELO MAS TARDE";
			    }
			    elseif ($objCargo->open_con()) 
							    {

							      //echo "EXISTE UNA CONEXION A LA BD";

							    	$data=$objCargo->ver_cargosEV($proceso);
							    	//print_r(json_encode($data));
							    	echo json_encode($data);
							    }
		}




?>