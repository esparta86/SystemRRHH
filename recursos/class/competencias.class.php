<?php

/**
* 
*/
class Competencias extends DBManager
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
    		function  verificar_subclasificacion($nombreSubclasi,$id_realiza){
    			parent::conectar();
    			$sql="SELECT COUNT(*) AS N FROM `competencias`INNER JOIN administra on(competencias.id_competencia=administra.id_competencia) where id_realiza=$id_realiza and idpadre=0 and subclasificacion like '$nombreSubclasi'";
    			$record_consulta=$this->obj_con->Execute($sql);
                $N="";
    			 while(!$record_consulta->EOF){
    			 	$N=$record_consulta->fields["N"];
    			 	$record_consulta->MoveNext();
    			 }

    			 return $N;

    		}

    		function verificar_competencia($nombreCompetencia,$id_realiza){
    			parent::conectar();
    			$nombrecompetencia=strtoupper($nombreCompetencia);
    			$sql="SELECT COUNT(*) as N FROM `view_competencias` where id_realiza=$id_realiza and nombrecompetencia like '$nombrecompetencia'";
    			$record_consulta=$this->obj_con->Execute($sql);
    			$N="";
    			    while (!$record_consulta->EOF) {
    			    	  $N=$record_consulta->fields["N"];
    			    	  $record_consulta->MoveNext();
    			    }
    			    return $N;

    		}//fin funcion


    		function verificar_competenciaEV($nombreCompetencia,$id_realiza){
    			parent::conectar();
    			$nombrecompetencia=strtoupper($nombreCompetencia);
    			$sql="SELECT COUNT(*) as N FROM `view_competencias_ev` where id_realiza=$id_realiza and nombrecompetencia like '$nombrecompetencia'";
    			$record_consulta=$this->obj_con->Execute($sql);
    			$N="";
    			    while (!$record_consulta->EOF) {
    			    	  $N=$record_consulta->fields["N"];
    			    	  $record_consulta->MoveNext();
    			    }
    			    return $N;

    		}//fin funcion

		   function ver_subclasificacion($id_realiza)//para identificar el proceso.
					{
					    parent::conectar();
					    $sql="SELECT * FROM `view_subclasificacion` WHERE ID_REALIZA='$id_realiza' ORDER BY AREA,SUBCLASIFICACION";
					    //$data1="";

					    $record_consulta = $this->obj_con->Execute($sql);
						

					        while (!$record_consulta->EOF)
					        {
					           $id_competencia=$record_consulta->fields["ID_COMPETENCIA"];
					           $area = $record_consulta->fields["AREA"];
					           $subclasificacion=$record_consulta->fields["SUBCLASIFICACION"];
					           $descripcion=$record_consulta->fields["DESCRIPCIONCOMP"];

						       				       
						       $data1[] = array('id_competencia'=>$id_competencia,'subclasificacion'=>$subclasificacion,'descripcioncomp'=>$descripcion);
					              
					           $record_consulta->MoveNext();
					         }
					         //ANTERIORMENTE NO HACIA ESTO PERO PENSE QUE AFECTABA EN ALGO POR EL [root] del STORE donde se define : data
					      $repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;
					       //return $data1;
					}

		   function  ver_subclasificacionEV($id_realiza)//para identificar el proceso.
					{
					    parent::conectar();
					    $sql="SELECT * FROM `view_subcategorias_ev` WHERE ID_REALIZA='$id_realiza' ORDER BY SUBCLASIFICACION";
					    //$data1="";

					    $record_consulta = $this->obj_con->Execute($sql);
						

					        while (!$record_consulta->EOF)
					        {
					           $id_competencia=$record_consulta->fields["ID_COMPETENCIA"];
					           $subclasificacion=$record_consulta->fields["SUBCLASIFICACION"];
					           $descripcion=$record_consulta->fields["DESCRIPCIONCOMP"];
					           $clasificacion=$record_consulta->fields["id_area_ev"];
					           $nombreclasificacion=$record_consulta->fields["clasificacions"];

						       				       
						       $data1[] = array('clasificacion'=>$clasificacion,'nombreclasificacion'=>$nombreclasificacion,'idpadre'=>$id_competencia,'subcategoria'=>$subclasificacion,'descripcioncomp'=>$descripcion);
					              
					           $record_consulta->MoveNext();
					         }
					         //ANTERIORMENTE NO HACIA ESTO PERO PENSE QUE AFECTABA EN ALGO POR EL [root] del STORE donde se define : data
					      $repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;
					       //return $data1;
					}

					

		function guardar_subclasificacion($nombreSubclasificacion,$descripcion,$id_realiza){
			parent::conectar();
			$sql="CALL guardar_subcategoria('".$descripcion."','".$nombreSubclasificacion."',".$id_realiza.")";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}

		
		}//fin de funcion guardar empresa

   /*
   *  Funcion que permite llamar a un sp y guardar una subcategroia de una competencia.
   *
   */
			function guardar_subclasificacionEV($nombreSubclasificacion,$descripcion,$id_realiza,$clasificacion){
			parent::conectar();
			$sql="CALL guardar_subcategoriaEV('".$descripcion."','".$nombreSubclasificacion."',".$id_realiza.",".$clasificacion.")";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}

		
		}//fin de funcion guardar empresa

		function modificar_subcategoria($nombreSubclasificacion,$descripcion,$id){
			parent::conectar();
			$sql="CALL modificar_subcategoria('".$descripcion."','".$nombreSubclasificacion."',".$id.")";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}

		
		}//fin de funcion modificar subcategoria


		function modificar_subcategoriaEV($nombreSubclasificacion,$descripcion,$id,$clasificacion){
			parent::conectar();
			$sql="CALL modificar_subcategoria_ev('".$descripcion."','".$nombreSubclasificacion."',".$id.",".$clasificacion.")";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}

		
		}//fin de funcion modificar subcategoria


		function verificar_subcategoria($id){
			parent::conectar();
			$sql="SELECT count(id_competencia) as N FROM `competencias` where idpadre=$id";

			$record_consulta=$this->obj_con->Execute($sql);
                $N="";
    			 while(!$record_consulta->EOF){
    			 	$N=$record_consulta->fields["N"];
    			 	$record_consulta->MoveNext();
    			 }

    			 return $N;

		}//funcion mas verificar_departamento


		function eliminar_subcategoria($id){

		
			 parent::conectar();
			 	$sql="CALL eliminar_subcategoria(".$id.",@estado)";
               //print_r(json_encode($sql));
			 	
			 	    if(!$this->obj_con->Execute($sql)){
			 	    	return false;

			 	    }else{

			 	    	return true;
			 	    }
			 	
		}// fin de funcion eliminar subcategoria


		function ver_competencias($id_realiza){
			parent::conectar();

			 $sql="SELECT * FROM view_competencias where id_realiza=$id_realiza order by idpadre";
					    //$data1="";

					    $record_consulta = $this->obj_con->Execute($sql);
						

					        while (!$record_consulta->EOF)
					        {
					           $id_competencia=$record_consulta->fields["id_competencia"];
					           $id_area=$record_consulta->fields["id_area"];
					           $area = $record_consulta->fields["area"];
					           $idpadre=$record_consulta->fields["idpadre"];
					           $subcategoria=$record_consulta->fields["Subcategoria"];
					           $nombrecompetencia=$record_consulta->fields["nombrecompetencia"];
					           $descripcioncomp=$record_consulta->fields["descripcioncomp"];
					           $idclasificacion=$record_consulta->fields["clasificacion"];
					           $clasificacion=$record_consulta->fields["clasificacions"];
  
						       $data1[] = array('id_area'=>$id_area,'idpadre'=>$idpadre,'id_competencia'=>$id_competencia,'idclasificacion'=>$idclasificacion,'area'=>$area,'clasificacion'=>$clasificacion,'subcategoria'=>$subcategoria,'nombrecompetencia'=>$nombrecompetencia,'descripcion'=>$descripcioncomp);
					              
					           $record_consulta->MoveNext();
					         }
					         //ANTERIORMENTE NO HACIA ESTO PERO PENSE QUE AFECTABA EN ALGO POR EL [root] del STORE donde se define : data
					      $repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;
		}//fin de funcion

		function guardar_competencia($nombrecompetencia,$descripcionComp,$subcategoria,$area,$categoria,$id_realiza){

			parent::conectar();
			$sql="CALL guardar_competencia('".$nombrecompetencia."','".$descripcionComp."',".$area.",".$subcategoria.",".$categoria.",".$id_realiza.")";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}


		}// fin de funcion



		function guardar_competenciaEV($nombrecompetencia,$descripcionComp,$subcategoria,$id_realiza,$idarea,$idtipo){

			parent::conectar();
			$sql="CALL guardar_competenciaEV('".$nombrecompetencia."','".$descripcionComp."',".$subcategoria.",".$id_realiza.",".$idarea.",".$idtipo.")";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}


		}// fin de funcion


		function modificar_competencia($nombrecompetencia,$descripcionComp,$subcategoria,$area,$categoria,$id_realiza,$idCompetencia,$f1,$f2){
			parent::conectar();
			$sql="CALL modificar_competencia('".$nombrecompetencia."','".$descripcionComp."',".$area.",".$subcategoria.",".$categoria.",".$id_realiza.",".$idCompetencia.",".$f1.",".$f2.")";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}


		}



			function modificar_competenciaEV($nombrecompetencia,$descripcionComp,$subcategoria,$id_realiza,$idarea,$idtipocompetencia,$competenciaId){
			parent::conectar();
			$sql="CALL modificar_competenciaEV('".$nombrecompetencia."','".$descripcionComp."',".$subcategoria.",".$id_realiza.",".$idarea.",".$idtipocompetencia.",".$competenciaId.")";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}


		}



		function check_comp($id){
			parent::conectar();
			$sql="SELECT count(*) as N FROM competenciasxcargo where id_competencia=$id";
			$sql2="SELECT count(*) as N FROM competenciasxempleado where id_competencia=$id";
			$sql3="SELECT count(*) as N FROM competencias_grupo_ocupacional where id_competencia=$id";
			$record_consulta=$this->obj_con->Execute($sql);
                $N="";
    			 while(!$record_consulta->EOF){
    			 	$N=$record_consulta->fields["N"];
    			 	$record_consulta->MoveNext();
    			 }

    			 $record_consulta2=$this->obj_con->Execute($sql2);
                $N2="";
    			 while(!$record_consulta2->EOF){
    			 	$N2=$record_consulta2->fields["N"];
    			 	$record_consulta2->MoveNext();
    			 }
    			  $record_consulta3=$this->obj_con->Execute($sql3);
    			 $N3="";
    			 while(!$record_consulta3->EOF){
    			 	$N2=$record_consulta3->fields["N"];
    			 	$record_consulta3->MoveNext();
    			 }
                $N=$N+$N2+$N3;


    			 return $N;

		}//funcion mas 

