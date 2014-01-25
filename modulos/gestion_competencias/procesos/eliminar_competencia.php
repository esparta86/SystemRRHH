<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/competencias.class.php");
			
$competencia=$_REQUEST['nombre'];
$id_comp=$_REQUEST['id'];
$objCompetencias=new Competencias();
    if($objCompetencias!=null){//si se creo el objeto
			    	 if(!$objCompetencias->open_con())
			    {
			    }
			    elseif ($objCompetencias->open_con()) 
							    {
							       /*VERIFICAR PRIMERAMENTE SI EXISTEN COMPETENCIAS QUE DEPENDEN DELA SUBCATEGORIA */
							       $verificar=$objCompetencias->check_comp($id_comp);
							       if($verificar!=0)
							            {
							       	        $data1[]=array('bandera'=>3,'msg'=>'NO, se elimino la Competencia: '.$competencia.'. La competencia ya se ha evaluado en un puesto o en un empleado.');
							       	    }

							       else{
							       	    $estado=$objCompetencias->drop_competencia($id_comp);
									       	    if($estado){
									       				$data1[] = array('bandera'=>1,'msg'=>'Exito, Se elimino la Competencia.');  
									              }else{
									       		        $data1[] = array('bandera'=>2,'msg'=>'Sin Exito, No se elimino la Competencia : '.$competencia.'. Intente de nuevo');  
									              }

							       }
							       echo json_encode($data1);

							    }
		}
