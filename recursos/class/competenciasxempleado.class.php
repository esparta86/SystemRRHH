<?php

/**
* 
*/
class competenciasxEmpleado extends DBManager
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

		  
		  function registrarEvaluadores($codigoempleado,$evaluadores_asociados,$id_realiza,$evaluador_externo,$evaluados_asociados,$evaluado_externo){
		  	parent::conectar();
		  	$bandera=0;
/* A partir del codigo de empleado y id_realiza se identifica el grupo ocupacional al que pertenece
con el fin de obtener sus competencias de ese grupo*/
		  	$sql="SELECT ID_COMPETENCIA FROM competencias_grupo_ocupacional WHERE ID_GRUPOOCUPACIONAL IN(SELECT IFNULL(ID_GRUPOOCUPACIONAL,0) AS ID_GRUPOOCUPACIONAL FROM `view_empleados` WHERE CODIGOEMPLEADO='$codigoempleado' AND ID_REALIZA=$id_realiza)";
            $competenciasGrupoOcupacional="";
           			 $i=0;
            		 $record_consulta = $this->obj_con->Execute($sql);
                    /*Obtengo competencias.*/
 					while (!$record_consulta->EOF)
					        {
					           $competenciasGrupoOcupacional[$i]=$record_consulta->fields["ID_COMPETENCIA"];
					           /*Obtengo competencias del grupo*/
					           $i++;					           
					           $record_consulta->MoveNext();
					         } 
			          $array_evaluadores=$this->get_evaluadores_actuales($codigoempleado); /*ES NECESARIO RECONOCER LOS EVALUADORES ACTUALES SI ES QUE TIENE */    
                $array_evaluados=$this->get_evaluados_actuales($codigoempleado,$id_realiza); /*ES NECESARIO RECONOCER LOS EVALUADOS ACTUALES SI ES QUE TIENE */    



 /*SI TIENE EVALUADORES ACTUALES, IDENTIFICAR QUIENES SEGUIRAN SIENDO EVALUADORES Y QUIENES NO*/

      if($evaluadores_asociados!=0)
	  {
      if(count($array_evaluadores)>0){//siempre que existan EVALUADORES ACTUALES. de lo contrario no
			  for ($i=0; $i < count($array_evaluadores) ; $i++) { 
			  	$eliminarlo=true;
			  	$evaluador_actual=$array_evaluadores[$i];
                //print_r($evaluadores_asociados);
                foreach ($evaluadores_asociados as $item => $valor) {
                                  if(is_array($valor)){
                                        foreach($valor as $k=>$value){
	              			  	      					   if($value==$evaluador_actual){
                  			  	      					   	$eliminarlo=false;/* SE MANTUVO COMO EVALUADOR PORQUE SE ENCUENTRA EN EL ARRAY NUEVO DE EVALUADORES POR TANTO NO ELIMINAR*/
                  		  	      					   	 }
			  	      					                }
                                        }
                                        else{
                                        if($valor==$evaluador_actual){
                                                $eliminarlo=false;/* SE MANTUVO COMO EVALUADOR PORQUE SE ENCUENTRA EN EL ARRAY NUEVO DE EVALUADORES POR TANTO NO ELIMINAR*/
                                              }                                                                                     
                                        }
			  	      }//fin de primer foreach
			  	      if($eliminarlo){//SI ES TRUE, ELIMINAR EL EVALUADOR YA QUE EL USUARIO LO DESMARCO DEL CHECKBOX
			  	      	/* ELIMINAR*/
						  	      	if($this->eliminar_evaluador($evaluador_actual,$codigoempleado)){
						  	      	                          }else{
						  	      	                          	$bandera=1;//Hubo un problema en la eliminacion de los anteriores evaluadores
						  	      	                          }
			  	      }
			  }//fin de for recorrer array evaluadores
	       }
		 }/*fin de if evaluadores_asociados!=0*/
		
  if($evaluados_asociados!=0){ 
       if(count($array_evaluados)>0)
	   {
            for($i=0;$i<count($array_evaluados);$i++){
                $eliminar=true;
                $evaluado_actual=$array_evaluados[$i];
                       foreach ($evaluados_asociados as $item => $valor) {
                               if(is_array($valor)){
                                          foreach ($valor as $key => $value) {
                                                if($value==$evaluado_actual){
                                                  $eliminar=false;/*Se mantuvo  como evaluado porque se encuentra en el array*/
                                                }
                                            
                                          }
                                        }else{
                                                if($valor==$evaluado_actual){
                                                  $eliminar=false;/*Se mantuvo  como evaluado porque se encuentra en el array*/
                                               }                                          


                                        }
                         
                       }/*fin de 1 foreach*/
                        if($eliminar){/*Eliminar el evaluado ya que el usuario lo desmarco*/
                          if($this->eliminar_evaluador($codigoempleado,$evaluado_actual)){
                                                  }else{
                                                    $bandera=5;//Hubo un problema en la eliminacion de los anteriores evaluadores
                                                  }                          


                        }



            }/*fin de recorer evalaudos*/

       }
	   
	   }/*fin de if evaluados_asociados!=0*/
	    /********************************  PROCESO QUE AGREGA LOS NUEVOS EVALUADORES. ********************************************************/

 if($evaluadores_asociados!=0){		
               foreach ($evaluadores_asociados as $item=>$valor) 
			   {//GUARDAR CADA EVALUADOR
                      if(is_array($valor)){
											   foreach ($valor as $k => $value) {
											    	     	   $EvaluadorIngresar=$value;
											    	     	   /*mientras haya competencias del grupo ocupacional ingresarlo*/
											    	     	   for ($i=0; $i < count($competenciasGrupoOcupacional) ; $i++) 
											    	     	   { 
											    	     	   	   $competenciasIngresar=$competenciasGrupoOcupacional[$i];
											    	     	   	   
											    	     	   	   $sql_sp="CALL update_evaluadores($competenciasIngresar,'$codigoempleado','$EvaluadorIngresar')";
											    	     	   	   
																		if(!$this->obj_con->Execute($sql_sp)){
																			       $bandera=2;//hubo un problema en el ingreso del nuevo evaluador
																					}else{
																					}
											    	     	   }//fin de for
											    	 }
                                }else{
											   $EvaluadorIngresar=$valor;
													/*mientras haya competencias del grupo ocupacional ingresarlo*/
													 for ($i=0; $i < count($competenciasGrupoOcupacional) ; $i++) 
													 { 
														 $competenciasIngresar=$competenciasGrupoOcupacional[$i];
														 $sql_sp="CALL update_evaluadores($competenciasIngresar,'$codigoempleado','$EvaluadorIngresar')";
														 if(!$this->obj_con->Execute($sql_sp)){
															 $bandera=2;//hubo un problema en el ingreso del nuevo evaluador
														  }else
														  {
														  }
													 }                               


                                     }


							}
				}

        /********************************************************* PROCESO QUE AGREGA A LOS NUEVOS EVALUADOS ******************************************************************/
if($evaluados_asociados!=0){                
				foreach ($evaluados_asociados as $item => $valor)
				{/* GUARDAR CADA EVALUADO*/
                  if(is_array($valor)){
                        foreach ($valor as $k => $value) {
                                $EvaluadoIngresar=$value;
                                $competenciasEvaluado=$this->obtener_competenciasxgrupoocupacional($id_realiza,$EvaluadoIngresar);
                                /*mientras haya competencias del empleado evaluado*/
                                 for($k=0;$k<count($competenciasEvaluado);$k++){
                                       $competenciasIngresar=$competenciasEvaluado[$k];
                                       $sql_sp="CALL update_evaluadores($competenciasIngresar,'$EvaluadoIngresar','$codigoempleado')";

                                        if(!$this->obj_con->Execute($sql_sp)){
                                             $bandera=7;//hubo un problema en el ingreso del nuevo evaluado
                                          }else{
                                          }                                       


                                 }

                        }
                      }else{
                        $EvaluadoIngresar=$valor;
                        $competenciasEvaluado=$this->obtener_competenciasxgrupoocupacional($id_realiza,$EvaluadoIngresar);
                          /*mientras haya competencias del empleado evaluado*/
                                 for($k=0;$k<count($competenciasEvaluado);$k++){
                                       $competenciasIngresar=$competenciasEvaluado[$k];
                                       $sql_sp="CALL update_evaluadores($competenciasIngresar,'$EvaluadoIngresar','$codigoempleado')";

                                        if(!$this->obj_con->Execute($sql_sp)){
                                             $bandera=7;//hubo un problema en el ingreso del nuevo evaluado
                                          }else{
                                          }                                       


                                 }                        


                      }
                }
		}

			/**************************************  PROCESO QUE AGREGA A EL MISMO Y A SU SUPERIOR ********************/	    
                  $codigo_superior=$this->get_codigo_superior($codigoempleado,$id_realiza);

              if($codigo_superior!=0){//
              	$verifica_superior=$this->get_existe_evaluador($codigo_superior,$codigoempleado);
              }
           
           if(!(isset($verifica_superior))){//si no existe agregarlo
           	           for ($i=0; $i < count($competenciasGrupoOcupacional) ; $i++) { 
           	           			  $competencia_ingresar=$competenciasGrupoOcupacional[$i];
                                    $sql_sp="CALL update_evaluadores($competencia_ingresar,'$codigoempleado','$codigo_superior')";
                                     if (!$this->obj_con->Execute($sql_sp)) {
                                     		
                                     	$bandera=3;//hubo un problema al agregar al jefe superior

                                     }else{
                                     		
                                     }

           	           	
           	           }
                    
           }

           /* agregar al mismo empleado*/

       if(!(isset($verifica_superior))){//si no existe agregarlo
           	           for ($i=0; $i < count($competenciasGrupoOcupacional) ; $i++) { 
           	           			  $competencia_ingresar=$competenciasGrupoOcupacional[$i];
                                    $sql_sp="CALL update_evaluadores($competencia_ingresar,'$codigoempleado','$codigoempleado')";
                                     if (!$this->obj_con->Execute($sql_sp)) {
                                     		
                                     	$bandera=4;//hubo un problema al auto agregar el empleado

                                     }else{
                                     
                                     }

           	           	
           	           }
                    
           }

          
               
           if(!(strcmp($evaluador_externo,'null')==0)){
              for ($i=0; $i < count($competenciasGrupoOcupacional) ; $i++) { 
           	           			  $competencia_ingresar=$competenciasGrupoOcupacional[$i];
                                    $sql_sp="CALL update_evaluadores($competencia_ingresar,'$codigoempleado','$evaluador_externo')";
                                     if (!$this->obj_con->Execute($sql_sp)) {
                                     	$bandera=4;//hubo un problema al auto agregar el empleado
                                     }else{
                                     }
           	           }           			
           }

          

if(!(strcmp($evaluado_externo,'null')==0)){
$sql2="SELECT ID_COMPETENCIA FROM competencias_grupo_ocupacional WHERE ID_GRUPOOCUPACIONAL IN(SELECT IFNULL(ID_GRUPOOCUPACIONAL,0) AS ID_GRUPOOCUPACIONAL FROM `view_empleados` WHERE CODIGOEMPLEADO='$evaluado_externo' AND ID_REALIZA=$id_realiza)";
            $competenciasGrupoOcupacional2="";
                 $i2=0;
                 $record_consulta2 = $this->obj_con->Execute($sql2);
                    
          while (!$record_consulta2->EOF)
                  {
                     $competenciasGrupoOcupacional2[$i2]=$record_consulta2->fields["ID_COMPETENCIA"];
                     
                     $i2++;                     
                     $record_consulta2->MoveNext();
                   } 

              for ($i=0; $i < count($competenciasGrupoOcupacional2) ; $i++) { 
                              $competencia_ingresar=$competenciasGrupoOcupacional2[$i];
                                    $sql_sp="CALL update_evaluadores($competencia_ingresar,'$evaluado_externo','$codigoempleado')";
                                    //print_r($sql_sp);
                                     if (!$this->obj_con->Execute($sql_sp)) {
                                      $bandera=5;//hubo un problema al auto agregar el empleado
                                     }else{
                                     }
                       }               
           }           

           return $bandera;

		  }//fin de funcion

