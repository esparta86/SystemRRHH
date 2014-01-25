<?php
class actividadesMasivas extends DBManager
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
  function guardar_actividadMasiva($competencias,$id_actividad,$id_especializacion,$id_tema,$t_tema,$t_area_en,$FRevision,$FPInicio,$FPFinal,$FRInicio,$FRFinal,$inicio,$final,$coment,$idreponsable){
  parent::conectar();
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
$sql="CALL registraactividadmasiva($id_actividad,$id_especializacion,$id_tema,'$t_tema','$t_area_en','$FRevision_S','$FPInicio_S','$FPFinal_S','$FRInicio_S','$FRFinal_S',$iniciado,$finalizado,'$coment','$color',$idreponsable)";
      if(!$this->obj_con->Execute($sql)){
         return false; 
        }else{
          $idmasivo=$this->get_id_masivo();
          $this->registrar_competencias_masivos($competencias,$idmasivo);/*registramos las competencias y la actividad masiva*/
          $this->registrar_actividadxempleado($competencias,1,$idmasivo,$id_actividad,$id_especializacion,$id_tema,$t_tema,$t_area_en,$FRevision_S,$FPInicio_S,$FPFinal_S,$FRInicio_S,$FRFinal_S,$iniciado,$finalizado,$coment,$color,$idreponsable);/*opcion 1*/
          $this->registrar_actividadxempleado($competencias,2,$idmasivo,$id_actividad,$id_especializacion,$id_tema,$t_tema,$t_area_en,$FRevision_S,$FPInicio_S,$FPFinal_S,$FRInicio_S,$FRFinal_S,$iniciado,$finalizado,$coment,$color,$idreponsable);/*opcion 2*/
          $this->registrar_actividadxempleado($competencias,3,$idmasivo,$id_actividad,$id_especializacion,$id_tema,$t_tema,$t_area_en,$FRevision_S,$FPInicio_S,$FPFinal_S,$FRInicio_S,$FRFinal_S,$iniciado,$finalizado,$coment,$color,$idreponsable);/*opcion 3*/
          return true;
        }
  }/*fin de funcion*/

/*
*
*  funcion que almacena las actividades masivas x empleado
*  - determina los empleados que tienen brecha en las competencias seleccionadas
*  - ingresa una actividad por empleado y registra de que id_masivo es.
*/
function registrar_actividadxempleado($competencias,$opcion,$idmasivo,$id_actividad,$id_especializacion,$id_tema,$t_tema,$t_area_en,$FRevision_S,$FPInicio_S,$FPFinal_S,$FRInicio_S,$FRFinal_S,$iniciado,$finalizado,$coment,$color,$idreponsable){
parent::conectar();
foreach ($competencias as $item => $valor) {
          if(is_array($valor)){
                  foreach ($valor as $item2 => $idcompetencia) {
                        $sql="SELECT opciones_empleado.ID_OPCIONES FROM competenciasxempleado 
                        INNER JOIN opciones_empleado ON(competenciasxempleado.CODIGOEMPLEADO=opciones_empleado.CODIGOEMPLEADO)
                        INNER JOIN competenciasxcargo ON(opciones_empleado.IDCARGO=competenciasxcargo.IDCARGO AND 
                        competenciasxempleado.ID_COMPETENCIA=competenciasxcargo.ID_COMPETENCIA)
                        WHERE competenciasxempleado.ID_COMPETENCIA=$idcompetencia AND EVALUADOR='XX010101'
                        AND VALORR IS NOT NULL AND OPCION=$opcion AND (VALORR-VALORDESEABLE)<0";
                        $record_consulta=$this->obj_con->Execute($sql);
                        if($record_consulta->RecordCount()<=0){
                               }else{
                                    while (!$record_consulta->EOF) {
                                        $idopcion=$record_consulta->fields["ID_OPCIONES"];
                                        $sql2="CALL registraactividadxempleado($idopcion,$id_actividad,$id_especializacion,$id_tema,'$t_tema','$t_area_en','$FRevision_S','$FPInicio_S','$FPFinal_S','$FRInicio_S','$FRFinal_S',$iniciado,$finalizado,'$coment','$color',$idreponsable,$idmasivo)";
                                        $this->obj_con->Execute($sql2);
                                        $record_consulta->MoveNext();
                                    }
                                    
                               }                        
                  }
          }else{
                        $sql="SELECT opciones_empleado.ID_OPCIONES FROM competenciasxempleado 
                        INNER JOIN opciones_empleado ON(competenciasxempleado.CODIGOEMPLEADO=opciones_empleado.CODIGOEMPLEADO)
                        INNER JOIN competenciasxcargo ON(opciones_empleado.IDCARGO=competenciasxcargo.IDCARGO AND 
                        competenciasxempleado.ID_COMPETENCIA=competenciasxcargo.ID_COMPETENCIA)
                        WHERE competenciasxempleado.ID_COMPETENCIA=$valor AND EVALUADOR='XX010101'
                        AND VALORR IS NOT NULL AND OPCION=$opcion AND (VALORR-VALORDESEABLE)<0";
                        $record_consulta=$this->obj_con->Execute($sql);
                        if($record_consulta->RecordCount()<=0){
                        }else{
                            while(!$record_consulta->EOF){
                                        $idopcion=$record_consulta->fields["ID_OPCIONES"];
                                        $sql2="CALL registraactividadxempleado($idopcion,$id_actividad,$id_especializacion,$id_tema,'$t_tema','$t_area_en','$FRevision_S','$FPInicio_S','$FPFinal_S','$FRInicio_S','$FRFinal_S',$iniciado,$finalizado,'$coment','$color',$idreponsable,$idmasivo)";
                                        $this->obj_con->Execute($sql2);
                                        $record_consulta->MoveNext();
                            }

                        }

          }
     }
}/*fin de funcion*/

