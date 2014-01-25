<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/grupo_ocupacional.class.php");

   $id_realiza=$_SESSION["id_realiza"];

    $objGrupo=new GrupoOcupacional();

    if($objGrupo!=null){//si se creo el objeto

			    	 if(!$objGrupo->open_con())
			    {
			        //$jsondata['bandera']    = 3;
			        //$jsondata['mensaje']    = "NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE";
			      // echo "NO EXISTE UNA CONEXION A LA BD, INTENTELO MAS TARDE";
			    }
			    elseif ($objGrupo->open_con()) 
							    {

							      //echo "EXISTE UNA CONEXION A LA BD";

							    	$data=$objGrupo->ver_gruposOcupacionalesCargos($id_realiza);
							    	//print_r(json_encode($data));
							    	echo json_encode($data);
							    }
		}




?>