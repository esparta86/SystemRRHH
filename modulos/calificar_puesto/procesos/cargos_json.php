<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/cargo.class.php");
    require_once("../../../recursos/class/procesos.class.php");

/*IDENTIFICAR PROCESO 
Y EL EMPLEADO 
PARA MOSTRAR LOS CARGOS RESPECTIVOS*/
   $proceso=$_SESSION["id_realiza"];
   
    $objcargo=new cargo();

    if($objcargo!=null){//si se creo el objeto

			    	 if(!$objcargo->open_con())
			    {
			        //$jsondata['bandera']    = 3;
			        //$jsondata['mensaje']    = "NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE";
			      // echo "NO EXISTE UNA CONEXION A LA BD, INTENTELO MAS TARDE";
			    }
			    elseif ($objcargo->open_con()) 
							    {

							      //

							    	$data=$objcargo->ver_cargos($proceso,false);
							    	//print_r(json_encode($data));
							    	echo json_encode($data);
							    }
		}




?>