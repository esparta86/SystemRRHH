<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/competencias.class.php");

$id_realiza=$_SESSION["id_realiza"];

$subclasificacion=$_REQUEST['subclasificacion'];
$descripSubclas=$_REQUEST['descrip'];
$clasifica=$_REQUEST['clasificacion'];

$objCompetencias=new Competencias();

    if($objCompetencias!=null){//si se creo el objeto

			    	 if(!$objCompetencias->open_con())
			    {
			        
			        
			      
			    }
			    elseif ($objCompetencias->open_con()) 
							    {
	
	     							$verifica=$objCompetencias->verificar_subclasificacion($subclasificacion,$id_realiza);
									if($verifica!=0){/*existe ya un nombre*/
										             $data1[]=array('bandera' =>3,'msg'=>'Existe una Sub categoria con el mismo nombre. Ingrese una diferente' );

									}else{/*Intentar registrar departamento*/
							                         $estado=$objCompetencias->guardar_subclasificacionEV($subclasificacion,$descripSubclas,$id_realiza,$clasifica);
											         
											         if($estado){
											    		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se registro la Sub Categoria.');  

											    	}else{
											    		/* unsuccefull*/
											    		 $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');


											    	}
							           }            
								    
							    	echo json_encode($data1);



							    }
		}