/* funcion que retorna si true or false si existe el evalaudor */
       function  get_existe_evaluador($codigosuperior,$codigoempleado){
       	   parent::conectar();
       	   	$sql="SELECT COUNT(*) AS N  FROM `competenciasxempleado` WHERE CODIGOEMPLEADO='$codigoempleado' AND EVALUADOR='$codigosuperior'";
       	   		$record_consulta=$this->obj_con->Execute($sql);
           $N=0;
			while(!$record_consulta->EOF){
                        	$N=$record_consulta->fields["N"];
                        	$record_consulta->MoveNext();
                        }
                         return $N;       	   		

       }//fin de funcion


/* Funcion que retorna el codigo superior de un empleado*/
          function get_codigo_superior($codigoempleado,$id_realiza){
          	parent::conectar();
          	$sql="SELECT IFNULL(JE,0) AS codigosuperior FROM `view_empleados` WHERE ID_REALIZA=$id_realiza AND CODIGOEMPLEADO='$codigoempleado'";
                        $record_consulta=$this->obj_con->Execute($sql);
                        while(!$record_consulta->EOF){
                        	$codigosupe=$record_consulta->fields["codigosuperior"];
                        	$record_consulta->MoveNext();
                        }
                         return $codigosupe;

          }


/* funcion que obtiene los evaluadores actuales de un empleado. */
		  function get_evaluadores_actuales($codigoempleado){
		  	

		  	$sql="SELECT DISTINCT(EVALUADOR) AS EVALUADOR FROM `competenciasxempleado` WHERE CODIGOEMPLEADO='$codigoempleado' AND EVALUADOR!='XX010101'";
            $evaluadores_a=null;
            $i=0;
           $record_consulta = $this->obj_con->Execute($sql);
                    /*Obtengo competencias.*/
 					while (!$record_consulta->EOF)
					        {
					           $evaluadores_a[$i]=$record_consulta->fields["EVALUADOR"];
					           /*Obtengo competencias del grupo*/
					           $i++;					           
					           $record_consulta->MoveNext();
					         }
			return $evaluadores_a;             

		  }//fin de funcion

