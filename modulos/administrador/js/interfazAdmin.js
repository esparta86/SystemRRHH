
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
    {name:'idrealiza',type:'int'},
    {name:'nombre_proceso',type:'string'}
  ],
  idProperty:'company'

});


Ext.define('usuariosModel',{
  extend:'Ext.data.Model',
  fields:[
   {name:'idproceso',type:'int'},
   {name:'proceso',type:'string'},
   {name:'idusuario',type:'int'},
   {name:'codigoEmpleado',type:'string'},
   {name:'nombreusuario',type:'string'},
   {name:'tipousuario',type:'string'},
   {name:'empleado',type:'string'},
   {name:'estado',type:'int'},
   {name:'estadoU',type:'string'}
   
  ],
  idProperty:'company'


});




/**************************** STORES ******************************************/

var storeEmpleados=Ext.create('Ext.data.JsonStore',{
  model:'empleadosModel',
  remoteSort:true,
      proxy:{
            type:'ajax',
            url:'procesos/empleados_json.php',
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
            url:'procesos/procesos_empresa_json.php',
            reader:{
                type:'json',
                root:'data'
            }
      }
});



var storeUsuarios=Ext.create('Ext.data.JsonStore',{
  model:'usuariosModel',
  
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
                var tipo=record.get('tipousuario');
                 if(tipo=='Administrador del sistema'){
                     showUsuariosForm(0,true);  
                     var radio=Ext.getCmp('tipousuariog');
                                        
                     radio.setValue({tipousuariog:"1"});
                   }
                  if(tipo=='Administrador evaluacion del desempeño'){
                    showUsuariosForm(0,true);  
                     var radio=Ext.getCmp('tipousuariog');
                     radio.setValue({tipousuariog:"2"});                    
                  }
                  if(tipo=='Administrador plan y sucesion'){
                    showUsuariosForm(0,true);  
                     var radio=Ext.getCmp('tipousuariog');
                     radio.setValue({tipousuariog:"3"});                    
                  }
                  if(tipo=='Usuario normal evaluacion desempeño'){
                    showUsuariosForm(0,true);  
                     var radio=Ext.getCmp('tipousuariog');
                     radio.setValue({tipousuariog:"4"});                    
                  }
                  if(tipo=='Usuario normal evaluacion y sucesion'){
                    showUsuariosForm(0,true);  
                     var radio=Ext.getCmp('tipousuariog');
                     radio.setValue({tipousuariog:"5"});                    
                  }

              var estadoUser=record.get('estado');
              if(estadoUser==1){
                  var radio2=Ext.getCmp('estadousuario');;
                  radio2.setValue({estadousuario:"1"});
              }
              if(estadoUser==0){
                  var radio2=Ext.getCmp('estadousuario');;
                  radio2.setValue({estadousuario:"0"});                
              }
                        
                         formUsuario.getForm().loadRecord(record);
                        }
                    
                    
                    }
               }
               }); //fin del sm


/************************************ LLAMADAS A STORES PRINCIPALES ****************************************************/
storeEmpresas.load();
storeProcesosE.load({params:{idempre:0}});
storeUsuarios.load({params:{idr:0}});