/*
*  funcion que almancena en la tabla competencias_masivos
*  el id_masivo y el id_competencia de una actividad
*
*
*/
function registrar_competencias_masivos($competencias,$idmasivo){
parent::conectar();
foreach ($competencias as $item => $valor) {
          if(is_array($valor)){
                  foreach ($valor as $item2 => $valor2) {
                        $sql="CALL guardar_competencias_masivos($valor2,$idmasivo)";
                        $this->obj_con->Execute($sql);
                  }
          }else{
               $sql="CALL guardar_competencias_masivos($valor,$idmasivo)";
               $this->obj_con->Execute($sql);
          }
     
     }
}/* fin de la funcion */

/*
* retorna el ultimo id masivo generado
*
*/
  function get_id_masivo(){
  parent::conectar();
  $sql="SELECT MAX(ID_MASIVO) AS ID_MASIVO FROM actividades_masivas";
  $record_consulta=$this->obj_con->Execute($sql);
    if($record_consulta->RecordCount()<=0){
          return 0;
       }else{
            while (!$record_consulta->EOF) {
                $max=$record_consulta->fields["ID_MASIVO"];
                $record_consulta->MoveNext();
            }
            return $max;
       }
 
  }

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
    $data1[] = array('idactividad'=>$idactividad,'idopciones'=>$idopcion,'idareaxactividad'=>$idareaxactividad,'nombreactividad'=>$nombreactivi,'idareaa'=>$idareaa,'nombreareas'=>$nombrearea,'idtemaxarea'=>$idtxarea,'temaxarea'=>$txarea,'idcargo'=>$cargoId,'responsable'=>$responsa,'tema'=>$tem,'area_en'=>$areaen,'fechaRevision'=>$frevision,'fechaini'=>$finicio,'fechafin'=>$ffin,'fecharealinicio'=>$frinicio,'fecharealfin'=>$frfinal,'sininiciar'=>$inicio,'tsininiciar'=>$t_iniciado,'sinfinalizar'=>$final,'tsinfinalizar'=>$t_finalizado,'comentario'=>$comentarios,'estado'=>$color);
    $record_consulta->MoveNext();
  }
}

$repuesta = array('success'=>true,'data'=>$data1); 
return $repuesta;


}/*fin de funcion*/

/*
*  funcion que permite todo el proceso de  actualizar una actividad
*  1-  determina que competencias se eliminaran si no fueron chequeadas de nuevo
*  2-  registra las competencias nuevas.
*  3-  registra las actividades a cada empleado que posea una brecha en las competencias seleccionadas para la opcion 1, 2 y 3
*/
function update_actividadMasiva($idmasivo,$id_actividad,$id_especializacion,$id_tema,$t_tema,$t_area_en,$FRevision,$FPInicio,$FPFinal,$FRInicio,$FRFinal,$inicio,$final,$coment,$idreponsable,$competencias){
  parent::conectar();
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
        $sql="CALL updateactividadmasiva($id_actividad,$id_especializacion,$id_tema,'$t_tema','$t_area_en','$FRevision_S','$FPInicio_S','$FPFinal_S','$FRInicio_S','$FRFinal_S',$iniciado,$finalizado,'$coment','$color',$idreponsable,$idmasivo)";
        
     if(!$this->obj_con->Execute($sql)){
          return false;
        }else{
        $this->get_arrayCompetenciasSeleccionadas($competencias,$idmasivo);
        $this->registrar_competencias_masivos($competencias,$idmasivo);
        $this->registrar_actividadxempleado($competencias,1,$idmasivo,$id_actividad,$id_especializacion,$id_tema,$t_tema,$t_area_en,$FRevision_S,$FPInicio_S,$FPFinal_S,$FRInicio_S,$FRFinal_S,$iniciado,$finalizado,$coment,$color,$idreponsable);/*opcion 1*/
        $this->registrar_actividadxempleado($competencias,2,$idmasivo,$id_actividad,$id_especializacion,$id_tema,$t_tema,$t_area_en,$FRevision_S,$FPInicio_S,$FPFinal_S,$FRInicio_S,$FRFinal_S,$iniciado,$finalizado,$coment,$color,$idreponsable);/*opcion 2*/
        $this->registrar_actividadxempleado($competencias,3,$idmasivo,$id_actividad,$id_especializacion,$id_tema,$t_tema,$t_area_en,$FRevision_S,$FPInicio_S,$FPFinal_S,$FRInicio_S,$FRFinal_S,$iniciado,$finalizado,$coment,$color,$idreponsable);/*opcion 3*/
        return true;
        }
        
  
          
  }/*fin de funcion*/