/* Funcion que obtiene los evaluados actuales de un empleado */

 function get_evaluados_actuales($codigoempleado,$id_realiza){
        
       $jefeactual=$this->get_codigo_superior($codigoempleado,$id_realiza);
        $sql="SELECT DISTINCT(CODIGOEMPLEADO) AS EVALUADO FROM `competenciasxempleado` WHERE EVALUADOR='$codigoempleado' AND CODIGOEMPLEADO!='$codigoempleado' AND CODIGOEMPLEADO!='$jefeactual'";
            $evaluado_a=null;
            $i=0;
           $record_consulta = $this->obj_con->Execute($sql);
                    
          while (!$record_consulta->EOF)
                  {
                     $evaluado_a[$i]=$record_consulta->fields["EVALUADO"];
                     
                     $i++;                     
                     $record_consulta->MoveNext();
                   }
      return $evaluado_a;             

      }//fin de funcion




		   function eliminar_evaluador($evaluador,$evaluado){
		        parent::conectar();
		       
		        $sql="CALL eliminar_evaluador('$evaluador','$evaluado')";
		        if(!$this->obj_con->Execute($sql)){
		          return false;
		  
		        }else{
              
		          return true;
		        }
		  
		       }//FIN DE FUNCION

/*
* Funcion que registra las competencias , el evaluador y el empleado evaluado
* primer parametro codigo de empleado
* segundo parametro evalaluador del empleado
*/
	function registrar_evaluar_empleado($codigoempleado,$codigoJefe,$proceso){
	parent::conectar();
  $bandera=0;
	$competenciasGrupoOcupacional=$this->obtener_competenciasxgrupoocupacional($proceso,$codigoJefe);
  for ($i=0; $i < count($competenciasGrupoOcupacional) ; $i++) { 
           	           			  $competencia_ingresar=$competenciasGrupoOcupacional[$i];
                                    $sql_sp="CALL update_evaluadores($competencia_ingresar,'$codigoJefe','$codigoempleado')";
                                    //print_r($sql_sp);
                                     if (!$this->obj_con->Execute($sql_sp)) {
                                     	$bandera=1;//hubo un problema al agregar al evaluador
                                      //print_r($sql_sp);
                                     }else{
                                     }
           	           }	
    //print_r($competenciasGrupoOcupacional);
    $this->update_competenciasxempleado($codigoempleado,$codigoJefe,$proceso);
                  return $bandera;
		
           }/*fin de funcion*/



