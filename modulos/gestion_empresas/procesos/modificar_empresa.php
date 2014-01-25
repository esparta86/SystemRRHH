<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/empresa.class.php");

			/*tratamiento de la imagen*/
			$body = file_get_contents("php://input");
			$content_type = false;
			if(isset($_SERVER['CONTENT_TYPE'])) {
			            $content_type = $_SERVER['CONTENT_TYPE'];
			}
			$directorio = '../../../recursos/img/empresas/';

			if (move_uploaded_file($_FILES['imagen']['tmp_name'], $directorio . $_FILES['imagen']['name']))
			{
			    $img=$_FILES['imagen']['name'];
			}
			else
			{
			    $data1[] = array('success'=>false,'msg'=>'NO se subio el archivo!');
			}
			$postvars=$_POST;

$idempresa=$postvars['idempresa'];
$idproceso=$postvars['proceso-inputEl'];
$fechaI=$postvars['fechaI'];
$fechaF=$postvars['fechaF'];
$nombreEmpresa=$postvars['empresa'];
//$img="";
$string="idempresa= ".$idempresa."| idproceso=".$idproceso."| fechainicio= ".$fechaI." | fechaF= ".$fechaF." |nombre empresa= ".$nombreEmpresa." | imagen=".$img;

$objEmpresa=new Empresa();

    if($objEmpresa!=null){//si se creo el objeto

			    	 if(!$objEmpresa->open_con())
			    {
			        
			        //NO EXISTE UNA CONEXION A LA BD. INTENTELO MAS TARDE
			      
			    }
			    elseif ($objEmpresa->open_con()) 
							    {// "EXISTE UNA CONEXION A LA BD";

							//print_r(json_encode($string));

							    	//$data=$objProceso->ver_procesos();
//							    	//echo json_encode($data);

							    	$estado=$objEmpresa->modificar_empresa($idempresa,$nombreEmpresa,$idproceso,$fechaI,$fechaF,$img);
							    	if(isset($estado)){
							    		//successfull
							    		//print_r(json_encode("exito"));
							    		$data1[] = array('success'=>true,'msg'=>'Exito');  

							    	}else{
							    		//unsuccefull
							    		//print_r(json_encode("Sin exito"));
							    		  $data1[] = array('success'=>false,'msg'=>'No se registro la empresa! intente de nuevo.');


							    	}
							                       
								    //print_r(json_encode($data1));
							    	echo json_encode($data1);
							  



							    }
		}




?>