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
$objUsuario=new Usuario();
    if($objUsuario!=null){
			    	 if(!$objUsuario->open_con())
			    {
			    }
			    elseif ($objUsuario->open_con()) 
							    {
							     $estado=$objUsuario->update_usuario_sistema($codigoemp,$nombreUser,$tipoUsuario,$pass,$id_realiza);
							       if($estado){
							       		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se modifico el usuario.');  
							       }else{
							       		 $data1[] = array('bandera'=>2,'msg'=>'Sin Exito, No se modifico la Competencia. Intente de nuevo');  
							       }
							       echo json_encode($data1);
							    }
		}
