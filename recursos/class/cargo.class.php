<?php

/**
* 
*/
class cargo extends DBManager
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

            function ver_cargos($id_r,$bandera)//para identificar el proceso.
					{
					    parent::conectar();

					    if($bandera==true){
					    	$sql="SELECT * FROM view_puestos where id_realiza=$id_r";
					    }else{
					         $sql="SELECT * FROM view_cargosev where id_realiza=$id_r";
					          
				        	}
					    
					    $record_consulta = $this->obj_con->Execute($sql);
						
					        while (!$record_consulta->EOF)
					        {
					           $id_cargo=$record_consulta->fields["idcargo"];
					     
					           $nombrepuesto= $record_consulta->fields["nombrecargo"];
					          			       
						       $data1[] = array('idcargo'=>$id_cargo,'cargo'=>$nombrepuesto);
					              
					           $record_consulta->MoveNext();
					         }
					         
					      $repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;
					       //return $data1;
					}

 function ver_cargosParaOpcion($id_r)//para identificar el proceso.
					{
					    parent::conectar();

					   $sql="SELECT idcargo,nombrecargo FROM view_cargosev WHERE id_realiza=$id_r and idcargo in(SELECT IDCARGO FROM competenciasxcargo)";

					    $record_consulta = $this->obj_con->Execute($sql);
						
					        while (!$record_consulta->EOF)
					        {
					           $id_cargo=$record_consulta->fields["idcargo"];
					     
					           $nombrepuesto= $record_consulta->fields["nombrecargo"];
					          			       
						       $data1[] = array('idcargo'=>$id_cargo,'cargo'=>$nombrepuesto);
					              
					           $record_consulta->MoveNext();
					         }
					         
					      $repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;
					       //return $data1;
					}					

function ver_cargos_ocupados($id_r)//para identificar el proceso.
					{
					    parent::conectar();
					         $sql="SELECT DISTINCT(IDCARGO),NOMBRECARGO FROM `view_empleados` WHERE ID_REALIZA=$id_r order by NOMBRECARGO";
	                 	    $record_consulta = $this->obj_con->Execute($sql);
					        while (!$record_consulta->EOF)
					        {
					           $id_cargo=$record_consulta->fields["IDCARGO"];
					           $nombrepuesto= $record_consulta->fields["NOMBRECARGO"];
						       $data1[] = array('idcargoJ'=>$id_cargo,'cargoJ'=>$nombrepuesto);
					           $record_consulta->MoveNext();
					         }
					      $repuesta = array('success'=>true,'data'=>$data1); 
                       return $repuesta;
					}	

/*
*  funcion que muestra los cargos para interfaz de talentos
*
*
*/
function cargos_responsables($id_r)//para identificar el proceso.
					{
					    parent::conectar();
					         $sql="SELECT DISTINCT(IDCARGO),NOMBRECARGO FROM `view_empleados` WHERE ID_REALIZA=$id_r order by NOMBRECARGO";
	                 	    $record_consulta = $this->obj_con->Execute($sql);
					        while (!$record_consulta->EOF)
					        {
					           $id_cargo=$record_consulta->fields["IDCARGO"];
					           $nombrepuesto= $record_consulta->fields["NOMBRECARGO"];
						       $data1[] = array('idcargo'=>$id_cargo,'responsable'=>$nombrepuesto);
					           $record_consulta->MoveNext();
					         }
					      $repuesta = array('success'=>true,'data'=>$data1); 
                       return $repuesta;
					}



