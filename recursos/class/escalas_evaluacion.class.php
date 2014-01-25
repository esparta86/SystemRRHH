<?php

/**
* 
*/
class EscalasEvaluacion extends DBManager
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
    function listar_escalas(){
    	parent::conectar();

    	$sql="SELECT ID_ESCALA,CONCAT('Escala: limite inferior :',LIMITEI1,'-',LIMITEI2,' limite superior ',
LIMITES1,'-',LIMITES2) AS nombre,
(case  when LIMITES2=0 then LIMITES1 when LIMITES2!=0 then  LIMITES2  END) AS LIMITE FROM escalas_evaluacion";

  
					    $record_consulta = $this->obj_con->Execute($sql);

				  if($record_consulta->RecordCount()<=0){
				                  $data1[] = array('idescala'=>0,'nombre','-','n_after'=>0);
				                }else{					    
						
					        while (!$record_consulta->EOF)
					        {
					           $id=$record_consulta->fields["ID_ESCALA"];
					           $nombre=$record_consulta->fields["nombre"];
                     $limite=$record_consulta->fields["LIMITE"];
					     	   
				           		       				       
						       $data1[] = array('idescala'=>$id,'nombreescala'=>$nombre,'n_after'=>$limite);
					              
					           $record_consulta->MoveNext();
					         }
					         }    	

							$repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;					         


    }/* fin de funcion*/



/*
*  FUNCION QUE GUARDA LA NUEVA ESCALA DE EVALUACION SELECCIONADA 
* @escala parametro del id de escala.
* @id_realiza parametro que obtiene el id del proceso de la empresa.
*/
     function guardar_escala($escala,$id_realiza){
          parent::conectar();
         

      /* valor N  before guarda el max del actual  */   
      $sql2="SELECT (case  when LIMITES2=0 then LIMITES1 when LIMITES2!=0 then  LIMITES2  END) AS LIMITE FROM `view_escalasxempresa` WHERE ID_REALIZA=$id_realiza";
          $record_consulta2=$this->obj_con->Execute($sql2);     
          $N_before=0; /* almacena el limite de la escala*/
      while(!$record_consulta2->EOF){
            $N_before=$record_consulta2->fields["LIMITE"];
            $record_consulta2->MoveNext();
           }  



          $sql="CALL guardar_escala($escala,$id_realiza)";
          if(!$this->obj_con->Execute($sql)){
            return false;
    
          }else{
                /* OBTENER N after*/
              $sql3="SELECT (case  when LIMITES2=0 then LIMITES1 when LIMITES2!=0 then  LIMITES2  END) AS LIMITE FROM `view_escalasxempresa` WHERE ID_REALIZA=$id_realiza";
                $record_consulta3=$this->obj_con->Execute($sql3);     
                $N_after=0; /* almacena el limite de la escala*/
            while(!$record_consulta3->EOF){
                  $N_after=$record_consulta3->fields["LIMITE"];
                  $record_consulta3->MoveNext();
                 }        

                  if($N_before>$N_after){
                      $diferencia=$N_before-$N_after;
                  
                      $DATA=$this->getIdCompetencia($id_realiza);
                     
                      for($k=0;$k<count($DATA);$k++){
                        $competenciaTemp=$DATA[$k];
                                for($g=0;$g<$diferencia;$g++){
                                   $valor_eliminar=$this->getMaxValor($competenciaTemp);
                                     $this->eliminar_valor($valor_eliminar,$competenciaTemp);

                                }



                      }

                       


                  }





            return true;
          }
    
         }/* fin de la funcion*/


/* 
* Funcion que obtiene el numero de valores que describira por competencia de acuerdo a la escala de ponderacion
* la primera vez que se agregue una competencia.
*
*/
   function obtener_valorxescala($id_realiza){
   	parent::conectar();

    $sql="SELECT (case  when LIMITES2=0 then LIMITES1 when LIMITES2!=0 then  LIMITES2  END) AS LIMITE FROM `view_escalasxempresa` WHERE ID_REALIZA=$id_realiza";
    $record_consulta=$this->obj_con->Execute($sql);     
    $N=0; /* almacena el limite de la escala*/
			while(!$record_consulta->EOF){
    			 	$N=$record_consulta->fields["LIMITE"];
    			 	$record_consulta->MoveNext();
    			 }   


   for($i=0;$i<$N;$i++){
     $data1[] = array('idvalor'=>($i+1),'descripcion'=>' ');
     }

    $repuesta = array('success'=>true,'data'=>$data1); 

    return $repuesta;



            


   }/* fin de funcion */



   function getIdCompetencia($id_realiza){
    parent::conectar();

    $sql="SELECT ID_COMPETENCIA  FROM `view_competencias_ev` WHERE ID_REALIZA=$id_realiza AND ID_COMPETENCIA IN(SELECT DISTINCT(ID_COMPETENCIA) FROM valoracion) ORDER BY ID_COMPETENCIA";

    $record_consulta=$this->obj_con->Execute($sql);     
    
    $competencias[]="";
    $i=0;
      while(!$record_consulta->EOF){
            $competencias[$i]=$record_consulta->fields["ID_COMPETENCIA"];
            $record_consulta->MoveNext();
            $i++;
           }    

    return $competencias;

   }/* fin de funcion*/


   function getMaxValor($id_competencia){
    parent::conectar();

     $sql="SELECT MAX(VALOR) AS VALOR FROM `valoracion` WHERE ID_COMPETENCIA=$id_competencia";

    $record_consulta=$this->obj_con->Execute($sql);     
    $max=0;
   
      while(!$record_consulta->EOF){
            $max=$record_consulta->fields["VALOR"];
            $record_consulta->MoveNext();
            }    

    return $max;

   }/* fin de funcion*/



    function eliminar_valor($valor,$competencia_id){
       parent::conectar();
        $sql="CALL eliminar_valor(".$valor.",".$competencia_id.")";
                       
            if(!$this->obj_con->Execute($sql)){
              return false;

            }else{

              return true;
            }
        
    }// fin de funcion eliminar 



   


   

					

	
	
}


?>