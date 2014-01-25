<?php
/**
 * Fichero utilizado para la eliminacion de un usuario del sistema de una empresa.
 *
*/
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/usuario.class.php");
			
$idProceso=$_REQUEST['id'];
$objUsuario=new Usuario();
    if($objUsuario!=null){
			    	 if(!$objUsuario->open_con())
			    {
       	      
			    }
			    elseif ($objUsuario->open_con()) 
							    {
									 	    $estado=$objUsuario->desactivar_usuarios($idProceso);
									       	    if($estado){
									       				$data1[] = array('bandera'=>1,'msg'=>'Exito, se dio de baja a los usuarios');  
									              }else{
									       		        $data1[] = array('bandera'=>2,'msg'=>'Sin Exito, No se dieron de baja ');  
									              }
							       echo json_encode($data1);
							    }
		}
