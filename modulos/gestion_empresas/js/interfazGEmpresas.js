/**************************************************************************************/    
/* CREACION DEL FORMULARIO */
Ext.onReady(function(){
function showContactForm(accion) {

        form = Ext.widget('form', {
            padding:5,
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
                           // frame:true,
                           // border: true,
                            style: 'margin: 5px 5px 5px 0px;'
                },
                
                items: [ 
                {
                    xtype: 'hiddenfield',
                    id:'idempresa',
                    colspan:4,
                    name: 'idempresa'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nombre de la Empresa (*)',
                    id: 'empresa',
                    name: 'empresa',
                    width:400,
                    colspan:4,
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    fieldLabel: '<b>Fecha  de Inicio (*)</b>',
                    id: 'fechaI',
                    format: 'd/m/Y',
                    colspan:2,
                    //vtype:'years',
                    name: 'fechaI',
                    allowBlank: false

            }, {
                    xtype: 'datefield',
                    fieldLabel: '<b>Fecha  Fin</b>',
                    id: 'fechaF',
                    format: 'd/m/Y',
                    colspan:2,
                    //vtype:'years',
                    name: 'fechaF'
                    
            },  {
                    xtype : 'combo',
                    id : 'proceso',
                    store : StoreProceso,
                    displayField:'nombreproceso',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'idproceso',
                    hiddenName : 'idproceso',
                    fieldLabel: 'SELECCIONE UN PROCESO (*)',
                    width:400,
                    colspan:4,
                    allowBlank: false,
                    emptyText : 'POR FAVOR SELECCIONE UN  PROCESO',
                },
				{
				xtype:'filefield',
				name:'imagen',
				fieldLabel:'Imagen de la empresa. (*)',
				buttonText:'Seleccione una imagen',
				colspan:4,
                width:400,
				msgTarget:'side',
				allowBlank:false,
				anchor:'100%',
                id:'imagen'
			   },{
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
                                               /* var nombreE=Ext.getCmp('empresa').getValue();
                                               var fechaInicio=Ext.util.Format.date(Ext.getCmp('fechainicio').getValue(),'Y-m-d');
                                               var fechaFin=Ext.util.Format.date(Ext.getCmp('fechafin').getValue(),'Y-m-d');
                                               var idProceso=Ext.getCmp('nombreproceso').getValue();
                                               var img=Ext.getCmp('imagen').getValue();

                                               
                                                Ext.Ajax.request({
                                                    url:'procesos/guardar_empresa.php?nombreEmpresa='+nombreE+'&fechaInicio='+fechaInicio+'&fechaFin='+fechaFin+'&idproceso='+idProceso,
                                                    method:'POST',
                                                     waitMsg:'Registrando los datos ',
                                                    success: function(result,request){

                                                        var jsonData=JSON.parse(result.responseText);
                                                            if(jsonData[0].success==true){
                                                             //msg('Success','Se registro la empresa.');   
                                                             Ext.Msg.alert('Status', 'Se registro la empresa.'); 
                                                             //location.href='gestionEmpresas.php';
                                                         }else{
                                                            Ext.Msg.alert('Status', 'No se registro la empresa, ¡intente de nuevo! si persiste el problema contacte con el administrador.'); 
                                                         }

                                                             
 
                                                            }

                                                 }); */
                                                /*  FORMA ALTERNATIVA PARA MANDAR LA IMG*/

                                                if(accion!=1){//primera vez
                                                this.up('form').getForm().submit({
                                                    url:'procesos/guardar_empresa.php',
                                                    waitMsg:'Registrando la Empresa '

                                                    //Ext.Msg.alert('Status','Se registro la empresa')
                                                    //storeEmpresas.load();
                                                   /* success: function(fp,o){
                                                        //msg('Success','el archivo "'+o.result.file+'" en el servidor.');
                                                       
                                                        //var jsonData=JSON.parse(o.responseText);
                                                       Ext.Msg.alert('Status','PRUEBA');
                                                       /* var jsonData=JSON.parse(o.response.responseText);
                                                        if (jsonData[0].success==true) {
                                                            win.destroy();
                                                            Ext.Msg.alert('Status','Se registro la empresa');
                                                            storeEmpresas.load();

                                                        }else{
                                                             Ext.Msg.alert('Status', jsonData.msg);
                                                        }
                                                        
                                                        
                                                                                                    

                                                    }*/
                                                        
                                                        //this.up('form').getForm().reset();
                                                        //this.up('window').destroy();
                                                });
                                                    }else{//modificacion

                                                          this.up('form').getForm().submit({
                                                            
                                                            url:'procesos/modificar_empresa.php',
                                                            waitMsg:'Modificando Datos de la empresa'

                                                          });

                                                    }


                                                    //storeEmpresas.load();
                                            }else{
                                                alert('Existen datos sin llenar.');
                                            }
                                            storeEmpresas.load();


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
                title: 'REGISTRO Y MODIFICACION DE DATOS DE LA EMPRESA',
                closable: false,
                width: 500,
                height: 300,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: form
            });
         win.show();
        }
/**************************************************************************************/    
/*CREO EL MODEL DEL STORE DE PROCESOS*/
     Ext.define('ProcesoModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'idproceso'},
            {name: 'nombreproceso'}
        ]
    });

