<?php
$tipo=$_GET["tipousuario"];
$proceso=$_GET["proceso"];

if($proceso==6){//Administrador de la empresa
	echo '<table border="0" width="60%" cellspacing="20" cellpadding="10">          
		<tr>
        <td width="20%"><a href="gestion_empresas/gestionEmpresas.php" target="_blank"><img src="../recursos/img/addempresas.png" width="200" height="200"></a></td>
        <td width="20%"><a href="administrador/interfaz_admin.php" target="_blank"><img src="../recursos/img/Gestionuser.png" width="200" height="200"></a></td>
        <td width="20%"><a href="gestion_ponderacionesxproceso/interfazponderaciones.php" target="_blank"><img src="../recursos/img/sistemaponderacion.png" width="200" height="200"></a></td>
        <td width="20%"><a href="gestion_competencias/gestionCompetenciasEV.php" target="_blank"><img src="../recursos/img/competencias.jpg" width="200" height="200"></a></td>
        </tr>
        <tr>
        <td width="20%"><a href="gestion_departamento/gestionDpto.php" target="_blank"><img src="../recursos/img/gestionDepartamentos.png" width="200" height="200"></a></td>
        <td width="20%"><a href="gestion_puestos/gestionPuestosD.php" target="_blank"><img src="../recursos/img/cargos.png" width="200" height="200"</td>
        <td width="20%"><a href="gestion_empleado/gestionEmpleado.php" target="_blank"><img src="../recursos/img/gestionEmpleados.png" width="200" height="200"></a></td>                     
        <td width="20%"><a href="menuReportes.php" target="_blank"><img src="../recursos/img/reportesExcel.png" width="200" height="200"></a></td>
        
        </tr>
        </table>';
}

