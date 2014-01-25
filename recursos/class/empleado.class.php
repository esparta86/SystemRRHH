<?php
class Empleado extends DBManager
{

	var  $con;
   
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

		   function ver_empleados($id_realiza)//para identificar el proceso.
					{
					    parent::conectar();
					    $sql="SELECT * FROM view_empleados where id_realiza=$id_realiza ";
					    $record_consulta = $this->obj_con->Execute($sql);
					        while (!$record_consulta->EOF)
					        {
					           $idcargo=$record_consulta->fields["IDCARGO"];
					           $departamento=$record_consulta->fields["NOMBREDPTO"];
					           $nombregrupo=$record_consulta->fields["grupo"];
					           $cargo=$record_consulta->fields["NOMBRECARGO"];
					           $codigoempleado=$record_consulta->fields["CODIGOEMPLEADO"];
					           $nombre_e=$record_consulta->fields["NOMBREEMPLEADO"];
					           $apellido_e=$record_consulta->fields["APELLIDOSEMPLEADO"];
					           $sexo=$record_consulta->fields["SEXO"];
					           $email=$record_consulta->fields["EMAIL"];
					           $jefe=$record_consulta->fields["JE"];
					           $supe=$record_consulta->fields["SUPERIOR"];
                     $eval=$record_consulta->fields["EVALUA"];
					           		/* CONSEGUIR EL CARGO DEL EMPLEADO QUE ES SUPERIOR*/	
					                $sql_2="SELECT IDCARGO FROM `view_empleados` WHERE CODIGOEMPLEADO='$jefe'";
					                $record_consulta2=$this->obj_con->Execute($sql_2);
					                $cargosuperior="";
					                  while(!$record_consulta2->EOF){
                                                $cargosuperior=$record_consulta2->fields["IDCARGO"];
                                                $record_consulta2->MoveNext();
					                           }
                          $sql3="SELECT IDPONDERACIONXEMPLEADO,JEFE,COWORKERS,COLABORADORES,PERSONAL FROM ponderacionesxempleado WHERE CODIGOEMPLEADO='$codigoempleado'";
                          $record_consulta3=$this->obj_con->Execute($sql3);
                             if($record_consulta3->RecordCount()<=0){
                                         $idpondera=0;
                                         $valorjefe=0;
                                         $valorcolaborador=0;
                                         $valorcoworker=0;
                                         $valorpersonal=0;
                                         
                                        }else{
                                         while (!$record_consulta3->EOF)
                                              {
                                                $idpondera=$record_consulta3->fields["IDPONDERACIONXEMPLEADO"];
                                                $valorjefe=$record_consulta3->fields["JEFE"];
                                                $valorcolaborador=$record_consulta3->fields["COLABORADORES"];
                                                $valorcoworker=$record_consulta3->fields["COWORKERS"];
                                                $valorpersonal=$record_consulta3->fields["PERSONAL"];
                                                
                                                $record_consulta3->MoveNext();
                                              }
                                            }
						       				       
						       $data1[] = array('idcargo'=>$idcargo,'departamento' => $departamento,'nombregrupo'=>$nombregrupo,'cargo'=>$cargo,'codigoempleado'=>$codigoempleado,'nombre_e'=>$nombre_e,'apellido_e'=>$apellido_e,'sexo'=>$sexo,'email'=>$email,'codigo_e'=>$jefe,'nombre_emp'=>$supe,'codigo_cargo_jefe'=>$cargosuperior,'evalua'=>$eval,'idponderacion'=>$idpondera,'jefe'=>$valorjefe,'coworkers'=>$valorcoworker,'colaboradores'=>$valorcolaborador,'personal'=>$valorpersonal);
					              
					           $record_consulta->MoveNext();
					         }
					      $repuesta = array('success'=>true,'data'=>$data1); 
	        return $repuesta;
					       //return $data1;
	}//fin funcion


