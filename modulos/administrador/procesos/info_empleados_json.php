<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/empleado.class.php");


/*IDENTIFICAR PROCESO PARA MOSTRAR LOS DEPARTAMENTOS RESPECTIVOS*/
   $codigo=$_REQUEST["codigoempleado"];

    $objEmpleado=new Empleado();

    if($objEmpleado!=null){//si se creo el objeto

			    	 if(!$objEmpleado->open_con())
			    {
			        //$jsondata['bandera']    = 3;
			        //$jsondata['mensaje']    = "NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE";
			      // echo "NO EXISTE UNA CONEXION A LA BD, INTENTELO MAS TARDE";
			    }
			    elseif ($objEmpleado->open_con()) 
							    {

							      //echo "EXISTE UNA CONEXION A LA BD";

							    	//$data=$objEmpleado->listar_empleados($proceso);
							    	
							    	//echo json_encode($data);
							    }
		}




?>