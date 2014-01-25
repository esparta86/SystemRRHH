<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/procesos.class.php");

    $idempresa=$_REQUEST["idempre"];


    $objProceso=new Proceso();

    if($objProceso!=null){//si se creo el objeto

			    	 if(!$objProceso->open_con())
			    {
			        //$jsondata['bandera']    = 3;
			        //$jsondata['mensaje']    = "NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE";
			      // echo "NO EXISTE UNA CONEXION A LA BD, INTENTELO MAS TARDE";
			    }
			    elseif ($objProceso->open_con()) 
							    {

							      
										    	$data=$objProceso->ver_procesos_empresa($idempresa);
										    	
										    	echo json_encode($data);
							                     

							                      

							    }
		}




?>