<?php

/**
* 
*/
class GrupoOcupacional extends DBManager
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

		   function ver_gruposOcupacionales($id_realiza)//para identificar el proceso.
					{
					    parent::conectar();
					    $sql="SELECT * FROM  grupo_ocupacional where id_realiza=$id_realiza ";
					    //$data1="";

					    $record_consulta = $this->obj_con->Execute($sql);
						
					    	if($record_consulta->RecordCount()<=0){
					    		 $data1[] = array('id_grupo'=>0,'nombreg' =>'Sin registros','descripciong'=>' ----- ');
					    	}else{


					        while (!$record_consulta->EOF)
					        {
					           $id_grupo=$record_consulta->fields["ID_GRUPOOCUPACIONAL"];
					           $nombreGrupo = $record_consulta->fields["NOMBREGRPO"];
					           $descripcion=$record_consulta->fields["descripcion_grupo"];


						       				       
						       $data1[] = array('id_grupo'=>$id_grupo,'nombreg' =>$nombreGrupo,'descripciong'=>$descripcion);
					              
					           $record_consulta->MoveNext();
					         }
					     }
					         //ANTERIORMENTE NO HACIA ESTO PERO PENSE QUE AFECTABA EN ALGO POR EL [root] del STORE donde se define : data
					      $repuesta = array('success'=>true,'data'=>$data1); 



					        return $repuesta;
					       //return $data1;
					}//fin de funcion



		   function ver_gruposOcupacionalesCargos($id_realiza)//para identificar el proceso.
					{
					    parent::conectar();
					    $sql="SELECT * FROM  grupo_ocupacional where id_realiza=$id_realiza ";
					    $record_consulta = $this->obj_con->Execute($sql);
						   	if($record_consulta->RecordCount()<=0)
						   	   {
					    		 $data1[] = array('idgrupoo'=>0,'nombregrupo' =>'Sin registros');
					        	}
					        	else{
							        while (!$record_consulta->EOF)
							        {
							           $id_grupo=$record_consulta->fields["ID_GRUPOOCUPACIONAL"];
							           $nombreGrupo = $record_consulta->fields["NOMBREGRPO"];
							           


								       				       
								       $data1[] = array('idgrupoo'=>$id_grupo,'nombregrupo' =>$nombreGrupo);
							              
							           $record_consulta->MoveNext();
							         }
					         }
					      $repuesta = array('success'=>true,'data'=>$data1); 
                          return $repuesta;
					}//fin de funcion

		function  verificar_grupo($nombre,$id_realiza){
    			parent::conectar();
    			$sql="SELECT count(*) AS N FROM `grupo_ocupacional` where id_realiza=$id_realiza and nombregrpo LIKE '$nombre'";
                $N="";
                $record_consulta = $this->obj_con->Execute($sql);
    			 while(!$record_consulta->EOF){
    			 	$N=$record_consulta->fields["N"];
    			 	$record_consulta->MoveNext();
    			 }

    			 return $N;

    		}

    	function guardar_grupo($nombre_g,$descripcion,$id_realiza){
			parent::conectar();
			$sql="CALL guardar_grupo('".$nombre_g."','".$descripcion."',".$id_realiza.")";
            $record_consulta=$this->obj_con->Execute($sql);
			if(!$record_consulta){
				return 0;

			}else{
				$sql2="SELECT max(id_grupoocupacional) as id FROM grupo_ocupacional";
					 $record_consulta2 = $this->obj_con->Execute($sql2);
					 $id="";
		    		while(!$record_consulta2->EOF){
		    			 	$id=$record_consulta2->fields["id"];
		    			 	$record_consulta2->MoveNext();
		    			 }
	             
		    		

				return $id;
			}
		}//fin de funcion guardar grupo


		function update_grupo($nombre_g,$descripcion,$id_realiza,$idGrupo){
			parent::conectar();
			$sql="CALL modificar_grupo('".$nombre_g."','".$descripcion."',".$id_realiza.",".$idGrupo.")";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}

		}//FIN DE FUNCION


		function guardar_competencia_grupo($idCompetencia,$idG){

			parent::conectar();
			$sql="CALL guardar_competencias_grupo(".$idCompetencia.",".$idG.")";
			
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}


		}// fin de funcion


		function get_competencias_grupo($idG,$id_realiza){
			parent::conectar();

			$sql="SELECT * FROM view_competencias_grupo_o where id_realiza=$id_realiza and id_grupoocupacional=$idG";
			$record_consulta=$this->obj_con->Execute($sql);
			$competenciasbefore[]="";
			$i=0;
			 while(!$record_consulta->EOF){
			 	$id_competenciaGO=$record_consulta->fields["id_competencia"];
			 	$competenciasbefore[$i]=$id_competenciaGO;
			 	$record_consulta->MoveNext();
			 	$i++;
			 }
			 return $competenciasbefore;

		}//fin de funcion

		function eliminar_competencia_grupo($idCompetencia,$idG){
			parent::conectar();

		
			$sql="CALL eliminar_competencia_grupo(".$idG.",".$idCompetencia.")";
			
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}



		}

		function modificar_competencia_grupo($idCompetencia,$idG){
			parent::conectar();
			$sql="CALL update_competencias_grupo(".$idCompetencia.",".$idG.")";

			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}


		}//fin de funcion



			function eliminar_grupo($id){

		
			 parent::conectar();
			 	$sql="CALL eliminar_grupoo(".$id.")";
               //print_r(json_encode($sql));
			 	
			 	    if(!$this->obj_con->Execute($sql)){
			 	    	return false;

			 	    }else{

			 	    	return true;
			 	    }
			 	
		}// fin de funcion eliminar grupo


