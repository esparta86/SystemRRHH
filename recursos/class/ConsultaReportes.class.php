<?php
class ConsultaReportes extends DBManager
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
 
 function get_info_empleados($idrealiza){
 parent::conectar();
 $sql="SELECT NOMBREEMPLEADO,APELLIDOSEMPLEADO,NOMBRECARGO,SEXO,EMAIL,grupo FROM `view_empleados` WHERE ID_REALIZA=27 AND grupo IS NOT NULL";
 $record_consulta=$this->obj_con->Execute($sql);
    if($record_consulta->RecordCount()<=0){

    }else{
             while(!$record_consulta->EOF)
             {
              
              $data1=array($record_consulta->fields["NOMBREEMPLEADO"],$record_consulta->fields["APELLIDOSEMPLEADO"],$record_consulta->fields["NOMBRECARGO"],$record_consulta->fields["grupo"]);
              $record_consulta->MoveNext();
             }
             return $data1;
         }
 }



 /*
 *  procedimiento que realiza el reporte de evaluacion del desempeño
 *
 */
function get_reporte($idgrupo){
 parent::conectar();
 /* Obtener  empleados del proceso.  */
 $empleados=$this->get_empleados_institucion($idgrupo);

  foreach ($empleados as $key => $empleado) 
  {
       $infoempleado=array('N°','EVALUADOR','CARGO',$empleado[1]);
       $competencias=$this->get_competenciasxgrupoocupacion($empleado[0]);
       $competencias[]=" OBSERVACION GENERAL";
       $result=array_merge($infoempleado,$competencias);
       $final=array($result);
       
       
       /* Datos de la autoevaluacion*/
       $evaluacionIndividual=$this->get_evaluacionIndividual($empleado[0]);
       $infoIndividual=array(' autoevaluacion ',$empleado[1],$empleado[2],$empleado[1]);
       if($evaluacionIndividual!=0)
       {
           if(is_array($evaluacionIndividual)){
            $resultIndividual=array_merge($infoIndividual,$evaluacionIndividual);
            array_push($final,$resultIndividual);
           }
       }


                 /*datos del superior si posee */
                     $jefeData=$this->get_JefeSuperior($empleado[0]);
                    
                     if($jefeData!=0)
                     {
                          $codigoJefe=$jefeData[2];
                          $evaluacionJefe=$this->get_evaluacionJefe($codigoJefe,$empleado[0]);
                          $infoJefe=array(' jefe ',$jefeData[0],$jefeData[1],$empleado[1]);
                          if(is_array($evaluacionJefe))
                          {
                            $resultJefe=array_merge($infoJefe,$evaluacionJefe);
                            $final=array($result,$resultIndividual,$resultJefe); 
                          }
                     }

                          
                     /*datos de los compañeros*/
                      if($jefeData!=0)
                        {
                         $codigojefe=$jefeData[2];
                         $evaluado=$empleado[0];
                         $infoCompanerosEvaluadores=$this->get_companerosEvaluadores($evaluado,$codigojefe);
                         if($infoCompanerosEvaluadores!=0)
                                  {
                                foreach ($infoCompanerosEvaluadores as $key => $evaluador) 
                                        {
                                          $codigoEvaluador=$evaluador[0];
                                          $infoEvaluadores=array(' compañeros ',$evaluador[1],$evaluador[2],$empleado[1]);
                                          $evaluacionCompanero=$this->get_evaluacionJefe($codigoEvaluador,$evaluado);
                                          $resultCompanero=array_merge($infoEvaluadores,$evaluacionCompanero);

                                          array_push($final,$resultCompanero);
                                        }
                                  }
                        }


                       /*datos de colaboradores si hay*/
                       $infoColaboradoresEvaluadores=$this->get_colaboradoresEvaluadores($empleado[0]);
                       if($infoColaboradoresEvaluadores!=0)
                       {
                       
                             foreach ($infoColaboradoresEvaluadores as $key => $colaborador) 
                             {
                               $codigoColaborador=$colaborador[0];
                               $infoColaborador=array('colaboradores',$colaborador[1],$colaborador[2],$empleado[1]);
                               $evaluacionColaboradores=$this->get_evaluacionJefe($codigoColaborador,$empleado[0]);
                               if(is_array($evaluacionColaboradores)){
                                $resultColaborador=array_merge($infoColaborador,$evaluacionColaboradores);
                                array_push($final,$resultColaborador);
                               }
                             }
                       }



                       /*datos de clientes externos o internos si hay */
                      if($jefeData!=0)
                       {
                         $infoClientesEvaluadores=$this->get_clientes($empleado[0],$jefeData[2]);
                         if($infoClientesEvaluadores!=0)
                          {
                            foreach ($infoClientesEvaluadores as $key => $Cliente) 
                            {
                              $infoCliente=array(' clientes ',$Cliente[1],$Cliente[2],$empleado[1]);
                              $evaluacionClienteEvaluador=$this->get_evaluacionJefe($Cliente[0],$empleado[0]);
                              $resultCliente=array_merge($infoCliente,$evaluacionClienteEvaluador);
                              array_push($final,$resultCliente);
                            }
                          }
                       }

       
       if($jefeData!=0){
        $a=$this->get_notaGralxempleado($jefeData[2],$empleado[0]);
        $infoFinal1=array(' ',$empleado[1],$empleado[2]," ");
        $finalEmpleado=array_merge($infoFinal1,$a);
        array_push($final,$finalEmpleado);
        

      }else{
        $a=$this->get_notaGralxempleado(0,$empleado[0]);
        $infoFinal1=array(' ',$empleado[1],$empleado[2]," ");
        $finalEmpleado=array_merge($infoFinal1,$a);
        array_push($final,$finalEmpleado);
       }

$reporte_final[]=$final;


   }
return $reporte_final;
//return 0;

}/*fin de funcion*/

