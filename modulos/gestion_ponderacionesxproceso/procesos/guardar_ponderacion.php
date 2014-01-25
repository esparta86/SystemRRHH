<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/ponderacion.class.php");


$idempresa_d=$_REQUEST["idempresa"];
$idproceso_d=$_REQUEST["idproceso"];
$jefe_d=$_REQUEST["jefe"];
$coworkers_d=$_REQUEST["coworker"];
$colaboradores_d=$_REQUEST["colaboradores"];
$personal_d=$_REQUEST["personal"];
$estado_d=$_REQUEST["estado"];

$objponderacion=new ponderacion();
    if($objponderacion!=null){
			    	 if(!$objponderacion->open_con())
			    {  }
			    elseif ($objponderacion->open_con()) 
							    {            
							     $estado=$objponderacion->guardar_ponderacion($idempresa_d,$idproceso_d,$jefe_d,$coworkers_d,$colaboradores_d,$personal_d,$estado_d);
											         
								       switch ($estado) {
								       	case 1:
								       		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se agrego nueva ponderacion.');  
								       		break;
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');
								       	     break;
								       	case 3:
								       		 $data1[] = array('bandera'=>2,'msg'=>'Ya existe una perspectiva de igual nombre.');
								       	     break;
								        }
							    	echo json_encode($data1);
							    }
		}
