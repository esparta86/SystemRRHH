<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/grupo_ocupacional.class.php");
			
$grupo=$_REQUEST['nombre'];
$id_g=$_REQUEST['id_g'];


$objGrupo=new GrupoOcupacional();

    if($objGrupo!=null){//si se creo el objeto

			    	 if(!$objGrupo->open_con())
			    {
			        
			        //NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE
			      
			    }
			    elseif ($objGrupo->open_con()) 
							    {// "EXISTE UNA CONEXION A LA BD";


							       /*VERIFICAR PRIMERAMENTE SI EXISTEN EMPLEADOS QUE DEPENDEN DELA SUBCATEGORIA */
							       //$verificar=$objGrupo->check_comp($id_comp);
							       $verificar=0; //temporal

							       if($verificar!=0){//NO ES POSIBLE ELIMINAR EL GRUPO

							       	        $data1[]=array('bandera'=>3,'msg'=>'NO, se elimino el grupo:  '.$grupo.'. Se han asiganado empleados a este grupo ocupacional.');

							       	    }

							       else{//intentar eliminar

							       	    $estado=$objGrupo->eliminar_grupo($id_g);
							       		  //$estado=true;
									       	    if($estado){//exito

									       				$data1[] = array('bandera'=>1,'msg'=>'Exito, Se elimino el grupo ocupacional.');  
									              }else{
									              // sin exito
									       		        $data1[] = array('bandera'=>2,'msg'=>'Sin Exito, No se elimino el grupo ocupacional : '.$competencia.'. Intente de nuevo');  
									              }




							       }
							       echo json_encode($data1);

							    }
		}