/*
* funcion que proceso el promedio por competencia de un empleadoo
*/
function get_notaGralxempleado($codigojefe,$codigoempleado)
{
parent::conectar();
      /*nota de los compañeros*/
       if(!is_numeric($codigojefe))
       {

       }
       $porcentajeDistribuido=$this->get_distribucion($codigoempleado,$codigojefe);

       $notasCompaneros=$this->get_nota_companeros($codigoempleado,$codigojefe,$porcentajeDistribuido);
       $notaJefe=$this->get_nota_Jefe($codigoempleado,$codigojefe,$porcentajeDistribuido);
       $notaIndiviudal=$this->get_nota_individual($codigoempleado);
       $notaColaboradores=$this->get_nota_colaboradores($codigoempleado,$codigojefe,$porcentajeDistribuido);
      
       /*obtener n*/
       $n=count($notaIndiviudal);
       $i=0;
       $notaGral=array();
       while($i<$n)
       {
         $suma=0;
         //quitado temporal $suma=$suma+$notaIndiviudal[$i];
        
         if($notaJefe!=0)
                $suma+=$notaJefe[$i];

          if($notasCompaneros!=0)
                $suma+=$notasCompaneros[$i];

          if($notaColaboradores!=0)
                 $suma+=$notaColaboradores[$i];

          $i++;
          $notaGral[]=" ";
          $notaGral[]=" ";
          $notaGral[]=$suma;
          $notaGral[]=" ";
         
       }
             
 return $notaGral;
}/*fin de funcion */




/*
* funcion que agrupa las comptencias y obtiene el promdeio por competenecia individual
*/
function get_nota_individual($codigoempleado)
{
  parent::conectar();
  $sql="SELECT competenciasxempleado.ID_COMPETENCIA,AVG((VALORR*VALOR)/100) AS PROMEDIO FROM view_empleados INNER JOIN competenciasxempleado ON(competenciasxempleado.CODIGOEMPLEADO=view_empleados.CODIGOEMPLEADO) INNER JOIN competencias_grupo_ocupacional ON(competencias_grupo_ocupacional.ID_GRUPOOCUPACIONAL=view_empleados.ID_GRUPOOCUPACIONAL AND competencias_grupo_ocupacional.ID_COMPETENCIA=competenciasxempleado.ID_COMPETENCIA) WHERE competenciasxempleado.CODIGOEMPLEADO='$codigoempleado' AND competenciasxempleado.EVALUADOR ='$codigoempleado' GROUP BY competenciasxempleado.ID_COMPETENCIA";
  $record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0){
      return 0;
  }else{
       while(!$record_consulta->EOF)
       {
         $promedio=$record_consulta->fields["PROMEDIO"];
         $porcentaje=$this->get_porcentajeIndividual($codigoempleado);
         //echo "<br> Promedio :".$promedio;
         //echo "<br> porcentaje: ".$porcentaje;

         $notaPromedio=$promedio*($porcentaje/100);
         $data1[]=$notaPromedio;
         $record_consulta->MoveNext();
       }
       return $data1;
  }

}/*fin de funcion */


/*
* funcion que agrupa las comptencias y obtiene el promdeio por competenecia evaluado por jefe
*/
function get_nota_Jefe($codigoempleado,$codigojefe,$porcentajeDistribuido)
{
  parent::conectar();
  $sql="SELECT competenciasxempleado.ID_COMPETENCIA,AVG((VALORR*VALOR)/100) AS PROMEDIO FROM view_empleados INNER JOIN competenciasxempleado ON(competenciasxempleado.CODIGOEMPLEADO=view_empleados.CODIGOEMPLEADO) INNER JOIN competencias_grupo_ocupacional ON(competencias_grupo_ocupacional.ID_GRUPOOCUPACIONAL=view_empleados.ID_GRUPOOCUPACIONAL AND competencias_grupo_ocupacional.ID_COMPETENCIA=competenciasxempleado.ID_COMPETENCIA) WHERE competenciasxempleado.CODIGOEMPLEADO='$codigoempleado' AND competenciasxempleado.EVALUADOR ='$codigojefe' GROUP BY competenciasxempleado.ID_COMPETENCIA";
  $record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0){
      return 0;
  }else{
    while(!$record_consulta->EOF)
       {
         $promedio=$record_consulta->fields["PROMEDIO"];
         $porcentaje=$this->get_porcentajeJefe($codigoempleado);
         $porcentaje=$porcentaje+$porcentajeDistribuido;
         $notaPromedio=$promedio*($porcentaje/100);
         $data1[]=$notaPromedio;
         $record_consulta->MoveNext();
       }
       return $data1;
  }

}/*fin de funcion */

