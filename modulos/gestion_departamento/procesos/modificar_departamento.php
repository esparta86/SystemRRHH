<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/departamento.class.php");
			
$id_realiza=$_SESSION["id_realiza"];

$nombreD=$_REQUEST['nombre'];
$idDepto=$_REQUEST['id_dpto'];

$objDepartamento=new Departamento();

    if($objDepartamento!=null){//si se creo el objeto

			    	 if(!$objDepartamento->open_con())
			    {
			        
			        //NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE
			      
			    }
			    elseif ($objDepartamento->open_con()) 
							    {// "EXISTE UNA CONEXION A LA BD";


							     $estado=$objDepartamento->modificar_departamento($nombreD,$id_realiza,$idDepto);
							   
							     
							       if($estado){//exito
							       		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se modifico el departamento.');  
							       }else{// sin exito
							       		 $data1[] = array('bandera'=>2,'msg'=>'Sin Exito, No se modifico el departamento. Intente de nuevo');  
							       }
							    	

							       echo json_encode($data1);

							    }
		}
