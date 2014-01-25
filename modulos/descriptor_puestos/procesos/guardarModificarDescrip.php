<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/descripcion_puesto.class.php");

$id_realiza=$_SESSION["id_realiza"];
$codigo_puesto=$_REQUEST["post_codigopuesto"];
$area_org=$_REQUEST["post_area_o"];
$reporta_a=$_REQUEST["post_reporta_a"];
$supervisa_a=$_REQUEST["post_supervisa"];
$experiencia=$_REQUEST["post_experiencia"];
$nivel_a=$_REQUEST["post_nivela"];
$proposito=$_REQUEST["post_proposito"];
$funciones=$_REQUEST["post_funciones"];
$subfunciones=$_REQUEST["post_subfunciones"];



$objDescripcion=new Descripcion_Puesto();

    if($objDescripcion!=null){//si se creo el objeto

			    	 if(!$objDescripcion->open_con())
			    {
			        
			        //NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE
			      
			    }
			    elseif ($objDescripcion->open_con()) 
							    {// "EXISTE UNA CONEXION A LA BD";

						    	/*VERIFICAR SI TODAVIA ES EDITABLE EL CARGO, SI EXISTE*/
							$verifica=$objDescripcion->verificar_descripcion($codigo_puesto);
									if(!$verifica){//ya no es editable
										             $data1[]=array('bandera' =>3,'msg'=>'Ya no se permite modificar la descripcion de cargo, disculpe las molestias' );

									}else{//Intentar registrar la descripcion
							                         
							                         $estado=$objDescripcion->guardar_modificar($codigo_puesto,$area_org,$reporta_a,$supervisa_a,$experiencia,$nivel_a,$proposito,$funciones,$subfunciones);
											         
											         if($estado){
											    		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se realizo los cambios.');  

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