/*
*  funcion que recibe las competencias seleccionadas
*  Verifica que las competencias previamente guardadas y las compara con las
*  nuevas seleccionadas y determina que competencia no fue seleccionada de nuevo
*  a esta competencia no seleccionada la elimina.
*/
function get_arrayCompetenciasSeleccionadas($competencias_seleccionadas,$idmasivo){
parent::conectar();
  $competenciasbefore=$this->get_competenciasActuales($idmasivo);
  for($i=0;$i<count($competenciasbefore);$i++){
      $eliminar=true;
      $id_competencia=$competenciasbefore[$i];
       foreach ($competencias_seleccionadas as $item => $valor) {
              if(is_array($valor)){
                    foreach ($valor as $k => $competenciaS) {
                                if($competenciaS==$id_competencia){
                                  $eliminar=false;/*se mantuvo seleccionada la competencia, no borrar*/
                                   }
                               }
              }else{
                     if($valor==$id_competencia){
                                  $eliminar=false;/*se mantuvo seleccionada la competencia, no borrar*/
                                  }
              }
       }/*fin de foreach 1*/
            if($eliminar){/*si true, eliminar la competencia*/
                $this->eliminar_competencia_actividad($id_competencia,$idmasivo);
            }
  }/*fin de for*/
}/*fin de funcion*/



/*
*  funcion que recupera las competencias actuales de una actividad masiva
*
*
*/
function  get_competenciasActuales($idmasivo){
parent::conectar();
$sql="SELECT ID_COMPETENCIA FROM competencias_actividadesmasivas WHERE ID_MASIVO=$idmasivo";
$record_consulta=$this->obj_con->Execute($sql);
      $competenciasbefore=array();
      $i=0;
       while(!$record_consulta->EOF){
        $id_competenciaAct=$record_consulta->fields["ID_COMPETENCIA"];
        $competenciasbefore[$i]=$id_competenciaAct;
        $record_consulta->MoveNext();
        $i++;
       }
       return $competenciasbefore;

}/*fin de funcion*/


/*
*
* funcion que elimina una actividad.
*
*
*/
function eliminar_actividadesMasiva($idmasivo){
        parent::conectar();
        $sql="CALL eliminar_actividadmasiva($idmasivo)";
       if(!$this->obj_con->Execute($sql)){
              return false;
            }else{
              return true;
            }
}// fin de funcion eliminar 


/*
*  funcion que elimina una competencia de una actividad masiva
*
*/

function eliminar_competencia_actividad($idcomp,$idmasivo){
        parent::conectar();
        $sql="CALL eliminar_competencia_actividad($idcomp,$idmasivo)";
       if(!$this->obj_con->Execute($sql)){
              return false;
            }else{
              return true;
            }
}// fin de funcion eliminar 


/*
* funcion que retorna un resumene de competencias, y numero de personas que tienen brecha negativa en una opcion.
*
*/
function get_competenciasEmpresa($id_realiza,$area){
parent::conectar();
$sql="SELECT ID_COMPETENCIA,NOMBRECOMPETENCIA,TIPOCOMPETENCIA,TIPO_COMPETENCIA,ID_AREA,IDPADRE,Subcategoria FROM  view_competencias_ev WHERE ID_AREA=$area AND ID_REALIZA=$id_realiza ORDER BY Subcategoria";
$record_consulta=$this->obj_con->Execute($sql);
while (!$record_consulta->EOF)
                  {
                     $competenciaId=$record_consulta->fields["ID_COMPETENCIA"];
                     $nombreComp=$record_consulta->fields["NOMBRECOMPETENCIA"];
                     $tipoComp=$record_consulta->fields["TIPO_COMPETENCIA"];
                     $nombreTipo=$record_consulta->fields["TIPOCOMPETENCIA"];
                     $areaId=$record_consulta->fields["ID_AREA"];
                     $padreId=$record_consulta->fields["IDPADRE"];
                     $subcategoria=$record_consulta->fields["Subcategoria"];
                     $n1=$this->getNumeroPersonas($competenciaId,1);
                     $n2=$this->getNumeroPersonas($competenciaId,2);
                     $n3=$this->getNumeroPersonas($competenciaId,3);
                     $data1[] = array('idcompetencia'=>$competenciaId,'nombrecompetencia'=>$nombreComp,'tipocompetencia'=>$tipoComp,'nombreTipo'=>$nombreTipo,'areaid'=>$areaId,'padreid'=>$padreId,'subcategoria'=>$subcategoria,'opcion1'=>$n1,'opcion2'=>$n2,'opcion3'=>$n3);
                     
                     $record_consulta->MoveNext();
                   }

        if(isset($data1)){
                    $respuesta= array('success' => true,'data'=>$data1,'area'=>$area);
                  }else{
                    $respuesta= array('success' =>false);
                  } 
                  return $respuesta;                  

}/*fin de la funcion*/


