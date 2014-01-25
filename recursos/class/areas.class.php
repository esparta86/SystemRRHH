<?php

/**
* 
*/
class Area extends DBManager
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
 
 function ver_areas()
					{
					    parent::conectar();
					    $sql="SELECT * FROM area WHERE id_area in(1,2,3) ";
					    $record_consulta = $this->obj_con->Execute($sql);
					        while (!$record_consulta->EOF)
					        {
					           $id_area=$record_consulta->fields["ID_AREA"];
					           $nombreCateg = $record_consulta->fields["NOMBRECATEGORIA"];
						       $data1[] = array('idarea'=>$id_area,'area' => utf8_encode($nombreCateg));
					           $record_consulta->MoveNext();
					         }
					      $repuesta = array('success'=>true,'data'=>$data1); 
					        return $repuesta;
					}
}

