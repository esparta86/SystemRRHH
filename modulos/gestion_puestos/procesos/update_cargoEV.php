<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/cargo.class.php");
    require_once("../../../recursos/class/competenciasxcargo.class.php");
			
$id_realiza=$_SESSION["id_realiza"];

$nombre_puesto=$_REQUEST["puesto"];
$jerar=$_REQUEST["jerarquia"];
$iddpto=$_REQUEST["id_dpto"];
$idgrupo=$_REQUEST["idgrupoo"];
$id_cargo=$_REQUEST["idcargo"];



$objCargo=new cargo();
$objcompetenciasxcargo=new competenciasxcargo();

    if($objCargo!=null){//si se creo el objeto

			    	 if(!$objCargo->open_con())
			    {
			        
			        //NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE
			      
			    }
			    elseif ($objCargo->open_con()) 
							    {// "EXISTE UNA CONEXION A LA BD";


							     $estado=$objCargo->modificar_cargoEV($nombre_puesto,$jerar,$iddpto,$idgrupo,$id_realiza,$id_cargo);
							   
							     
							       if($estado){//exito
							       		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se modifico el cargo.'); 
							     $objcompetenciasxcargo->eliminarCompetenciasxcargo($id_cargo);/*Eliminar si hubiesen*/
						         $estado2=$objcompetenciasxcargo->guardar_competenciasxcargo($nombre_puesto,$jerar,$iddpto,$idgrupo,$id_realiza,$id_cargo); 
											    		if($estado2==1){
											    			$data1[] = array('bandera'=>1,'msg'=>'Exito, Se completo con errores, al guardar las competencias respectivas del cargo, notifique al administrador.'); 
											    		}							       		 
							       }else{// sin exito
							       		 $data1[] = array('bandera'=>2,'msg'=>'Sin Exito, No se modifico el Cargo. Intente de nuevo');  
							       }
							    	

							       echo json_encode($data1);

							    }
		}
