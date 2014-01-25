<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/actividades.class.php");

   $proceso=$_SESSION["id_realiza"];
   $codigoempleado=$_REQUEST['codempleado'];
   $opcion=$_REQUEST['opc'];
   $area=$_REQUEST['idarea'];
    $objactividades=new actividades();
    if($objactividades!=null){//si se creo el objeto
			    	 if(!$objactividades->open_con())
			    {
			        
			    }
			    elseif ($objactividades->open_con()) 
							    {
							    	$data=$objactividades->get_actividades($codigoempleado,$opcion,$area);
							    	echo json_encode($data);
							    }
		}
