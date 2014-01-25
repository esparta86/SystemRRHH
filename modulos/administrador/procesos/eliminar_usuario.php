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
			
$usuario=$_REQUEST['nombre'];
$idU=$_REQUEST['id'];
$objUsuario=new Usuario();
    if($objUsuario!=null){
			    	 if(!$objUsuario->open_con())
			    {
       
			        
			      
			    }
			    elseif ($objUsuario->open_con()) 
							    {

							       /*luego verificar si el usuario a eliminar no es el logeado actualmente
							       $verificar=$objUsuario->check_clasificacion($idC);*/
									$verificar=0;

							       if($verificar!=0){/*NO ES POSIBLE ELIMINAR EL DEPARTAMENTO */

							       	        $data1[]=array('bandera'=>3,'msg'=>'NO, se elimino el usuario: '.$usuario.'. Usted esta logeado actualmente.');

							       }else{/*intentar eliminar*/

							       	    $estado=$objUsuario->eliminar_usuario($idU);

									       	    if($estado){

									       				$data1[] = array('bandera'=>1,'msg'=>'Exito, Se elimino el usuario:'.$usuario.' con exito');  
									              }else{
									              // sin exito
									       		        $data1[] = array('bandera'=>2,'msg'=>'Sin Exito, No se elimino el usuario : '.$usuario.'. Intente de nuevo');  
									              }




							       }
							       echo json_encode($data1);

							    }
		}
