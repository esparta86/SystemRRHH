<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/competenciasGrupoOcupacional.class.php");



/*IDENTIFICAR PROCESO PARA MOSTRAR LOS DEPARTAMENTOS RESPECTIVOS*/
   $proceso=$_SESSION["id_realiza"];
   $grupoocupacional=$_REQUEST["idgrupo"];


    $objcompetenciasGrupoOcupacional=new competenciasGrupoOcupacional();

    if($objcompetenciasGrupoOcupacional!=null){//si se creo el objeto

			    	 if(!$objcompetenciasGrupoOcupacional->open_con())
			    {
			        
			    }
			    elseif ($objcompetenciasGrupoOcupacional->open_con()) 
							    {

							      

							    	$data=$objcompetenciasGrupoOcupacional->obtener_competenciasxgrupoocupacional($proceso,$grupoocupacional);

							    	echo json_encode($data);
							    }
		}
