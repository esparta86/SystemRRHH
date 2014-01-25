<?php
class opcionesEmpleado extends DBManager
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

/**************************************************************************************************
* Funcion que registra o actualiza las opciones de un empleado
* codigocargo : codigo del empleado
* opcion1     : codigo del cargo para opcion 1
* opcion2     : codigo del cargo para opcion 2
* opcion3     : codigo del cargo para opcion 3
**************************************************************************************************/
function updateOpcionesEmpleado($codigoEmpleado,$opcion1,$opcion2,$opcion3){
      parent::conectar();
 	 if($opcion1!=0){
       $sql="CALL updateOpcionesEmpleado('$codigoEmpleado',$opcion1,1)";
       if(!$this->obj_con->Execute($sql)){
        }else{/*se ejecuto*/
       }
     }
    if($opcion2!=0){
        $sql2="CALL updateOpcionesEmpleado('$codigoEmpleado',$opcion2,2)";
       if(!$this->obj_con->Execute($sql2)){
        }else{/*se ejecuto*/      }      
     }
    if($opcion3!=0){
      $sql3="CALL updateOpcionesEmpleado('$codigoEmpleado',$opcion3,3)";
             if(!$this->obj_con->Execute($sql3)){
              }else{/*se ejecuto*/
            }      
     }
     return true;    
}/* fin de funcion */

/**************************************************************************************************
* Funcion que obtiene la opcion de un empleado
* codigoempleado : codigo del empleado
* opcion     : la opcion 1 ,2 o 3
**************************************************************************************************/
function get_opcionEmpleado($codigoempleado,$opcion){
  parent::conectar();
  $sql="SELECT IDCARGO,(SELECT NOMBRECARGO FROM cargo WHERE IDCARGO=opciones_empleado.IDCARGO) AS CARGO FROM opciones_empleado
  WHERE CODIGOEMPLEADO='$codigoempleado' AND OPCION=$opcion LIMIT 0,1";
  $record_consulta=$this->obj_con->Execute($sql);
    if($record_consulta->RecordCount()<=0){
                               $data1[] = array('idcargo' =>0,'cargo'=>'Sin opcion');
                            }else{
              while (!$record_consulta->EOF)
                              {  
                              $cargoid=$record_consulta->fields["IDCARGO"];
                              $nombre=$record_consulta->fields["CARGO"];  
                              $data1[] = array('idcargo' =>$cargoid,'cargo'=>$nombre);
                              $record_consulta->moveNext(); 
                              }
                  }
                   $respuesta= array('success' => true,'data'=>$data1);
                   return $respuesta;
}/*fin de funcion*/

/*
* Funcion que registra las competencias del empleado, estas competencias se registran
*  1. Segun el grupo ocupacional que pertenece.
*  2- Se agregan las competencias de la opcion 1,2 o 3 si no las tuviese.
* la funcion agrega aquellas competencias que existen en otro cargo que por pertenecer a otro
* grupo ocupacional no las posee.
* La funcion agrega competencias. lo cual NO elimina competencias a pesar de que se seleccione 
* en una actualizacion unas opciones en las cuales no es necesario agregar mas. y que previamente se agregaron
*/
function registrarCompetenciasxEmpleado($codigoEmpleado,$opcion1,$opcion2,$opcion3,$id_realiza){
parent::conectar();
$array_competencias=$this->get_array_competenciasglobales($codigoEmpleado,$opcion1,$opcion2,$opcion3,$id_realiza);
                            for ($i=0; $i < count($array_competencias) ; $i++) 
                                 { 
                                    $competenciasIngresar=$array_competencias[$i];
                                    $sql_sp="CALL registra_competenciasxempleado($competenciasIngresar,'$codigoEmpleado','XX010101')";
                                   if(!$this->obj_con->Execute($sql_sp)){
                                        echo "error en competencia : ".$competenciasIngresar;
                                        }else{
                                     }
                                  }

}/*fin de la funcion*/

/*
* funcion que retorna un array con todas las competencias de acuerdo a las opciones elegidas.
*  llama a la funcion get_competenciasxcargo por cada opcion elegida
*  llama a la funcion get_competencias_unir para unir 2 arrays si este no tiene las competencias.
*/
function get_array_competenciasglobales($codigoEmpleado,$opcion1,$opcion2,$opcion3,$id_realiza){
parent::conectar();
$cargoactual=$this->get_cargoxempleado($codigoEmpleado,$id_realiza);
  $cmpt_cargo=$this->get_competenciasxcargo($cargoactual,$id_realiza);
  $cmpt_opc1=$this->get_competenciasxcargo($opcion1,$id_realiza);
  $cmpt_opc2=$this->get_competenciasxcargo($opcion2,$id_realiza);
  $cmpt_opc3=$this->get_competenciasxcargo($opcion3,$id_realiza);
$array1=$this->get_competencias_unir($cmpt_opc1,$cmpt_cargo);
$array2=$this->get_competencias_unir($cmpt_opc2,$array1);
$array3=$this->get_competencias_unir($cmpt_opc3,$array2);
  return $array3; 
}
/*fin de funcion*/

