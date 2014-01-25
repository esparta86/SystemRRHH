<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/competencias.class.php");
			
$subclasificacion=$_REQUEST['nombre'];
$id_comp=$_REQUEST['id_comp'];


$objCompetencias=new Competencias();

    if($objCompetencias!=null){//si se creo el objeto

			    	 if(!$objCompetencias->open_con())
			    {
			        
			        //NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE
			      
			    }
			    elseif ($objCompetencias->open_con()) 
							    {// "EXISTE UNA CONEXION A LA BD";


							       /*VERIFICAR PRIMERAMENTE SI EXISTEN COMPETENCIAS QUE DEPENDEN DELA SUBCATEGORIA */
							       $verificar=$objCompetencias->verificar_subcategoria($id_comp);

							       if($verificar!=0){//NO ES POSIBLE ELIMINAR EL DEPARTAMENTO

							       	        $data1[]=array('bandera'=>3,'msg'=>'NO, se elimino la Sub categoria: '.$subclasificacion.'. Elimine primero los COMPETENCIAS que dependen de la sub categoria.');

							       }else{//intentar eliminar

							       	    $estado=$objCompetencias->eliminar_subcategoria($id_comp);

									       	    if($estado){//exito

									       				$data1[] = array('bandera'=>1,'msg'=>'Exito, Se elimino la Sub Categoria.');  
									              }else{
									              // sin exito
									       		        $data1[] = array('bandera'=>2,'msg'=>'Sin Exito, No se elimino la Sub Categoria : '.$subclasificacion.'. Intente de nuevo');  
									              }




							       }
							       echo json_encode($data1);

							    }
		}