/*
* funcion que elimina un competencia
*/
	
		function drop_competencia($id){
			parent::conectar();
			 	$sql="CALL eliminar_competencia(".$id.",@es)";
			 	    if(!$this->obj_con->Execute($sql)){
			 	    	return false;
			 	    }else{
			 	    	return true;
			 	    }
		}//fin de funcion



		function ver_competenciasEV($id_realiza){
			parent::conectar();

			 $sql="SELECT ID_COMPETENCIA,ID_AREA,AREA,IDPADRE,Subcategoria,NOMBRECOMPETENCIA,DESCRIPCIONCOMP,ID_AREA_EV,
clasificacions,TIPO_COMPETENCIA,TIPOCOMPETENCIA FROM `view_competencias_ev` where ID_REALIZA=$id_realiza";
					    //$data1="";

					    $record_consulta = $this->obj_con->Execute($sql);
						

					        while (!$record_consulta->EOF)
					        {
					           $idcompetencia=$record_consulta->fields['ID_COMPETENCIA'];
					           $idarea=$record_consulta->fields['ID_AREA'];
					           $area=$record_consulta->fields['AREA'];
					           $idtipo=$record_consulta->fields['TIPO_COMPETENCIA'];
					           $tipo=$record_consulta->fields['TIPOCOMPETENCIA'];
		           	           $id_padre=$record_consulta->fields['IDPADRE'];
					           $subcategoria=$record_consulta->fields['Subcategoria'];
					           $nombrecompetencia=$record_consulta->fields['NOMBRECOMPETENCIA'];
					           $descripcioncomp=$record_consulta->fields['DESCRIPCIONCOMP'];
					           $idclasificacion=$record_consulta->fields['ID_AREA_EV'];
					           $clasificacion=$record_consulta->fields['clasificacions'];
  		   
						       $data1[] = array('idpadre'=>$id_padre,'id_competencia'=>$idcompetencia,'idclasificacion'=>$idclasificacion,'idarea'=>$idarea,'tipo'=>$idtipo,'tipocompetencia'=>$tipo,'area'=>$area,'clasificacion'=>$clasificacion,'subcategoria'=>$subcategoria,'nombrecompetencia'=>$nombrecompetencia,'descripcion'=>$descripcioncomp);
					              
					           $record_consulta->MoveNext();
					         }
					         
					      $repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;
		}




		 function ver_competenciasGO($id_realiza,$idgrupoOcupacional){
			parent::conectar();

			 $sql="SELECT * FROM view_competencias_ev where id_realiza=$id_realiza order by nombrecompetencia ";
			 $record_consulta = $this->obj_con->Execute($sql);

			 /*obteniendo las competencias del grupo ocupacional que tienen actualmente*/
			 $sql2="SELECT * FROM view_competencias_grupo_o where id_realiza=$id_realiza and id_grupoocupacional=$idgrupoOcupacional";
			 $record_consulta2 = $this->obj_con->Execute($sql2);
             $competenciasGO[]="";
             $i=0;
			 while(!$record_consulta2->EOF){
			 	$id_competenciaGO=$record_consulta2->fields["id_competencia"];
			 	$competenciasGO[$i]=$id_competenciaGO;
			 	$record_consulta2->MoveNext();
			 	$i++;
			 }
			 //json_encode(var_dump($competenciasGO));


			/*preparar array con true or false*/			

					        while (!$record_consulta->EOF)
					        {
					           $id_competencia=$record_consulta->fields["ID_COMPETENCIA"];
					           $nombrecompetencia=$record_consulta->fields["NOMBRECOMPETENCIA"];
					                         $asignado=false;
					                         foreach ($competenciasGO as $idcompetenciaGO) {
					                         	     if($idcompetenciaGO==$id_competencia){
					                         	     	$asignado=true;//fue asignada la competencia
					                         	     }
					                         }
  
						       $data1[] = array('id_comp'=>$id_competencia,'nombreC'=>$nombrecompetencia,'selected'=>$asignado);
					              
					           $record_consulta->MoveNext();
					         }
					         
					      $repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;
		}//fin de funcion


		function  getIdCompetencia($nombrecompetencia,$subcategoria,$id_realiza,$idarea){
				parent::conectar();
				$sql="SELECT ID_COMPETENCIA FROM `view_competencias_ev` where NOMBRECOMPETENCIA like '$nombrecompetencia' AND IDPADRE=$subcategoria AND ID_AREA=$idarea AND ID_REALIZA=$id_realiza";
				$record_consulta = $this->obj_con->Execute($sql);
				$id_competencia=0;
				while(!$record_consulta->EOF){
					$id_competencia=$record_consulta->fields["ID_COMPETENCIA"];
					$record_consulta->MoveNext();
				}
				return $id_competencia;
		}