/*
* funcion que compara 2 array de competencias el de sus competencias base
* y las competencias de la opcion elegida. si existen competencias que no
* estan dentro de las competencias base. las agrega.
*
*/
function get_competencias_unir($arrayOpcion,$arrayBase){
parent::conectar();
$arrayUnido=array();
$arrayUnido=array_merge($arrayUnido,$arrayBase);
    foreach ($arrayOpcion as $key => $value) {
        $competenciaOpcion=$value;
        $bandera=false;
          foreach ($arrayBase as $key2 => $value2) {
                  $competenciaBase=$value2;
                      if($competenciaOpcion==$competenciaBase){ $bandera=true; }
                }
                if(!$bandera){
                  $arrayUnido[]=$competenciaOpcion;                  
                }      
    }
    return $arrayUnido;
}
/* fin de funcion */


/*
*  funcion que obtiene las competencias de un cargo, segun grupo ocupacional que pertenece
*  
*/
function get_competenciasxcargo($idcargo,$id_realiza){
parent::conectar();
$sql="SELECT ID_COMPETENCIA FROM competencias_grupo_ocupacional where ID_GRUPOOCUPACIONAL IN(SELECT id_grupoocupacional FROM view_cargosev where idcargo=$idcargo AND id_realiza=$id_realiza)";
$competenciasGrupoOcupacional=array();
                 $i=0;
                 $record_consulta = $this->obj_con->Execute($sql);
if($record_consulta->RecordCount()<=0){
                              return $competenciasGrupoOcupacional;
                            }else{                 
           while (!$record_consulta->EOF)
                  {
                     $competenciasGrupoOcupacional[$i]=$record_consulta->fields["ID_COMPETENCIA"];
                     $i++;                     
                     $record_consulta->MoveNext();
                   }
                 }
   return $competenciasGrupoOcupacional;
}/*fin de la funcion*/



/*
* funcion que obtiene el cargo de un empleado
*
*/
function get_cargoxempleado($idempleado,$id_realiza){
parent::conectar();
$sql="SELECT IDCARGO FROM view_empleados where ID_REALIZA=$id_realiza AND CODIGOEMPLEADO='$idempleado'";
$cargoId="";
$record_consulta=$this->obj_con->Execute($sql);
  while(!$record_consulta->EOF) {
          $cargoId=$record_consulta->fields["IDCARGO"];
          $record_consulta->MoveNext();
       }
       return $cargoId;

}/*fin de funcion*/


/*
*
*
*/
function get_competenciasxArea($codigoempleado,$idcargoopc,$area){
parent::conectar();
$sql="SELECT competenciasxempleado.ID_COMPETENCIA,
NOMBRECOMPETENCIA,TIPO_COMPETENCIA,TIPOCOMPETENCIA,ID_AREA,AREA,IDPADRE,Subcategoria,
CODIGOEMPLEADO,VALORR,IDCARGO,VALORDESEABLE
FROM competenciasxempleado INNER JOIN competenciasxcargo 
ON(competenciasxempleado.ID_COMPETENCIA=competenciasxcargo.ID_COMPETENCIA)
INNER JOIN view_competencias_ev 
ON(view_competencias_ev.ID_COMPETENCIA=competenciasxcargo.ID_COMPETENCIA)
WHERE IDCARGO=$idcargoopc AND CODIGOEMPLEADO='$codigoempleado' AND EVALUADOR='XX010101' AND ID_AREA=$area
ORDER BY ID_AREA,Subcategoria";
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
                     $valorReal=$record_consulta->fields["VALORR"];
                     $deseable=$record_consulta->fields["VALORDESEABLE"];
                     $brecha=$valorReal-$deseable;
                     
                   
                       $data1[] = array('idcompetencia'=>$competenciaId,'nombrecompetencia'=>$nombreComp,'tipocompetencia'=>$tipoComp,'nombreTipo'=>$nombreTipo,'areaid'=>$areaId,'padreid'=>$padreId,'subcategoria'=>$subcategoria,'real'=>$valorReal,'deseado'=>$deseable,'brecha'=>$brecha);
                     
                   

                     $record_consulta->MoveNext();
                   }

        if(isset($data1)){
                    $respuesta= array('success' => true,'data'=>$data1,'area'=>$area);
                  }else{
                    $respuesta= array('success' =>false);
                  } 
                  return $respuesta;                  

}/*fin de la funcion*/

	
}


