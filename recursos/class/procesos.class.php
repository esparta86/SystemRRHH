<?php

/**
* 
*/
class Proceso extends DBManager
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


		   function ver_procesos()
					{
					    parent::conectar();
					    $sql="SELECT IDPROCESO,NOMBREPROCESO FROM proceso where IDPROCESO!=6";
					    $record_consulta = $this->obj_con->Execute($sql);
					        while (!$record_consulta->EOF)
					        {
					           $idproceso = $record_consulta->fields["IDPROCESO"];
						       $nombreProceso = $record_consulta->fields["NOMBREPROCESO"];
						       $data1[] = array('idproceso' => $idproceso,'nombreproceso'=>$nombreProceso);
				               $record_consulta->MoveNext();
					         }
					       return $data1;
					}// fin de funcion

/*
*
*
*
*/

function ver_procesos_evaluacion()
					{
					    parent::conectar();
					    $sql="SELECT IDPROCESO,NOMBREPROCESO FROM proceso WHERE IDPROCESO<4";
					    $record_consulta = $this->obj_con->Execute($sql);
					        while (!$record_consulta->EOF)
					        {
					           $idproceso=$record_consulta->fields["IDPROCESO"];
						       $nombreProceso=$record_consulta->fields["NOMBREPROCESO"];
						       $data1[] = array('idproceso' => $idproceso,'nombreproceso'=>$nombreProceso);
				               $record_consulta->MoveNext();
					         }
					         $repuesta = array('success'=>true,'data'=>$data1); 
					       return $repuesta;
					}	



		 function ver_procesos_empresa($idempresa){
		 	/** listar procesos de una empresa */
		 	parent::conectar();
		 	$sql="SELECT id_realiza, concat(nombreproceso,' DEL ',IFNULL(fechainicio,'SIN FECHA'),' AL ',IFNULL(fechafin,'SIN FECHA') )  AS procesos FROM `showempresas_p`  where idempresa=$idempresa";

		 	$record_consulta=$this->obj_con->Execute($sql);

		 	if($record_consulta->RecordCount()<=0){
		 							    		 $data1[] = array('id_realiza'=>0,'nombre_proceso' =>'Sin registros');
					    	}else{
                
		 	     while(!$record_consulta->EOF)
		 	     {
		 	     	$id_real=$record_consulta->fields["id_realiza"];
		 	     	$nombreP=$record_consulta->fields["procesos"];
		 	     	$data1[] = array('idrealiza' => $id_real,'nombre_proceso'=>$nombreP);
		 	     	$record_consulta->MoveNext();

		 	     }

		 	 }
		 	     $repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;


		 }//fin de funcion


		 function verificaProceso($id_realiza){
		 	parent::conectar();
		 	$sql="SELECT idproceso FROM `showempresas_p` where id_realiza=$id_realiza";
		 	$record_consulta=$this->obj_con->Execute($sql);

			while(!$record_consulta->EOF)
		 	     {
		 	     	$id_p=$record_consulta->fields["IDPROCESO"];
		 	     	
		 	     	$record_consulta->MoveNext();

		 	     }		 	
		 	     
		 	     return $id_p;


		 }


	
	
}


?>