/*
* funcion que agrupa las competencias y obtiene el promedio por competencia por cada evalauacion que realizo un colaborador
*/

function get_nota_colaboradores($codigoempleado,$codigojefe,$porcentajeDistribuido){
parent::conectar();
$sql="SELECT competenciasxempleado.ID_COMPETENCIA,AVG((VALORR*VALOR)/100) AS PROMEDIO FROM view_empleados 
INNER JOIN competenciasxempleado ON(competenciasxempleado.CODIGOEMPLEADO=view_empleados.CODIGOEMPLEADO) 
INNER JOIN competencias_grupo_ocupacional 
     ON(competencias_grupo_ocupacional.ID_GRUPOOCUPACIONAL=view_empleados.ID_GRUPOOCUPACIONAL AND competencias_grupo_ocupacional.ID_COMPETENCIA=competenciasxempleado.ID_COMPETENCIA)
WHERE competenciasxempleado.CODIGOEMPLEADO='$codigoempleado' 
AND competenciasxempleado.EVALUADOR
        IN(
    SELECT CODIGOEMPLEADO  FROM view_empleados WHERE JE='$codigoempleado'
    UNION
    SELECT DISTINCT(EVALUADOR) AS CODIGOEMPLEADO
             FROM competenciasxempleado WHERE EVALUADOR!='$codigoempleado' 
             AND EVALUADOR!='$codigojefe' AND CODIGOEMPLEADO='$codigoempleado' 
             AND EVALUADOR 
                        NOT IN( 
                           SELECT CODIGOEMPLEADO  FROM empleado  WHERE JEFE='$codigojefe' AND CODIGOEMPLEADO !='$codigoempleado'
                              ) 
                      AND EVALUADOR 
                        NOT IN(
                            SELECT CODIGOEMPLEADO  FROM empleado WHERE JEFE='$codigoempleado' 
                              )
                      AND EVALUADOR!='XX010101'
      )
GROUP BY competenciasxempleado.ID_COMPETENCIA";

 $record_consulta=$this->obj_con->Execute($sql);
 if($record_consulta->RecordCount()<=0){
    return 0;
 }else{
        while(!$record_consulta->EOF)
        {
          $idcompetencia=$record_consulta->fields["ID_COMPETENCIA"];
          $promedio=$record_consulta->fields["PROMEDIO"];
          $porcentaje=$this->get_porcentajeColaboradores($codigoempleado);
          $porcentaje=$porcentaje+$porcentajeDistribuido;
          $notaPromedio=$promedio*($porcentaje/100);
          //$vacio='';
          $data1[]=$notaPromedio;
          //$data1[]=$vacio;
          $record_consulta->MoveNext();          
         }
         return $data1;
 }

}/*fin de funcion*/


/*
*  Funcion que agrupa las competencias y obtiene el promedio por competencia por cada evaluacion que realizaron
*  su compañeros
*/

function get_nota_companeros($codigoempleado,$codigojefe,$porcentajeDistribuido){
parent::conectar();
$sql="SELECT competenciasxempleado.ID_COMPETENCIA,AVG((VALORR*VALOR)/100) AS PROMEDIO
FROM view_empleados
INNER JOIN competenciasxempleado 
ON(competenciasxempleado.CODIGOEMPLEADO=view_empleados.CODIGOEMPLEADO)
INNER JOIN competencias_grupo_ocupacional 
ON(competencias_grupo_ocupacional.ID_GRUPOOCUPACIONAL=view_empleados.ID_GRUPOOCUPACIONAL AND competencias_grupo_ocupacional.ID_COMPETENCIA=competenciasxempleado.ID_COMPETENCIA) 
WHERE competenciasxempleado.CODIGOEMPLEADO='$codigoempleado' 
AND 
competenciasxempleado.EVALUADOR 
               IN(
             SELECT CODIGOEMPLEADO  
             FROM empleado
             WHERE JEFE='$codigojefe' AND CODIGOEMPLEADO !='$codigoempleado' 
             AND CODIGOEMPLEADO 
            IN(
               SELECT DISTINCT(EVALUADOR) AS CODIGOEMPLEADO 
               FROM competenciasxempleado
               WHERE EVALUADOR!='$codigojefe' AND EVALUADOR!='$codigoempleado'
               AND CODIGOEMPLEADO='$codigoempleado'
              )
            )
GROUP BY competenciasxempleado.ID_COMPETENCIA";
$record_consulta=$this->obj_con->Execute($sql);
 if($record_consulta->RecordCount()<=0)
   {
    return 0;
   }else{
         while(!$record_consulta->EOF){
          $idcompetencia=$record_consulta->fields["ID_COMPETENCIA"];
          $promedio=$record_consulta->fields["PROMEDIO"];
          $porcentaje=$this->get_porcentaje($codigoempleado);
          $porcentaje=$porcentaje+$porcentajeDistribuido;
          $notaPromedio=$promedio*($porcentaje/100);
          //$vacio='';
          $data1[]=$notaPromedio;
          //$data1[]=$vacio;
          $record_consulta->MoveNext();
         }
         return $data1;
   }
}/*fin de funcion*/

