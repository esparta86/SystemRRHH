<?php
class actividades extends DBManager
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
* funcion que guarda una actividad ingresada de un empleado
*
*
*/
  function guardar_actividad($opcion,$codigoempleado,$id_actividad,$id_especializacion,$id_tema,$t_tema,$t_area_en,$FRevision,$FPInicio,$FPFinal,$FRInicio,$FRFinal,$inicio,$final,$coment,$idreponsable){
  parent::conectar();
  $idopcion=$this->get_idopcion($opcion,$codigoempleado);
  $FRevision_S=$this->set_standarDate($FRevision);
  $FPInicio_S=$this->set_standarDate($FPInicio);
  $FPFinal_S=$this->set_standarDate($FPFinal);
  if($FRInicio!=0){
          $FRInicio_S=$this->set_standarDate($FPInicio_S);
        }else{
          $FRInicio_S='';
        }

  if($FRFinal!=0){
        $FRFinal_S=$this->set_standarDate($FRFinal);
      }else{
        $FRFinal_S='';
      }
  $color=$this->get_color($inicio,$final,$FRevision,$FPInicio_S,$FPFinal_S,$FRInicio_S,$FRFinal_S);
  $iniciado=0;
  $finalizado=0;

  if($inicio=='true'){
     $iniciado=1;
  } 
  if($final=='true'){
     $finalizado=1;
  }

        $sql="CALL registraactividad($idopcion,$id_actividad,$id_especializacion,$id_tema,'$t_tema','$t_area_en','$FRevision_S','$FPInicio_S','$FPFinal_S','$FRInicio_S','$FRFinal_S',$iniciado,$finalizado,'$coment','$color',$idreponsable)";
        

        if(!$this->obj_con->Execute($sql)){
          return false;
  
        }else{
          return true;
        }
  
          
  }/*fin de funcion*/

 /*
 *  funcion que recupera el idopcion de un empleado con una opcion seleccionada.
 *
 *
 */
function get_idopcion($opcion,$codigoempleado){
parent::conectar();
 $sql="SELECT ID_OPCIONES FROM opciones_empleado WHERE OPCION=$opcion AND CODIGOEMPLEADO='$codigoempleado'";
 $record_consulta=$this->obj_con->Execute($sql);
 $id_opcion=0;
 if($record_consulta->RecordCount()<=0){
     return $id_opcion;
    }else{
            while(!$record_consulta->EOF){
                           $id_opcion=$record_consulta->fields["ID_OPCIONES"];
                           $record_consulta->MoveNext();
                       }
       return $id_opcion;      
    }

}/* fin de funcion */


/*
* funcion que recupera el color a guardar dependiendo de las variables.
*
*/

function get_color($sinini,$sinfini,$fecharevision,$fechaini,$fechafin,$fecharealini,$fecharealfin)
{
$color ="";
    
    if (($sinini=='true') && ($sinfini=='true') && (($fecharevision>=$fechafin))) {
          $color = '#c00000';
    }
    if (($sinini=='true') && ($sinfini=='true') && (($fecharevision>=$fechaini)) && (($fecharevision<$fechafin))) {
          $color = '#c0504d';
    }
    if (($sinini=='true') && ($sinfini=='true') && (($fechaini>=$fecharevision))) { 
          $color = '#d99795';
    }
    
    if (($fecharealini!=0) && ($sinfini=='true') && (($fecharealini>=$fechafin))) {
            $color = '#f79646';
    } 
    if (($fecharealini!=0) && ($sinfini=='true') && (($fecharealini>$fechaini))&&(($fecharealini<$fechafin))) {
            $color = '#fac090';
    } 
    if (($fecharealini!=0) && ($sinfini=='true') && (($fechaini>=$fecharealini))) {
            $color = '#fcd5b4';
    } 
    
    if (($fecharealini!='')&&($fecharealfin!=0)&&(($fecharealini>$fechafin))){
      $color = '#c2d69a';
    }
    if (($fecharealini!=0)&&($fecharealfin!=0)&&(($fechafin>$fecharealini))&&(($fechafin<$fecharealfin))){ 
      $color = '#75923c';
    }
    if (($fecharealini!=0)&&($fecharealfin!=0)&&(($fecharealfin<=$fechafin))){ 
      $color = '#4f6228';
    }
    
    return $color;


}
/*fin de la funcion*/


/*
*   setea una fecha al formato de mysql
*
*/
function set_standarDate($fecha){
  return  date("Y-m-d",strtotime($fecha));
}/*fin de funcion*/

/*
* funcion que obtiene las actividades de un empleado 
* codigoempleado= idempleado
* opcion = 1 |2 o 3
* area = 1 (conocimiento), 2 (habilidades), 3(experiencia)
*/

