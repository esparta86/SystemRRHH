<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/cargo.class.php");
			
$nombrepuesto=$_REQUEST['nombre'];
$id_cargo=$_REQUEST['id'];


$objCargo=new cargo();

    if($objCargo!=null){//si se creo el objeto

			    	 if(!$objCargo->open_con())
			    {
			        
			        //NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE
			      
			    }
			    elseif ($objCargo->open_con()) 
							    {// "EXISTE UNA CONEXION A LA BD";


							       /*VERIFICAR PRIMERAMENTE SI EXISTEN nombrepuestoS QUE SE EVALUARON YA DEL PUESTO */
							       //$verificar=$objCargo->check_comp($id_comp);
							       $verificar=0;//temporalmente
							       if($verificar!=0){//NO ES POSIBLE ELIMINAR EL CARGO

							       	        $data1[]=array('bandera'=>3,'msg'=>'NO, se elimino el Cargo: '.$nombrepuesto.'. El cargo ya se ha evaluado o en un empleado.');

							       	    }

							       else{//intentar eliminar

							       	    $estado=$objCargo->drop_cargoEV($id_cargo);
							       		  //$estado=true;
									       	    if($estado){//exito

									       				$data1[] = array('bandera'=>1,'msg'=>'Exito, Se elimino el cargo.');  
									              }else{
									              // sin exito
									       		        $data1[] = array('bandera'=>2,'msg'=>'Sin Exito, No se elimino la nombrepuesto : '.$nombrepuesto.'. Intente de nuevo');  
									              }




							       }
							       echo json_encode($data1);

							    }
		}
