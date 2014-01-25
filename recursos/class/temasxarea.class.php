<?php
class temasxarea extends DBManager
{
	var  $con;
   function open_con()
    {
    	$this->con=parent::conectar();
	return $this->con;
    }

    function close_con()
    {
	parent::desconectar();
    }



  function get_temaxarea($id_area){
    parent::conectar();
    $sql="SELECT idtemaxarea,tema FROM temasxarea WHERE id_area_a=$id_area ORDER BY tema";
    $record_consulta=$this->obj_con->Execute($sql);
        if($record_consulta->RecordCount()<=0){
                              $data1[]=array('idtemaxarea'=>'0','temaxarea'=>'no hay temas.');
                         }else{        
                       while(!$record_consulta->EOF){
                           $idtema=$record_consulta->fields["idtemaxarea"];
                           $ntema=$record_consulta->fields["tema"];
                           $data1[]=array('idtemaxarea'=>$idtema,'temaxarea'=>$ntema);
                           $record_consulta->MoveNext();
                       }
                     }
               $respuesta= array('success' => true,'data'=>$data1);
              return $respuesta;        
  }/*fin de funcion*/

 

	
}


