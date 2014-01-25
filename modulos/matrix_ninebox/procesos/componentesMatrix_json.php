<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/competenciasxempleado.class.php");

/*IDENTIFICAR PROCESO PARA MOSTRAR LOS DEPARTAMENTOS RESPECTIVOS*/
   $proceso=$_SESSION["id_realiza"];
   $departamento=$_REQUEST["id_dpto"];
    $objcompetenciasxEmpleado=new competenciasxEmpleado();
    if($objcompetenciasxEmpleado!=null){//si se creo el objeto

			    	 if(!$objcompetenciasxEmpleado->open_con())
			    {
			       
			    }
			    elseif ($objcompetenciasxEmpleado->open_con()) 
							    {
						    	$data=$objcompetenciasxEmpleado->matrix_ninebox($departamento,$proceso);
             			    	echo json_encode($data);
							    }
		}