		function ver_jefes_s($id_realiza){
			parent::conectar();
            /* OBTENER CODIGOEMPLEADO Y NOMBRE DE LOS EMPLEADOS QUE TIENEN COLABORARES.*/
			$sql="SELECT CODIGOEMPLEADO,CONCAT(APELLIDOSEMPLEADO,', ',NOMBREEMPLEADO) as nombre FROM `view_empleados` where ID_REALIZA=$id_realiza AND CODIGOEMPLEADO IN(SELECT distinct(JEFE) FROM `empleado` WHERE JEFE !='null' and JEFE !='')order by nombre";
			$record_consulta=$this->obj_con->Execute($sql);

			while(!$record_consulta->EOF){
                      $codigo=$record_consulta->fields["CODIGOEMPLEADO"];
                      $nombre=$record_consulta->fields["nombre"];

						   $data1[] = array('codigoempleado' =>$codigo,'nombreempleado' =>$nombre);
						   $record_consulta->MoveNext();                      

			        }
							$repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;			        

		}//fin de funcion


					function ver_jefes($id_realiza,$codigoEmpleado){
						parent::conectar();
						$sql="SELECT CODIGOEMPLEADO,NOMBREEMPLEADO FROM `view_empleados` WHERE ID_REALIZA=$id_realiza AND IDCARGO=$codigoEmpleado";
						$record_consulta=$this->obj_con->Execute($sql);

						 while(!$record_consulta->EOF){
						 	 $codigo=$record_consulta->fields["CODIGOEMPLEADO"];
						 	 $nombre=$record_consulta->fields["NOMBREEMPLEADO"];

						    $data1[] = array('codigo_e' =>$codigo,'nombre_emp' =>$nombre);
						    $record_consulta->MoveNext();
						 }

							$repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;						 



					}//fin de funcion



					function listar_empleados($id_realiza,$bandera)//para identificar el proceso.
					{
					    parent::conectar();

					    if($bandera){
					    	$sql="SELECT codigoempleado,concat(apellidosempleado,', ',nombreempleado) as empleado FROM `view_empleados` where id_realiza=$id_realiza order by empleado";

					    }else{
					    $sql="SELECT codigoempleado,concat(apellidosempleado,', ',nombreempleado) as empleado FROM `view_empleados` where id_realiza=$id_realiza and codigoempleado not in( select codigoempleado from usuario where id_realiza=$id_realiza ) order by empleado";
					    }
					    //$data1="";

					    $record_consulta = $this->obj_con->Execute($sql);
						

					        while (!$record_consulta->EOF)
					        {
					           $codigo=$record_consulta->fields["codigoempleado"];
					           $nombreE=$record_consulta->fields["empleado"];
					        			       
						       $data1[] = array('codigoempleado'=>$codigo,'nombreempleado' =>$nombreE);
					              
					           $record_consulta->MoveNext();
					         }
					         //ANTERIORMENTE NO HACIA ESTO PERO PENSE QUE AFECTABA EN ALGO POR EL [root] del STORE donde se define : data
					      $repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;
					       
					}//fin de funcion


					/*function get_info_empleado($codigoempleado){
					parent::conectar();
					$sql="SELECT * FROM `view_empleados` where codigoempleado='$codigoempleado' limit 0,1";
					$record_consulta=$this->obj_con->Execute($sql);
					   while (!$record_consulta->EOF) {
					   	   
					   }





					}//fin de empleado
                        */


function  verificar_empleado($codigo){
    			parent::conectar();
    			$codigoe=strtoupper($codigo);
    			$sql="SELECT count(*) as N FROM `empleado` where CODIGOEMPLEADO='$codigoe'";
    			$record_consulta=$this->obj_con->Execute($sql);
                $N="";
    			 while(!$record_consulta->EOF){
    			 	$N=$record_consulta->fields["N"];
    			 	$record_consulta->MoveNext();
    			 }

    			 return $N;

    		}	//fin de funcion

   

   function guardar_empleado($codigo_e,$nombre,$apellido,$sex,$carg,$email){

        parent::conectar();
       $nombre2=strtoupper($nombre);
       $apellido2=strtoupper($apellido);
       $codigo_e2=strtoupper($codigo_e);
       
       $sql="CALL guardar_empleado('$codigo_e2',$carg,'$nombre2','$apellido2','$sex','$email')";
        if(!$this->obj_con->Execute($sql)){
          return false;
  
        }else{
          return true;
        }
  
       }//fin de guardar empleado