/*
*  funcion que retorna un numero (numero de empleados) que tienen brecha negativa en una determinada
*  competencia y determinada opcion
*  @idcomp = id de la competencia
*  @opc    = opcion 1,2 o 3
*/
function getNumeroPersonas($idcomp,$opc){
parent::conectar();
$sql="SELECT competenciasxempleado.ID_COMPETENCIA,competenciasxcargo.IDCARGO,competenciasxempleado.CODIGOEMPLEADO,OPCION,(VALORR-VALORDESEABLE) AS 
BRECHA FROM competenciasxempleado 
INNER JOIN opciones_empleado ON(competenciasxempleado.CODIGOEMPLEADO=opciones_empleado.CODIGOEMPLEADO)
INNER JOIN competenciasxcargo ON(opciones_empleado.IDCARGO=competenciasxcargo.IDCARGO AND 
competenciasxempleado.ID_COMPETENCIA=competenciasxcargo.ID_COMPETENCIA)
WHERE competenciasxempleado.ID_COMPETENCIA=$idcomp AND EVALUADOR='XX010101'
AND VALORR IS NOT NULL AND OPCION=$opc AND (VALORR-VALORDESEABLE)<0";
$record_consulta=$this->obj_con->Execute($sql);
 if($record_consulta->RecordCount()<=0){
     return 0;
     }else{
      return $record_consulta->RecordCount();
     }
}/*fin de funcion*/


/*
* funcion que obtiene las actividades de un empleado 
* codigoempleado= idempleado
* opcion = 1 |2 o 3
* area = 1 (conocimiento), 2 (habilidades), 3(experiencia)
*/

function get_actividadesMasivas($id_realiza,$idarea){
  parent::conectar();
  $sql="SELECT * FROM view_actividades_masivas WHERE  IDAREAXACTIVIDAD IN (SELECT IDAREAXACTIVIDAD FROM areas_x_actividad WHERE ID_AREA=$idarea AND IDAREAXACTIVIDAD!=11 ORDER BY ACTIVIDAD) AND ID_REALIZA=$id_realiza";
  $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[] = array('idmasivo'=>0,'idareaxactividad'=>0,'nombreactividad'=>'sin registros','idareaa'=>0,'nombreareas'=>'sin registros','idtemaxarea'=>0,'temaxarea'=>'sin registros','idcargo'=>0,'responsable'=>'sin registros','tema'=>'sin registros','area_en'=>'sin registros','fechaRevision'=>'','fechaini'=>'','fechafin'=>'','fecharealinicio'=>'','fecharealfin'=>'','sininiciar'=>0,'tsinsiniciar'=>'sin registros','sinfinalizar'=>0,'tsinfinalizar'=>'sin registros','comentario'=>'sin registros','estado'=>'');
    }else{
  while(!$record_consulta->EOF){
    $idmasivo=$record_consulta->fields["ID_MASIVO"];
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
    $data1[] = array('idmasivo'=>$idmasivo,'idareaxactividad'=>$idareaxactividad,'nombreactividad'=>$nombreactivi,'idareaa'=>$idareaa,'nombreareas'=>$nombrearea,'idtemaxarea'=>$idtxarea,'temaxarea'=>$txarea,'idcargo'=>$cargoId,'responsable'=>$responsa,'tema'=>$tem,'area_en'=>$areaen,'fechaRevision'=>$frevision,'fechaini'=>$finicio,'fechafin'=>$ffin,'fecharealinicio'=>$frinicio,'fecharealfin'=>$frfinal,'sininiciar'=>$inicio,'tsininiciar'=>$t_iniciado,'sinfinalizar'=>$final,'tsinfinalizar'=>$t_finalizado,'comentario'=>$comentarios,'estado'=>$color);
    $record_consulta->MoveNext();
  }
}

$repuesta = array('success'=>true,'data'=>$data1); 
return $repuesta;
}/*fin de funcion*/




}