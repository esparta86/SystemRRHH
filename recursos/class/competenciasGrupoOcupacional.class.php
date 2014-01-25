<?php
class competenciasGrupoOcupacional extends DBManager
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

/********  Funcion que obtiene las competencias segun grupo  ocupacional para realizar las respectivas ponderaciones segun grupo ocupacional ************************************/

 function obtener_competenciasxgrupoocupacional($id_realiza,$grupoocupacional){
    parent::conectar();
if(is_numeric($grupoocupacional)){
    $sql="SELECT clasificacions,ID_AREA_EV AS clasificacion,
    (SELECT  DESCRIPCION_AREA_EV FROM areas_evaluaciond WHERE ID_AREA_EV=clasificacion) as descrip_clasifica,
    subcategoria,idpadre,
    (select descripcioncomp from competencias where idpadre=view_competencias_ev.idpadre limit 0,1 ) as  descrip_sub,
    nombrecompetencia,descripcioncomp,competencias_grupo_ocupacional.id_competencia,
    ifnull(competencias_grupo_ocupacional.VALOR,1) AS valor 
    FROM `view_competencias_ev` 
    INNER JOIN competencias_grupo_ocupacional ON(competencias_grupo_ocupacional.ID_COMPETENCIA=view_competencias_ev.id_competencia)
    where id_realiza=$id_realiza and ID_GRUPOOCUPACIONAL=$grupoocupacional ORDER BY clasificacion,idpadre,nombrecompetencia";

    $record_consulta=$this->obj_con->Execute($sql);

    while (!$record_consulta->EOF)
                  {
                     $clasificacions=$record_consulta->fields["clasificacions"];/*nombre de clasificacion*/
                     $idclasificacion=$record_consulta->fields["clasificacion"];/* id de clasificacion */
                     $descripcion_clasifica=$record_consulta->fields["descrip_clasifica"];

                     $n_subcategoria=$record_consulta->fields["subcategoria"]; /* nombre de subcalificacion*/
                     $id_padre=$record_consulta->fields["idpadre"];  /*id del padre*/
                     $descripcionsubcategoria=$record_consulta->fields["descrip_sub"];


                     $nombrecompetencia=$record_consulta->fields["nombrecompetencia"];
                     $descripcioncompetencia=$record_consulta->fields["descripcioncomp"];
                     $codigoCompetencia=$record_consulta->fields["id_competencia"];
                     $valordeseable=$record_consulta->fields["valor"];
                     $data1[] = array('nombrecompetencia' =>$nombrecompetencia,'descripcioncompetencia'=>$descripcioncompetencia,'idcompetencia'=>$codigoCompetencia,'valordeseable'=>$valordeseable,'nombre_clasificacion'=>$clasificacions,'idclasificacion'=>$idclasificacion,'subcategoria'=>$n_subcategoria,'id_padre'=>$id_padre,'descripcionsub'=>$descripcionsubcategoria,'descripcionclasifica'=>$descripcion_clasifica);

                     $record_consulta->MoveNext();
                   }  


        if(isset($data1)){
            $respuesta= array('success' => true,'data'=>$data1);
          }else{
            $respuesta=array('success'=>false);
          }

            return $respuesta;                     


   }else{
         $respuesta=array('success'=>false);
         return $respuesta;
   }

   }/* fin de funcion */    


         function guardarPcompetenciasxgrupo_O($id_competencia,$valor,$idgrupoo){
              parent::conectar();
             
              $sql="CALL guardar_ponderacionesxgrupoo($id_competencia,$valor,$idgrupoo)";
              if(!$this->obj_con->Execute($sql)){
                return false;
        
              }else{
                return true;
              }
        
             }/* fin de funcion */

/*
* Guarda las ponderaciones de un grupo ocupacional del plan de sucesion de carrera
*/
function guardarPcompetenciasxgrupo_OPLAN($id_competencia,$valor,$idgrupoo){
              parent::conectar();
             
              $sql="CALL guardar_ponderacionesxgrupoo_plan($id_competencia,$valor,$idgrupoo)";
              if(!$this->obj_con->Execute($sql)){
                return false;
        
              }else{
                return true;
              }
        
             }/* fin de funcion */             

   

