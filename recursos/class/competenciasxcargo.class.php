<?php

/**
* 
*/
class competenciasxcargo extends DBManager
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

            
  function guardar_competenciasxcargo($nombre_puesto,$jerar,$iddpto,$idgrupo,$id_realiza,$codigocargo){
  	 parent::conectar();
  	 $bandera=0;
  	 /*obtener id del cargo*/

   if($codigocargo==0){
            	 $sql="SELECT idcargo FROM `view_cargosev` where  nombrecargo='$nombre_puesto' and jerarquia=$jerar and id_grupoocupacional=$idgrupo and id_realiza=$id_realiza and id_dpto=$iddpto";
               $record_consulta = $this->obj_con->Execute($sql);

          	while (!$record_consulta->EOF)
          					        {     
          					        	$codigocargo=$record_consulta->fields["idcargo"];
          					        	$record_consulta->MoveNext();

          					        }

              }

	/*obtener todas las competencias de ese grupo ocupacional*/

	$sql2="SELECT ID_COMPETENCIA FROM `competencias_grupo_ocupacional` WHERE ID_GRUPOOCUPACIONAL=$idgrupo";
$competenciasGrupoOcupacional="";
           			 $i=0;
            		 $record_consulta2 = $this->obj_con->Execute($sql2);
                    /*Obtengo competencias.*/
 					while (!$record_consulta2->EOF)
					        {
					           $competenciasGrupoOcupacional[$i]=$record_consulta2->fields["ID_COMPETENCIA"];
					           /*Obtengo competencias del grupo*/
					           $i++;					           
					           $record_consulta2->MoveNext();
					         }	


for ($i=0; $i < count($competenciasGrupoOcupacional) ; $i++) { 
           	           			  $competencia_ingresar=$competenciasGrupoOcupacional[$i];
                                    $sql_sp="CALL guardar_competenciasxcargo($competencia_ingresar,$codigocargo)";
                                     if (!$this->obj_con->Execute($sql_sp)) {
                                     		//hubo un problema
                                     	$bandera=1;//hubo un problema al agregar al jefe superior
                                     	

                                     }else{
                                     		//se ejecuto satisfactoriamente.
                                     	//print_r(var_dump("sql: ".$sql_sp));
                                     }

           	           	
           	            	           }	

   
    return $bandera;
 

  }/* fin de funcion */



  /*
  *  funcion que recupera todas las competencias de un cargo seleccionado. esta funcion es llamada para
  *  llenar el formulario de competencias por cargo.
  *
  */

   function obtener_competenciasxcargos_s($id_realiza,$idcargo)
  {
    parent::conectar();
  if(is_numeric($idcargo)){
                $sql="SELECT idcargo,clasificacions,ID_AREA_EV AS clasificacion,
            (SELECT  DESCRIPCION_AREA_EV FROM areas_evaluaciond WHERE ID_AREA_EV=clasificacion) as descrip_clasifica,
            Subcategoria,idpadre,(select descripcioncomp from competencias where idpadre=view_competencias_ev.idpadre 
            limit 0,1 ) as  descrip_sub,nombrecompetencia,competenciasxcargo.id_competencia,descripcioncomp,
            ifnull(VALORDESEABLE,1) valordeseable FROM `view_competencias_ev`
             inner join competenciasxcargo on(view_competencias_ev.id_competencia=competenciasxcargo.id_competencia) 
             where idcargo=$idcargo order by clasificacion,Subcategoria,nombrecompetencia";

            $record_consulta=$this->obj_con->Execute($sql);
                

            if($record_consulta->RecordCount()<=0){
                               $data1[] = array('nombrecompetencia' =>'Sin registros','descripcioncompetencia'=>'Sin registros','idcompetencia'=>0,'valordeseable'=>'Sin registros','nombre_clasificacion'=>'Sin registros','idclasificacion'=>'Sin registros','subcategoria'=>'','id_padre'=>'','idcargo'=>'');
                            }else{     
                while (!$record_consulta->EOF)
                              {
                                 $clasificacions=$record_consulta->fields["clasificacions"];/*nombre de clasificacion*/
                                 $idclasificacion=$record_consulta->fields["clasificacion"];/* id de clasificacion */
                                 $descripcion_clasifica=$record_consulta->fields["descrip_clasifica"];

                                 $n_subcategoria=$record_consulta->fields["Subcategoria"]; /* nombre de subcalificacion*/
                                 $id_padre=$record_consulta->fields["idpadre"];  /*id del padre*/
                                 $descripcionsubcategoria=$record_consulta->fields["descrip_sub"];

                                 $nombrecompetencia=$record_consulta->fields["nombrecompetencia"];
                                 $descripcioncompetencia=$record_consulta->fields["descripcioncomp"];
                                 $codigoCompetencia=$record_consulta->fields["id_competencia"];
                                 $valordeseable=$record_consulta->fields["valordeseable"];
                                 $id_cargos=$record_consulta->fields["idcargo"];
                                 $data1[] = array('nombrecompetencia' =>$nombrecompetencia,'descripcioncompetencia'=>$descripcioncompetencia,'idcompetencia'=>$codigoCompetencia,'valordeseable'=>$valordeseable,'nombre_clasificacion'=>$clasificacions,'idclasificacion'=>$idclasificacion,'subcategoria'=>$n_subcategoria,'id_padre'=>$id_padre,'idcargo'=>$id_cargos,'descripcionsub'=>$descripcionsubcategoria,'descripcionclasifica'=>$descripcion_clasifica);

                                 $record_consulta->MoveNext();
                               }
                               }

              if(isset($data1)){  
                     $respuesta= array('success' => true,'data'=>$data1);
                }else{
                     $respuesta= array('success' =>false);
                }             

                        return $respuesta;



  }
else{
              $respuesta= array('success' =>false);
              return $respuesta;
            }     
}/* fin de funcion*/


  function  guardar_ponderacionxcargos($idcargo,$valor,$competencia){
      parent::conectar();

$sql="CALL guardar_ponderacionesxcargo($idcargo,$competencia,$valor)";
//print_r(var_dump($sql));
          if(!$this->obj_con->Execute($sql)){
            return false;
    
          }else{
            return true;
          }      



  }/* fin de funcion*/


     function  eliminarCompetenciasxcargo($idcargo){
          parent::conectar();

    $sql="CALL eliminar_competenciasxcargo($idcargo)";

              if(!$this->obj_con->Execute($sql)){
                return false;
        
              }else{
                return true;
              }      



      }/* fin de funcion*/


					

	
	
}


?>