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
			        //$jsondata['bandera']    = 3;
			        //$jsondata['mensaje']    = "NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE";
			      // echo "NO EXISTE UNA CONEXION A LA BD, INTENTELO MAS TARDE";
			    }
			    elseif ($objDpto->open_con()) 
							    {

							      //echo "EXISTE UNA CONEXION A LA BD";

							    	$data=$objDpto->ver_departamentos($proceso);
							    	//print_r(json_encode($data));
							    	echo json_encode($data);
							    }
		}




?>