/*
* funcion que determina si existe diferencias entre las competencias del grupo ocupacional
*  y las de competenciasxempleado si existe una competencia de mas en competenciasxempleado esta es eliminada
*
*/
function update_competenciasxempleado($codigoempleado,$evaluador,$proceso){
parent::conectar();
$competenciasGrupoOcupacional=$this->obtener_competenciasxgrupoocupacional($proceso,$evaluador);
$sql="SELECT id_competencia FROM `view_evaluacionxempleado` WHERE EVALUANDO='$codigoempleado' AND EVALUADOR='$evaluador'";
$competencias=array();
                 $record_consulta = $this->obj_con->Execute($sql);
          while (!$record_consulta->EOF)
                  {
                     $competencias[]=$record_consulta->fields["id_competencia"];
                     $record_consulta->MoveNext();
                   } 

  for ($i=0; $i <count($competencias) ; $i++) { 
          $competenciaVerificar=$competencias[$i];
          $eliminar=true;
               for ($j=0; $j < count($competenciasGrupoOcupacional); $j++) { 
                   $compGrupoOcupacional=$competenciasGrupoOcupacional[$j];
                         if($competenciaVerificar==$compGrupoOcupacional){
                            $eliminar=false;                            
                          }

               }
            if($eliminar){
                             $this->eliminar_competenciaxempleado($competenciaVerificar,$codigoempleado);                          
                         }               

  }
 

}/*fin de funcion*/

/*
*  elimina una competencia de la tabla competenciasxempleado segun codigoempleado
*/

 function eliminar_competenciaxempleado($idcompetencia,$codigoempleado){
      parent::conectar();
      $sql="CALL eliminar_competenciaxempleado($idcompetencia,'$codigoempleado')";
      if(!$this->obj_con->Execute($sql)){
        return false;
      }else{
        return true;
      }

     }




 function eliminar__registro_jefe($codigoempleado,$id_realiza){
		  	parent::conectar();

		  	$codigo_superior=$this->get_codigo_superior($codigoempleado,$id_realiza);

            if($this->eliminar_evaluador($codigoempleado,$codigo_superior)){
			                                     	return true;
						  	      	                          }else{
						  	      	                          	return false;
						  	      	                          }		  	




		  }/* fin de funcion*/


/*
*  Funcion que recupera todas las competencias del empleado seleccionado.
*  tambien recupera cada hecho descrito por cada competencia si lo hubiese.  
*  y la observacion final.
*
*/

		  function obtener_competenciasxempleado($evaluador,$evaluado){
		  	parent::conectar();
		  	$sql="SELECT * FROM `view_evaluacionxempleado` where EVALUANDO='$evaluado' AND EVALUADOR='$evaluador' order by clasificacion,Subcategoria,nombrecompetencia";
        $sql2="SELECT ifnull(observacion,'') as observacion FROM `observacionesxempleado` WHERE codigoempleado='$evaluado' AND evaluador='$evaluador'";

            $record_consulta_1=$this->obj_con->Execute($sql2);
            $record_consulta=$this->obj_con->Execute($sql);

            $json_observacion="";
                  if($record_consulta_1->RecordCount()<=0){
                            $json_observacion='';
                          }else{     
              while (!$record_consulta_1->EOF)
                            {
                              $json_observacion=$record_consulta_1->fields["observacion"];
                              $record_consulta_1->MoveNext();

                            }
                          }


        
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
                     $valor=$record_consulta->fields["VALOR"];
                     $hechos_a=$record_consulta->fields["HECHOS"];

                     $data1[] = array('nombrecompetencia' =>$nombrecompetencia,'descripcioncompetencia'=>$descripcioncompetencia,'idcompetencia'=>$codigoCompetencia,'nombre_clasificacion'=>$clasificacions,'idclasificacion'=>$idclasificacion,'subcategoria'=>$n_subcategoria,'id_padre'=>$id_padre,'descripcionsub'=>$descripcionsubcategoria,'descripcionclasifica'=>$descripcion_clasifica,'valor'=>$valor,'hechos'=>$hechos_a,'observacion'=>$json_observacion);

                     $record_consulta->MoveNext();
                   }  

  if(isset($data1)){
    $respuesta= array('success' => true,'data'=>$data1);
    }else{
      $respuesta= array('success' =>false);
    }

    return $respuesta;  

}/*fin de funcion */


 function  guardar_evaluacionxempleado($id_competencias,$codigo_empleado,$evaluador,$hechos,$valor){
      parent::conectar();

$sql="CALL guardar_evaluacionxempleado($id_competencias,'$codigo_empleado','$evaluador','$hechos',$valor)";

          if(!$this->obj_con->Execute($sql)){
            return false;
    
          }else{
            return true;
          }      



  }/* fin de funcion*/ 