 function guardar_empleadoEV($codigo_e,$nombre,$apellido,$sex,$carg,$email,$jefe,$evalua){

        parent::conectar();
       
       $sql="CALL guardar_empleadoEV('$codigo_e',$carg,'$nombre','$apellido','$sex','$email','$jefe','$evalua')";
        if(!$this->obj_con->Execute($sql)){
          return false;
  
        }else{
          return true;
        }
  
       }//fin de guardar empleado



function modificar_empleado($codigo_e,$nombre,$apellido,$sex,$carg,$email){

        parent::conectar();
       $nombre2=strtoupper($nombre);
       $apellido2=strtoupper($apellido);
       $codigo_e2=strtoupper($codigo_e);
       
       $sql="CALL update_empleado('$codigo_e2',$carg,'$nombre2','$apellido2','$sex','$email')";
        if(!$this->obj_con->Execute($sql)){
          return false;
  
        }else{
          return true;
        }
  
       }//fin de modificar empleado 


 function modificar_empleadoEV($codigo_e,$nombre,$apellido,$sex,$carg,$email,$jefe,$evalua){

        parent::conectar();
       
       $codigo_e2=strtoupper($codigo_e);
       
       
       $sql="CALL update_empleadoEV('$codigo_e2',$carg,'$nombre','$apellido','$sex','$email','$jefe','$evalua')";
        if(!$this->obj_con->Execute($sql)){
          return false;
  
        }else{
          return true;
        }
  
       }//fin de modificar empleado 




       function eliminar_empleado($codigo_e){

        parent::conectar();
    
       
       $sql="CALL eliminar_empleado('$codigo_e')";
        if(!$this->obj_con->Execute($sql)){
          return false;
  
        }else{
          return true;
        }
  
       }//fin de modificar empleado 


