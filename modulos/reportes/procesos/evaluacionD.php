<?php
	session_start();
    require_once("../../../recursos/conexion/sysrrhh.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/phpexcel/PHPExcel.php");
    require_once("../../../recursos/class/ConsultaReportes.class.php");


$idG=$_REQUEST["idgrupo"];
$objPhpExcel=new PHPExcel();
$objReportes=new ConsultaReportes();

$objPhpExcel->getProperties()->setCreator("Avance y Desempeño.")
                                 ->setLastModifiedBy("Avance y Desempeño")
                                 ->setTitle("Resultado de Evaluacion del desempeño")
                                 ->setSubject("excel de evaluacion del desempeño")
                                 ->setDescription("Archivo generado para el proceso de evalauacion del desempeño")
                                 ->setKeywords("office excel")
                                 ->setCategory("test file");
    
 

 //$info=$objReportes->get_info_empleados(22);
 $ReporteEmpleados=$objReportes->get_Reporte($idG);
//print_r($ReporteEmpleados);
//exit();


 $objPhpExcel->setActiveSheetIndex(0);

 $sheet=$objPhpExcel->getActiveSheet();


 $sheet->getColumnDimension('B')->setWidth(30);
 $sheet->getColumnDimension('A')->setWidth(25);
 $sheet->getColumnDimension('C')->setWidth(30);
 $sheet->getColumnDimension('D')->setWidth(30);
 $sheet->getColumnDimension('E')->setWidth(30);
 $sheet->getColumnDimension('F')->setWidth(30);
 $sheet->getColumnDimension('G')->setWidth(30);
 $sheet->getColumnDimension('H')->setWidth(30);
 $sheet->getColumnDimension('I')->setWidth(30);
 $sheet->getColumnDimension('J')->setWidth(30);
 $sheet->getColumnDimension('K')->setWidth(30);
 $sheet->getColumnDimension('L')->setWidth(30);
 $sheet->getColumnDimension('M')->setWidth(30);
 $sheet->getColumnDimension('N')->setWidth(30);
 $sheet->getColumnDimension('O')->setWidth(30);
 $sheet->getColumnDimension('P')->setWidth(30);
 $sheet->getColumnDimension('Q')->setWidth(30);
 $sheet->getColumnDimension('R')->setWidth(30);
 $sheet->getColumnDimension('S')->setWidth(30);
 $sheet->getColumnDimension('T')->setWidth(30);
 $sheet->getColumnDimension('U')->setWidth(30);
 $sheet->getColumnDimension('V')->setWidth(30);
 $sheet->getColumnDimension('W')->setWidth(30);
 $sheet->getColumnDimension('X')->setWidth(30);
 $sheet->getColumnDimension('Y')->setWidth(30);
 $sheet->getColumnDimension('Z')->setWidth(30);
 $sheet->getColumnDimension('AA')->setWidth(30);
 $sheet->getColumnDimension('AB')->setWidth(30);
 $sheet->getColumnDimension('AC')->setWidth(30);
 $sheet->getColumnDimension('AD')->setWidth(30);
 $sheet->getColumnDimension('AE')->setWidth(30);
 $sheet->getColumnDimension('AF')->setWidth(30);
 $sheet->getColumnDimension('AG')->setWidth(30);
 $sheet->getColumnDimension('AH')->setWidth(30);
 $sheet->getColumnDimension('AI')->setWidth(30);
 $sheet->getColumnDimension('AJ')->setWidth(30);
 $sheet->getColumnDimension('AK')->setWidth(30);
 $sheet->getColumnDimension('AL')->setWidth(30);
 $sheet->getColumnDimension('AM')->setWidth(30);
 $sheet->getColumnDimension('AN')->setWidth(30);
 $sheet->getColumnDimension('AO')->setWidth(30);
 $sheet->getColumnDimension('AP')->setWidth(30);
 $sheet->getColumnDimension('AQ')->setWidth(30);
 $sheet->getColumnDimension('AS')->setWidth(30);
 $sheet->getColumnDimension('AT')->setWidth(30);
 $sheet->getColumnDimension('AU')->setWidth(30);
 $sheet->getColumnDimension('AV')->setWidth(30);
 $sheet->getColumnDimension('AW')->setWidth(30);
 $sheet->getColumnDimension('AX')->setWidth(30);
 $sheet->getColumnDimension('AY')->setWidth(30);
 $sheet->getColumnDimension('AZ')->setWidth(30);
 
 $sheet->getColumnDimension('BA')->setWidth(30);
 $sheet->getColumnDimension('BB')->setWidth(30);
 $sheet->getColumnDimension('BC')->setWidth(30);
 $sheet->getColumnDimension('BD')->setWidth(30);
 $sheet->getColumnDimension('BE')->setWidth(30);
 $sheet->getColumnDimension('BF')->setWidth(30);
 $sheet->getColumnDimension('BG')->setWidth(30);
 $sheet->getColumnDimension('BH')->setWidth(30);
 $sheet->getColumnDimension('BI')->setWidth(30);
 $sheet->getColumnDimension('BJ')->setWidth(30);
 $sheet->getColumnDimension('BK')->setWidth(30);
 $sheet->getColumnDimension('BL')->setWidth(30);
 $sheet->getColumnDimension('BM')->setWidth(30);
 $sheet->getColumnDimension('BN')->setWidth(30);
 $sheet->getColumnDimension('BO')->setWidth(30);
 $sheet->getColumnDimension('BP')->setWidth(30);
 $sheet->getColumnDimension('BQ')->setWidth(30);
 $sheet->getColumnDimension('BS')->setWidth(30);
 $sheet->getColumnDimension('BT')->setWidth(30);
 $sheet->getColumnDimension('BU')->setWidth(30);
 $sheet->getColumnDimension('BV')->setWidth(30);
 $sheet->getColumnDimension('BW')->setWidth(30);
 $sheet->getColumnDimension('BX')->setWidth(30);
 $sheet->getColumnDimension('BY')->setWidth(30);
 $sheet->getColumnDimension('BZ')->setWidth(30);
$Fila=1;
  foreach ($ReporteEmpleados as $key => $Empleado) {
      
       foreach ($Empleado as $key => $Evaluador) {
               
            //$i=65;
             $i=0;
            foreach ($Evaluador as $key => $columna) 
            {
             $letra=chr($i).''.$Fila;
             //$sheet->setCellValue($letra,''.$columna);
             $sheet->setCellValueByColumnAndRow($i,$Fila,''.$columna);
             $i++;
            }
            $Fila++;
           
       }
   }

   
    $sheet->setTitle('Evaluacion por empleado');


    $objPhpExcel->setActiveSheetIndex(0);

    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="pruebaReal.xls"');
    header('Cache-Control: max-age=0');

    $objWriter = PHPExcel_IOFactory::createWriter($objPhpExcel, 'Excel5');
    $objWriter->save('php://output');
exit;




    



