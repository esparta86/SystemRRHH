<?php
class areasxActividad extends DBManager
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

/*
*  funcion que retorna las actividades segun area.
*
*
*/

  function get_actividades($id_area){
    parent::conectar();
    $sql="SELECT IDAREAXACTIVIDAD,ACTIVIDAD FROM areas_x_actividad WHERE ID_AREA=$id_area AND IDAREAXACTIVIDAD!=11 ORDER BY ACTIVIDAD";
    $record_consulta=$this->obj_con->Execute($sql);
        if($record_consulta->RecordCount()<=0){
                              $data1[]=array('idareaxactividad'=>'0','nombreactividad'=>'no hay actividades.');
                         }else{        
                       while(!$record_consulta->EOF){
                           $idarea=$record_consulta->fields["IDAREAXACTIVIDAD"];
                           $nactividad=$record_consulta->fields["ACTIVIDAD"];
                           $data1[]=array('idareaxactividad'=>$idarea,'nombreactividad'=>$nactividad);
                           $record_consulta->MoveNext();
                       }
                     }
               $respuesta= array('success' => true,'data'=>$data1);
              return $respuesta;        
  }/*fin de funcion*/

/*
*  funcion que retorn las actividades del area_a tomando como entrada id
*  los valores de los id : 1,2,3,4 y 8 son valores almacenas en la bd
*
*/
function get_areas_a($id){
    parent::conectar();
    $area_id=0;

    if($id==4||$id==1||$id==3||$id==2||$id==8){
      $area_id=11;

    }else{
    $area_id=$id;
    }
    $sql="SELECT ID_AREA_A,NOMBREAREAS FROM areas_a WHERE IDAREAXACTIVIDAD=$area_id ORDER BY NOMBREAREAS";
    $record_consulta=$this->obj_con->Execute($sql);
        if($record_consulta->RecordCount()<=0){
                              $data1[]=array('idareaa'=>'0','nombreareaa'=>'no hay actividades.');
                         }else{        
                       while(!$record_consulta->EOF){
                           $id=$record_consulta->fields["ID_AREA_A"];
                           $narea=$record_consulta->fields["NOMBREAREAS"];
                           $data1[]=array('idareaa'=>$id,'nombreareaa'=>$narea);
                           $record_consulta->MoveNext();
                          }
                     }
               $respuesta= array('success' => true,'data'=>$data1);
              return $respuesta;        
  }/*fin de funcion*/  

	
}