       function listar_colaboradores($id_realiza,$codigoJefe){
       		parent::conectar();
       		$sql="SELECT CODIGOEMPLEADO,NOMBREEMPLEADO,APELLIDOSEMPLEADO,NOMBRECARGO FROM `view_empleados` WHERE ID_REALIZA=$id_realiza AND JE='$codigoJefe'";
             $record_consulta=$this->obj_con->Execute($sql);
             if($record_consulta->RecordCount()<=0){
                   $data1[] = array('codigoempleado' =>'SIN REGISTROS','nombrecolaborador' =>'SIN REGISTROS','apellidoscolaborador'=>'SIN REGISTROS','cargoactual'=>'SIN REGISTROS');
                }else{       		
						while(!$record_consulta->EOF){
									 	 $codigo=$record_consulta->fields["CODIGOEMPLEADO"];
									 	 $nombre=$record_consulta->fields["NOMBREEMPLEADO"];
									 	 $apellido=$record_consulta->fields["APELLIDOSEMPLEADO"];
									 	 $cargoa=$record_consulta->fields["NOMBRECARGO"];
								     $data1[] = array('codigoempleado' =>$codigo,'nombrecolaborador' =>$nombre,'apellidoscolaborador'=>$apellido,'cargoactual'=>$cargoa);
 								     $record_consulta->MoveNext();
									 }
						}

					$repuesta = array('success'=>true,'data'=>$data1); 
	        return $repuesta;						 
       }//fin de funcion

/******************************************************************************
* Funcion que se encarga de mostrar todos los compañeros actuales de un emplea-
* do seleccionado un empleado es compañero de otro empleado cuando este compar-
* ten el mismo jefe inmediato superior.
*
*/
function listar_coworkers($id_realiza,$codigoJefe,$codigoempleado_a){
parent::conectar();

/* RECUPERAR TODOS LOS COOWORKER QUE TIENE ACTUALMENTE */
$sql="SELECT CODIGOEMPLEADO,CONCAT(APELLIDOSEMPLEADO,', ',NOMBREEMPLEADO,' (',NOMBRECARGO,')') AS COMPANERO  FROM `view_empleados` WHERE ID_REALIZA=$id_realiza  AND JE='$codigoJefe' AND CODIGOEMPLEADO !='$codigoempleado_a' ORDER BY companero";
$record_consulta=$this->obj_con->Execute($sql);
 /* RECUPERAR LOS COOWORKER QUE SI HAN SIDO ASIGNADOS COMO EVALUADORES SOLO COMPAÑEROS NO INCLYE AL JEFE NI AL MISMO EMPLEADO SELECCIONADO*/  	
 $sql2="SELECT DISTINCT(EVALUADOR) AS EVALUADOR FROM `competenciasxempleado` WHERE EVALUADOR!='$codigoJefe' AND EVALUADOR!='$codigoempleado_a' AND CODIGOEMPLEADO='$codigoempleado_a'";
$record_consulta2=$this->obj_con->Execute($sql2);

/* RECUPERAR LOS COOWORKER QUE SERAN EVALUADOS POR EL EMPLEADO SELECCIONADO, NO INCLUYENDO AL EMPLEADO SELECCIONADO NI EL JEFE*/
$sql4="SELECT DISTINCT(CODIGOEMPLEADO) AS EVALUADO FROM `competenciasxempleado` WHERE EVALUADOR!='$codigoJefe' AND EVALUADOR='$codigoempleado_a' AND CODIGOEMPLEADO!='$codigoempleado_a'";
$record_consulta4=$this->obj_con->Execute($sql4);

        $evaluadores_actuales[]="";
        $i=0;
            while(!$record_consulta2->EOF){
            		$evaluadores_actuales[$i]=$record_consulta2->fields["EVALUADOR"];
            		$i++;
            		$record_consulta2->MoveNext();
            }


        $evaluados_actuales[]="";
        $j=0;
            while(!$record_consulta4->EOF){
                $evaluados_actuales[$j]=$record_consulta4->fields["EVALUADO"];
                $j++;
                $record_consulta4->MoveNext();
            }            
 
       	
  /* identifica los cooworker que posee actualmente quienes seran evaluadores del empleado seleccionado*/
       	  while(!$record_consulta->EOF){
       	  			$codigo=$record_consulta->fields["CODIGOEMPLEADO"];
       	  			$compa=$record_consulta->fields["COMPANERO"];
       	  			$asignado=false;
                $evaluado=false;
                /*para el evaluador*/
       	  			   foreach ($evaluadores_actuales as $evaluador) {
       	  			   	    if($evaluador==$codigo){
       	  			   	    		$asignado=true;//esta asignado
       	  			   	    		}
       	  			   }
       	  			$data1[] = array('codigoe' =>$codigo,'nombrecompa'=>$compa,'selected'=>$asignado);
                 /*para el evaluado*/
                  foreach ($evaluados_actuales as $e_evaluado) {
                         if($e_evaluado==$codigo){
                            $evaluado=true;//es evaluado
                         }
                  }
                $data2[] = array('codigoe' =>$codigo,'nombrecompa'=>$compa,'selected'=>$evaluado);

       	  			$record_consulta->MoveNext();
       	    }

            
          /*AGREGAR AL ARRAY ACTUAL E IDENTIFICAR LOS EVALUADORES QUE NO SON SUS COMPAÑEROS.*/

          $sql3="SELECT CODIGOEMPLEADO,CONCAT(APELLIDOSEMPLEADO,', ',NOMBREEMPLEADO,' ( Externo :',NOMBRECARGO,')') AS COMPANERO  FROM `view_empleados` WHERE ID_REALIZA=$id_realiza AND CODIGOEMPLEADO IN(SELECT DISTINCT(EVALUADOR) AS EVALUADOR FROM `competenciasxempleado` WHERE EVALUADOR!='$codigoempleado_a' AND EVALUADOR!='$codigoJefe' AND CODIGOEMPLEADO='$codigoempleado_a' AND EVALUADOR NOT IN(SELECT CODIGOEMPLEADO  FROM `view_empleados` WHERE ID_REALIZA=$id_realiza  AND JE='$codigoJefe' AND CODIGOEMPLEADO !='$codigoempleado_a')) ORDER BY companero";

          $record_consulta3=$this->obj_con->Execute($sql3);
          while (!$record_consulta3->EOF) {
                $codigo=$record_consulta3->fields["CODIGOEMPLEADO"];
                $compa=$record_consulta3->fields["COMPANERO"];              
                $data1[] = array('codigoe' =>$codigo,'nombrecompa'=>$compa,'selected'=>true);
                $record_consulta3->MoveNext();
          }

          $sql4="SELECT CODIGOEMPLEADO,CONCAT(APELLIDOSEMPLEADO,', ',NOMBREEMPLEADO,' ( Externo :',NOMBRECARGO,')') AS COMPANERO  FROM `view_empleados` WHERE ID_REALIZA=$id_realiza AND CODIGOEMPLEADO IN(
SELECT DISTINCT(CODIGOEMPLEADO) AS CODIGOEMPLEADO FROM `competenciasxempleado` WHERE EVALUADOR='LN-GC092' AND EVALUADOR!='LN-AA091'  AND CODIGOEMPLEADO!='LN-GC092' AND EVALUADOR NOT IN(SELECT CODIGOEMPLEADO  FROM `view_empleados` WHERE ID_REALIZA=26  AND JE='LN-AA091' AND CODIGOEMPLEADO !='LN-GC092')) ORDER BY companero";

          
          if(isset($data1)&&isset($data2)){
              $respuesta= array('success' => true,'data'=>$data1,'data2'=>$data2);   
           }else{
              $respuesta= array('success' =>false);
       	         
           }
           return $respuesta;

       }// fin de funcion


       function listar_empleadosxdpto($proceso,$idpto){
        parent::conectar();
        $sql="SELECT CODIGOEMPLEADO,CONCAT(APELLIDOSEMPLEADO,', ',NOMBREEMPLEADO) AS EMPLEADO FROM `view_empleados` where ID_REALIZA=$proceso AND ID_DPTO=$idpto ORDER BY EMPLEADO";
        $record_consulta=$this->obj_con->Execute($sql);

if($record_consulta->RecordCount()<=0){
                  $data1[]=array('codigo_empleado'=>'0','nombre_empleado'=>'no hay empleados.');
                }else{        

           while(!$record_consulta->EOF){
               $codigoe=$record_consulta->fields["CODIGOEMPLEADO"];
               $empleado=$record_consulta->fields["EMPLEADO"];

               $data1[]=array('codigo_empleado'=>$codigoe,'nombre_empleado'=>$empleado);
               $record_consulta->MoveNext();
           }
         }


          $respuesta= array('success' => true,'data'=>$data1);

            return $respuesta;

       }//fin de funcion



       function verificar_cambio_jefe($codigoempleado,$jefenuevo){
        parent::conectar();

           $sql="SELECT * FROM `empleado` WHERE CODIGOEMPLEADO='$codigoempleado' AND JEFE='$jefenuevo'";
           $record_consulta=$this->obj_con->Execute($sql);

           if($record_consulta->RecordCount()>0){
            /*Es el mismo jefe*/
            return false;
           }else{/*hay cambio de jefe*/

            return true;
           }







       }/* fin de funcion*/

       /* funcion que recupera los empleados que evaluara el empleado */
       function listar_empleados_a_evaluar($id_realiza,$codigoempleado){
        parent::conectar();
        $sql="SELECT CODIGOEMPLEADO,CONCAT(APELLIDOSEMPLEADO,', ',NOMBREEMPLEADO) AS EMPLEADO FROM empleado WHERE CODIGOEMPLEADO IN(SELECT DISTINCT(CODIGOEMPLEADO) AS CODIGOEMPLEADO FROM `competenciasxempleado` WHERE EVALUADOR='$codigoempleado' AND VALORR IS NULL) UNION SELECT CODIGOEMPLEADO,CONCAT(APELLIDOSEMPLEADO,', ',NOMBREEMPLEADO,'( YA EVALUADO)') AS EMPLEADO FROM empleado WHERE CODIGOEMPLEADO IN(SELECT DISTINCT(CODIGOEMPLEADO) AS CODIGOEMPLEADO FROM `competenciasxempleado` WHERE EVALUADOR='$codigoempleado' AND VALORR IS NOT NULL)";

                  $record_consulta=$this->obj_con->Execute($sql);

            if($record_consulta->RecordCount()<=0){
                              $data1[]=array('codigo_empleado'=>'0','nombre_empleado'=>'no hay empleados.');
                            }else{        

                       while(!$record_consulta->EOF){
                           $codigoe=$record_consulta->fields["CODIGOEMPLEADO"];
                           $empleado=$record_consulta->fields["EMPLEADO"];

                           $data1[]=array('codigoempleado'=>$codigoe,'nombreempleado'=>$empleado);
                           $record_consulta->MoveNext();
                       }
                     }

               $respuesta= array('success' => true,'data'=>$data1);

              return $respuesta;                 


       }  /* fin de funcion */



