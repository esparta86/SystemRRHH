<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/departamento.class.php");

    $id_realiza=$_SESSION["id_realiza"];

			
			

$nombreD=$_REQUEST['nombre'];





$objDepartamento=new Departamento();

    if($objDepartamento!=null){//si se creo el objeto

			    	 if(!$objDepartamento->open_con())
			    {
			        
			        //NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE
			      
			    }
			    elseif ($objDepartamento->open_con()) 
							    {// "EXISTE UNA CONEXION A LA BD";

							    	//$data=$objProceso->ver_procesos();
//							    	//echo json_encode($data);

							    	//$estado=$objEmpresa->guardar_empresa($nombreEmpresa,$idproceso,$fechaI,$fechaF,$img);


									/*VERIFICAR SI HAY UN DEPARTAMENTO CON EL MISMO NOMBRE*/
									$verifica=$objDepartamento->verificar_depto($nombreD,$id_realiza);
									if($verifica!=0){//existe ya un nombre
										      $data1[]=array('bandera' =>3,'msg'=>'Existe un departamento con el mismo nombre. Ingrese uno diferente' );

									}else{//Intentar registrar departamento
							                         $estado=$objDepartamento->guardar_departamento($nombreD,$id_realiza);
											         
											         if($estado){
											    		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se registro el departamento.');  

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