/*
*  Funcion que agrupa las competencias y obtiene el promedio por competencia por cada evaluacion que realizaron
*  sus clientes
*/

function get_nota_cliente($codigoempleado,$codigoJefe){
parent::conectar();
$sql="SELECT competenciasxempleado.ID_COMPETENCIA,AVG((VALORR*VALOR)/100) AS PROMEDIO 
FROM view_empleados 
INNER JOIN competenciasxempleado 
ON(competenciasxempleado.CODIGOEMPLEADO=view_empleados.CODIGOEMPLEADO) 
INNER JOIN competencias_grupo_ocupacional ON(competencias_grupo_ocupacional.ID_GRUPOOCUPACIONAL=view_empleados.ID_GRUPOOCUPACIONAL AND competencias_grupo_ocupacional.ID_COMPETENCIA=competenciasxempleado.ID_COMPETENCIA) 
WHERE competenciasxempleado.CODIGOEMPLEADO='$codigoempleado'
AND competenciasxempleado.EVALUADOR IN(
SELECT CODIGOEMPLEADO 
FROM empleado WHERE  CODIGOEMPLEADO 
   IN(SELECT DISTINCT(EVALUADOR) AS EVALUADOR
       FROM competenciasxempleado WHERE EVALUADOR!='$codigoempleado' 
       AND EVALUADOR!='$codigoJefe' AND CODIGOEMPLEADO='$codigoempleado' 
       AND EVALUADOR 
           NOT IN( 
                   SELECT CODIGOEMPLEADO  FROM empleado  
                   WHERE JEFE='$codigoJefe' AND CODIGOEMPLEADO !='$codigoempleado'
           ) 
     AND EVALUADOR 
           NOT IN(
              SELECT CODIGOEMPLEADO  FROM empleado WHERE JEFE='$codigoempleado' 
                  )
      ) 

)
GROUP BY competenciasxempleado.ID_COMPETENCIA";
$record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0)
   {
       return 0;
   }else{
         while(!$record_consulta->EOF)
         {
          $idcompetencia=$record_consulta->fields["ID_COMPETENCIA"];
          $promedio=$record_consulta->fields["PROMEDIO"];
          $porcentaje=1;
          $notaPromedio=$promedio*($porcentaje/100);
          //$vacio='';
          $data1[]=$notaPromedio;
          //$data1[]=$vacio;
          $record_consulta->MoveNext();          

         }
         return $data1;
   }

}/*fin de funcion*/

/*
* funcion que retorna el porcentaje para los compañeros
*
*/
function get_porcentaje($codigoempleado){
parent::conectar();
$sql="SELECT COWORKERS FROM ponderacionesxempleado WHERE CODIGOEMPLEADO='$codigoempleado' LIMIT 0,1";
$record_consulta=$this->obj_con->Execute($sql);
 if($record_consulta->RecordCount()<=0)
  {
      return 0;
  }else
  {
       while (!$record_consulta->EOF) 
        {
          $P=$record_consulta->fields["COWORKERS"];
          $record_consulta->MoveNext();
        }
        return $P;
  }
}/*fin de funcion*/


/*
* funcion que recupera el valor a distribuir 
*/
function get_distribucion($codigoempleado,$codigojefe)
{
 parent::conectar();
     $existeJefe=$this->getExisteJefe($codigoempleado,$codigojefe);
     $existeCoworker=$this->getExisteCoworker($codigoempleado,$codigojefe);
     $existeColacliente=$this->getExisteColaboradoresClientes($codigoempleado,$codigojefe);
     $porcentajeIndividual=$this->get_porcentajeIndividual($codigoempleado);
     $distribucion=0;
     if($existeJefe)
     {
          if($existeCoworker)
             {  
                   if($existeColacliente)
                   {
                      //echo "<br>tiene jefe y compas ademas colaboradores o clientes";
                      $distribucion=($porcentajeIndividual/3);
                   }else{
                    //  echo "<br>tiene jefe y compas ademas no posee colaboradores o clientes";
                       $distribucion=($porcentajeIndividual/2);
                        }
                  
             }else{
                  //echo "<br>tiene jefe y no compas";
                    if($existeColacliente)
                     {                      
                     // echo "<br>tiene jefe y no compas pero si clientes o colaboradores";
                      $distribucion=($porcentajeIndividual/2);
                     }else{
                   // echo "<br>tiene jefe y no compas y colaboradores o clientes";
                      $distribucion=($porcentajeIndividual/1);
                     }

                  }

     }else{
            //echo "<br>no tiene jefe";
          }
  //echo "<br>porcentaje :".$porcentajeIndividual;
  //echo "<br>empleado :".$codigoempleado;
  //echo "<br>distribucion _".$distribucion;

 return $distribucion;
}/*fin de funcion*/