/*
* funcion que obtiene procesara la actualizacion de competencias de todos los empleados de un grupo ocupacional
*
*/
function procesar_competenciasxempleado($idgrupo,$id_realiza){
	parent::conectar();
    $competenciasGrupoOcupacional=$this->get_competencias_grupo($idgrupo,$id_realiza);
    $EmpleadosGrupoOcupacionl=$this->getEmpleadosxGrupoOcupacional($idgrupo,$id_realiza);
    foreach ($EmpleadosGrupoOcupacionl as $key => $codigoEmpleado) 
    {
    	 $Evaluadores=$this->getEvaluadoresxEmpleado($codigoEmpleado);

    	      foreach ($Evaluadores as $key => $codigoEvaluador) 
    	      {
    	      		$competenciasActualesxEmpleado=$this->getCompetenciasActualesxEmpleado($codigoEmpleado,$codigoEvaluador);
    	      		    foreach ($competenciasActualesxEmpleado as $key => $idcompetencia) 
    	      		    {
    	      		    	$eliminar=true;
    	      		    	    foreach ($competenciasGrupoOcupacional as $key => $competencia) 
    	      		    	    {
    	      		    	    	  if($idcompetencia==$competencia)
    	      		    	    	  {
    	      		    	    	  	$eliminar=false;
    	      		    	    	   }
    	      		    	    }
    	      		    	    if($eliminar)
    	      		    	    {
    	      		    	    	$this->eliminar_competenciaxempleado($idcompetencia,$codigoEmpleado,$codigoEvaluador);
    	      		    	    }
    	      		    	    

    	      		    	    
    	      		    }

    	      		    foreach ($competenciasGrupoOcupacional as $key => $idcompetencia) {
    	      		    	$estado=$this->agregar_competenciaxempleado($idcompetencia,$codigoEmpleado,$codigoEvaluador);
    	      		    	  if(!$estado){
    	      		    	  	echo "error al ingresar :idcompetencia".$idcompetencia.'/evaluado:'.$codigoEmpleado.'/evaluador:'.$codigoEvaluador;
    	      		    	  }
    	      		    }

    	      }
    }


}/* fin de funcion*/

/*
* funcion que ingresa las competencias del grupo ocupacional
*
*/
function agregar_competenciaxempleado($idcompetencia,$evaluado,$evaluador){
parent::conectar();
  $sql_sp="CALL update_evaluadores($idcompetencia,'$evaluado','$evaluador')";
if(!$this->obj_con->Execute($sql_sp))
    {
	 return false;
	}else{
		return true;
		 }  

}


/*
* funcion que elimina una competencia de un evalaudo y evalaudor
*/
function eliminar_competenciaxempleado($idCompetencia,$codigoEmpleado,$codigoEvaluador){
	parent::conectar();
		$sql="CALL  eliminar_competenciaempleado($idCompetencia,'$codigoEmpleado','$codigoEvaluador')";
		          if(!$this->obj_con->Execute($sql))
                     {
			 	      return false;
    			 	 }else
    			 	 {
			 	    	return true;
             	    }	

}/*fin de funcion*/

/*
* funcion que recupera las competencias actuales registradas en competeneciasxempleado segun
*  codigoEmpleado=evaluado
*  codigoEvaluador=Evaluador
*/

function getCompetenciasActualesxEmpleado($codigoEmpleado,$codigoEvaluador){
parent::conectar();
$sql="SELECT ID_COMPETENCIA FROM competenciasxempleado WHERE CODIGOEMPLEADO='$codigoEmpleado' AND EVALUADOR='$codigoEvaluador'";
$record_consulta=$this->obj_con->Execute($sql);
 if($record_consulta->RecordCount()<=0){
    return 0;
 }else{
 			 while(!$record_consulta->EOF)
 			 {
 			 	$id=$record_consulta->fields["ID_COMPETENCIA"];
 			 	$data1[]=$id;
 			 	$record_consulta->MoveNext();
 			 }
 			 return $data1;
    }

}/*fin de funcion*/



/*
* funcion que recupera todos los evaluadores de un empleado
*/

function getEvaluadoresxEmpleado($codigoEmpleado){
parent::conectar();
 $sql="SELECT DISTINCT(EVALUADOR) AS EVALUADOR FROM competenciasxempleado WHERE CODIGOEMPLEADO='$codigoEmpleado'";
 $record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0){
     return 0;
  }else{
  	   while(!$record_consulta->EOF){
  	   	   $codigo=$record_consulta->fields["EVALUADOR"];
  	   	   $data1[]=$codigo;
  	   	   $record_consulta->MoveNext();
  	   }
  	   return $data1;
  }

}/*fin de funcion*/



/*
* funcion que me recupoera todos los empleados de un grupo ocupacional
*
*/
function getEmpleadosxGrupoOcupacional($idgrupo,$id_realiza){
parent::conectar();
$sql="SELECT CODIGOEMPLEADO FROM view_empleados WHERE ID_REALIZA=$id_realiza AND ID_GRUPOOCUPACIONAL IS NOT NULL AND ID_GRUPOOCUPACIONAL=$idgrupo";
$record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
   	return 0;
   }else{
   	   while(!$record_consulta->EOF)
   	      {
            $codigo=$record_consulta->fields["CODIGOEMPLEADO"];
            $data1[]=$codigo;
            $record_consulta->MoveNext();
   	      }
   	      return $data1;
   }

}/*fin de funcion*/

					

	
	
}//FIN DE CLASE


?>