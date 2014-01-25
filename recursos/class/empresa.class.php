<?php

/**
* 
*/
class Empresa extends DBManager
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


		   function ver_empresas_procesos()
					{
					    parent::conectar();
					    $sql="SELECT * FROM  showempresas_p";
					    //$data1="";

					    $record_consulta = $this->obj_con->Execute($sql);
						

					        while (!$record_consulta->EOF)
					        {
					           $id_realiza=$record_consulta->fields["id_realiza"];
					           $idEmpresa = $record_consulta->fields["IDEMPRESA"];
						       $idproceso = $record_consulta->fields["IDPROCESO"];
						       $nombreEmpresa=$record_consulta->fields["NOMBREEMPRESA"];
						       $fechaI=$record_consulta->fields["FECHAINICIO"];
						       $fechaF=$record_consulta->fields["FECHAFIN"];
						       $imagen=$record_consulta->fields["imagen"];
						       $nombreP=$record_consulta->fields["NOMBREPROCESO"];
						       
						       //$data1[] = array('empresa' => $nombreEmpresa,'fechaI'=>$fechaI,'fechaF'=>$fechaF,'proceso'=>$nombreP,'img'=>$imagen);

						       $data1[] = array('idempresa'=>$id_realiza,'empresa' => utf8_encode($nombreEmpresa),'fechaI'=>$fechaI,'fechaF'=>$fechaF,'proceso'=>utf8_encode($nombreP));
					              
					               $record_consulta->MoveNext();
					         }
					         //ANTERIORMENTE NO HACIA ESTO PERO PENSE QUE AFECTABA EN ALGO POR EL [root] del STORE donde se define : data
					      $repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;
					       //return $data1;
					}

function listar_empresas(){
parent::conectar();
$sql="SELECT * FROM `empresa` ORDER BY NOMBREEMPRESA";
$record_consulta = $this->obj_con->Execute($sql);
while (!$record_consulta->EOF)
      {
       $idempre=$record_consulta->fields["IDEMPRESA"];
       $nombreE=$record_consulta->fields["NOMBREEMPRESA"];
       $data1[] = array('idempresa' => $idempre,'nombreempresa'=>$nombreE );
       $record_consulta->MoveNext();
       }
$repuesta = array('success'=>true,'data'=>$data1); 
return $repuesta;
}//fin de funcion






function listar_empresasxidrealiza(){
parent::conectar();
$sql="SELECT id_realiza,NOMBREEMPRESA FROM showempresas_p WHERE id_realiza!=1 ORDER BY NOMBREEMPRESA";
$record_consulta = $this->obj_con->Execute($sql);
while (!$record_consulta->EOF)
      {
       $idempre=$record_consulta->fields["id_realiza"];
       $nombreE=$record_consulta->fields["NOMBREEMPRESA"];
       $data1[] = array('idempresa' => $idempre,'nombreempresa'=>$nombreE );
       $record_consulta->MoveNext();
       }
$repuesta = array('success'=>true,'data'=>$data1); 
return $repuesta;
}//fin de funcion




					

		function guardar_empresa($nombreEmpresa,$idproceso,$fechaI,$fechaF,$imagen){
			parent::conectar();
			$sql="CALL guardar_empresa('".$nombreEmpresa."','".$fechaI."','".$fechaF."',".$idproceso.",'".$imagen."')";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}

		
		}//fin de funcion guardar empresa



		function modificar_empresa($idempresa,$nombreEmpresa,$idproceso,$fechaI,$fechaF,$imagen){
			parent::conectar();
			$sql="CALL modificar_empresa(".$idempresa.",'".$nombreEmpresa."','".$fechaI."','".$fechaF."',".$idproceso.",'".$imagen."')";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}

		
		}//fin de funcion guardar empresa

		


		function eliminarEmpresas($id_realiza){

			/*
             si  respuesta=1 no se elimino porq existe en departamento.
             si  respuesta=2 se elimino de la tabla realiza, si la empresa no tiene mas id_realiza tambien la elimina de la tabla empresa
             si  respuesta=0 NINGUN CAMBIO
			*/
			 parent::conectar();
			 	$sql="CALL eliminar_empresa(".$id_realiza.",@estado)";
               //print_r(json_encode($sql));
			 	
			 	    if(!$this->obj_con->Execute($sql)){
			 	    	return false;

			 	    }else{

			 	    	return true;
			 	    }
			 	
							

			 	



		}

	
	
}


?>