/*
*funcion que determina si tiene colaboradores o clientes
*/
function  getExisteColaboradoresClientes($codigoempleado,$codigojefe)
{
parent::conectar();
$sql="SELECT DISTINCT(competenciasxempleado.EVALUADOR) FROM view_empleados 
INNER JOIN competenciasxempleado ON(competenciasxempleado.CODIGOEMPLEADO=view_empleados.CODIGOEMPLEADO) 
INNER JOIN competencias_grupo_ocupacional 
     ON(competencias_grupo_ocupacional.ID_GRUPOOCUPACIONAL=view_empleados.ID_GRUPOOCUPACIONAL AND competencias_grupo_ocupacional.ID_COMPETENCIA=competenciasxempleado.ID_COMPETENCIA)
WHERE competenciasxempleado.CODIGOEMPLEADO='$codigoempleado' 
AND competenciasxempleado.EVALUADOR
        IN(
    SELECT CODIGOEMPLEADO  FROM empleado WHERE JEFE='$codigoempleado'
    UNION
    SELECT DISTINCT(EVALUADOR) AS CODIGOEMPLEADO
             FROM competenciasxempleado WHERE EVALUADOR!='$codigoempleado' 
             AND EVALUADOR!='$codigojefe' AND CODIGOEMPLEADO='$codigoempleado' 
             AND EVALUADOR 
                        NOT IN( 
                           SELECT CODIGOEMPLEADO  FROM empleado  WHERE JEFE='$codigojefe' AND CODIGOEMPLEADO !='$codigoempleado'
                              ) 
                      AND EVALUADOR 
                        NOT IN(
                            SELECT CODIGOEMPLEADO  FROM empleado WHERE JEFE='$codigoempleado' 
                              )
                      AND EVALUADOR!='XX010101'
      )";
$record_consulta=$this->obj_con->Execute($sql);
 if($record_consulta->RecordCount()<=0)
   {
    return false;
   }else
   {
    return true;
   }

}/*fin de funcion*/


/*
* funcion que determina si tiene compañeros
*/

function getExisteCoworker($codigoempleado,$codigojefe){
parent::conectar();
$sql="SELECT DISTINCT(competenciasxempleado.EVALUADOR)
FROM view_empleados
INNER JOIN competenciasxempleado 
ON(competenciasxempleado.CODIGOEMPLEADO=view_empleados.CODIGOEMPLEADO)
INNER JOIN competencias_grupo_ocupacional 
ON(competencias_grupo_ocupacional.ID_GRUPOOCUPACIONAL=view_empleados.ID_GRUPOOCUPACIONAL AND competencias_grupo_ocupacional.ID_COMPETENCIA=competenciasxempleado.ID_COMPETENCIA) 
WHERE competenciasxempleado.CODIGOEMPLEADO='$codigoempleado' 
AND 
competenciasxempleado.EVALUADOR 
               IN(
             SELECT CODIGOEMPLEADO  
             FROM empleado
             WHERE JEFE='$codigojefe' AND CODIGOEMPLEADO !='$codigoempleado' 
             AND CODIGOEMPLEADO 
            IN(
               SELECT DISTINCT(EVALUADOR) AS CODIGOEMPLEADO 
               FROM competenciasxempleado
               WHERE EVALUADOR!='$codigojefe' AND EVALUADOR!='$codigoempleado'
               AND CODIGOEMPLEADO='$codigoempleado'
              )
            )";
$record_consulta=$this->obj_con->Execute($sql);
if($record_consulta->RecordCount()<=0)
{
  return false;
}else{
  return true;
}

}/*fin de funcion*/




/*
* funcion que determina si tiene jefe 
*/
function getExisteJefe($codigoempleado,$codigojefe)
{
parent::conectar();
$sql="SELECT DISTINCT(competenciasxempleado.EVALUADOR)
FROM view_empleados 
INNER JOIN competenciasxempleado 
      ON(competenciasxempleado.CODIGOEMPLEADO=view_empleados.CODIGOEMPLEADO) 
INNER JOIN competencias_grupo_ocupacional 
      ON(competencias_grupo_ocupacional.ID_GRUPOOCUPACIONAL=view_empleados.ID_GRUPOOCUPACIONAL AND competencias_grupo_ocupacional.ID_COMPETENCIA=competenciasxempleado.ID_COMPETENCIA) 
WHERE competenciasxempleado.CODIGOEMPLEADO='$codigoempleado' 
AND competenciasxempleado.EVALUADOR='$codigojefe'
ORDER BY competenciasxempleado.ID_COMPETENCIA";
$record_consulta=$this->obj_con->Execute($sql);
if($record_consulta->RecordCount()<=0)
  {
     return false;
  }else{
        $sql2="SELECT * FROM ponderacionesxempleado WHERE CODIGOEMPLEADO='$codigoempleado' AND JEFE!=0";
        $record_consulta2=$this->obj_con->Execute($sql2);
           if($record_consulta2->RecordCount()<=0){
              return true;
           }else{
              return true;
           }
    
  }
}/*fin de funcion*/