if($proceso==1||$proceso==2||$proceso==3){//proceso de evaluacion del desempeño de 90°
	if($tipo==2){//Administrador
	echo '<table border="0" width="90%" cellspacing="0" cellpadding="10">          
		<tr><td width="20%"><center><a href="gestion_competencias/gestionCompetenciasEV.php" target="_blank"><img src="../recursos/img/competencias.jpg" width="200" height="200"></a></center></td>
                    	<td width="20%"><center><a href="gestion_g_ocupacional/gestionGO.php" target="_blank"><img src="../recursos/img/usuariosOcupacional.png" width="200" height="200"></a></center></td>
                    	<td width="20%"><center><a href="gestion_departamento/gestionDpto.php" target="_blank"><img src="../recursos/img/gestionDepartamentos.png" width="200" height="200"></a></center></td>
                    	<td width="20%"><center><a href="gestion_puestos/gestionPuestosEV.php" target="_blank"><img src="../recursos/img/cargos.png" width="200" height="200"></a></center></td>
                    	</tr>
                        <tr>
                        <td width="20%"><center><a href="gestion_empleado/gestionEmpleadoEV.php" target="_blank"><img src="../recursos/img/gestionEmpleados.png" width="200" height="200"></a></center></td>
                        <td width="20%"><center><a href="asignacion_evaluadores/interfaz_evaluadores.php" target="_blank"><img src="../recursos/img/redEvaluadores.png" width="200" height="200"></a></center></td>
                        <td width="20%"><center><a href="ponderar_competencias/ponderarcompetencias.php" target="_blank"><img src="../recursos/img/formAdmin.png" width="200" height="200"></a></center></td>
                        <td width="20%"><center><a href="evaluar_empleado/form_evaluacionxempleado.php" target="_blank"><img src="../recursos/img/form_evaluation.jpg" width="200" height="200"></a></center></td>
                        </tr>
                        

                        </table>';
             }
        if ($tipo==3) {
            echo '<table border="0" width="90%" cellspacing="5" cellpadding="10">          
                  <tr>
                       <td width="20%"><center><a href="gestion_competencias/gestionCompetenciasEV.php" target="_blank"><img src="../recursos/img/competencias.jpg" width="150" height="150"></a></center></td>
                        <td width="20%"><center><a href="gestion_g_ocupacional/gestionGO.php" target="_blank"><img src="../recursos/img/usuariosOcupacional.png" width="150" height="150"></a></center></td>
                        <td width="20%"><center><a href="gestion_departamento/gestionDpto.php" target="_blank"><img src="../recursos/img/gestionDepartamentos.png" width="150" height="150"></a></center></td>
                        <td width="20%"><center><a href="gestion_puestos/gestionPuestosEV.php" target="_blank"><img src="../recursos/img/cargos.png" width="150" height="150"></a></center></td>
                        
                  </tr>
                  <tr>
                        <td width="20%"><center><a href="gestion_empleado/gestionEmpleadoEV.php" target="_blank"><img src="../recursos/img/gestionEmpleados.png" width="150" height="150"></a></center></td>
                        <td width="20%"><center><a href="ponderar_competencias/ponderarcompetenciasPLAN.php" target="_blank"><img src="../recursos/img/formAdmin.png" width="150" height="150"></a></center></td>
                        <td width="20%"><center><a href="calificar_puesto/ponderarcompetenciasxcargo.php" target="_blank"><img src="../recursos/img/formxcargo.jpg" width="150" height="150"></a></center></td>
                        <td width="20%"><center><a href="gestion_opc_empleado/form_opcionesxempleado.php" target="_blank"><img src="../recursos/img/opcionesxempleado.png" width="150" height="150"></a></center></td>

                  </tr>
                  <tr>

                       
                        <td width="20%"><center><a href="evaluar_empleado/form_evaluacionRealxempleado.php" target="_blank"><img src="../recursos/img/form_evaluation.jpg" width="150" height="150"></a></center></td>
                        <td width="20%"><center><a href="matrix_ninebox/form_ninebox.php" target="_blank"><img src="../recursos/img/ninebox.jpg" width="150" height="150"></a></center></td>
                        <td width="20%"><center><a href="gestion_talentos/form_talento.php" target="_blank"><img src="../recursos/img/formulario5.png" width="150" height="150"></a></center></td>
                        <td width="20%"><center><a href="gestion_actividades_masivas/form_masivo.php" target="_blank"><img src="../recursos/img/masivos.png" width="150" height="150"></a></center></td>

                                               
                  </tr>

        </table>

            ';
            
        }


        if($tipo==4){// otro tipo de usuario
        	echo '<table border="1" width="90%" cellspacing="0" cellpadding="0">          
                    <td width="20%"><center><a href="evaluar_empleado/form_evaluacionxempleado.php" target="_blank"><img src="../recursos/img/form_evaluation2.jpg" width="150" height="150"></a></center></td>
                    <tr></tr></table>';
                  }

         }


   if($proceso==4){//proceso descripctor de puestos

if($tipo==1){//Administrador
    echo '<table border="1" width="90%" cellspacing="0" cellpadding="0">          
        <tr>
                        
                        <td width="25%"><a href="gestion_departamento/gestionDpto.php" target="_blank"><img src="../recursos/img/gestionDepartamentos.png" width="200" height="200"></a></td>
                        <td width="25%"><a href="gestion_empleado/gestionEmpleado.php" target="_blank"><img src="../recursos/img/gestionEmpleados.png" width="200" height="200"></a></td>
                        </tr><tr>
                        <td width="25%"><a href="gestion_puestos/gestionPuestosD.php" target="_blank"><img src="../recursos/img/cargos.png" width="200" height="200"</td><td width="25%"></td><td width="25%"></td><td width="25%"></td></tr></table>';
             }    

 if($tipo==2){// otro tipo de usuario
            echo '<table border="0" width="25%" cellspacing="0" cellpadding="0">          
        <tr>
                        <td width="25%"><a href="descriptor_puestos/interfaz_descriptor.php" target="_blank"><img src="../recursos/img/descriptor.jpeg" width="200" height="200"></a></td>
                        </tr></table>';


                   }  



   }




?>