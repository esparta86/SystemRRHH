<?php

if (!isset($_SESSION)) { session_start(); }
	
	$id_usuario=$_SESSION["id_usuario"];
    $nombreUsuario=$_SESSION["nombreUsuario"];
    $tipo_usuario=$_SESSION["tipousuario"];
    $idproceso=$_SESSION["idproceso"];
    $imageempresa="../recursos/img/empresas/".$_SESSION["imagen"];
    $empleado=$_SESSION["empleado"];

   
?>
<html>
 <head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel="stylesheet" type="text/css" href="../recursos/resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="../recursos/resources/css/style.css" />
    <script type="text/javascript" src="../recursos/js/ext-all.js"></script>
 
	<script>
	//the namespace
Ext.ns('login_conamype');

login_conamype.Panel = 
{
	init: function()
	{
            Ext.form.Field.prototype.msgTarget='side';
     
            
            var form_login = new Ext.FormPanel
            ({
                id          :   'id_form_login',
                labelAlign  :   'top',
                autoHeight  :   true,
                autoScroll  :   true,
                border      :   true,
                bodyStyle   :   'padding: 10px 20px 30px 10px;',
                frame        :true,
                layout:{
                	 type:'column',
                	 
		                	 tdAttrs:{
		                valign:'middle'
		               }
                },
                items: 
                [
                    {
                    	xtype:'panel',
                    	width:'100%',
                    	border:false,
                    	height:500,
                    	autoLoad:'procesos_login/panel.php?tipousuario=<?php echo $tipo_usuario ?>&proceso=<?php echo $idproceso ?>',	
						                    	
                    }
                    

                ]
            });
            var main = new Ext.Panel
            ({
                    title: 'PROCESO DE LA EMPRESA ' ,
                    border:false,
                    bodyStyle: 'padding:10px;',
                    items    :[form_login],
                    renderTo:'contenido-principal',
                    width:'95%',
                    bbar:[{text:'<center><b><font size="2">AVANCE Y DESEMPE&Ntilde;O S.A. de C.V </font></b><b><font size="1"> &copy; DERECHOS RESERVADOS '+ new Date().getFullYear()+'</font></b></center>'}]
            });


                   var Plogout=new Ext.FormPanel({
					id:'idlogout',
					height:50,
					width:100,
					//renderTo:'logout',

					items:[
					{
						xtype:'button',
						text:'<b>Cerrar Session</b>',
						scale:'large',
						width:100
					}
					]

				});

	}
};


Ext.onReady(login_conamype.Panel.init,login_conamype.Panel);
	</script>
 </head>
 <body>
	<table width="100%" border="0">
		<tr>
			<td>
				
				<img src="<?php echo $imageempresa; ?>" height="69">

			</td>
			<td align="center">
				<b>Bienvenido  </b>  <?php echo $empleado?>
			</td>
			<td align="right">
				<a href="procesos_login/cerrar_sesion.php" title="Cerrar Sesion"><img src="../recursos/img/logou.png" width="50" height="50">Cerrar Sesion</a> 
				<!--<di id="logout">
					</div>-->
			</td>
		</tr>
		<tr>
			<td align="center" colspan="3">				
				<div id="contenido-principal" >
				</div>
			</td>
		</tr>
	</table>
 </body>
</html>