/*
* funcion que retorna el porcentaje para los individual
*
*/
function get_porcentajeIndividual($codigoempleado){
parent::conectar();
$sql="SELECT PERSONAL FROM ponderacionesxempleado WHERE CODIGOEMPLEADO='$codigoempleado' LIMIT 0,1";
$record_consulta=$this->obj_con->Execute($sql);
 if($record_consulta->RecordCount()<=0)
  {
      return 0;
  }else
  {
       while (!$record_consulta->EOF) 
        {
          $P=$record_consulta->fields["PERSONAL"];
          $record_consulta->MoveNext();
        }
        return $P;
  }
}/*fin de funcion*/



/*
* funcion que retorna el porcentaje para el jefe
*
*/
function get_porcentajeJefe($codigoempleado){
parent::conectar();
$sql="SELECT JEFE FROM ponderacionesxempleado WHERE CODIGOEMPLEADO='$codigoempleado' LIMIT 0,1";
$record_consulta=$this->obj_con->Execute($sql);
 if($record_consulta->RecordCount()<=0)
  {
      return 0;
  }else
  {
       while (!$record_consulta->EOF) 
        {
          $P=$record_consulta->fields["JEFE"];
          $record_consulta->MoveNext();
        }
        return $P;
  }
}/*fin de funcion*/



/*
* funcion que retorna el porcentaje para los colaboradores
*
*/
function get_porcentajeColaboradores($codigoempleado){
parent::conectar();
$sql="SELECT COLABORADORES FROM ponderacionesxempleado WHERE CODIGOEMPLEADO='$codigoempleado' LIMIT 0,1";
$record_consulta=$this->obj_con->Execute($sql);
 if($record_consulta->RecordCount()<=0)
  {
      return 0;
  }else
  {
       while (!$record_consulta->EOF) 
        {
          $P=$record_consulta->fields["COLABORADORES"];
          $record_consulta->MoveNext();
        }
        return $P;
  }
}/*fin de funcion*/



/*
* funcion que retorna el porcentaje para los clientes de un empleado
* DESECHA A ELIMINAR
*/
/*function get_porcentajeCliente($codigoempleado){
parent::conectar();
$sql="SELECT CLIENTE FROM ponderacionesxempleado WHERE CODIGOEMPLEADO='$codigoempleado' LIMIT 0,1";
$record_consulta=$this->obj_con->Execute($sql);
 if($record_consulta->RecordCount()<=0)
  {
      return 0;
  }else
  {
       while (!$record_consulta->EOF) 
        {
          $P=$record_consulta->fields["CLIENTE"];
          $record_consulta->MoveNext();
        }
        return $P;
  }
}*/
/*fin de funcion*/


/*
* Funcion que recupera todos los colaboradores que evaluaran a un empleado
*/
function  get_colaboradoresEvaluadores($codigoempleado){
parent::conectar();
$sql="SELECT CODIGOEMPLEADO,CONCAT(APELLIDOSEMPLEADO,', ',NOMBREEMPLEADO) AS NOMBRE,NOMBRECARGO FROM view_empleados WHERE JE='$codigoempleado' AND EVALUA='S'";
$record_consulta=$this->obj_con->Execute($sql);
 if($record_consulta->RecordCount()<=0){
  return 0;
 }else{
      while (!$record_consulta->EOF) {
           $codigo=$record_consulta->fields["CODIGOEMPLEADO"];
           $nombre=$record_consulta->fields["NOMBRE"];
           $cargo=$record_consulta->fields["NOMBRECARGO"];
           $data1[]=array($codigo,$nombre,$cargo);
           $record_consulta->MoveNext();
      }
      return $data1;
 }


}/*fin de funcion*/

/*
* funcion que recupera los clientes externos o internos que no son compañeros o colaboradores
*
*/
function get_clientes($codigoempleado,$codigojefe){
parent::conectar();
$sql="SELECT CODIGOEMPLEADO,CONCAT(APELLIDOSEMPLEADO,', ',NOMBREEMPLEADO) AS NOMBREEMPLEADO,NOMBRECARGO 
FROM view_empleados WHERE  CODIGOEMPLEADO 
          IN(
           SELECT DISTINCT(EVALUADOR) AS EVALUADOR 
         FROM competenciasxempleado WHERE EVALUADOR!='$codigoempleado' 
         AND EVALUADOR!='$codigojefe' AND CODIGOEMPLEADO='$codigoempleado'
         AND EVALUADOR 
         NOT IN(
                 SELECT CODIGOEMPLEADO  FROM empleado 
             WHERE JEFE='$codigojefe' AND CODIGOEMPLEADO !='$codigoempleado'
            )
         AND EVALUADOR
         NOT IN(
                 SELECT CODIGOEMPLEADO  FROM empleado 
             WHERE JEFE='$codigoempleado'
            )
        )
ORDER BY NOMBREEMPLEADO";
$record_consulta=$this->obj_con->Execute($sql);
 if ($record_consulta->RecordCount()<=0) {
      return 0;
  }else{
    while (!$record_consulta->EOF) 
    {
      $codigo=$record_consulta->fields["CODIGOEMPLEADO"];
      $nombre=$record_consulta->fields["NOMBREEMPLEADO"];
      $cargo=$record_consulta->fields["NOMBRECARGO"];
      $data1[]=array($codigo,$nombre,$cargo);
      $record_consulta->MoveNext();
    }
    return $data1;
  }

}/*fin de funcion*/