function get_actividades($codigoempleado,$opcion,$area){
  parent::conectar();
  $sql="SELECT * FROM view_actividades WHERE codigoempleado='$codigoempleado' AND opcion=$opcion AND  IDAREAXACTIVIDAD IN (SELECT IDAREAXACTIVIDAD FROM areas_x_actividad WHERE ID_AREA=$area AND IDAREAXACTIVIDAD!=11 ORDER BY ACTIVIDAD)";
  $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[] = array('idactividad'=>0,'id_opciones'=>0,'idareaxactividad'=>0,'nombreactividad'=>'sin registros','idareaa'=>0,'nombreareas'=>'sin registros','idtemaxarea'=>0,'temaxarea'=>'sin registros','idcargo'=>0,'responsable'=>'sin registros','tema'=>'sin registros','area_en'=>'sin registros','fechaRevision'=>'','fechaini'=>'','fechafin'=>'','fecharealinicio'=>'','fecharealfin'=>'','sininiciar'=>0,'tsinsiniciar'=>'sin registros','sinfinalizar'=>0,'tsinfinalizar'=>'sin registros','comentario'=>'sin registros','estado'=>'');
    }else{
  while(!$record_consulta->EOF){
    $idactividad=$record_consulta->fields["ID_ACTIVIDAD"];
    $idopcion=$record_consulta->fields["ID_OPCIONES"];
    $idareaxactividad=$record_consulta->fields["IDAREAXACTIVIDAD"];
    $nombreactivi=$record_consulta->fields["nombreactividad"];
    $idareaa=$record_consulta->fields["ID_AREA_A"];
    $nombrearea=$record_consulta->fields["nombreareas"];
    $idtxarea=$record_consulta->fields["idtemaxarea"];
    $txarea=$record_consulta->fields["temaxarea"];
    $cargoId=$record_consulta->fields["IDCARGO"];
    $responsa=$record_consulta->fields["responsable"];
    $tem=$record_consulta->fields["tema"];
    $areaen=$record_consulta->fields["area_en"];
    $frevision=$record_consulta->fields["fecharevision"];
    $finicio=$record_consulta->fields["fechaini"];
    $ffin=$record_consulta->fields["fechafin"];
    $frinicio=$record_consulta->fields["fecharealinicio"];
    $frfinal=$record_consulta->fields["fecharealfin"];
    $inicio=$record_consulta->fields["sininiciar"];
    $t_iniciado=$record_consulta->fields["iniciado"];
    $final=$record_consulta->fields["sinfinalizar"];
    $t_finalizado=$record_consulta->fields["finalizado"];
    $comentarios=$record_consulta->fields["comentario"];
    $color=$record_consulta->fields["estado"];
    $masi=$record_consulta->fields["MASIVO"];
    $data1[] = array('idactividad'=>$idactividad,'idopciones'=>$idopcion,'idareaxactividad'=>$idareaxactividad,'nombreactividad'=>$nombreactivi,'idareaa'=>$idareaa,'nombreareas'=>$nombrearea,'idtemaxarea'=>$idtxarea,'temaxarea'=>$txarea,'idcargo'=>$cargoId,'responsable'=>$responsa,'tema'=>$tem,'area_en'=>$areaen,'fechaRevision'=>$frevision,'fechaini'=>$finicio,'fechafin'=>$ffin,'fecharealinicio'=>$frinicio,'fecharealfin'=>$frfinal,'sininiciar'=>$inicio,'tsininiciar'=>$t_iniciado,'sinfinalizar'=>$final,'tsinfinalizar'=>$t_finalizado,'comentario'=>$comentarios,'estado'=>$color,'masivo'=>$masi);
    $record_consulta->MoveNext();
  }
}

$repuesta = array('success'=>true,'data'=>$data1); 
return $repuesta;


}/*fin de funcion*/

/*
*  funcion que permite actualizar una actividad
*
*
*/



function update_actividad($opcion,$codigoempleado,$id_actividad,$id_especializacion,$id_tema,$t_tema,$t_area_en,$FRevision,$FPInicio,$FPFinal,$FRInicio,$FRFinal,$inicio,$final,$coment,$idreponsable,$idactivity,$opcionId){
  parent::conectar();
  //$idopcion=$this->get_idopcion($opcion,$codigoempleado);
  $FRevision_S=$this->set_standarDate($FRevision);
  $FPInicio_S=$this->set_standarDate($FPInicio);
  $FPFinal_S=$this->set_standarDate($FPFinal);
  if($FRInicio!=0){
          $FRInicio_S=$this->set_standarDate($FPInicio_S);
        }else{
          $FRInicio_S='';
        }

  if($FRFinal!=0){
        $FRFinal_S=$this->set_standarDate($FRFinal);
      }else{
        $FRFinal_S='';
      }
  $color=$this->get_color($inicio,$final,$FRevision,$FPInicio_S,$FPFinal_S,$FRInicio_S,$FRFinal_S);
  $iniciado=0;
  $finalizado=0;

  if($inicio=='true'){
     $iniciado=1;
  } 
  if($final=='true'){
     $finalizado=1;
  }
        $sql="CALL updateactividad($id_actividad,$id_especializacion,$id_tema,'$t_tema','$t_area_en','$FRevision_S','$FPInicio_S','$FPFinal_S','$FRInicio_S','$FRFinal_S',$iniciado,$finalizado,'$coment','$color',$idreponsable,$idactivity)";
        
     if(!$this->obj_con->Execute($sql)){
          return false;
  
        }else{
          return true;
        }
        
  
          
  }/*fin de funcion*/

/*
*
* funcion que elimina una actividad.
*
*
*/
function eliminar_actividades($id){
        parent::conectar();
        $sql="CALL eliminar_actividad($id)";
       if(!$this->obj_con->Execute($sql)){
              return false;
            }else{
              return true;
            }
}// fin de funcion eliminar 



	
}


