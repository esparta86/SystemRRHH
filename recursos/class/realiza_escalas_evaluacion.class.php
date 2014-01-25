<?php

/**
* 
*/
class realizaEscalasEvaluacion extends DBManager
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

/* obtiene las valoraciones por cada competencia y su descripcion*/
    function obtener_escala_empresa($id_realiza){
    	parent::conectar();

    	$sql="SELECT escalas_evaluacion.ID_ESCALA,CONCAT('Escala: limite inferior :',LIMITEI1,'-',LIMITEI2,' limite superior ',
LIMITES1,'-',LIMITES2) AS nombre,
(case  when LIMITES2=0 then LIMITES1 when LIMITES2!=0 then  LIMITES2  END) AS LIMITE FROM escalas_evaluacion INNER JOIN realiza_escalas_evaluacion on(escalas_evaluacion.ID_ESCALA=realiza_escalas_evaluacion.ID_ESCALA) WHERE ID_REALIZA=$id_realiza";

  
					    $record_consulta = $this->obj_con->Execute($sql);

  if($record_consulta->RecordCount()<=0){
                  $data1[] = array('idescala'=>0,'nombreescala'=>'NO ha seleccionado','n_now'=>0);
                }else{					    
						
					        while (!$record_consulta->EOF)
					        {
					           $id=$record_consulta->fields["ID_ESCALA"];
					     	   $nombre=$record_consulta->fields["nombre"];
					     	   $limite=$record_consulta->fields["LIMITE"];
				           		       				       
						       $data1[] = array('idescala'=>$id,'nombreescala'=>$nombre,'n_now'=>$limite);
					              
					           $record_consulta->MoveNext();
					         }
					         }    	

							$repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;					         


    }/* fin de funcion*/


					

	
	
}


?>