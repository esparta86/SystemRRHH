<?php
session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/actividades.class.php");
$id_realiza=$_SESSION["id_realiza"];
$id_actividad=$_REQUEST['idactividad'];
$id_especializacion=$_REQUEST['idEspecializacion'];
$id_tema=$_REQUEST['idtema'];
$t_tema=$_REQUEST['tema'];
$t_area_en=$_REQUEST['area_en'];
$FRevision=$_REQUEST['fechaRevision'];
$FPInicio=$_REQUEST['fechaPInicio'];
$FPFinal=$_REQUEST['fechaPFinal'];
$FRInicio=$_REQUEST['fechaRInicio'];
$FRFinal=$_REQUEST['fechaRFinal'];
$inicio=$_REQUEST['checkI'];
$final=$_REQUEST['checkF'];
$coment=$_REQUEST['comentario'];
$opcion=$_REQUEST['opc'];
$codigoempleado=$_REQUEST['codigoemp'];
$idReponsable=$_REQUEST['responsable'];

$idactivity=$_REQUEST['idactividadT'];
$opcionId=$_REQUEST['idopcion'];

$objactividades=new actividades();
    if($objactividades!=null){//si se creo el objeto
			    	 if(!$objactividades->open_con())
			    {
			    }
			    else if ($objactividades->open_con()) 
							{
							
							    $estado=$objactividades->update_actividad($opcion,$codigoempleado,$id_actividad,$id_especializacion,$id_tema,$t_tema,$t_area_en,$FRevision,$FPInicio,$FPFinal,$FRInicio,$FRFinal,$inicio,$final,$coment,$idReponsable,$idactivity,$opcionId);     
						    	
						    	if($estado){
						    		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se actualizo la actividad.');  

						    	}else{
						    		$data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');

						    	}
						    	echo json_encode($data1);

						    }
		}




