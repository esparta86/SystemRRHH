<?php

/**
* 
*/
class ponderacion extends DBManager
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

 /*
 * funcion que muestra las ponderaciones
 *
 */
		   function ver_ponderaciones($id_empresa)//para identificar el proceso.
					{
					    parent::conectar();
					    $sql="SELECT * FROM view_ponderaciones WHERE IDEMPRESA=$id_empresa";
					    $record_consulta = $this->obj_con->Execute($sql);
					      if($record_consulta->RecordCount()<=0){
					     $data1[]=array('idponderacion'=>0,'idproceso'=>0,'nombreproceso'=>'sin registros','jefe'=>'sin registros','coworkers'=>'sin registros','colaboradores'=>'sin registros','personal'=>'sin registros','estado'=>0,'estadoS'=>'sin registros');
					      }else{
					        while (!$record_consulta->EOF)
					        {
					           $id_ponde=$record_consulta->fields["IDPONDERACION"];
					           $id_proceso= $record_consulta->fields["IDPROCESO"];
					           $nombre_p=$record_consulta->fields["NOMBREPROCESO"];
					           $jefe_d=$record_consulta->fields["JEFE"];
					           $coworkers_d=$record_consulta->fields["COWORKERS"];
					           $colaboradores_d=$record_consulta->fields["COLABORADORES"];
					           $personal_d=$record_consulta->fields["PERSONAL"];
					           $estado_d=$record_consulta->fields["ESTADO"];
					           if($estado_d==1){
					           	$estado_s='ACTIVO';
					           }else{
					           	$estado_s='NO ACTIVO';
					           }
							$data1[]=array('idponderacion'=>$id_ponde,'idproceso'=>$id_proceso,'nombreproceso'=>$nombre_p,'jefe'=>$jefe_d,'coworkers'=>$coworkers_d,'colaboradores'=>$colaboradores_d,'personal'=>$personal_d,'estado'=>$estado_d,'estadoS'=>$estado_s);
					           $record_consulta->MoveNext();
					         }
					     }
					      $repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;
					}//fin de funcion ver areas



		function  verificar_clasificacion($nombre,$id_realiza){
    			parent::conectar();
    			$sql="SELECT count(*) as N FROM areas_evaluaciond where id_realiza=$id_realiza and nombre_area_ev like '$nombre'";
    			$record_consulta=$this->obj_con->Execute($sql);
                $N="";
    			 while(!$record_consulta->EOF){
    			 	$N=$record_consulta->fields["N"];
    			 	$record_consulta->MoveNext();
    			 }

    			 return $N;

    		}



    	function guardar_ponderacion($idempresa_d,$idproceso_d,$jefe_d,$coworkers_d,$colaboradores_d,$personal_d,$estado_d){
			parent::conectar();
			$sql="CALL guardar_ponderacion($idempresa_d,$idproceso_d,$jefe_d,$coworkers_d,$colaboradores_d,$personal_d,$estado_d)";
               if(!$this->obj_con->Execute($sql)){
                 return 2;
               }else{
               	 if($estado_d==1)
               	  {
               	   $this->guardarPonderacionMasiva($idempresa_d,$jefe_d,$coworkers_d,$colaboradores_d,$personal_d);
               	  }
                 return 1;
               }
			}//fin de funcion 
/*
*
* funcion que recupera el id_realiza de una empresa con el idempresa
*/
function get_idrealiza($idempresa){
parent::conectar();
$sql="SELECT id_realiza FROM showempresas_p WHERE IDEMPRESA=$idempresa LIMIT 0,1";
$record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0){
      return 0;
    }else{
    	while (!$record_consulta->EOF) {
    		$idrealiza=$record_consulta->fields["id_realiza"];
    		$record_consulta->MoveNext();	
    	}
    	return $idrealiza;
    }
}/*fin de funcion*/


/*
*   funcion que es responsable de guardar cada ponderacion masiva en cada empleado de la empresa
*  siempre que existan empleados en la empresa. 
*  Esta funcion setea los valores a cada empleado. lo cual se aconseja ingresar los empleados todos
*  y al final crear la ponderacion para asignarsela.
* Los empleados atipicos. por favor modifiquelos en gestion de empleados.
*/
function guardarPonderacionMasiva($idempresa,$jefe_d,$coworkers_d,$colaboradores_d,$personal_d){
parent::conectar();
$idrealiza=$this->get_idrealiza($idempresa);
if($idrealiza!=0)
  {
		$empleadosEmpresa=$this->get_empleadosEmpresa($idrealiza);
		if(is_array($empleadosEmpresa)){
			$bandera=true;
			foreach ($empleadosEmpresa as $key => $codigoempleado)
			       {
			        $sql="CALL modficar_ponderacionesxempleado($jefe_d,$coworkers_d,$colaboradores_d,$personal_d,'$codigoempleado')";	
					if(!$this->obj_con->Execute($sql))
					        {
					         $bandera=false;
					        }else{
				         
					       }							    
			       }
			     return $bandera;
		}
  }

}/*fin de funcion*/

/*
* Funcion que recupera los codigos de los empleados de una empresa
*
*/
function get_empleadosEmpresa($idrealiza){
parent::conectar();
$sql="SELECT CODIGOEMPLEADO FROM view_empleados where ID_REALIZA=$idrealiza AND ID_GRUPOOCUPACIONAL IS NOT NULL";
$record_consulta=$this->obj_con->Execute($sql);
    if($record_consulta->RecordCount()<=0){
           $data1=0;
    }else{
    	while (!$record_consulta->EOF) 
    	    {
    		  $data1[]=$record_consulta->fields["CODIGOEMPLEADO"];
    		  $record_consulta->MoveNext();
    	    }
    	}
      return $data1;   

}/*fin de funcion*/



function modificar_ponderacion($idempresa_d,$idponderacion_d,$idproceso_d,$jefe_d,$coworkers_d,$colaboradores_d,$personal_d,$estado_d){
parent::conectar();
$sql="CALL modificar_ponderacion($idempresa_d,$idponderacion_d,$idproceso_d,$jefe_d,$coworkers_d,$colaboradores_d,$personal_d,$estado_d)";
if(!$this->obj_con->Execute($sql)){
return 2;
}else{
	if($estado_d==1)
	 {
	  $this->guardarPonderacionMasiva($idempresa_d,$jefe_d,$coworkers_d,$colaboradores_d,$personal_d);
	 }
	return 1;
	}
}//fin de funcion modificar


		function check_clasificacion($id){
				parent::conectar();

				$sql="SELECT count(*) as N FROM competencias WHERE id_area=4 and clasificacion=$id";

			$record_consulta=$this->obj_con->Execute($sql);
                $N="";
    			 while(!$record_consulta->EOF){
    			 	$N=$record_consulta->fields["N"];
    			 	$record_consulta->MoveNext();
    			 }

    			 return $N;


		}//fin de funcion


		function eliminar_ponderacion($id){
			 parent::conectar();
			 	$sql="CALL eliminar_ponderacion($id)";
			 	    if(!$this->obj_con->Execute($sql)){
			 	    	return false;
			 	    }else{
			 	    	return true;
			 	    }
		}// fin de funcion eliminar subcategoria
	
	
}