/*
* funcion que recupera todos los compañeros de un empleado que han evaluado al empleado
* a partir de
* - codigoempleado
* - codigojefe
*/
function get_companerosEvaluadores($codigoempleado,$codigojefe){
parent::conectar();
$sql="SELECT CODIGOEMPLEADO,CONCAT(APELLIDOSEMPLEADO,', ',NOMBREEMPLEADO) AS COMPANERO,NOMBRECARGO  FROM view_empleados WHERE JE='$codigojefe' AND CODIGOEMPLEADO !='$codigoempleado' AND CODIGOEMPLEADO IN(SELECT DISTINCT(EVALUADOR) AS CODIGOEMPLEADO FROM competenciasxempleado WHERE EVALUADOR!='$codigojefe' AND EVALUADOR!='$codigoempleado' AND CODIGOEMPLEADO='$codigoempleado')";
$record_consulta=$this->obj_con->Execute($sql);
 if($record_consulta->RecordCount()<=0)
  {
    return 0;
  }else{
        while (!$record_consulta->EOF) {
          $codigo=$record_consulta->fields["CODIGOEMPLEADO"];
          $nombre=$record_consulta->fields["COMPANERO"];
          $cargo=$record_consulta->fields["NOMBRECARGO"];
          $data1[]=array($codigo,$nombre,$cargo);
          $record_consulta->MoveNext();
        }
        return $data1;
  }
}/*fin de funcion*/
   
/*
* funcion que obtiene la evaluacion del jefe
*/
function get_evaluacionJefe($codigoJefe,$codigoEmpleado)
{
parent::conectar();
$sql="SELECT competenciasxempleado.ID_COMPETENCIA,VALORR,VALOR AS PONDERACION,(VALORR*VALOR)/100 AS NOTAREAL,HECHOS
FROM view_empleados 
INNER JOIN competenciasxempleado 
      ON(competenciasxempleado.CODIGOEMPLEADO=view_empleados.CODIGOEMPLEADO) 
INNER JOIN competencias_grupo_ocupacional 
      ON(competencias_grupo_ocupacional.ID_GRUPOOCUPACIONAL=view_empleados.ID_GRUPOOCUPACIONAL AND competencias_grupo_ocupacional.ID_COMPETENCIA=competenciasxempleado.ID_COMPETENCIA) 
WHERE competenciasxempleado.CODIGOEMPLEADO='$codigoEmpleado' 
AND competenciasxempleado.EVALUADOR='$codigoJefe' 
ORDER BY competenciasxempleado.ID_COMPETENCIA";
 $record_consulta=$this->obj_con->Execute($sql);
 if($record_consulta->RecordCount()<=0)
   {
    return 0;
   }else{
      while(!$record_consulta->EOF){
          $notaR=$record_consulta->fields["NOTAREAL"];
          $hechoss=$record_consulta->fields["HECHOS"];
          $nota=$record_consulta->fields["VALORR"];
          $pondera=$record_consulta->fields["PONDERACION"];
          $data[]=$nota;
          $data[]=$pondera;
          $data[]=$notaR;
          $data[]=$hechoss;
          $record_consulta->MoveNext();
      }

      $observacionGral=$this->get_ObservacionGral($codigoEmpleado,$codigoJefe);
         if(!is_numeric($observacionGral)){
          $data[]=$observacionGral;

         }else{
          $data[]="Sin Observacion general";
         }
      return $data;
   }


}/*fin de funcion*/

/*
* funcion que recupera la evaluacion de un empleado por su compañero.
*/





/*
*  funcion que obtiene el jefe de un empleado
*
*/
function get_JefeSuperior($codigoEmpleado){
parent::conectar();
$sql="SELECT CONCAT(APELLIDOSEMPLEADO,', ',NOMBREEMPLEADO) AS EMPLEADO,NOMBRECARGO,CODIGOEMPLEADO FROM view_empleados WHERE CODIGOEMPLEADO IN(SELECT  JEFE FROM empleado WHERE CODIGOEMPLEADO='$codigoEmpleado' AND JEFE IS NOT NULL AND JEFE!='null')";
$record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0){
     return 0;
  }else{
        while(!$record_consulta->EOF)
        {
          $nombre=$record_consulta->fields["EMPLEADO"];
          $cargo=$record_consulta->fields["NOMBRECARGO"];
          $codigo=$record_consulta->fields["CODIGOEMPLEADO"];
          $data1=array($nombre,$cargo,$codigo);
          $record_consulta->MoveNext();
        }
        return $data1;
  }
}/*fin de funcion*/




