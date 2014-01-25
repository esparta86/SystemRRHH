<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/cargo.class.php");
			
$id_realiza=$_SESSION["id_realiza"];

$nombre_puesto=strtoupper($_REQUEST["puesto"]);
$jerar=$_REQUEST["jerarquia"];
$iddpto=$_REQUEST["id_dpto"];

$id_cargo=$_REQUEST["idcargo"];



$objCargo=new cargo();

    if($objCargo!=null){//si se creo el objeto

			    	 if(!$objCargo->open_con())
			    {
			        
			        //NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE
			      
			    }
			    elseif ($objCargo->open_con()) 
							    {// "EXISTE UNA CONEXION A LA BD";


							     $estado=$objCargo->modificar_cargo($nombre_puesto,$jerar,$iddpto,$id_realiza,$id_cargo);
							   
							     
							       if($estado){//exito
							       		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se modifico el cargo.');  
							       }else{// sin exito
							       		 $data1[] = array('bandera'=>2,'msg'=>'Sin Exito, No se modifico el Cargo. Intente de nuevo');  
							       }
							    	

							       echo json_encode($data1);

							    }
		}