/*
* guarda las ponderaciones de cada competencia para el plan de sucesion y carrera
*/
   function  guardar_evaluacionxempleadoPLAN($id_competencias,$codigo_empleado,$valor){
      parent::conectar();

$sql="CALL guardar_evaluacionxempleadoPLAN($id_competencias,'$codigo_empleado',$valor)";
// print_r(var_dump($sql));
          if(!$this->obj_con->Execute($sql)){
            return false;
    
          }else{
            return true;
          }      



  }/*fin de funcion*/



  function guardar_observacionGralxempleado($codigo_empleado_evaluado,$evaluador,$observacion_empleado){
    parent::conectar();

$sql="CALL guardar_observacionxempleado('$codigo_empleado_evaluado','$evaluador','$observacion_empleado')";

          if(!$this->obj_con->Execute($sql)){
            return false;
    
          }else{
            return true;
          }  


  } /* fin de funcion*/  

/*
* Funcion que recupera las competencias de un grupo ocupacional segun el codigo del empleado
*
*/

function obtener_competenciasxgrupoocupacional($id_realiza,$codigoempleado){
 parent::conectar();
$sql="SELECT ID_COMPETENCIA FROM competencias_grupo_ocupacional WHERE ID_GRUPOOCUPACIONAL IN(SELECT IFNULL(ID_GRUPOOCUPACIONAL,0) AS ID_GRUPOOCUPACIONAL FROM `view_empleados` WHERE CODIGOEMPLEADO='$codigoempleado' AND ID_REALIZA=$id_realiza)";
            $competenciasGrupoOcupacional="";
                 $i=0;
                 $record_consulta = $this->obj_con->Execute($sql);
                    /*Obtengo competencias.*/
          while (!$record_consulta->EOF)
                  {
                     $competenciasGrupoOcupacional[$i]=$record_consulta->fields["ID_COMPETENCIA"];
                     /*Obtengo competencias del grupo*/
                     $i++;                     
                     $record_consulta->MoveNext();
                   } 
      return $competenciasGrupoOcupacional;
   }/* fin de funcion*/



function obtener_competenciasREALxempleado($codEmpleado){
        parent::conectar();
        $sql="SELECT * FROM view_competenciasrealxempleado where EVALUANDO='$codEmpleado' AND EVALUADOR='XX010101' order by clasificacion,Subcategoria,nombrecompetencia";

        $record_consulta=$this->obj_con->Execute($sql);

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
                     $valor=$record_consulta->fields["VALOR"];
                     
                     $tipocomp=$record_consulta->fields["TIPO_COMPETENCIA"];
                     $nombreTipo=$record_consulta->fields["TIPOCOMPETENCIA"];

                     if($tipocomp==1){
                     $data1[] = array('nombrecompetencia' =>$nombrecompetencia,'descripcioncompetencia'=>$descripcioncompetencia,'idcompetencia'=>$codigoCompetencia,'nombre_clasificacion'=>$clasificacions,'idclasificacion'=>$idclasificacion,'subcategoria'=>$n_subcategoria,'id_padre'=>$id_padre,'descripcionsub'=>$descripcionsubcategoria,'descripcionclasifica'=>$descripcion_clasifica,'valor'=>$valor);
                     }

                    if($tipocomp==2){
                      $data2[] = array('nombrecompetencia' =>$nombrecompetencia,'descripcioncompetencia'=>$descripcioncompetencia,'idcompetencia'=>$codigoCompetencia,'nombre_clasificacion'=>$clasificacions,'idclasificacion'=>$idclasificacion,'subcategoria'=>$n_subcategoria,'id_padre'=>$id_padre,'descripcionsub'=>$descripcionsubcategoria,'descripcionclasifica'=>$descripcion_clasifica,'valor'=>$valor);
                    }

                     $record_consulta->MoveNext();
                   }

                   if(isset($data1)&&isset($data2)){
                    $respuesta= array('success' => true,'data'=>$data1,'data2'=>$data2);
                  }else{
                    $respuesta= array('success' =>false);
                  }


            return $respuesta;  





      }/*fin de funcion */ 

      function eliminar_companeros($codigoempleado){
        parent::conectar();
        /* elimina los compañeros que fueron evaluados por el empleado EXCEPTO el mismo empleado*/
        $sqlevaluados="DELETE FROM competenciasxempleado where  EVALUADOR='$codigoempleado' AND CODIGOEMPLEADO!='codigoempleado'";
        /* elimina los compañeros que evaluaron al empleado excepto el mismo y el codigo de plan */
        $sqlevaluadores="DELETE FROM competenciasxempleado where  CODIGOEMPLEADO='$codigoempleado' AND EVALUADOR!='$codigoempleado' AND EVALUADOR!='XX010101'";
        $bandera=false;
        if(!$this->obj_con->Execute($sqlevaluados)){
            $bandera=false;
    
          }else{
            $bandera=true;
          }


      if(!$this->obj_con->Execute($sqlevaluadores)){
            $bandera=false;
    
          }else{
            $bandera=true;
          }

         return $bandera;

      }

