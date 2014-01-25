<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/empresa.class.php");

    /*
    proceso :  Ver Empresas y procesos      =1
    proceso :  Eliminar empresas y procesos =0
    */
    $proceso=$_REQUEST['proceso'];
    if (isset($_REQUEST['id_r'])){
		$id_r = $_REQUEST['id_r'];
	}


    $objEmpresa=new Empresa();

    if($objEmpresa!=null){//si se creo el objeto

			    	 if(!$objEmpresa->open_con())
			    {
			        //$jsondata['bandera']    = 3;
			        //$jsondata['mensaje']    = "NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE";
			      // echo "NO EXISTE UNA CONEXION A LA BD, INTENTELO MAS TARDE";
			    }
			    elseif ($objEmpresa->open_con()) 
							    {

							      //echo "EXISTE UNA CONEXION A LA BD";
							    	if($proceso==1){//cargar empresas y procesos
										    	$data=$objEmpresa->ver_empresas_procesos();
										    	//print_r(json_encode($data));
										    	echo json_encode($data);
							                      }else{//SE ELIMINARA Y LUEGO VOLVER A CARGAR
							                      	//print_r(json_encode("se eliminara"));
							                      	$estado=$objEmpresa->eliminarEmpresas($id_r);
                                                    print_r(json_encode($estado));


							                      }

							    }
		}




?>