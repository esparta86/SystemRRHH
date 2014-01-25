
Ext.onReady(function(){

/**************************** MODEL ******************************************/

Ext.define('empleadosModel',{
extend:'Ext.data.Model',
  fields:[
      {name:'codigoempleado',type:'string'},
      {name:'nombreempleado',type:'string'}
  ],
  idProperty:'company'

});

Ext.define('empresasModel',{
  extend:'Ext.data.Model',
  fields:[
      {name:'idempresa',type:'int'},
      {name:'nombreempresa',type:'string'}
  ],
  idProperty:'company'

});


Ext.define('procesosModel',{
  extend:'Ext.data.Model',
  fields:[
    {name:'idproceso',type:'int'},
    {name:'nombreproceso',type:'string'}
  ],
  idProperty:'company'

});


Ext.define('ponderacionModel',{
  extend:'Ext.data.Model',
  fields:[
   {name:'idponderacion',type:'int'},
   {name:'idproceso',type:'int'},
   {name:'nombreproceso',type:'string'},
   {name:'jefe',type:'string'},
   {name:'coworkers',type:'string'},
   {name:'colaboradores',type:'string'},
   {name:'personal',type:'string'},
   {name:'estado',type:'int'},
   {name:'estadoS',type:'string'}
  ],
  idProperty:'company'


});




/**************************** STORES ******************************************/

var storePonderacioon=Ext.create('Ext.data.JsonStore',{
  model:'ponderacionModel',
  remoteSort:true,
      proxy:{
            type:'ajax',
            url:'procesos/ponderacion_json.php',
            reader:{
               type:'json',
               root:'data'
            }
      }
});

var storeEmpresas=Ext.create('Ext.data.JsonStore',{

  model:'empresasModel',
  remoteSort:true,
     proxy:{
                type:'ajax',
                url:'procesos/empresas_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
               
          }
});


var storeProcesosE=Ext.create('Ext.data.JsonStore',{
  model:'procesosModel',
  remoteSort:true,

  proxy:{
            type:'ajax',
            url:'procesos/procesos_json.php',
            reader:{
                type:'json',
                root:'data'
            }
      }
});



var storeUsuarios=Ext.create('Ext.data.JsonStore',{
  model:'usuariosModel',
  remoteSort:true,
     proxy:{
                type:'ajax',
                url:'procesos/usuarios_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
               
          }
});


/*************************************** sm ***************************************************************************/

/************************************* sm ..             ***************************************/    
var smUsuario=new Ext.selection.CheckboxModel({
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];    
            if(record!=undefined){
                       showPonderacionForm(0);  
                       var estado=record.get('estado');
                       if(estado==1){
                        Ext.getCmp('estado').setValue({estado:1});
                       }else{
                        Ext.getCmp('estado').setValue({estado:0});
                       }

                       formPonderacion.getForm().loadRecord(record);
                        }
                    
                    
                    }
               }
               }); //fin del sm


/************************************ LLAMADAS A STORES PRINCIPALES ****************************************************/
storeEmpresas.load();
//storeProcesosE.load({params:{idempre:0}});
//storeUsuarios.load({params:{idr:0}});



