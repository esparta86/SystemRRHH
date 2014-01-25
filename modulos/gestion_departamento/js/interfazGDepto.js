/**************************************************************************************/    
/* CREACION DEL FORMULARIO */

Ext.onReady(function(){
    
function showContactDepartamento(accion) {

        form = Ext.widget('form', {
            padding:4,
              layout: {
                            type: 'table',
                            columns: 4, 
                            tdAttrs: {
                                valign: 'middle'
                            }
                },
                fieldDefaults: {
                    labelAlign: 'top',
                    labelWidth: 100,
                    labelStyle: 'font-weight:bold'
                },
                defaults: {
                            frame:true,
                            border: true,
                            style: 'margin: 0px 5px 0px 0px;'
                },
                
                items: [ 
                {
                    xtype: 'hiddenfield',
                    id:'id_dpto',
                    colspan:4,
                    name: 'id_dpto'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nombre del Departamento (*)',
                    id: 'departamento',
                    name: 'departamento',
                    width:400,
                    colspan:4,
                    allowBlank: false
                },
                {
                xtype:'label',
                text:'Los campos en (*) son OBLIGATORIOS',
                colspan:4,
                width:400

               }
                ],
                buttons:[{
                    text:'OK',
                    handler:function(){//ENVIAR DATOS
                                        if (this.up('form').getForm().isValid()) {
                                            //alert('Se enviaron todos los campos');
                                               
                                               var nombreD=Ext.getCmp('departamento').getValue();
                                               //var id=Ext.getCmp('id_dpto').getValue();

                                               //alert("datos: "+nombreD+"  -- "+id);
                                               //alert("DEPARTAMENTO: "+nombreD);

                                               if(accion!=0){
                                                Ext.Ajax.request({
                                                    url:'procesos/guardar_departamento.php?nombre='+nombreD,
                                                    method:'POST',
                                                     waitMsg:'Registrando los datos ',
                                                    success: function(result,request){
                                                        var jsonData = JSON.parse(result.responseText);
                                                        var bandera=jsonData[0].bandera;
                                                        var msj=jsonData[0].msg;
                                                          
                                                            Ext.Msg.alert('Status', msj); 

                                                            if (bandera==1) {
                                                                storeDepartamento.load();
                                                            }


                                                        }

                                                 });
                                                }else{//Actualizacion de datos
                                                    var id_d=Ext.getCmp('id_dpto').getValue();
                                                    var nombreD=Ext.getCmp('departamento').getValue();
                                                    //alert("id_depto "+id_d);
                                                    Ext.Ajax.request({
                                                        url:'procesos/modificar_departamento.php?nombre='+nombreD+'&id_dpto='+id_d,
                                                        method:'POST',
                                                        success: function(result,request){
                                                             var jsonData=JSON.parse(result.responseText);
                                                             var bandera=jsonData[0].bandera;
                                                             var msj=jsonData[0].msg;

                                                             Ext.Msg.alert('Status',msj);

                                                             if (bandera==1) {
                                                                storeDepartamento.load();
                                                             }

                                                        }


                                                    });



                                                }


                                                
                                                
                                            this.up('form').getForm().reset();
                                                            this.up('window').destroy();

                                            }else{
                                                alert('Existen datos sin llenar.');
                                            }

                                      }
                },{
                    text:'CANCELAR',
                    handler:function(){
                        this.up('form').getForm().reset();
                        this.up('window').destroy();
                    }
                }
                ]
            });

/**************************************************************************************/    
/*CREACION DE LA VENTANA EMERGENTE*/

        var win = Ext.widget('window', {
                title: 'REGISTRO Y MODIFICACION DE DEPARMENTOS',
                closable: false,
                width: 500,
                height: 150,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: form
            });
         win.show();
        }

/**************************************************************************************/    
/*CREO EL MODEL DEL STORE DE PROCESOS*/
/*
     Ext.define('ProcesoModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'idproceso'},
            {name: 'nombreproceso'}
        ]
    });
*/

/**************************************************************************************/    
/*STORE DE PROCESOS*/
/*
var StoreProceso = Ext.create('Ext.data.JsonStore', {
        model: 'ProcesoModel',
        proxy: {
            type: 'ajax',
            url: 'procesos/procesos_json.php',
            reader: {
                type: 'json'
            }
        }
    });

*/
/**************************************************************************************/    
       
        





/*MODEL*/
Ext.define('Departamento', {
    extend: 'Ext.data.Model',
    fields: [
       {name:'id_dpto',type:'int'},
       {name: 'departamento',type:'string'},
       //,{name: 'img'}
       
      
    ],
    idProperty: 'company'
});

/*CREO EL STORE*/
var storeDepartamento =  Ext.create('Ext.data.JsonStore', {
        model: 'Departamento',
        //autoload:true,
        proxy: {
            type: 'ajax',
            url: 'procesos/departamentos_json.php',
            reader: {
                type: 'json',
                root: 'data'
            }
        }
    });

/**************************************************************************************/    

 storeDepartamento.load(); //como capturalo desde las sesiones
/**************************************************************************************/    

//StoreProceso.load();
/**************************************************************************************/   

	/* SEL MODEL*/
	   var sm = new Ext.selection.CheckboxModel( {
        listeners:{
            selectionchange: function(selectionModel, selected, options){
                // Bunch of code to update store
                    //console.log(selectionModel, selected, options);
                    var record = selected[0];
                
                    if (record!=undefined){
                        showContactDepartamento(0);
                        form.getForm().loadRecord(record);
                    }
            }
        }
    });
/*CREO EL GRID*/
    var griddepto = Ext.create('Ext.grid.Panel', {
        store: storeDepartamento,
		stateful: true,
        collapsible: false,
        selModel: sm,
        multiSelect: true,

        stateId: 'stateGrid',
        columns: [
            {
                text: 'ID_DPTO',
                sortable:false,
                dataIndex:'id_dpto',
                hidden:true
            },
            {
                text     : 'NOMBRE DEL DEPARTAMENTO',
                sortable :  true,
                flex:1,
                dataIndex: 'departamento'
            }
            
            
        ],
        height: '100%',
        width: '100%',
        width:'99%',
        viewConfig: {
            stripeRows: true,
            enableTextSelection: true
        },
        tbar:[
            '->','-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                text: 'Agregar Departamento',
                id: 'buton12',
                 handler:function(){
                    showContactDepartamento(1);
                } 
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                text: 'Borrar Departamento',
                id: 'buton13',
                handler:function(){
                            Ext.MessageBox.confirm('Borrado','Esta seguro que quierer borrar los departamentos seleccionados',function(btn){
                                if(btn==='yes'){
                                    var selections  =griddepto.selModel.getSelection();

                                    Ext.each(selections,function(record)
                                    {
                                        id=record.get('id_dpto');
                                        nombre=record.get('departamento');
                                        //alert(".... "+id);

                                            Ext.Ajax.request({
                                                url:'procesos/eliminar_departamentos.php?id_dpto='+id+'&nombre='+nombre,
                                                method:'POST',
                                                success:function(result,request){
                                                    var jsonData=JSON.parse(result.responseText);
                                                    var bandera=jsonData[0].bandera;
                                                    var msj=jsonData[0].msg;

                                                    
                                                    if(bandera==1){//recargar si hay exito
                                                        storeDepartamento.load();
                                                    }
                                                    if (bandera==3||bandera==2) {//solo si hay problemas mostrar msj
                                                       Ext.Msg.alert('Status',msj); 
                                                    }



                                                }


                                            });

                                    });
                                }

                            });
                }
                
            },'-'
        ]
        
    });

 
/*CREACION DE LA INTERFAZ*/ 


		var tabs = Ext.widget({
        xtype: 'form',
        id: 'tabForm',
		renderTo:'interfazGestionD',
        width: "50%",
		height:"100%",
        border: true,
		bodyStyle: 'background:#1C3E67;',
        bodyBorder: false,
		defaults: {
				anchor: '100%'
		},
        fieldDefaults: {
            labelWidth: 200,
			labelAlign:'right',
			bodyStyle: 'padding: 4px; background:#1C3E67;',
            msgTarget: 'side'
        },
        items: [
         {
         	xtype:'tabpanel',
				activeTab: 0,
				defaults:{
					bodyPadding: 10,
					layout: 'anchor'
				},
				items:[
					 {
						title:'GESTION DE DEPARTAMENTOS',
						defaults: {
							bodyStyle:'padding:0px',
							anchor: '100%',
							bodyStyle:'background:#DFE9F6;'
						 },
						 items:[
							 	{
									
									height: 400,
									items:[griddepto]
								}
						      ]
					 }

					  ]//fin itemm tabpanel
         }//fin compo  tabpanel
			
			]

	});

	










});//terminacion onReady