/*
*
*  Funcion que recupera las competencias de una actividad segun area y empresa
*  
*
*
*/
		 function ver_competenciasActividad($id_realiza,$idactividad,$idarea,$masivo){
			parent::conectar();
			 $sql="SELECT ID_COMPETENCIA,NOMBRECOMPETENCIA FROM  view_competencias_ev WHERE ID_AREA=$idarea AND ID_REALIZA=$id_realiza ORDER BY NOMBRECOMPETENCIA";
			 $record_consulta = $this->obj_con->Execute($sql);
			 /*obteniendo las competencias de la actividad que tiene actualmente*/
			 $sql2="SELECT ID_COMPETENCIA FROM competencias_actividadesmasivas WHERE ID_MASIVO=$masivo";
			 $record_consulta2 = $this->obj_con->Execute($sql2);
            $competenciasActividad[]=array();
             $i=0;
			 while(!$record_consulta2->EOF){
			 	$id_competenciaAct=$record_consulta2->fields["ID_COMPETENCIA"];
			 	$competenciasActividad[$i]=$id_competenciaAct;
			 	$record_consulta2->MoveNext();
			 	$i++;
			 }
			/*preparar array con true or false*/			
					        while (!$record_consulta->EOF)
					        {
					           $id_competencia=$record_consulta->fields["ID_COMPETENCIA"];
					           $nombrecompetencia=$record_consulta->fields["NOMBRECOMPETENCIA"];
					                         $asignado=false;
					                         foreach ($competenciasActividad as $id_competenciaAct) {
					                         	     if($id_competenciaAct==$id_competencia){
					                         	     	$asignado=true;/*fue asignada la competencia*/
					                         	     }
					                         }
						       $data1[] = array('id_comp'=>$id_competencia,'nombreC'=>$nombrecompetencia,'selected'=>$asignado);
					           $record_consulta->MoveNext();
					         }
							if(isset($data1)){
				                    $respuesta= array('success' => true,'data'=>$data1);
				                  }else{
				                    $respuesta= array('success' =>false);
				                  }					        
        return $respuesta;
		}//fin de funcion


	
}