/*
* Lista los empleados de la empresa para el plan de sucesion y carrera no importando quien es evaluador.
*/

 function listar_empleados_a_evaluarPLAN($id_realiza){
        parent::conectar();
        $sql="SELECT CODIGOEMPLEADO,CONCAT(APELLIDOSEMPLEADO,', ',NOMBREEMPLEADO) AS EMPLEADO FROM view_empleados WHERE ID_REALIZA=$id_realiza AND CODIGOEMPLEADO IN(SELECT DISTINCT(CODIGOEMPLEADO) FROM competenciasxempleado WHERE EVALUADOR='XX010101')";

                  $record_consulta=$this->obj_con->Execute($sql);

            if($record_consulta->RecordCount()<=0){
                              $data1[]=array('codigo_empleado'=>'0','nombre_empleado'=>'no hay empleados.');
                            }else{        

                       while(!$record_consulta->EOF){
                           $codigoe=$record_consulta->fields["CODIGOEMPLEADO"];
                           $empleado=$record_consulta->fields["EMPLEADO"];

                           $data1[]=array('codigoempleado'=>$codigoe,'nombreempleado'=>$empleado);
                           $record_consulta->MoveNext();
                       }
                     }

               $respuesta= array('success' => true,'data'=>$data1);

              return $respuesta;                 


       }  /* fin de funcion */       