/**************************************************************************************/    
/*STORE DE PROCESOS*/
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
/**************************************************************************************/    
       
        









/*MODEL*/
Ext.define('Empresa', {
    extend: 'Ext.data.Model',
    fields: [
       {name:'idempresa',type:'int'},
       {name: 'empresa',type:'string'},
       {name: 'fechaI',type:'string'},
       {name: 'fechaF',type:'string'},
       {name: 'proceso',type:'string'}
       //,{name: 'img'}
       
      
    ],
    idProperty: 'company'
});

/*CREO EL STORE*/
var storeEmpresas =  Ext.create('Ext.data.JsonStore', {
        model: 'Empresa',
        //autoload:true,
        proxy: {
            type: 'ajax',
            url: 'procesos/empresas_json.php',
            reader: {
                type: 'json',
                root: 'data'
            }
        }
    });

/**************************************************************************************/    
storeEmpresas.load({params:{proceso:"1"}});
/**************************************************************************************/    

StoreProceso.load();
/**************************************************************************************/   

	/* SEL MODEL*/
	   var sm = new Ext.selection.CheckboxModel( {
        listeners:{
            selectionchange: function(selectionModel, selected, options){
                // Bunch of code to update store
                    //console.log(selectionModel, selected, options);
                    var record = selected[0];
                //alert(record.get('idactividades'));
                    if (record!=undefined){
                        showContactForm(1);
                        form.getForm().loadRecord(record);
                    }
            }
        }
    });
/*CREO EL GRID*/
    var gridempresas = Ext.create('Ext.grid.Panel', {
        store: storeEmpresas,
		stateful: true,
        collapsible: false,
        selModel: sm,
        multiSelect: true,
        stateId: 'stateGrid',
        columns: [{
            text:'ID',
            width:50,
            hidden:true,
            sortable:true,
            dataIndex:'idempresa'

              },
            {
                text     : '<b>NOMBRE EMPRESA</b>',
                sortable :  true,
                flex:1,
                dataIndex: 'empresa'
            },
            {
                text     : '<b>FECHA DE INICIO</b>',
                flex:1,
                sortable : true,
                dataIndex: 'fechaI'
            },
            {
                text     : '<b>FECHA FIN</b>',
                flex     : 1,
                sortable : true,
                dataIndex: 'fechaF'
            },
            {
                text     : '<b>PROCESO</b>',
                flex     : 1,
                sortable : true,
                dataIndex: 'proceso'
            }/*,
            {
                text     : 'IMAGEN',
                flex     : 1,
                sortable : false,
                dataIndex: 'img'
            }*/
            
        ],
        height: '100%',
        //width: '100%',
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
                text: 'Agregar Empresa',
                id: 'buton12',
                 handler:function(){
                    showContactForm(0);
                } 
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                text: 'Borrar Empresa',
                id: 'buton13', 
                handler:function(){
                        Ext.MessageBox.confirm('Borrado', 'Esta seguro que quiere borrar las empresas seleccionadas?', function(btn){
                            if(btn === 'yes'){
                                var selections = gridempresas.selModel.getSelection();
                                Ext.each(selections,function(record){
                                    id = record.get('idempresa');
                                   // storeconocimientos.load({params:{opc:Ext.getCmp('opc').getValue(),categoria:1,proceso:'del',ident:id}});
                                      
                                      storeEmpresas.load({params:{proceso:0,id_r:id}});

                                });
                            }
                            storeEmpresas.load({params:{proceso:1}});
                            
                        });
                } 
                
            },'-'
        ]
        
    });

 
/*CREACION DE LA INTERFAZ*/ 


		var tabs = Ext.widget({
        xtype: 'form',
        id: 'tabForm',
		renderTo:'interfazGestionE',
        width: "100%",
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
						title:'GESTION DE EMPRESAS Y SUS PROCESOS',
						defaults: {
							bodyStyle:'padding:0px',
							anchor: '100%',
							bodyStyle:'background:#DFE9F6;'
						 },
						 items:[
                        {          /*
                                     layout: {
                                        type: 'table',
                                        columns: 1, 
                                        tdAttrs: {
                                            valign: 'middle'
                                        }
                                    },*/
                                    defaults: {
                                        frame:false,
                                        height: 25,
                                        border: true,
                                        style: 'margin: 0px 1px 0px 0px;'
                                    },  
                                    items:[
            							 	{
            									
            									height: 600,
            									items:[gridempresas]
            								}
                                            ]
                                        }
						      ]
					 }

					  ]//fin itemm tabpanel
         }//fin compo  tabpanel
			
			]

	});

	










});//terminacion onReady










