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


$objCargo=new cargo();
$objcompetenciasxcargo=new competenciasxcargo();

    if($objCargo!=null){//si se creo el objeto

			    	 if(!$objCargo->open_con())
			    {
			        
			        //NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE
			      
			    }
			    elseif ($objCargo->open_con()) 
							    {// "EXISTE UNA CONEXION A LA BD";

							    	/*VERIFICAR SI HAY UNA SUBCLASIFICACION CON EL MISMO NOMBRE*/
								   $verifica=$objCargo->verificar_cargoEV($nombre_puesto,$id_realiza);
									if($verifica!=0){//existe ya un nombre
										             $data1[]=array('bandera' =>3,'msg'=>'Existe un Cargo con el mismo nombre para esta empresa  . Ingrese una diferente' );

									}else{//Intentar registrar competencia
							                       
							                         $estado=$objCargo->guardar_cargosEV($nombre_puesto,$jerar,$iddpto,$idgrupo,$id_realiza,0);

											         if($estado){
											    		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se registro el Cargo.'); 
											    		$estado2=$objcompetenciasxcargo->guardar_competenciasxcargo($nombre_puesto,$jerar,$iddpto,$idgrupo,$id_realiza,0); 
											    		if($estado2==1){
											    			$data1[] = array('bandera'=>1,'msg'=>'Exito, Se completo con errores, al guardar las competencias respectivas del cargo, notifique al administrador.'); 
											    		}






											    	}else{
											    		//unsuccefull
											    		 $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');


											    	}
												    	



							           }            
								    //print_r(json_encode($data1));
							    	echo json_encode($data1);



							    }
		}

?>