/*
* Lista los empleados de la empresa para el plan de sucesion y carrera para el formulario de talento y gestion por competencias.
*/

 function listar_empleados_gestiontalentos($id_realiza){
        parent::conectar();
        $sql="SELECT CODIGOEMPLEADO,CONCAT(APELLIDOSEMPLEADO,', ',NOMBREEMPLEADO,' CARGO ACTUAL : ',NOMBRECARGO) AS EMPLEADO FROM view_empleados WHERE ID_REALIZA=$id_realiza AND CODIGOEMPLEADO IN(SELECT DISTINCT(CODIGOEMPLEADO) FROM competenciasxempleado WHERE EVALUADOR='XX010101') ORDER BY EMPLEADO ASC";

                  $record_consulta=$this->obj_con->Execute($sql);

            if($record_consulta->RecordCount()<=0){
                              $data1[]=array('codigo_empleado'=>'0','nombre_empleado'=>'no hay empleados.');
                            }else{        

                       while(!$record_consulta->EOF){
                           $codigoe=$record_consulta->fields["CODIGOEMPLEADO"];
                           $empleado=$record_consulta->fields["EMPLEADO"];

                           $data1[]=array('codigoempleado'=>$codigoe,'nombreempleado'=>$empleado);
                           $record_consulta->MoveNext();
                       }
                     }

               $respuesta= array('success' => true,'data'=>$data1);

              return $respuesta;                 


       }  /* fin de funcion */


    function getNombreEmpleado($codigoempleado){
    parent::conectar();
    $sql="SELECT CONCAT(APELLIDOSEMPLEADO,', ',NOMBREEMPLEADO) AS NOMBRE,EMAIL FROM view_empleados WHERE CODIGOEMPLEADO='$codigoempleado'";
    $record_consulta=$this->obj_con->Execute($sql);

    if($record_consulta->RecordCount()<=0)
      {
        return 0;
      }else{
           while (!$record_consulta->EOF) {
             $nombreP=$record_consulta->fields["NOMBRE"];
             $emailP=$record_consulta->fields["EMAIL"];
             $data1=array($nombreP,$emailP);
             $record_consulta->MoveNext();
           }
           return $data1;
      }

    }/* fin de funcion*/


					

	
	
}


?>