function ver_cargos_descriptor($id_r,$codigoempleado)//para identificar el proceso.
					{
					    parent::conectar();

					    /*
							IDENTIFICAR PRIMERO SU DEPARTAMENTO Y JERARQUIA
					    */
							$sql_1="SELECT id_dpto,jerarquia FROM `view_empleados` WHERE CODIGOEMPLEADO='$codigoempleado' and id_realiza=$id_r";
							$record_consulta1=$this->obj_con->Execute($sql_1);

							   while(!$record_consulta1->EOF){
							   	  $iddpto=$record_consulta1->fields["id_dpto"];
							   	  $jerar=$record_consulta1->fields["jerarquia"];
							   	  $record_consulta1->MoveNext();

							   }
					    /* DETERMINAR SI LA JERAQUIA DEL EMPLEADO ES LA MENOR DE ESE DEPARTAMENTO*/

					    $sql_2="SELECT MIN(jerarquia) as jerarquia FROM `view_empleados` WHERE ID_REALIZA=$id_r AND id_dpto=$iddpto";
						$record_consulta2=$this->obj_con->Execute($sql_2);

									while(!$record_consulta2->EOF){
									   	  $jerarquiaMax=$record_consulta2->fields["jerarquia"];
									   	  $record_consulta2->MoveNext();
									  }

					    /* IDENTIFICAR SI EL EMPLEADO ES EL MAX REPRESENTANTE DE ESE DEPARTAMENTO*/
					              if($jerarquiaMax==$jerar){
                                   /* GERENTE O JEFE DE ESE DEPARTAMENTO */
                                   	$sql="SELECT idcargo,nombrecargo FROM `view_empleados` WHERE  id_realiza=$id_r AND id_dpto=$iddpto AND jerarquia>=$jerar order by jerarquia";
					                }else{/* NO ES GERENTE O JEFE*/
					                $sql="SELECT idcargo,nombrecargo FROM `view_empleados` WHERE  id_realiza=$id_r AND id_dpto=$iddpto AND jerarquia=$jerar  AND codigoempleado='$codigoempleado' order by jerarquia";
					                }


	    	
					 
					    
					    $record_consulta = $this->obj_con->Execute($sql);
						
					        while (!$record_consulta->EOF)
					        {
					           $id_cargo=$record_consulta->fields["idcargo"];
					     
					           $nombrepuesto= $record_consulta->fields["nombrecargo"];
					           

						       				       
						       $data1[] = array('idcargo'=>$id_cargo,'cargo'=>$nombrepuesto);
					              
					           $record_consulta->MoveNext();
					         }
					         
					      $repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;
					       //return $data1;
					}					

		   function ver_cargosEV($id_r)//para identificar el proceso.
					{
					    parent::conectar();
					    $sql="SELECT * FROM view_cargosev where id_realiza=$id_r";
					    
					    $record_consulta = $this->obj_con->Execute($sql);
						
					        while (!$record_consulta->EOF)
					        {
					           $id_cargo=$record_consulta->fields["idcargo"];
					           $id_dpto = $record_consulta->fields["id_dpto"];
					           $id_grupo= $record_consulta->fields["id_grupoocupacional"];
					           $nombreGrupo= $record_consulta->fields["GrupoO"];
					           $nombre_dpto= $record_consulta->fields["nombredpto"];
					           $nombrepuesto= $record_consulta->fields["nombrecargo"];
					           $jerarquia= $record_consulta->fields["jerarquia"];

						       				       
						       $data1[] = array('idcargo'=>$id_cargo,'id_dpto' => $id_dpto,'idgrupoo'=>$id_grupo,'nombregrupo'=>$nombreGrupo,'departamento'=>$nombre_dpto,'nombrepuesto'=>$nombrepuesto,'jerarquia'=>$jerarquia);
					              
					           $record_consulta->MoveNext();
					         }
					         
					      $repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;
					       //return $data1;
					}



 function listar_cargosG($id_r)//para identificar el proceso.
					{
					    parent::conectar();
					    $sql="SELECT * FROM view_puestos where id_realiza=$id_r";
					    
					    $record_consulta = $this->obj_con->Execute($sql);
						
					        while (!$record_consulta->EOF)
					        {
					           $id_cargo=$record_consulta->fields["idcargo"];
					           $id_dpto = $record_consulta->fields["id_dpto"];
					           $nombre_dpto= $record_consulta->fields["nombredpto"];
					           $nombrepuesto= $record_consulta->fields["nombrecargo"];
					           $jerarquia= $record_consulta->fields["jerarquia"];

						       				       
						       $data1[] = array('idcargo'=>$id_cargo,'id_dpto' => $id_dpto,'departamento'=>$nombre_dpto,'nombrepuesto'=>$nombrepuesto,'jerarquia'=>$jerarquia);
					              
					           $record_consulta->MoveNext();
					         }
					         
					      $repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;
					       //return $data1;
					}					

		   function verificar_cargoEV($nombrepuesto,$id_realiza){
		   	parent::conectar();
		   	$sql="SELECT count(*) as N FROM view_cargosev where nombrecargo like '$nombrepuesto' AND id_realiza=$id_realiza";
		   	$record_consulta=$this->obj_con->Execute($sql);
    			$N="";
    			    while (!$record_consulta->EOF) {
    			    	  $N=$record_consulta->fields["N"];
    			    	  $record_consulta->MoveNext();
    			    }
    			    return $N;


		     }//fin de funcion


      function verificar_cargo($nombrepuesto,$id_realiza){
		   	parent::conectar();
		   	$sql="SELECT count(*) as N FROM view_puestos where nombrecargo like '$nombrepuesto' AND id_realiza=$id_realiza";
		   	$record_consulta=$this->obj_con->Execute($sql);
    			$N="";
    			    while (!$record_consulta->EOF) {
    			    	  $N=$record_consulta->fields["N"];
    			    	  $record_consulta->MoveNext();
    			    }
    			    return $N;


		     }//fin de funcion 


		     	function guardar_cargosEV($nombre_puesto,$jerar,$iddpto,$idgrupo){
			parent::conectar();
			$sql="CALL guardar_cargosEV('".$nombre_puesto."',".$jerar.",".$iddpto.",".$idgrupo.")";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}


			}//fin de funcion 


  	function guardar_cargos($nombre_puesto,$jerar,$iddpto){
			parent::conectar();
			$sql="CALL guardar_cargos('".$nombre_puesto."',".$jerar.",".$iddpto.")";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}


			}//fin de funcion			






			function modificar_cargoEV($nombre_puesto,$jerar,$iddpto,$idgrupo,$id_realiza,$idcargo){
				parent::conectar();
				$sql="CALL modificar_cargosEV('".$nombre_puesto."',".$jerar.",".$iddpto.",".$idgrupo.",".$idcargo.")";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}



			}//fin de funcion


     function modificar_cargo($nombre_puesto,$jerar,$iddpto,$id_realiza,$idcargo){
				parent::conectar();
						$sql="CALL modificar_cargos('".$nombre_puesto."',".$jerar.",".$iddpto.",".$idcargo.")";
					if(!$this->obj_con->Execute($sql)){
						return false;

					}else{
						return true;
			         }



			}//fin de funcion



			function drop_cargoEV($id){
			parent::conectar();
			$sql="CALL eliminar_cargoev(".$id.")";
			if(!$this->obj_con->Execute($sql)){
				return false;

			}else{
				return true;
			}

			}//fin de funcion



					

	
	
}


?>