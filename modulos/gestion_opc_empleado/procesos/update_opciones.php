<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/opciones_empleado.class.php");
			
$id_realiza=$_SESSION["id_realiza"];
$empleado=$_REQUEST["codigoE"];
$opcion1=$_REQUEST["postopcion1"];
$opcion2=$_REQUEST["postopcion2"];
$opcion3=$_REQUEST["postopcion3"];
$objopcionesEmpleado=new opcionesEmpleado();
   if($objopcionesEmpleado!=null){
			    	 if(!$objopcionesEmpleado->open_con())
			    {
						$data1[] = array('bandera'=>3,'msg'=>'Sin Exito, no existe una conexion a la base de datos.');  
			    }
			    elseif ($objopcionesEmpleado->open_con()) 
							    {
							     $estado=$objopcionesEmpleado->updateOpcionesEmpleado($empleado,$opcion1,$opcion2,$opcion3);
							     $estado2=$objopcionesEmpleado->registrarCompetenciasxEmpleado($empleado,$opcion1,$opcion2,$opcion3,$id_realiza);
						       if($estado){
							      $data1[] = array('bandera'=>1,'msg'=>'Exito, Se registraron los cambios en las opciones del empleado .'); 

								}else{
							       		 $data1[] = array('bandera'=>2,'msg'=>'Sin Exito, No se registro ningun cambio');  
							       }
							       echo json_encode($data1);
							    }
		}
