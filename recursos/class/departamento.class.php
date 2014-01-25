<?php

/**
* 
*/
class Departamento extends DBManager
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
    		function  verificar_depto($nombreDpto,$id_realiza){
    			parent::conectar();
    			$sql="SELECT COUNT(ID_DPTO) AS N FROM `view_departamentos` WHERE ID_REALIZA='$id_realiza' and NOMBREDPTO like '$nombreDpto%'";
    			$record_consulta=$this->obj_con->Execute($sql);
                $N="";
    			 while(!$record_consulta->EOF){
    			 	$N=$record_consulta->fields["N"];
    			 	$record_consulta->MoveNext();
    			 }

    			 return $N;

    		}

		   function ver_departamentos($id_realiza)//para identificar el proceso.
					{
					    parent::conectar();
					    $sql="SELECT * FROM `view_departamentos` WHERE ID_REALIZA='$id_realiza' ORDER BY NOMBREDPTO";
					    

					    $record_consulta = $this->obj_con->Execute($sql);
						

					        while (!$record_consulta->EOF)
					        {
					           $id_dpto=$record_consulta->fields["ID_DPTO"];
					           $nombreDepartamento = $record_consulta->fields["NOMBREDPTO"];
						       
						       $data1[] = array('id_dpto'=>$id_dpto,'departamento' => $nombreDepartamento);
					              
					               $record_consulta->MoveNext();
					         }
					         
					      $repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;
					       
					}

function ver_departamentosnine_box($id_realiza)//para identificar el proceso.
					{
					    parent::conectar();
					    $sql="SELECT ID_DPTO,NOMBREDPTO FROM `view_departamentos` WHERE ID_REALIZA=25 UNION select 0 as ID_DPTO,'Toda la empresa' AS NOMBREDPTO ORDER BY NOMBREDPTO";
					    
					    $record_consulta = $this->obj_con->Execute($sql);
						

					        while (!$record_consulta->EOF)
					        {
					           $id_dpto=$record_consulta->fields["ID_DPTO"];
					           $nombreDepartamento = $record_consulta->fields["NOMBREDPTO"];
						       
						       $data1[] = array('id_dpto'=>$id_dpto,'departamento' => $nombreDepartamento);
					              
					               $record_consulta->MoveNext();
					         }
					         
					      $repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;
					       
					}		  

					

		function guardar_departamento($nombreEmpresa,$id_realiza){
			parent::conectar();
			$sql="CALL guardar_departamento('".$nombreEmpresa."',".$id_realiza.")";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}

		
		}//fin de funcion guardar empresa



		function modificar_departamento($nombredepto,$id_realiza,$id_dpto){
			parent::conectar();
			$sql="CALL modificar_departamento('".$nombredepto."',".$id_realiza.",".$id_dpto.")";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}

		
		}//fin de funcion guardar departamento

		function verificar_departamento($id_dpto){
			parent::conectar();
			$sql="SELECT count(IDCARGO) as N FROM `cargo` where ID_DPTO=$id_dpto";

			$record_consulta=$this->obj_con->Execute($sql);
                $N="";
    			 while(!$record_consulta->EOF){
    			 	$N=$record_consulta->fields["N"];
    			 	$record_consulta->MoveNext();
    			 }

    			 return $N;

		}


		function eliminar_departamento($id_dpto){

		
			 parent::conectar();
			 	$sql="CALL eliminar_departamento(".$id_dpto.",@estado)";
               //print_r(json_encode($sql));
			 	
			 	    if(!$this->obj_con->Execute($sql)){
			 	    	return false;

			 	    }else{

			 	    	return true;
			 	    }
			 	
							

			 	



		}

	
	
}


?>