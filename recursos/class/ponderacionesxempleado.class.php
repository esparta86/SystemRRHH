<?php
class ponderacionesXempleado extends DBManager
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
 

  function guardar_ponderacionesxempleado($valorJefe,$valorCoworker,$valorColaborador,$valorPersonal,$codigoempleado)
   {
       parent::conectar();
      $sql="CALL guardar_ponderacionesxempleado($valorJefe,$valorCoworker,$valorColaborador,$valorPersonal,'$codigoempleado')";
       if(!$this->obj_con->Execute($sql)){
         return false;
        }else{
         return true;
       }
   }/*fin de funcion*/

function modificar_ponderacionesxempleado($valorJefe,$valorCoworker,$valorColaborador,$valorPersonal,$codigoempleado)
{
       parent::conectar();
      $sql="CALL modficar_ponderacionesxempleado($valorJefe,$valorCoworker,$valorColaborador,$valorPersonal,'$codigoempleado')";
      //print_r($sql);
       if(!$this->obj_con->Execute($sql)){
         return false;
        }else{
         return true;
       }
 
      }/*fin de funcion*/  

}

