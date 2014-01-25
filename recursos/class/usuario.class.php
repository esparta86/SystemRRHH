<?php
class Usuario extends DBManager
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



      function login($nick,$pass)
    {
        parent::conectar();

	$pass_md5 = md5($pass);
	//$consulta = "select * from usuario where nickname='$nick' and password='$pass_md5' and activo_usuario=true";

	$consulta = "select * from usuario where NOMBREUSUARIO='$nick' and PASSWORD=MD5('$pass')";
	$exe_consulta = $this->obj_con->Execute($consulta);
	$verificar = $exe_consulta->RecordCount();
        $record_consulta = $this->obj_con->GetRow($consulta);

	if($verificar > 0)
	{

            $id_usuario = $record_consulta["ID_USUARIO"];
            $nombreUsuario = $record_consulta["NOMBREUSUARIO"];
            $tipo_usuario=$record_consulta["TIPO_USUARIO"];
            $estadoU=$record_consulta["ESTADO"];
            $consulta2="SELECT ID_REALIZA,CODIGOEMPLEADO,
(SELECT CONCAT(APELLIDOSEMPLEADO,', ',NOMBREEMPLEADO) AS EMPLEADO FROM empleado WHERE CODIGOEMPLEADO=view_showusuario.CODIGOEMPLEADO) AS EMPLEADO,
NOMBREUSUARIO,ID_DPTO,NOMBREDPTO,NOMBREPROCESO,NOMBREEMPRESA,IDEMPRESA,IDPROCESO,imagen  FROM view_showusuario WHERE ID_USUARIO=".$id_usuario;
            $exe_consulta2=$this->obj_con->Execute($consulta2);           

               
                $record_consulta2=$this->obj_con->GetRow($consulta2);
              
                   $codigoEmpleado=$record_consulta2["CODIGOEMPLEADO"];
                   $id_realiza=$record_consulta2["ID_REALIZA"];
                   $nombreUsuario=$record_consulta2["NOMBREUSUARIO"];
                   $id_dpto=$record_consulta2["ID_DPTO"];
                   $id_empresa=$record_consulta2["IDEMPRESA"];
                   $idproceso=$record_consulta2["IDPROCESO"];
                   $nombreE=$record_consulta2["NOMBREEMPRESA"];
                   $nombreP=$record_consulta2["NOMBREPROCESO"];
                   $nombreDpto=$record_consulta2["NOMBREDPTO"];
                   $imagens=$record_consulta2["imagen"];
                   $empleadoN=$record_consulta2["EMPLEADO"];
           
           if($estadoU==1){
                   if($id_realiza!=1){
                   $this->create_session_usuario_empresa($id_usuario,$nombreUsuario,$codigoEmpleado,$id_realiza,$id_dpto,$id_empresa,$idproceso,$nombreE,$nombreP,$nombreDpto,$tipo_usuario,$imagens,$empleadoN);
                    }else{
                      $this->create_session_usuario_admin($id_usuario,$id_realiza,$nombreUsuario,$codigoEmpleado,$tipo_usuario,$idproceso,$nombreE,$imagens,$empleadoN);
                    }
                    return 1;/*exito con estado habilitado*/
                }else{
                  return 3;/*exito pero su estado esta deshabilitado*/
                }
      	}            
	else
	{
            session_destroy();
            return 2;
	}

    }


    function create_session_usuario_empresa($id_usuario,$nombreUsuario,$codigoEmpleado,$id_realiza,$id_dpto,$id_empresa,$idproceso,$nombreE,$nombreP,$nombreDpto,$tipoU,$imagens,$empleadoN)
    {
      
			  $_SESSION["id_usuario"] = $id_usuario;
				$_SESSION["nombreUsuario"] = $nombreUsuario;
                $_SESSION["codigoEmpleado"]=$codigoEmpleado;
                $_SESSION["id_realiza"]=$id_realiza;
                $_SESSION["id_dpto"]=$id_dpto;
                $_SESSION["id_empresa"]=$id_empresa;
                $_SESSION["idproceso"]=$idproceso;
                $_SESSION["nombreE"]=$nombreE;
                $_SESSION["nombreP"]=$nombreP;
                $_SESSION["nombreDpto"]=$nombreDpto;
                $_SESSION["tipousuario"]=$tipoU;
                $_SESSION["imagen"]=$imagens;
                $_SESSION["empleado"]=$empleadoN;
				

    }//fin de funcion.


    function create_session_usuario_admin($id_usuario,$id_realiza,$nombreUsuario,$codigo_Empleado,$tipo_usuario,$idproceso,$nombreE,$imagens,$empleadoN){
                $_SESSION["id_usuario"] = $id_usuario;
                $_SESSION["nombreUsuario"] = $nombreUsuario;
                $_SESSION["codigoEmpleado"]=$codigo_Empleado;
                $_SESSION["id_realiza"]=$id_realiza;
                $_SESSION["tipousuario"]=$tipo_usuario;
                $_SESSION["idproceso"]=$idproceso;
                $_SESSION["imagen"]=$imagens;
                $_SESSION["nombreE"]=$nombreE;
             $A=$_SESSION['id_realiza'];
             $_SESSION["empleado"]=$empleadoN;
                if(isset($A)){

                }else{
                  echo 'no creada';
                }
                


    }//fin de funcion.


    function listar_usuario($id_realiza){
      parent::conectar();
      $sql="SELECT ID_REALIZA,NOMBREPROCESO,ID_USUARIO,CODIGOEMPLEADO,NOMBREUSUARIO,TIPO_USUARIO,ESTADO,
(SELECT CONCAT(APELLIDOSEMPLEADO,', ',NOMBREEMPLEADO) AS EMPLEADO FROM empleado WHERE CODIGOEMPLEADO=view_showusuario.CODIGOEMPLEADO) AS NOMBRE FROM `view_showusuario` WHERE ID_REALIZA=$id_realiza";
      $record_consulta=$this->obj_con->Execute($sql);
      if($record_consulta->RecordCount()<=0){
                   $data1[] = array('idproceso' => 0,'proceso'=>'SIN REGISTROS','idusuario'=>0,'codigoEmpleado'=>'SIN REGISTROS','nombreusuario'=>'SIN REGISTROS','tipousuario'=>'SIN REGISTROS','empleado'=>'sin registros','estado'=>0,'estadoU'=>'sin registros');
                }else{

        while(!$record_consulta->EOF)
           {
            $idproceso=$record_consulta->fields["ID_REALIZA"];
            $proceso=$record_consulta->fields["NOMBREPROCESO"];
            $iduser=$record_consulta->fields["ID_USUARIO"];
            $codigoEmplea=$record_consulta->fields["CODIGOEMPLEADO"];
            $nombreuser=$record_consulta->fields["NOMBREUSUARIO"];
            $tipo=$record_consulta->fields["TIPO_USUARIO"];
            $nombre=$record_consulta->fields["NOMBRE"];
            $userEstado=$record_consulta->fields["ESTADO"];
              switch ($tipo) {
                 case 1:
                $tipoUser="Administrador del sistema";   
                   break;
                 case 2:
                   $tipoUser="Administrador evaluacion del desempeño";
                   break;
                case 3:
                  $tipoUser="Administrador plan y sucesion";
                  break;
                 case 4:
                   $tipoUser="Usuario normal evaluacion desempeño";
                   break;
                case 5:
                   $tipoUser="Usuario normal plan y sucesion";
                  break;
                 default:
                   $tipoUser="Desconocido, verifique con el administrador";
                   break;
               }

               if($userEstado==1){
                   $estadoU='Activo';
               }else{
                   $estadoU='Inactivo';
               } 
            $data1[] = array('idproceso' => $idproceso,'proceso'=>$proceso,'idusuario'=>$iduser,'codigoEmpleado'=>$codigoEmplea,'nombreusuario'=>$nombreuser,'tipousuario'=>$tipoUser,'empleado'=>$nombre,'estado'=>$userEstado,'estadoU'=>$estadoU);
            $record_consulta->MoveNext();
           }


            }

            $repuesta = array('success'=>true,'data'=>$data1); 

                  return $repuesta;


    }//fin de funcion


     function guardar_usuario_sistema($codigoemp,$nombreUser,$tipoUsuario,$pass,$id_realiza,$userEstado){
      parent::conectar();
      $pass_md5 = md5($pass);
      $sql="CALL guardar_usuario('".$codigoemp."',".$id_realiza.",'".$nombreUser."','".$pass_md5."',".$tipoUsuario.",$userEstado)";
      if(!$this->obj_con->Execute($sql)){
        return false;

      }else{
        return true;
      }

     }



      function update_usuario_sistema($codigoemp,$nombreUser,$tipoUsuario,$pass,$id_realiza,$userEstado)  {
           parent::conectar();
        if(strcmp($pass,'')==0){
               $bandera=0;
            }else{
               $bandera=1;
            }           
           $pass_md5 = md5($pass);
           $sql="CALL modificar_usuario('".$codigoemp."',".$id_realiza.",'".$nombreUser."','".$pass_md5."',".$tipoUsuario.",$bandera,$userEstado)";
           if(!$this->obj_con->Execute($sql)){
             return false;
     
           }else{
             return true;
           }
     
          }



      function eliminar_usuario($id_usuario){
                parent::conectar();
               $sql ="CALL eliminar_usuario('.$id_usuario.')";
                if(!$this->obj_con->Execute($sql)){
                  return false;
                }else{
                  return true;
                }
               }//fin de funcion


function desactivar_usuarios($idproceso)
{
parent::conectar();
$sql="CALL desactivar_usuariosMasivos($idproceso)";
     if(!$this->obj_con->Execute($sql))
     {
      return false;
     }
     else{
      return true;
     }

}/*fin de la funcion*/







}