/*
* funcion que obtiene la evaluacion individual
*/
function get_evaluacionIndividual($codigoEmpleado)
{
parent::conectar();
$sql="SELECT competenciasxempleado.ID_COMPETENCIA,VALORR,VALOR AS PONDERACION,(VALORR*VALOR)/100 AS NOTAREAL,HECHOS FROM view_empleados INNER JOIN competenciasxempleado ON(competenciasxempleado.CODIGOEMPLEADO=view_empleados.CODIGOEMPLEADO)
INNER JOIN competencias_grupo_ocupacional ON(competencias_grupo_ocupacional.ID_GRUPOOCUPACIONAL=view_empleados.ID_GRUPOOCUPACIONAL AND competencias_grupo_ocupacional.ID_COMPETENCIA=competenciasxempleado.ID_COMPETENCIA)
WHERE competenciasxempleado.CODIGOEMPLEADO='$codigoEmpleado' AND competenciasxempleado.EVALUADOR='$codigoEmpleado' ORDER BY competenciasxempleado.ID_COMPETENCIA";
$record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0)
  {
      return 0;
  }else{
        while (!$record_consulta->EOF) {
          $notaR=$record_consulta->fields["NOTAREAL"];
          $hechoss=$record_consulta->fields["HECHOS"];
          $nota=$record_consulta->fields["VALORR"];
          $pondera=$record_consulta->fields["PONDERACION"];
          $data[]=$nota;
          $data[]=$pondera;
          $data[]=$notaR;
          $data[]=$hechoss;
          $record_consulta->MoveNext();
         }
         $observacionGral=$this->get_ObservacionGral($codigoEmpleado,$codigoEmpleado);
          if(!is_numeric($observacionGral)){
          $data[]=$observacionGral;
         }else{
          $data[]="Sin Observacion general";
         }
         
         return $data;
  }
}/*fin de funcion*/

/*
* funcion que retorna los empleados de la institucion
*/

function get_empleados_institucion($idgrupo){
parent::conectar();
$sql="SELECT CODIGOEMPLEADO,CONCAT(APELLIDOSEMPLEADO,',',NOMBREEMPLEADO) AS EMPLEADO,NOMBRECARGO,EMAIL FROM view_empleados where ID_REALIZA=26 AND ID_GRUPOOCUPACIONAL IS NOT NULL AND ID_GRUPOOCUPACIONAL=$idgrupo ORDER BY APELLIDOSEMPLEADO";
//$sql="SELECT CODIGOEMPLEADO,CONCAT(APELLIDOSEMPLEADO,',',NOMBREEMPLEADO) AS EMPLEADO,NOMBRECARGO,EMAIL FROM view_empleados where ID_REALIZA=26 AND ID_GRUPOOCUPACIONAL IS NOT NULL AND CODIGOEMPLEADO='LN-FC089' ORDER BY APELLIDOSEMPLEADO";
$record_consulta=$this->obj_con->Execute($sql);
 if($record_consulta->RecordCount()<=0){
    return 0;
 }else{
    while(!$record_consulta->EOF)
        {
           $codigo=$record_consulta->fields["CODIGOEMPLEADO"];
           $emple=$record_consulta->fields["EMPLEADO"];
           $cargo=$record_consulta->fields["NOMBRECARGO"];
           $emai=$record_consulta->fields["EMAIL"];
           $data2[]=array($codigo,$emple,$cargo,$emai);
           $record_consulta->MoveNext();
        }
        return $data2;
 }
}/*fin de funcion*/

/*
* funcion que obtiene las competencias por grupo ocupacional de un empleado segun su codigo
*/

function get_competenciasxgrupoocupacion($codigoempleado){
parent::conectar();
$sql="SELECT ID_COMPETENCIA,
(SELECT NOMBRECOMPETENCIA FROM competencias WHERE ID_COMPETENCIA=competencias_grupo_ocupacional.ID_COMPETENCIA) AS COMPETENCIA
FROM competencias_grupo_ocupacional WHERE ID_GRUPOOCUPACIONAL IN(SELECT ID_GRUPOOCUPACIONAL FROM view_empleados where CODIGOEMPLEADO='$codigoempleado') ORDER BY ID_COMPETENCIA ASC";
$record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0)
     {

     }else{
           while(!$record_consulta->EOF)
           {
            $id=$record_consulta->fields["ID_COMPETENCIA"];
            $nombre=$record_consulta->fields["COMPETENCIA"];
            $data1[]="NOTA";
            $data1[]="PONDERACION";
            $data1[]=$nombre;
            $data1[]='HECHOS';
            $record_consulta->MoveNext();
           }
           return $data1;
     }    

}/*fin de funcion*/


function get_ObservacionGral($Codevaluado,$Codevaluador){
parent::conectar();
$sql="SELECT observacion FROM observacionesxempleado WHERE codigoempleado='$Codevaluado' AND evaluador='$Codevaluador' limit 0,1";
$record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<0){
      return 0;
   }else{
     $obs="";
      while (!$record_consulta->EOF) 
        {
          $obs=$record_consulta->fields["observacion"];
          //echo $Codevaluador." - ".$Codevaluado;
          $record_consulta->MoveNext();
          return $obs;
         }
                
   }
}/*fin de la funcion */


}/*fin de la clase*/