/*******************************************************************************************************************
*Obtiene las competencias de un grupo ocupacional agrupandolo en dos sectores
*las competencias potenciales y las de desempeño
********************************************************************************************************************/

function obtener_competenciasPLANxgrupoocupacional($id_realiza,$grupoocupacional){
    parent::conectar();

if(is_numeric($grupoocupacional)){
    $sql="SELECT TIPO_COMPETENCIA,TIPOCOMPETENCIA,clasificacions,ID_AREA_EV AS clasificacion,
    (SELECT  DESCRIPCION_AREA_EV FROM areas_evaluaciond WHERE ID_AREA_EV=clasificacion) as descrip_clasifica,
    subcategoria,idpadre,
    (select descripcioncomp from competencias where idpadre=view_competencias_ev.idpadre limit 0,1 ) as  descrip_sub,
    nombrecompetencia,descripcioncomp,competencias_grupo_ocupacional.id_competencia,
    ifnull(competencias_grupo_ocupacional.VALOR_PLAN,1) AS valor 
    FROM `view_competencias_ev` 
    INNER JOIN competencias_grupo_ocupacional ON(competencias_grupo_ocupacional.ID_COMPETENCIA=view_competencias_ev.id_competencia)
    where id_realiza=$id_realiza and ID_GRUPOOCUPACIONAL=$grupoocupacional ORDER BY clasificacion,idpadre,nombrecompetencia";
 
     $record_consulta=$this->obj_con->Execute($sql); 

    while (!$record_consulta->EOF)
                  {
                     $clasificacions=$record_consulta->fields["clasificacions"];/*nombre de clasificacion*/
                     $idclasificacion=$record_consulta->fields["clasificacion"];/* id de clasificacion */
                     $descripcion_clasifica=$record_consulta->fields["descrip_clasifica"];
                     $n_subcategoria=$record_consulta->fields["subcategoria"]; /* nombre de subcalificacion*/
                     $id_padre=$record_consulta->fields["idpadre"];  /*id del padre*/
                     $descripcionsubcategoria=$record_consulta->fields["descrip_sub"];
                     $nombrecompetencia=$record_consulta->fields["nombrecompetencia"];
                     $descripcioncompetencia=$record_consulta->fields["descripcioncomp"];
                     $codigoCompetencia=$record_consulta->fields["id_competencia"];
                     $valordeseable=$record_consulta->fields["valor"];
                     $tipo_competencia=$record_consulta->fields["TIPO_COMPETENCIA"];
                     $nombretipocompetencia=$record_consulta->fields["TIPOCOMPETENCIA"];
                        if($tipo_competencia==1){/*POTENCIAL*/
                           $data1[] = array('nombrecompetencia' =>$nombrecompetencia,'descripcioncompetencia'=>$descripcioncompetencia,'idcompetencia'=>$codigoCompetencia,'valordeseable'=>$valordeseable,'nombre_clasificacion'=>$clasificacions,'idclasificacion'=>$idclasificacion,'subcategoria'=>$n_subcategoria,'id_padre'=>$id_padre,'descripcionsub'=>$descripcionsubcategoria,'descripcionclasifica'=>$descripcion_clasifica);
                        }
                        if($tipo_competencia==2){/*DESEMPENO*/
                            $data2[] = array('nombrecompetencia' =>$nombrecompetencia,'descripcioncompetencia'=>$descripcioncompetencia,'idcompetencia'=>$codigoCompetencia,'valordeseable'=>$valordeseable,'nombre_clasificacion'=>$clasificacions,'idclasificacion'=>$idclasificacion,'subcategoria'=>$n_subcategoria,'id_padre'=>$id_padre,'descripcionsub'=>$descripcionsubcategoria,'descripcionclasifica'=>$descripcion_clasifica);
                        }

                     $record_consulta->MoveNext();
                   }  

                if(isset($data1)&&isset($data2)){
                  $respuesta= array('success' => true,'data'=>$data1,'data2'=>$data2);
                }else{
                  $respuesta=array('success'=>false);
                }

            return $respuesta;   

            }else{

            $respuesta= array('success' =>false); 
            return $respuesta;
            }                  




   }/* fin de funcion */       


					

	
	
}


