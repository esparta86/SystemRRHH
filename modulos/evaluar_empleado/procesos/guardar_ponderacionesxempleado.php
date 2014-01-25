<?php

session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/competenciasxempleado.class.php");
    require_once("../../../recursos/class/empleado.class.php");
if(isset($_SESSION["codigoEmpleado"]))
{
$id_realiza=$_SESSION["id_realiza"];
$evaluador=$_SESSION["codigoEmpleado"];
$competencias_evaluadas=json_decode(stripcslashes($_REQUEST['evaluacion']),true);
$codigo_empleado_evaluado=$_REQUEST["codigoe"];
$observacion_empleado=$_REQUEST["observacion"];
$evaluadorNombre=$_SESSION["empleado"];

$objcompetenciasxEmpleado=new competenciasxEmpleado();

    if($objcompetenciasxEmpleado!=null){

			    	 if(!$objcompetenciasxEmpleado->open_con())
			    {
			        
			    }
			    elseif ($objcompetenciasxEmpleado->open_con()) 
							    {

 														$estado=true;
 														foreach ($competencias_evaluadas as $item=>$valor)
 														         {
											             	     		$ponderacion=explode("_",$valor);
						    	     		    											    	     		    
											    	     		     if(!$objcompetenciasxEmpleado->guardar_evaluacionxempleado($ponderacion[0],$codigo_empleado_evaluado,$evaluador,$ponderacion[2],$ponderacion[1]))
							                                           $estado=false;							                                      
											    	     				
							    						            }	

							    						   if($estado==true){
							    						   	        if($objcompetenciasxEmpleado->guardar_observacionGralxempleado($codigo_empleado_evaluado,$evaluador,$observacion_empleado))
							    						   	       {
							    						   			$data1[] = array('bandera'=>1,'msg'=>'Su evaluacion ha sido recibido exitosamente');  

							    						   			$objEmpleado=new Empleado();
							    						   			$DatosEmpleado=$objEmpleado->getNombreEmpleado($codigo_empleado_evaluado);
							    						   			$nombreEvaluado=$DatosEmpleado[0];

							    						   			$DatosEvaluador=$objEmpleado->getNombreEmpleado($evaluador);
							    						   			$emailEvaluador=$DatosEvaluador[1];

							    			$destinatario = $emailEvaluador; 
											$asunto = "Recepcion de Evaluacion 360 "; 
											$cuerpo = ' 
											<html> 
											<head> 
											   <title>Evaluacion 360</title> 
											</head> 
											<body> 
											<h2>Estimado(a): '.utf8_encode($evaluadorNombre).',</h2> 
											<p  style="font-size:14px;"> 
											<b>Hemos recibido satisfactoriamente la evaluacion realizada a: '.$nombreEvaluado.'.</b><br>
											  <br>
											 <b> Muchas Gracias.</b>

											</p> 
											<p style="font-size:10px;">
											Este es un mensaje generado automaticamente. Por favor no responda a este correo electronico. Si necesita asistencia o mayor informacion puede escribirnos a: consultorias@avanceydesempeno.com 
											o llamarnos al telefono (503)2262-2861 
											</p>
											</body> 
											</html>';


											//para el envío en formato HTML 
											$headers = "MIME-Version: 1.0\r\n"; 
											$headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 

											//dirección del remitente 
											$headers .= "From: Avance y Desempeño <avanceydesempeno@gmail.com>\r\n"; 

											//dirección de respuesta, si queremos que sea distinta que la del remitente 
											$headers .= "Reply-To: avanceydesempeno@gmail.com\r\n"; 

											//ruta del mensaje desde origen a destino 
											$headers .= "Return-path: avanceydesempeno@gmail.com\r\n"; 

											//direcciones que recibián copia 
											$headers .= "Cc: avanceydesempeno@gmail.com\r\n"; 

											
/*
											if(mail($destinatario,$asunto,$cuerpo,$headers))
											{
												
											}*/




					
							    						   		    }else
							    						   		    {
							    						   			$data1[] = array('bandera'=>3,'msg'=>'Exito, Se completo con errores, La observacion General no se pudo registrar. ');  
							    						   		    }

							    						       }else
							    						       {
							    						       	$data1[] = array('bandera'=>2,'msg'=>'No se actualizaron los valores deseables ! intente de nuevo.');
							    						       }					    	
							                       
							             
												    	



							                       
								    
							    	echo json_encode($data1);



							    }
		}
		

}
else{
	$data1[] = array('bandera'=>4,'msg'=>'No se actualizaron los valores deseables ! intente de nuevo.');
	echo json_encode($data1);
}


