<?php

/**
* 
*/
class Descripcion_Puesto extends DBManager
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
		   function ver_areas()//para identificar el proceso.
					{
					    parent::conectar();
					    $sql="SELECT * FROM area WHERE id_area in(1,2,3) ";
					    //$data1="";

					    $record_consulta = $this->obj_con->Execute($sql);
						

					        while (!$record_consulta->EOF)
					        {
					           $id_area=$record_consulta->fields["ID_AREA"];
					           $nombreCateg = $record_consulta->fields["NOMBRECATEGORIA"];

						       				       
						       $data1[] = array('id_area'=>$id_area,'area' => utf8_encode($nombreCateg));
					              
					           $record_consulta->MoveNext();
					         }
					         //ANTERIORMENTE NO HACIA ESTO PERO PENSE QUE AFECTABA EN ALGO POR EL [root] del STORE donde se define : data
					      $repuesta = array('success'=>true,'data'=>$data1); 

					        return $repuesta;
					       //return $data1;
					}

					*/

			function verificar_descripcion($codigo){
				parent::conectar();

				$sql="SELECT EDITABLE FROM `descripcion_puesto` where IDCARGO=$codigo";
				$record_consulta=$this->obj_con->Execute($sql);

				    while(!$record_consulta->EOF){
                        $edit=$record_consulta->fields["EDITABLE"];

				    	$record_consulta->MoveNext();
				    }
				   if(isset($edit)){
				   	   if ($edit==1) {
				   	   	 return true;
				   	   }else{
				   	   	return false;
				   	   }

				   }else{//no se definio, significa que no existia el cargo. por tanto dejarlo ingresar
				   	   return true;

				   }


			}//fin de funcion




			function info_cargo_descripcion($idcargo){
				parent::conectar();

				$sql="SELECT AREA_ORGANIZATIVA,REPORTA_A,SUPERVISAA,EXPERIENCIAM,NIVELACADEMICO,PROPOSITOCLAVE,FUNCIONESP,SUBFUNCIONESP,EDITABLE FROM `descripcion_puesto` WHERE IDCARGO=$idcargo LIMIT 0,1";
                
                $record_consulta=$this->obj_con->Execute($sql);
                /* SI HAY DATOS*/
                $verificar = $record_consulta->RecordCount();
                if($verificar<=0){
                	 $data1[] = array('areaOr'=>'...','reporta' =>'...','supervisa'=>'...','experiencia'=>'...','nivel'=>'...','proposito'=>'...','funciones'=>'...','subfun'=>'...','estado'=>false,'editable'=>false);

                }else{

                	   while(!$record_consulta->EOF){
                	   		$area=$record_consulta->fields["AREA_ORGANIZATIVA"];
                	   		$reporta=$record_consulta->fields["REPORTA_A"];
                	   		$supervisa=$record_consulta->fields["SUPERVISAA"];
                	   		$experiencia=$record_consulta->fields["EXPERIENCIAM"];
                	   		$nivela=$record_consulta->fields["NIVELACADEMICO"];
                	   		$proposito=$record_consulta->fields["PROPOSITOCLAVE"];
                	   		$funciones=$record_consulta->fields["FUNCIONESP"];
                	   		$subfunciones=$record_consulta->fields["SUBFUNCIONESP"];
                	   		$edit=$record_consulta->fields["EDITABLE"];

                	   		$data1[] = array('areaOr'=>$area,'reporta' =>$reporta,'supervisa'=>$supervisa,'experiencia'=>$experiencia,'nivel'=>$nivela,'proposito'=>$proposito,'funciones'=>$funciones,'subfun'=>$subfunciones,'estado'=>true,'editable'=>$edit);

                	   	$record_consulta->MoveNext();
                	   }




                     }
                     return $data1;



			}//fin de funcion

			 function guardar_modificar($cargoid,$area,$reporta,$supervisa,$experiencia,$nivela,$proposito,$funciones,$subfunciones){
			      parent::conectar();
			     
			      $sql="CALL guardar_modificar_descripcion(".$cargoid.",'".$area."','".$reporta."','".$supervisa."','".$experiencia."','".$nivela."','".$proposito."','".$funciones."','".$subfunciones."')";
			      if(!$this->obj_con->Execute($sql)){
			        return false;
			
			      }else{
			        return true;
			      }
			
			     }// fin de funcion

					

	
	
}


?>