/*
* Funcion que devuelve al json los valores del response devuelve.
* - Limites inferiores, Intermedios y Superiores
* - Cuadrante 1,Cuadrante 2, Cuadrante 3, Cuadrante 4, Cuadrante 5, Cuadrante 6, Cuadrante 7, Cuadrante 8, Cuadrante 9
*  cada cuadrante con sus correspondientes empleados. previo calculo 
*/
      function matrix_ninebox($id_depto,$id_realiza){
        parent::conectar();
        $limiteInferior=$this->get_valores_ninebox($id_realiza,1);
        $limiteIntermedio=$this->get_valores_ninebox($id_realiza,2);
        $limiteSuperior=$this->get_valores_ninebox($id_realiza,3);
        $cuadrante1="";
        $cuadrante2="";
        $cuadrante3="";
        $cuadrante4="";
        $cuadrante5="";
        $cuadrante6="";
        $cuadrante7="";
        $cuadrante8="";
        $cuadrante9="";
        $empleadosxcuadrante=$this->get_empleadosCuadrante($id_realiza,$id_depto);
        for($i=0;$i<count($empleadosxcuadrante);$i++){
           $cuadrante=$empleadosxcuadrante[$i][1];
             switch ($cuadrante) {
               case 1:
                 $cuadrante1=$cuadrante1."<br> ".$empleadosxcuadrante[$i][0]."<br>";
                break;
               case 2:
                $cuadrante2=$cuadrante2."<br>".$empleadosxcuadrante[$i][0]."<br>";
                 break;
                case 3:
                $cuadrante3=$cuadrante3."<br>".$empleadosxcuadrante[$i][0]."<br>";
                 break;             

                 case 4:
                 $cuadrante4=$cuadrante4."<br> ".$empleadosxcuadrante[$i][0]."<br>";
                 break;

                 case 5:
                 $cuadrante5=$cuadrante5."<br> ".$empleadosxcuadrante[$i][0]."<br>";
                 break;

                 case 6:
                 $cuadrante6=$cuadrante6."<br> ".$empleadosxcuadrante[$i][0]."<br>";
                 break;
                 case 7:
                 $cuadrante7=$cuadrante7."<br>".$empleadosxcuadrante[$i][0]."<br>";
                 break;

                 case 8:
                 $cuadrante8=$cuadrante8."<br> ".$empleadosxcuadrante[$i][0]."<br>";
                 break;

                 case 9:
                 $cuadrante9=$cuadrante9."<br>".$empleadosxcuadrante[$i][0]."<br>";
                 break;
             }

        }

 $respuesta= array('success' => true,'limiteI'=>$limiteInferior,'limiteIn'=>$limiteIntermedio,'limiteS'=>$limiteSuperior,'cuadrante1'=>$cuadrante1,'cuadrante2'=>$cuadrante2,'cuadrante3'=>$cuadrante3,'cuadrante4'=>$cuadrante4,'cuadrante5'=>$cuadrante5,'cuadrante6'=>$cuadrante6,'cuadrante7'=>$cuadrante7,'cuadrante8'=>$cuadrante8,'cuadrante9'=>$cuadrante9);
 return $respuesta;  

 }/*fin de funcion*/



/********************************************************************************
* funcion que retorna todos los empleados con su respectivo numero de cuadrante.
*
*
********************************************************************************/


 function get_empleadosCuadrante($id_realiza,$id_dpto){
  parent::conectar();
  $empleadosxdpto=$this->get_empleadosxdpto($id_dpto,$id_realiza);
  $empleadosxcuadrante=array();
  $f=0;

  for($i=0;$i<count($empleadosxdpto);$i++){
      $codigoempleado=$empleadosxdpto[$i][0];
      $nombreempleado=$empleadosxdpto[$i][1];
      $notaPotencia=$this->get_notaxempleado($codigoempleado,1,$id_realiza);
      $notaDesempeno=$this->get_notaxempleado($codigoempleado,2,$id_realiza);

     
       $cuadranteP=$this->get_cuadrante($id_realiza,$notaPotencia);
       $cuadranteD=$this->get_cuadrante($id_realiza,$notaDesempeno);
        
      $cuadranteBox=$this->get_cuadranteNineBox($cuadranteP,$cuadranteD);
     
      $empleadosxcuadrante[$f][0]=$nombreempleado;
      $empleadosxcuadrante[$f][1]=$cuadranteBox;
      $f++;
  }/*fin de for*/

  return $empleadosxcuadrante;

 }/*fin de funcion*/