/*********************** FORMULARIOS **********************************/
 
 function showUsuariosForm(accion,bandera){
    
var id_p=Ext.getCmp('dataproceso').getValue();/* capturo el id del proceso con el cual se registra el usuario*/
storeEmpleados.removeAll();
storeEmpleados.clearFilter();
/* formulario que depende de que exista un empleado*/
if(accion!=0){
   storeEmpleados.load({params:{id_realiza:id_p}}); /* cargar lso empleados correspondiente al proceso seleccionado*/
}else{
  storeEmpleados.load({params:{id_realiza:id_p,update:'1'}});
}
                       formUsuario=Ext.widget('form',{

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
                        bandera2:bandera,
                        items:[
                                {
                
                                  xtype : 'combo',
                                  id : 'codigoEmpleado',
                                  store : storeEmpleados,
                                  displayField:'nombreempleado',
                                  forceSelection : false,
                                  triggerAction : 'all',
                                  queryMode:'local',
                                  disabled:bandera,
                                  selectOnFocus : false,
                                  valueField:'codigoempleado',
                                  hiddenName : 'codigoempleado',
                                  fieldLabel: 'EMPLEADO (*)',
                                  labelWidth: 150,
                                  width:450,
                                  colspan:4,
                                  allowBlank: false,
                                  emptyText : 'SELECCIONE UN EMPLEADO',
                                         listeners: {
                                             change: function(field, newVal, oldVal) {
                                                /* obtener id de empresa */
                                                    Ext.getCmp('codigoempleado').setValue(newVal);
                                                    Ext.getCmp('nombreusuario').setValue(newVal);

                                               }
                                             }
                                                    
                              },{
                                 xtype:'textfield',
                                 id:'codigoempleado',
                                 fieldLabel:'<b>CODIGO EMPLEADO</b>',
                                 allowBlank:false,
                                 disabled:true,
                                 colspan:2

                              },
                              {
                                 xtype:'textfield',
                                 id:'nombreusuario',
                                 fieldLabel:'<b>NOMBRE USUARIO</b>',
                                 allowBlank:false,
                                 colspan:2
                              },
                                {
                                    xtype      : 'radiogroup',
                                    fieldLabel : '<b>TIPO DE USUARIO.</b>',
                                    id:'tipousuariog',
                                    allowBlank:false,
                                    colspan:4,
                                    columns:1,
                                                      
                                    items:[
                                        {
                                            boxLabel  : 'Administrador del sistema',
                                            inputValue: '1',
                                            name:'tipousuariog'
                                           
                                        },
                                        {
                                            boxLabel  : 'Administrador evaluacion desempeño',
                                            name:'tipousuariog',
                                            inputValue: '2'
                                            
                                        },
                                        {
                                            boxLabel  : 'Administrador plan y sucesion',
                                            name:'tipousuariog',
                                            inputValue:3
                                        },
                                        {
                                            boxLabel  : 'Usuario normal evaluacion y desempeño',
                                            name:'tipousuariog',
                                            inputValue:4
                                        },
                                        {
                                            boxLabel  : 'Usuario normal plan y sucesion',
                                            name:'tipousuariog',
                                            inputValue:5
                                        }
                                    ]
                                   
                            },{
                               xtype:'textfield',
                               fieldLabel:'<b>PASSWORD (minimo 8 caracteres)</b>',
                               allowBlank:false,
                               colspan:4,
                               id:'password',
                               allowBlank:true,
                               inputType:'password'

                              },
                                {
                                    xtype      : 'radiogroup',
                                    fieldLabel : '<b>ESTADO DEL USUARIO.</b>',
                                    id:'estadousuario',
                                    allowBlank:false,
                                    colspan:4,
                                    columns:1,
                                                      
                                    items:[
                                        {
                                            boxLabel  : 'Activo',
                                            inputValue: '1',
                                            name:'estadousuario'
                                           
                                        },
                                        {
                                            boxLabel  : 'Inactivo',
                                            name:'estadousuario',
                                            inputValue: '0'
                                            
                                        }
                                       
                                    ]
                                   
                            }                              

                          
                        ],
                        buttons:[
                          {
                            text:'<b>REGISTRAR USUARIO</b>',
                            scale:'large',
                            iconCls:'icon-OK',
                            width:175,
                            handler:function()  
                            {

                              if(this.up('form').getForm().isValid()){

                                        var post_codigoempleado=Ext.getCmp('codigoempleado').getValue();
                                        var post_nombreusuario=Ext.getCmp('nombreusuario').getValue();
                                        var post_tipo=Ext.getCmp('tipousuariog').getChecked()[0].getGroupValue();
                                        var post_pass=Ext.getCmp('password').getValue();
                                        var post_estado=Ext.getCmp('estadousuario').getChecked()[0].getGroupValue();

                                        var post_id_r=id_p;
                                        if(accion!=0){
                                                      Ext.Ajax.request({
                                                           url:'procesos/guardar_usuario.php?codigo_e='+post_codigoempleado+'&nombreusuario='+post_nombreusuario+'&tipousuario='+post_tipo+'&passw='+post_pass+'&id_r='+post_id_r+'&estado='+post_estado,
                                                           method:'POST',
                                                           success:function(result,request){

                                                                  var jsonData=JSON.parse(result.responseText);
                                                                   var bandera=jsonData[0].bandera;
                                                                   var msj=jsonData[0].msg;

                                                                    if (bandera==1) {
                                                                          storeUsuarios.load({params:{idr:post_id_r}});
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

                                                          Ext.Ajax.request({
                                                          url:'procesos/update_usuarios.php?codigo_e='+post_codigoempleado+'&nombreusuario='+post_nombreusuario+'&tipousuario='+post_tipo+'&passw='+post_pass+'&id_r='+post_id_r+'&estado='+post_estado,
                                                          method:'POST',
                                                                success: function(result,request){
                                                      
                                                                             var jsonData=JSON.parse(result.responseText);
                                                                                                  var bandera=jsonData[0].bandera;
                                                                                                  var msj=jsonData[0].msg;
                                                      
                                                                                             if (bandera==1) {
                                                                                                          storeUsuarios.load({params:{idr:post_id_r}});
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
                title: 'REGISTRO Y MODIFICACION DE USUARIOS',
                closable: true,
                width: 600,
                height:350,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formUsuario
            });
         win.show();
   
     

/*****************************************CREACION DE LA VENTANA EMERGENTE**************************************************************/

       


 }//fin de funcion showUsuarioForm


 


/**************************** DATA GRIDS ******************************************/

var gridUsuarios=Ext.create('Ext.grid.Panel',{
 	store:storeUsuarios,
 	stateful:true,
 	collapsible:false,
 	selModel:smUsuario,
 	multiSelect:true,
 	stateId:'stateGrid',

 	columns:[
        {
          text:'ID_PROCESO',
          sortable:false,
          dataIndex:'idproceso',
          hidden:true
        },
        {
 			text:'<b> PROCESO</b>',
 			sortable:true,
 			flex:1,
            width:300,
 			dataIndex:'proceso'
 		   },
 		{
          text:'ID_USUARIO',
          sortable:false,
          dataIndex:'idusuario',
          hidden:true
        },
 		{
 			text:'<b>CODIGO DE EMPLEADO</b>',
 			sortable:true,
 			flex:1,
      width:300,
 			dataIndex:'codigoEmpleado'
 		},
    {
      text:'<b>EMPLEADO</b>',
      sortable:true,
      dataIndex:'empleado',
      flex:1
    },
    {
      text:'<b>NOMBRE DE USUARIO</b>',
      sortable:true,
      flex:1,
            width:300,
      dataIndex:'nombreusuario'
    },
    
    {
      text:'<b>TIPO DE USUARIO</b>',
      sortable:true,
      flex:1,
            width:300,
      dataIndex:'tipousuario'
    },
        {
          text:'ESTADO',
          sortable:false,
          dataIndex:'estado',
          hidden:true
        },
      {
      text:'<b>ESTADO</b>',
      sortable:true,
      flex:1,
      dataIndex:'estadoU'
        }        

  





        ],
        tbar:[
            '->','-',
              {
                xtype: 'button',
                padding:5,
//                cls: 'contactBtn',
                iconCls:'icon-user_add',
                text: '<b>Dar de baja a usuarios </b>',
                id: 'btnaDowuser',
                disabled:true,
                
                handler:function(){
                  Ext.MessageBox.confirm('Baja de usuarios','¿Esta seguro de dar de baja a todos los usuarios de este proceso?',function(btn){
                    if(btn==='yes')
                        {
                          var post_idRealiza=Ext.getCmp('dataproceso').getValue();

                          Ext.Ajax.request({
                                            url:'procesos/bajas_usuario.php?id='+post_idRealiza,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                      storeUsuarios.load({params:{idr:post_idRealiza}});
                                                                  }
                                                                  if (bandera==2||bandera==3) {

                                                                       Ext.MessageBox.show({
                                                                              title:'Sin Exito',
                                                                              msg:msj,
                                                                              buttons:Ext.MessageBox.OK,
                                                                              icon: Ext.MessageBox.WARNING
                                                                          });//fin de msj

                                                                  }


                                            }
                                        });                          
                              
                        }                  
                       }); 
                }
                
            },'-',            
            {
                xtype: 'button',
                padding:5,
                cls: 'contactBtn',
                iconCls:'icon-user_add',
                text: '<b>Agregar Usuario</b>',
                id: 'btnaddUsuario',
                disabled:true,
                
                handler:function(){
                  showUsuariosForm(1,false);
                }
                
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                iconCls:'icon-user_delete',
                text: '<b>Borrar Usuario</b>',
                id: 'btndeleteUsuario',
                disabled:true,
                handler:function(){
                      Ext.MessageBox.confirm('Borrado','¿Esta seguro de borrar los usuarios seleccionados?',function(btn){
                          if(btn==='yes'){
                                   var selections=gridUsuarios.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idusuario');
                                        nombre=record.get('nombreusuario');
                                        id_realiza=record.get('idproceso');

                                        Ext.Ajax.request({
                                            url:'procesos/eliminar_usuario.php?id='+id+'&nombre='+nombre,
                                            method:'POST',
                                            success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                                  var bandera=jsonData[0].bandera;
                                                                  var msj=jsonData[0].msg;

                                                                  if(bandera==1){
                                                                      storeUsuarios.load({params:{idr:id_realiza}});
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
	 title:'DATOS',
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
                    //colspan:4,
                    allowBlank: false,
                    emptyText : 'SELECCIONE UNA EMPRESA',
                    listeners: {
                   change: function(field, newVal, oldVal) {
                      /* obtener id de empresa */
                         storeProcesosE.clearFilter();
                         Ext.getCmp('dataproceso').clearValue();
                         storeProcesosE.load({params:{idempre:newVal}});
                         Ext.getCmp('dataproceso').setDisabled(false);

                     }
          }
                
            },
            {
                
                    xtype : 'combo',
                    id : 'dataproceso',
                    store : storeProcesosE,
                    displayField:'nombre_proceso',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:true,
                    selectOnFocus : false,
                    labelWidth:200,
                    valueField:'idrealiza',
                    hiddenName : 'idrealiza',
                    fieldLabel: '<b>SELECCIONE UN PROCESO (*)</b>',
                    width:650,
                    colspan:2,
                    allowBlank: true,
                    emptyText : 'SELECCIONE UN PROCESO ',
                    listeners:{
                      change:function(field,newVal,oldVal){
                            /*** obtener el id del proceso**/
                            storeUsuarios.clearFilter();
                            storeUsuarios.load({params:{idr:newVal}});
                            Ext.getCmp('btnaddUsuario').setDisabled(false);
                            Ext.getCmp('btnaDowuser').setDisabled(false);
                            Ext.getCmp('btndeleteUsuario').setDisabled(false);
                           }
                    }
                
            },

	 gridUsuarios
	 ]


});

/***     CONTENEDOR   ***/
    
  var main_panel=new Ext.Panel({
      title:'<b>GESTION DE USUARIOS</b>',
      renderTo:'interfazGestionAdmin',
      iconCls:'icon-userconfig',
     width:'97%',
      collapsible:false,  
        items:[
        panel_central
        ]

  })

});