<?php

/**
* 
*/
class AreaEV extends DBManager
{

	var  $con;
    //var  $nivel_emp;

    //funcion para comprobar conexion
    function open_con()
    {
    	$this->con=parent::conectar();
	return $this->con;
    }

    //funcion para cerra conexion
    function close_con()
    {
	parent::desconectar();
    }

		   function ver_areas($id_realiza)//para identificar el proceso.
					{
					    parent::conectar();
					    $sql="SELECT * FROM areas_evaluaciond where id_realiza=$id_realiza";
					    //$data1="";

					    $record_consulta = $this->obj_con->Execute($sql);
						

					        while (!$record_consulta->EOF)
					        {
					           $id_area=$record_consulta->fields["ID_AREA_EV"];
					           $nombreArea = $record_consulta->fields["NOMBRE_AREA_EV"];
					           $descripcion=$record_consulta->fields["DESCRIPCION_AREA_EV"];
		       
						       $data1[] = array('id_area_ev'=>$id_area,'nombreclasificacion' => $nombreArea,'descripcionclasificacion'=>$descripcion);
					              
					           $record_consulta->MoveNext();
					         }
					         //ANTERIORMENTE NO HACIA ESTO PERO PENSE QUE AFECTABA EN ALGO POR EL [root] del STORE donde se define : data
					      $repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;
					       //return $data1;
					}//fin de funcion ver areas



		function  verificar_clasificacion($nombre,$id_realiza){
    			parent::conectar();
    			$sql="SELECT count(*) as N FROM areas_evaluaciond where id_realiza=$id_realiza and nombre_area_ev like '$nombre'";
    			$record_consulta=$this->obj_con->Execute($sql);
                $N="";
    			 while(!$record_consulta->EOF){
    			 	$N=$record_consulta->fields["N"];
    			 	$record_consulta->MoveNext();
    			 }

    			 return $N;

    		}



    		function guardar_clasificacion($nombre,$descripcion,$id_realiza){
			parent::conectar();
			$sql="CALL guardar_clasificacionEV('".$descripcion."','".$nombre."',".$id_realiza.")";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}

		
			}//fin de funcion 



			function modificar_clasificacion($nombre,$descripcion,$id_realiza,$id){
			parent::conectar();
			$sql="CALL modificar_clasificacion_ev('".$descripcion."','".$nombre."',".$id.")";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}

		
		}//fin de funcion modificar subcategoria


		function check_clasificacion($id){
				parent::conectar();

				$sql="SELECT count(*) as N FROM competencias WHERE id_area=4 and clasificacion=$id";

			$record_consulta=$this->obj_con->Execute($sql);
                $N="";
    			 while(!$record_consulta->EOF){
    			 	$N=$record_consulta->fields["N"];
    			 	$record_consulta->MoveNext();
    			 }

    			 return $N;


		}//fin de funcion


		function eliminar_clasificacion($id){

		
			 parent::conectar();
			 	$sql="CALL eliminar_clasificacion_ev(".$id.",@estado)";
               //print_r(json_encode($sql));
			 	
			 	    if(!$this->obj_con->Execute($sql)){
			 	    	return false;

			 	    }else{

			 	    	return true;
			 	    }
			 	
		}// fin de funcion eliminar subcategoria


					

	
	
}


?>