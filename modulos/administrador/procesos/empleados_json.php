<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/empleado.class.php");


/* IDENTIFICAR PROCESO PARA MOSTRAR LOS DEPARTAMENTOS RESPECTIVOS */
   $proceso=$_REQUEST["id_realiza"];
   if(isset($_REQUEST["update"])){
        $bandera=true;/*significa que es actualizacion, por tanto se ejecutara un sql distinto */
   }else{
   	    $bandera=false;/* significa que es ingreso, por tanto se ejecutara un sql distinto */
   }

    $objEmpleado=new Empleado();

    if($objEmpleado!=null){

			    	 if(!$objEmpleado->open_con())
			    {
			        
			    }
			    elseif ($objEmpleado->open_con()) 
							    {

							      $data=$objEmpleado->listar_empleados($proceso,$bandera);
							    	
							    	echo json_encode($data);
							    }
		}


