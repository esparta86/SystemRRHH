<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/usuario.class.php");

$codigoemp=$_REQUEST['codigo_e'];
$nombreUser=$_REQUEST['nombreusuario'];
$tipoUsuario=$_REQUEST['tipousuario'];
$pass=$_REQUEST['passw'];
$id_realiza=$_REQUEST['id_r'];
$userEstado=$_REQUEST["estado"];

$objUsuario=new Usuario();

    if($objUsuario!=null){
			    	 if(!$objUsuario->open_con())
			    {
		       
			      
			    }
			    elseif ($objUsuario->open_con()) 
							    {

							    							
									
									$verifica=0;
									if($verifica!=0){
										             $data1[]=array('bandera' =>3,'msg'=>'Existe una competecia con el mismo nombre . Ingrese una diferente' );

									}else{/*Intentar registrar competencia*/
							                         
							                         $estado=$objUsuario->guardar_usuario_sistema($codigoemp,$nombreUser,$tipoUsuario,$pass,$id_realiza,$userEstado);
											         
											         if($estado){
											    		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se registro el usuario.');  

											    	}else{
											    		
											    		 $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');


											    	}


							           }            
								    
							    	echo json_encode($data1);


                                      
		}

	}