/*********************** FORMULARIOS **********************************/
 
 function showPonderacionForm(accion){
    storeProcesosE.load();
         formPonderacion=Ext.widget('form',{
                      layout:{
                               type:'table',
                               columns:4,
                               tdAttrs:{
                                valign:'middle'
                               }
                        },
                        fieldDefaults: {
                                    labelWidth: 150,
                                    labelStyle: 'font-weight:bold'
                                },
                        defaults:{
                            frame:true,
                            border: true,
                            style: 'margin: 2px 10px 5px 10px;'

                        },
                         items:[
                                {
                                  xtype:'hiddenfield',
                                  id:'idponderacion',
                                  name:'idponderacion',
                                  colspan:4
                                },
                                {
                
                                  xtype : 'combo',
                                  id : 'idproceso',
                                  store : storeProcesosE,
                                  displayField:'nombreproceso',
                                  forceSelection : false,
                                  triggerAction : 'all',
                                  queryMode:'local',
                                  selectOnFocus : false,
                                  valueField:'idproceso',
                                  hiddenName : 'idproceso',
                                  fieldLabel: 'PROCESO (*)',
                                  labelWidth: 150,
                                  width:450,
                                  colspan:4,
                                  padding:10,
                                  allowBlank: false,
                                  emptyText : 'SELECCIONE UN PROCESO',
                                         listeners: {
                                             change: function(field, newVal, oldVal) {
                                              Ext.getCmp('coworkers').setDisabled(false);
                                              Ext.getCmp('colaboradores').setDisabled(false);
                                              

                                                if(newVal==1){
                                                Ext.getCmp('coworkers').setDisabled(true);
                                                Ext.getCmp('coworkers').setValue(0);
                                                Ext.getCmp('colaboradores').setDisabled(true);
                                                Ext.getCmp('colaboradores').setValue(0);
                                               
                                                }
                                                if(newVal==2){
                                                  Ext.getCmp('colaboradores').setDisabled(true);
                                                  Ext.getCmp('colaboradores').setValue(0);
                                                                                                  
                                                }
                                                if(newVal==3){

                                                }
                                                                                           

                                               }
                                             }
                                                    
                              },
         {
            xtype:'fieldset',
            title: 'Ponderaciones',
            items:[                              

                              {
                                 xtype: 'numberfield',
                                 id:'jefe',
                                 fieldLabel:'<b>JEFE</b>',
                                 allowBlank:false,
                                 width:200,
                                 minValue:1,
                                 maxValue:100

                              },
                              {
                                 xtype:'numberfield',
                                 id:'coworkers',
                                 fieldLabel:'<b>COWORKERS</b>',
                                 allowBlank:false,
                                 width:200,
                                 minValue:1,
                                 maxValue:100
                              },
                              {
                                 xtype:'numberfield',
                                 id:'colaboradores',
                                 fieldLabel:'<b>COLABORADORES</b>',
                                 allowBlank:false,
                                 width:200,
                                 minValue:1,
                                 maxValue:100
                              }
                              ,
                              {
                                 xtype:'numberfield',
                                 id:'personal',
                                 fieldLabel:'<b>PERSONAL</b>',
                                 allowBlank:false,
                                 width:200,
                                 minValue:1,
                                 maxValue:100
                              }                              


                    ]
                    },
                    {
                    xtype      : 'radiogroup',
                    fieldLabel : 'Estado',
                    id:'estado',
                    name:'estado',
                    allowBlank:false,
                    colspan:2,
                    columns:1,
                                      
                    items:[
                        {
                            boxLabel  : 'Activo',
                            inputValue: '1',
                            name:'estado'
                           
                        },
                        {
                            boxLabel  : 'No Activo',
                            name:'estado',
                            inputValue: '0'
                            
                        }
                    ]
                   
            }                                                                              
                              

                          
                        ],
                        buttons:[
                          {
                            text:'<b>REGISTRAR</b>',
                            scale:'large',
                            iconCls:'icon-OK',
                            width:175,
                            handler:function()  
                            {
                              if(this.up('form').getForm().isValid()){
                              var post_proceso=Ext.getCmp('idproceso').getValue();
                              var post_jefe=Ext.getCmp('jefe').getValue();
                              var post_coworker=Ext.getCmp('coworkers').getValue();
                              var post_colaboradores=Ext.getCmp('colaboradores').getValue();
                              var post_personal=Ext.getCmp('personal').getValue();
                              var post_ide=Ext.getCmp('dataempresa').getValue();
                              var post_estado=Ext.getCmp('estado').getChecked()[0].getGroupValue();
                              
                              if(post_coworker==null){
                                post_coworker=0;
                              }
                              if(post_colaboradores==null){
                                post_colaboradores=0;
                              }
                             

                                        if(accion!=0){
                                                      Ext.Ajax.request({
                                                           url:'procesos/guardar_ponderacion.php?idempresa='+post_ide+'&idproceso='+post_proceso+'&jefe='+post_jefe+'&coworker='+post_coworker+'&colaboradores='+post_colaboradores+'&personal='+post_personal+'&estado='+post_estado,
                                                           method:'POST',
                                                           success:function(result,request){
                                                                   var jsonData=JSON.parse(result.responseText);
                                                                   var bandera=jsonData[0].bandera;
                                                                   var msj=jsonData[0].msg;

                                                                    if (bandera==1) {
                                                                         storePonderacioon.load({params:{ide:post_ide}});
                                                                          Ext.MessageBox.show({
                                                                              title:'Exito',
                                                                              msg:msj,
                                                                              buttons:Ext.MessageBox.OK,
                                                                              icon: Ext.MessageBox.INFO
                                                                          });
                                                                      }
                                                                      if(bandera==2){
                                                                          Ext.MessageBox.show({
                                                                              title:'Sin exito',
                                                                              msg:msj,
                                                                              buttons:Ext.MessageBox.OK,
                                                                              icon: Ext.MessageBox.ERROR
                                                                          });

                                                                      }
                                                                       if(bandera==3){
                                                                          Ext.MessageBox.show({
                                                                              title:'Competencia ya existe',
                                                                              msg:msj,
                                                                              buttons:Ext.MessageBox.OK,
                                                                              icon: Ext.MessageBox.WARNING
                                                                          });

                                                                      }


                                                              }//fin de success

                                                          });

                                                     }
                                                     else{//actualizacion

                                                      var post_idponderacion=Ext.getCmp('idponderacion').getValue();
                                                      Ext.Ajax.request({
                                                          url:'procesos/modificar_ponderacion.php?idempresa='+post_ide+'&idponderacion='+post_idponderacion+'&idproceso='+post_proceso+'&jefe='+post_jefe+'&coworker='+post_coworker+'&colaboradores='+post_colaboradores+'&personal='+post_personal+'&estado='+post_estado,
                                                          method:'POST',
                                                                success: function(result,request){
                                                                             var jsonData=JSON.parse(result.responseText);
                                                                                                  var bandera=jsonData[0].bandera;
                                                                                                  var msj=jsonData[0].msg;
                                                                                             if (bandera==1) {
                                                                                                          storePonderacioon.load({params:{ide:post_ide}});
                                                                                                          Ext.MessageBox.show({
                                                                                                          title:'Exito',
                                                                                                           msg:msj,
                                                                                                           buttons:Ext.MessageBox.OK,
                                                                                                           icon: Ext.MessageBox.INFO
                                                                                                           });
                                                                                                          }
                                                      
                                                                                                  if(bandera==2) { 
                                                                                                          Ext.MessageBox.show({
                                                                                                          title:'Sin exito',
                                                                                                          msg:msj,
                                                                                                          buttons:Ext.MessageBox.OK,
                                                                                                          icon: Ext.MessageBox.ERROR
                                                                                                          });
                                                      
                                                                                                                 }              
                                                        
                                                                },
                                                                  failure: function(result,request){
                                                                                   Ext.MessageBox.show({
                                                                                   title:'Subcategoria',
                                                                                   msg:'CONEXION AL SISTEMA INTERRUMPIDO, RECARGUE LA PAGINA E INTENTE DE NUEVO',
                                                                                   buttons:Ext.MessageBox.OK,
                                                                                   icon: Ext.MessageBox.WARNING
                                                                                    });
                                                                                                      
                                                                   }          
                                                      
                                                      
                                                          });//fin de request
                                                      





                                                     }
                                                    

                                this.up('form').getForm().reset();
                                this.up('window').destroy();

                                        
                              }//fin de valid
                              else{
                                Ext.Msg.alert('Warning', "Por favor, complete el formulario"); 
                              }

                            }//fin del handler


                          },
                          {
                            text:'<b>CANCELAR</b>',
                            scale:'large',
                            iconCls:'icon-CANCEL',
                            width:175,
                            handler:function(){
                                this.up('form').getForm().reset();
                                this.up('window').destroy();
                                }

                          }

                        ]


                     });

     
     


      var win = Ext.widget('window', {
                title: 'REGISTRO Y MODIFICACION DE PONDERACIONES',
                closable: true,
                width: 600,
                height:350,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formPonderacion
            });
         win.show();
   
     

/*****************************************CREACION DE LA VENTANA EMERGENTE**************************************************************/

       


 }//fin de funcion showUsuarioForm


 