/********************************************************************************
* funcion que retorna el cuadrante de la ninebox 
* puede retornar 1,2,3,4,5,6,7,8 o 9.
* esto dependera del cuadrante de potencial y cuadrante desempeño
*
*  cuadrante  ________________________________
*  pot  3    |____7___|______8_____|____9_____|
*  enc  2    |____4___|______5_____|____6_____|
*  ial  1    |____1___|______2_____|____3_____|
*                       
*                 1           2          3
*             ______cuadrante potencial________
***********************************************************************************/
 function get_cuadranteNineBox($cuadranteP,$cuadranteD){
  $cuadrante=0;

  switch ($cuadranteP) {
    case 1:
              switch ($cuadranteD) {
                case 1:
                  $cuadrante=1;
                  break;
                
                case 2:
                  $cuadrante=4;
                  break;
                case 3:
                  $cuadrante=7;
                  break;
              }

      break;
    
    case 2:
        switch ($cuadranteD) {
                case 1:
                  $cuadrante=2;
                  break;
                
                case 2:
                  $cuadrante=5;
                  break;
                case 3:
                  $cuadrante=8;
                  break;
              }            

      break;

    case 3:
        switch ($cuadranteD) {
                case 1:
                  $cuadrante=3;
                  break;
                
                case 2:
                  $cuadrante=6;
                  break;
                case 3:
                  $cuadrante=9;
                  break;
              }      

    break;
  }

  return $cuadrante;

 }/* fin de funcion*/


/********************************************************************************
*
* funcion que retorna el cuadrante de acuerdo a la nota 
* los cuadrantes para esta funcion son  1 ,2 y 3.
********************************************************************************/
 function get_cuadrante($id_realiza,$nota){
 parent::conectar();
 $sql="SELECT LIMITEI1,LIMITEI2,LIMITES1,LIMITES2,NIVEL_I1,NIVEL_I2 FROM view_escalasxempresa WHERE ID_REALIZA=$id_realiza";

 $record_consulta=$this->obj_con->Execute($sql);
       while(!$record_consulta->EOF){
         $limiteI1=$record_consulta->fields["LIMITEI1"];
         $limiteI2=$record_consulta->fields["LIMITEI2"];
          $limiteS1=$record_consulta->fields["LIMITES1"];
          $limiteS2=$record_consulta->fields["LIMITES2"];
        $intermedio1=$record_consulta->fields["NIVEL_I1"];
        $intermedio2=$record_consulta->fields["NIVEL_I2"];
        $record_consulta->MoveNext();
       }
  $cuadrante=0;

       if($limiteI2!=0){
                  if($nota<=$limiteI2){
                    /* cuadrante 1*/
                    $cuadrante=1;
                  }else{
                         if($intermedio2!=0){
                                if($nota<=$intermedio2){
                                  /*cuadrante 2*/
                                  $cuadrante=2;
                                }else{
                                  /*cuadrante 3*/
                                  $cuadrante=3;
                                }
                         }else{
                                if($nota<=$intermedio1){
                                  /*cuadrante 2*/
                                  $cuadrante=2;
                                }else{
                                  /*cuadrante 3*/
                                  $cuadrante=3;
                                }

                         }

                  }
       }else{
             if($nota<=$limiteI1){
              /* cuadrante 1*/
              $cuadrante=1;
             }else{
                   if($intermedio2!=0){
                          if($nota<=$intermedio2){
                            /*cuadrante 2 */
                            $cuadrante=2;
                          }else{
                                /*cuadrante 3*/
                                $cuadrante=3;
                          }
                   }else{
                          if($nota<=$intermedio1){
                            /*cuadrante 2*/
                            $cuadrante=2;
                          }else{
                            $cuadrante=3;

                          }
                   }


             }

       }

       return $cuadrante;



  }/*fin de funcion*/



 /********************************************************************************
 * funcion que deveuelve la nota del empleado de acuerdo al tipo
 *   tipo =1 ->Potencial
 *   tipo =2 ->Desempeño.
 ********************************************************************************/

  function get_notaxempleado($codigoempleado,$tipo,$id_realiza){
    parent::conectar();
$sql="SELECT ID_COMPETENCIA,VALORR FROM competenciasxempleado WHERE EVALUADOR='XX010101' AND VALORR IS NOT NULL AND CODIGOEMPLEADO='$codigoempleado'
AND ID_COMPETENCIA IN( SELECT ID_COMPETENCIA FROM view_competencias_ev WHERE ID_REALIZA=$id_realiza AND TIPO_COMPETENCIA=$tipo)";
    $record_consulta=$this->obj_con->Execute($sql);
  $competenciasxemple[][]="";
  //$i=0;
  $nota=0;
  $suma=0;

  if($record_consulta->RecordCount()>0){/*siempre que posea competencias evaluadas del empleado*/
    while (!$record_consulta->EOF)
                  {
                     $id_competencia=$record_consulta->fields["ID_COMPETENCIA"];
                     $valorReal=$record_consulta->fields["VALORR"];
                     $ponderacion=$this->get_PonderacionDeCompetencia($codigoempleado,$id_realiza,$id_competencia);
                        if($ponderacion!=0){
                         $suma=$suma+($ponderacion*$valorReal);
                         }
                     $record_consulta->MoveNext();
                   }
                   if($suma!=0){

                   //$nota=round($suma/100,0,PHP_ROUND_HALF_UP);
                   $nota=round($suma/100,0);
                   //print_r('suma= '.$suma.'   nota='.$nota);
                   
                    }
                    
                   return $nota;                 
      }else{
        return 0; /*nota */
     }
   return 0;
  }/*fin de funcion*/

