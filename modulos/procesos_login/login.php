<?php
  
    session_start();
    require_once("../../recursos/conexion/sysrrhh.conf");
    require_once("../../recursos/adodb/adodb.inc.php");
    require_once("../../recursos/conexion/conexion.class.php");
    require_once("../../recursos/class/usuario.class.php");

    $nick = $_REQUEST['nick_emp'];
	$pass = $_REQUEST['pass_emp'];
	
    $objUsuario=new Usuario();
    if($objUsuario!=null){//si se creo el objeto

			    	 if(!$objUsuario->open_con())
			    {

			    }
			    elseif ($objUsuario->open_con()) 
							    {
							        $bandera      = $objUsuario->login($nick, $pass);
							        if($bandera==1)
							        {
							        	echo "{success:true, bandera:1}"; 
							        }
							        if($bandera==2)
							        {
							           echo "{success:true, bandera:2}";
							        }
									if($bandera==3)
							        {
							           echo "{success:true, bandera:3}";
							        }							        


							    }

    }