/**************************** DATA GRIDS ******************************************/

var gridPonderaciones=Ext.create('Ext.grid.Panel',{
 	store:storePonderacioon,
 	stateful:true,
 	collapsible:false,
 	selModel:smUsuario,
 	multiSelect:true,
 	stateId:'stateGrid',

 	columns:[
        {
          text:'IDPONDERACION',
          sortable:false,
          dataIndex:'idponderacion',
          hidden:true
        },
        {
          text:'IDPROCESO',
          sortable:false,
          dataIndex:'idproceso',
          hidden:true
        },
        {
 			  text:'<b> PROCESO</b>',
 			  sortable:true,
 			  flex:1,
        dataIndex:'nombreproceso'
 		   },
 		 		{
 			 text:'<b>JEFE</b>',
 			 sortable:true,
 			 flex:1,
       dataIndex:'jefe'
 		},
    {
      text:'<b>COWORKERS</b>',
      sortable:true,
      flex:1,
      dataIndex:'coworkers'
    },
    
    {
      text:'<b>COLABORADORES</b>',
      sortable:true,
      flex:1,
      dataIndex:'colaboradores'
    },
    {
      text:'<b>PERSONAL</b>',
      sortable:false,
      flex:1,
      dataIndex:'personal'

    },
    {
      text:'ESTADO',
      sortable:false,
      flex:1,
      dataIndex:'estado',
      hidden:true
    },
    {
      text:'<b>ESTADO</b>',
      sortable:false,
      flex:1,
      dataIndex:'estadoS'
    }
  





        ],
        tbar:[
            '->','-',
            {
                xtype: 'button',
                padding:5,
                cls: 'contactBtn',
                //iconCls:'icon-user_add',
                text: '<b>Agregar Ponderacion</b>',
                id: 'btnaddPonderacion',
                disabled:true,
                
                handler:function(){
                  showPonderacionForm(1);
                }
                
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                //iconCls:'icon-user_delete',
                text: '<b>Borrar Ponderacion</b>',
                id: 'btndeletePonderacion',
                disabled:true,
                handler:function(){
                      Ext.MessageBox.confirm('Borrado','¿Esta seguro de borrar las ponderaciones seleccionadas?',function(btn){
                          if(btn==='yes'){
                                   var selections=gridPonderaciones.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idponderacion');
                                        
                                        Ext.Ajax.request({
                                            url:'procesos/eliminar_ponderacion.php?id='+id,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                    var post_ide=Ext.getCmp('dataempresa').getValue();
                                                                      storePonderacioon.load({params:{ide:post_ide}});
                                                                  }
                                                                  if (bandera==2||bandera==3) {

                                                                       Ext.MessageBox.show({
                                                                              title:'Sin Exito',
                                                                              msg:msj,
                                                                              buttons:Ext.MessageBox.OK,
                                                                              icon: Ext.MessageBox.WARNING
                                                                          });//fin de msj

                                                                  }


                                            }//fin del success
                                        });
                                        
                                      });
                                    }//fin del yes

                      });


                }//fin del handler

                
              }


            ]


 	});