/********************************************************************************
*Funcion que obtiene la ponderacion de una competencia de un empleado de acuerdo al grupo oucpoacional que es
*
********************************************************************************/
  function get_PonderacionDeCompetencia($codigoempleado,$id_realiza,$id_competencia){
parent::conectar();   
$sql="SELECT IFNULL(VALOR_PLAN,0) AS PONDERACION FROM competencias_grupo_ocupacional WHERE ID_GRUPOOCUPACIONAL=(
SELECT ID_GRUPOOCUPACIONAL FROM view_empleados WHERE CODIGOEMPLEADO='$codigoempleado' and ID_REALIZA=$id_realiza) AND 
ID_COMPETENCIA=$id_competencia";
$record_consulta=$this->obj_con->Execute($sql);
if($record_consulta->RecordCount()>0){
          while(!$record_consulta->EOF){
            $ponderacion=$record_consulta->fields["PONDERACION"];
            $record_consulta->MoveNext();
          }
          return $ponderacion;
}else{
      return 0;
}


  }/* fin de funcion*/


/********************************************************************************
* funcion que obtiene los empleados de un departamento seleccionado
*
********************************************************************************/
  function get_empleadosxdpto($id_dpto,$id_realiza){
  parent::conectar();
if($id_dpto!=0){
$sql="SELECT CODIGOEMPLEADO,CONCAT(APELLIDOSEMPLEADO,', ',NOMBREEMPLEADO) AS EMPLEADO FROM view_empleados where ID_REALIZA=$id_realiza and ID_DPTO=$id_dpto";
}else{
$sql="SELECT CODIGOEMPLEADO,CONCAT(APELLIDOSEMPLEADO,', ',NOMBREEMPLEADO) AS EMPLEADO FROM view_empleados where ID_REALIZA=$id_realiza";  
}
$record_consulta = $this->obj_con->Execute($sql);
$empleados = array();
$i=0;
while (!$record_consulta->EOF)
                  {
                     $emplead=$record_consulta->fields["CODIGOEMPLEADO"];
                     $nombre=$record_consulta->fields["EMPLEADO"];
                     $empleados[$i][0]=$emplead;
                     $empleados[$i][1]=$nombre;
                     $i++;
                     $record_consulta->MoveNext();
                   }

    return $empleados;



  }




/********************************************************************************
* funcion que devuelve en texto los limites que posee una ninebox, aceptando como argumento
*  el id del proceso y valor : identificando 1 ->inferior 2 ->intermedio 3->Superior
*
*                    limite superior
*                    intermedio
*                    limite inferior 
*                                     inferior   |    intermedio   |superior
********************************************************************************/
      function get_valores_ninebox($id_realiza,$valor){
          parent::conectar();

          if($valor==3){/* max valor*/
$sql="SELECT (case  when LIMITES2=0 then LIMITES1 when LIMITES2!=0 then  CONCAT(LIMITES1,'-',LIMITES2)  END) AS LIMITE FROM `view_escalasxempresa`
WHERE ID_REALIZA=$id_realiza";

          }
          if($valor==2){
$sql="SELECT (case  when NIVEL_I2=0 then NIVEL_I1 when NIVEL_I2!=0 then  CONCAT(NIVEL_I1,'-',NIVEL_I2)  END) AS LIMITE FROM `view_escalasxempresa`
WHERE ID_REALIZA=$id_realiza";
          }

          if($valor==1){
$sql="SELECT (case  when LIMITEI2=0 then LIMITEI1 when LIMITEI1!=0 then  CONCAT(LIMITEI1,'-',LIMITEI2)  END) AS LIMITE FROM `view_escalasxempresa`
WHERE ID_REALIZA=$id_realiza";
          }

     $record_consulta = $this->obj_con->Execute($sql);
    
          while (!$record_consulta->EOF)
                  {
                     $limite=$record_consulta->fields["LIMITE"];
                  
                     $record_consulta->MoveNext();
                   }  

          return $limite;         
   

      }/* fin de funcion */
					

	
	
}


?>