<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/cargo.class.php");
    require_once("../../../recursos/class/procesos.class.php");

/*IDENTIFICAR PROCESO PARA MOSTRAR LOS CARGOS RESPECTIVOS*/
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

							      //echo "EXISTE UNA CONEXION A LA BD";
							    	$objProceso=new Proceso();

							    	$bandera=$objProceso->verificaProceso($proceso);
							    	/*determinar el proceso si es descriptor o plan entonces bandera=true*/

							    	

							    	if($bandera==4 || $bandera==5||$bandera==6) {
							    		$bandera=true;

							    	}
							    	else{
							    		$bandera=false;
							    		
							    	}

							    	$data=$objcargo->ver_cargos($proceso,$bandera);
							    	//print_r(json_encode($data));
							    	echo json_encode($data);
							    }
		}




?>