/************ PANELES ***********/

var panel_central=new Ext.Panel({
	 collapsible:false,
   iconCls:'icon-datos',
   width:'100%',
	 items:[
	 {
                
                    xtype : 'combo',
                    id : 'dataempresa',
                    store : storeEmpresas,
                    displayField:'nombreempresa',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'idempresa',
                    hiddenName : 'idempresa',
                    fieldLabel: '<b>SELECCIONE UNA EMPRESA (*)</b>',
                    labelWidth:200,
                    width:450,
                    padding:10,
                    allowBlank: false,
                    emptyText : 'SELECCIONE UNA EMPRESA',
                    listeners: {
                   change: function(field, newVal, oldVal) {
                         storePonderacioon.load({params:{ide:newVal}});
                         Ext.getCmp('btnaddPonderacion').setDisabled(false);
                         Ext.getCmp('btndeletePonderacion').setDisabled(false);
                      
                     }
          }
                
            },

	 gridPonderaciones
	 ]


});

/***     CONTENEDOR   ***/
    
  var main_panel=new Ext.Panel({
      title:'<b>GESTION DE PONDERACIONES SEGUN PROCESO</b>',
      renderTo:'interfazGestionPonderacion',
      iconCls:'icon-userconfig',
     width:'97%',
      collapsible:false,  
        items:[
        panel_central
        ]

  })



});