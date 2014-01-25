<?php

/**
* 
*/
class Valoracion extends DBManager
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

/* obtiene las valoraciones por cada competencia y su descripcion*/
    function obtener_valoraciones($idcompetencia){
    	parent::conectar();

    	$sql="SELECT ID_VALORACION,VALOR,DESCRIPCION FROM `valoracion` WHERE ID_COMPETENCIA=$idcompetencia";

  
					    $record_consulta = $this->obj_con->Execute($sql);
						
					        while (!$record_consulta->EOF)
					        {
					           $idvaloracion=$record_consulta->fields["ID_VALORACION"];
					     	   $val= $record_consulta->fields["VALOR"];
					           $descrip=$record_consulta->fields["DESCRIPCION"];
				           		       				       
						       $data1[] = array('idvaloracion'=>$idvaloracion,'valor'=>$val,'descripcion'=>$descrip);
					              
					           $record_consulta->MoveNext();
					         }    	

							$repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;					         


    }/* fin de funcion*/

    function guardar_descripcionxvaloracion($id_comptencia,$valor,$descripcion){
      parent::conectar();
 		$sql="CALL guardarDescripcionxValor($id_comptencia,$valor,'$descripcion')";
          if(!$this->obj_con->Execute($sql)){
            return false;
    
          }else{
            return true;
          }      
      
      

    }/* fin de funcion */


/*obtiene la descripcion de cada valor para una competencia cuando ya previamente se ha registrado
* este metodo ayuda cuando se quiere actualizar la competencia y sus descripciones.
*/
    function obtener_descripcionxvalor($id_realiza,$idcompetencia){
        parent::conectar();

        /*obtener el limite */
    $sql="SELECT (case  when LIMITES2=0 then LIMITES1 when LIMITES2!=0 then  LIMITES2  END) AS LIMITE FROM `view_escalasxempresa` WHERE ID_REALIZA=$id_realiza";
    $record_consulta=$this->obj_con->Execute($sql);     
    $N=0; /* almacena el limite de la escala*/
            while(!$record_consulta->EOF){
                    $N=$record_consulta->fields["LIMITE"];
                    $record_consulta->MoveNext();
                 } 

    $sql2="SELECT VALOR,DESCRIPCION FROM valoracion WHERE ID_COMPETENCIA=$idcompetencia LIMIT 0,$N";
    $valoracion[][]="";
    $i=0;
    
   
    $record_consulta2=$this->obj_con->Execute($sql2);
    $verificar = $record_consulta2->RecordCount();
   
       while(!$record_consulta2->EOF){
           $v1=$record_consulta2->fields["VALOR"];
           $v2=$record_consulta2->fields["DESCRIPCION"];
           $valoracion[$i][0]=$v1;
           $valoracion[$i][1]=$v2;
           $record_consulta2->MoveNext();
            $i++;
       }

    for($f=0;$f<$N;$f++){
         if($i!=0){
          $data1[] = array('idvalor'=>$valoracion[$f][0],'descripcion'=>$valoracion[$f][1]);
          $i--;
          }else{
            $data1[] = array('idvalor'=>($f+1),'descripcion'=>'');
          }
    }
    $repuesta = array('success'=>true,'data'=>$data1); 



     return $repuesta;
    }/*fin de funcion*/




					

	
	
}


?>