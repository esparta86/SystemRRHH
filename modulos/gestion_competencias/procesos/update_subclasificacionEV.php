<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/competencias.class.php");
			
$id_realiza=$_SESSION["id_realiza"];

$subclasificacion=$_REQUEST['subclasificacion'];
$descripSubclas=$_REQUEST['descrip'];
$id_comp=$_REQUEST['id'];
$clasifica=$_REQUEST['clasificacion'];


$objCompetencias=new Competencias();

    if($objCompetencias!=null){//si se creo el objeto

			    	 if(!$objCompetencias->open_con())
			    {
			        
			        //NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE
			      
			    }
			    elseif ($objCompetencias->open_con()) 
							    {// "EXISTE UNA CONEXION A LA BD";


							     $estado=$objCompetencias->modificar_subcategoriaEV($subclasificacion,$descripSubclas,$id_comp,$clasifica);
							   
							     
							       if($estado){//exito
							       		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se modifico la Sub-categoria.');  
							       }else{// sin exito
							       		 $data1[] = array('bandera'=>2,'msg'=>'Sin Exito, No se modifico la Sub-categoria. Intente de nuevo');  
							       }
							    	

							       echo json_encode($data1);

							    }
		}
