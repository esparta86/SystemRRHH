<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/departamento.class.php");
			
$id_realiza=$_SESSION["id_realiza"];
$idDepto=$_REQUEST['id_dpto'];
$nombreDpto=$_REQUEST['nombre'];

$objDepartamento=new Departamento();

    if($objDepartamento!=null){//si se creo el objeto

			    	 if(!$objDepartamento->open_con())
			    {
			        
			        //NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE
			      
			    }
			    elseif ($objDepartamento->open_con()) 
							    {// "EXISTE UNA CONEXION A LA BD";


							       /*VERIFICAR PRIMERAMENTE SI EXISTEN PUESTOS QUE DEPENDEN DEL DEPARTAMENTO*/
							       $verificar=$objDepartamento->verificar_departamento($idDepto);

							       if($verificar!=0){//NO ES POSIBLE ELIMINAR EL DEPARTAMENTO

							       	        $data1[]=array('bandera'=>3,'msg'=>'NO, se elimino el departamento: '.$nombreDpto.'. Elimine primero los puestos que dependen de el.');

							       }else{//intentar eliminar

							       	    $estado=$objDepartamento->eliminar_departamento($idDepto);

									       	    if($estado){//exito

									       				$data1[] = array('bandera'=>1,'msg'=>'Exito, Se elimino el departamento.');  
									              }else{
									              // sin exito
									       		        $data1[] = array('bandera'=>2,'msg'=>'Sin Exito, No se elimino el departamento : '.$nombreDpto.'. Intente de nuevo');  
									              }




							       }
							       echo json_encode($data1);

							    }
		}
