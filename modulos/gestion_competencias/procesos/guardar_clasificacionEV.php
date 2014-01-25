<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/areas_evaluaciond.class.php");

$id_realiza=$_SESSION["id_realiza"];

$nombreclasi=$_REQUEST['nombreclasificacion'];
$descripcion=$_REQUEST['descripcion'];

$objArea=new AreaEV();

    if($objArea!=null){//si se creo el objeto

			    	 if(!$objArea->open_con())
			    {
			        
			        //NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE
			      
			    }
			    elseif ($objArea->open_con()) 
							    {// "EXISTE UNA CONEXION A LA BD";

							    	/*VERIFICAR SI HAY UNA CLASIFICACION CON EL MISMO NOMBRE*/
									$verifica=$objArea->verificar_clasificacion($nombreclasi,$id_realiza);
									if($verifica!=0){//existe ya un nombre
										             $data1[]=array('bandera' =>3,'msg'=>'Existe una Clasificacion con el mismo nombre. Ingrese una diferente' );

									}else{//Intentar registrar clasificacion
							                         $estado=$objArea->guardar_clasificacion($nombreclasi,$descripcion,$id_realiza);
											         
											         if($estado){
											    		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se registro la clasificacion.');  

											    	}else{
											    		//unsuccefull
											    		 $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');


											    	}
							           }            
								    
							    	echo json_encode($data1);



							    }
		}




?>