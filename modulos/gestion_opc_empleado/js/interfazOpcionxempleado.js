Ext.onReady(function(){
Ext.QuickTips.init();
  Ext.apply(Ext.QuickTips.getQuickTip(), {showDelay: 500, dismissDelay: 20000});
/************************ MODEL *********************/

Ext.define('empleadosModel',{
     extend:'Ext.data.Model',
     fields:[
        {
       name:'codigoempleado',type:'string'
        },
        {
        name:'nombreempleado',type:'string'
        }
     ],
     idProperty:'company'

   });

Ext.define('cargosModel',{
    extend:'Ext.data.Model',
    fields:[
      {
        name:'idcargo',type:'string'
      },
      {
        name:'cargo',type:'string'
      }
    ]

});

Ext.define('OpcionModel',{
    extend:'Ext.data.Model',
    fields:[
      {
        name:'idcargo',type:'string'
      },
      {
        name:'cargo',type:'string'
      }
    ]

});

/********************* STORES***************************/

var storeEmpleados=Ext.create('Ext.data.JsonStore',{
    model:'empleadosModel',
    remoteSort:true,
       proxy:{
            type:'ajax',
            url:'procesos/empleados_talento_json.php',
                reader:{
                    type:'json',
                    root:'data'
                    }
            }

});

var storeCargos=Ext.create('Ext.data.JsonStore',{
    model:'cargosModel',
    remoteSort:true,
       proxy:{
            type:'ajax',
            url:'procesos/cargos_json.php',
                reader:{
                    type:'json',
                    root:'data'
                    }
            }

});

var storeOpcion1=Ext.create('Ext.data.JsonStore',{
 model:'OpcionModel',
  proxy:{
          type:'ajax',
          url:'procesos/opciones_json.php',
          reader:{
                   type:'json',
                   root:'data'
              }
        }
});

var storeOpcion2=Ext.create('Ext.data.JsonStore',{
 model:'OpcionModel',
  proxy:{
          type:'ajax',
          url:'procesos/opciones_json.php',
          reader:{
                   type:'json',
                   root:'data'
              }
        }
});

var storeOpcion3=Ext.create('Ext.data.JsonStore',{
 model:'OpcionModel',
  proxy:{
          type:'ajax',
          url:'procesos/opciones_json.php',
          reader:{
                   type:'json',
                   root:'data'
              }
        }
});


/*************************************************/

/*formulario subcategoria*/ 
    function showFormOpciones(accion,codigoE){

storeCargos.load();
var idopcion1=Ext.getCmp('opcion1').getValue();
var idopcion2=Ext.getCmp('opcion2').getValue();
var idopcion3=Ext.getCmp('opcion3').getValue();
formOpciones=Ext.widget('form',{
            padding:10,
            layout:{
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
                            style: 'margin: 5px 5px 5px 5px;'
                },
                items:[
                
                {
                        html:'<center><font style="font-family:verdana,arial,sans-serif;font-size:12px;"><b>Opcion 1</b></font></center>',
                        width:"100%",
                        height:25,
                        colspan:4
                      },
                      {
                        xtype : 'combo',
                        id : 'codcargo1',
                        store : storeCargos,
                        displayField:'cargo',
                        valueField:'idcargo',
                        hiddenName : 'idcargo',
                        //typeAhead : true,
                        allowBlank: true,
                        queryMode:'local',
                        forceSelection : true,
                        triggerAction : 'all',
                        disabled:false,
                        width:400,
                        colspan: 4,
                        value:idopcion1,
                        emptyText : '......',
                        selectOnFocus : false
                      },
                      {
                        html:'<center><font style="font-family:verdana,arial,sans-serif;font-size:12px;"><b>Opcion 2</b></font></center>',
                        width:"100%",
                        height:25,
                        colspan:4
                      },{
                        xtype : 'combo',
                        id : 'codcargo2',
                        store :storeCargos,
                        displayField:'cargo',
                        valueField:'idcargo',
                        hiddenName : 'idcargo',
                        value:idopcion2,
                        //typeAhead : true,
                        allowBlank: true,
                        queryMode:'local',
                        forceSelection : true,
                        triggerAction : 'all',
                        disabled:false,
                        width:400,
                        colspan: 4,
                        emptyText : '......',
                        selectOnFocus : false
                      },
                      {
                        html:'<center><font style="font-family:verdana,arial,sans-serif;font-size:12px;"><b>Opcion 3</b></font></center>',
                        width:"100%",
                        height:25,
                        colspan:4,
                        border:false
                      },{
                        xtype : 'combo',
                        id : 'codcargo3',
                        store :storeCargos,
                        displayField:'cargo',
                        valueField:'idcargo',
                        hiddenName : 'idcargo',
                        allowBlank: true,
                        queryMode:'local',
                        forceSelection : true,
                        triggerAction : 'all',
                        disabled:false,
                        value:idopcion3,
                        width:400,
                        colspan: 4,
                        emptyText : '......',
                        selectOnFocus : false
                      },{
                        xtype : 'label',
                        styleHtmlContent: true,
                        id:'label2',
                        height: '100px',
                        baseCls:'Label',
                        text : "*.Solo se muestran Opciones evaluadas",
                        colspan: 4

                      }

                ],
                buttons:[{
                    text:' Registrar ',
                    iconCls: 'icon-OK',
                    handler:function(){//enviar datos
                      
                          if (this.up('form').getForm().isValid()) {
                              var post_opcion1=Ext.getCmp('codcargo1').getValue();
                              var post_opcion2=Ext.getCmp('codcargo2').getValue();
                              var post_opcion3=Ext.getCmp('codcargo3').getValue();

                              if(!(typeof post_opcion1!='undefined')){
                               post_opcion1=0;
                               }
                              if(!(typeof post_opcion2!='undefined')){
                               post_opcion2=0;
                               }
                              if(!(typeof post_opcion3!='undefined')){
                               post_opcion3=0;
                               }                                                             

                               if(accion!=0){//ingresar nueva subcategoria
                                        
                                     Ext.Ajax.request({

                                        url:'procesos/update_opciones.php?postopcion1='+post_opcion1+'&postopcion2='+post_opcion2+'&postopcion3='+post_opcion3+'&codigoE='+codigoE,
                                        method:'POST',
                                        
                                        success: function(result,request){
                                            var jsonData=JSON.parse(result.responseText);
                                            var bandera=jsonData[0].bandera;
                                            var msj=jsonData[0].msg;
                                            if (bandera==1) {
                                                            storeOpcion1.load({params:{codigoempleado:codigoE,opcion:1}});                                                          
                                                            storeOpcion2.load({params:{codigoempleado:codigoE,opcion:2}}); 
                                                            storeOpcion3.load({params:{codigoempleado:codigoE,opcion:3}});                                                 
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
                                                    title:'Sin Conexion',
                                                    msg:msj,
                                                    buttons:Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.WARNING
                                                });

                                            }


                                        },
                                        failure: function(result,request){
                                              Ext.MessageBox.show({
                                                    title:'Subcategoria Duplicada',
                                                    msg:'CONEXION AL SISTEMA INTERRUMPIDO, RECARGUE LA PAGINA E INTENTE DE NUEVO',
                                                    buttons:Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.WARNING
                                                });
                                                
                                            }

                                     });

                                }else{//actualizacion de datos de subcategoria
                                    var id_comp=Ext.getCmp('id_competencia').getValue();
                                    
                                      Ext.Ajax.request({

                                        url:'procesos/update_subclasificacion.php?subclasificacion='+post_subclasificacion+'&descrip='+post_descrip+'&id='+id_comp,
                                        method:'POST',
                                        waitMsg:' Registrando los datos ',
                                        success: function(result,request){
                                            var jsonData=JSON.parse(result.responseText);
                                            var bandera=jsonData[0].bandera;
                                            var msj=jsonData[0].msg;

                                            if (bandera==1) {
                                                                storeSubclasificacion.load();
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
                                                    title:'Subcategoria Duplicada',
                                                    msg:'CONEXION AL SISTEMA INTERRUMPIDO, RECARGUE LA PAGINA E INTENTE DE NUEVO',
                                                    buttons:Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.WARNING
                                                });
                                                
                                            }


                                    });



                                }

                                this.up('form').getForm().reset();
                                this.up('window').destroy();


                          }else{
                            Ext.Msg.alert('Warning', "Por favor, complete el formulario"); 
                          }

                    }

                },{
                    text:' Cancelar ',
                    iconCls: 'icon-CANCEL',
                    handler:function(){
                        this.up('form').getForm().reset();
                        this.up('window').destroy();
                    }

                }
                ]

        });




   
/*****************************************CREACION DE LA VENTANA EMERGENTE**************************************************************/

        var win = Ext.widget('window', {
                title: 'REGISTRO Y MODIFICACION DE OPCIONES DEL EMPLEADO',
                closable: false,
                width: 450,
                height: 350,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formOpciones
            });
         win.show();


    }// fin de la funcion de formadd

storeEmpleados.load();


/***     CONTENEDOR   ***/





var tabs = Ext.widget({
        xtype: 'form',
        id: 'tabForm',
    renderTo:'interfazFormTalento',
        width: "100%",
    height:"100%",
        border: true,
    bodyStyle: 'background:#1C3E67;',
        bodyBorder: false,
    defaults: {
       // anchor: '100%'
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
          //layout: 'anchor'
        },
 defaults: {
                            //frame:true,
                            //border: true,
                            //style: 'margin: 5px 5px 5px 5px;'
                } ,
        items:[
                    {
//                    title:'',
  //                  tabConfig:{
    //                cls: 'x-btn-text-icon',
      //              iconCls: 'icon-subcategoria'
        //            },
                        defaults:{
                        bodyStyle:'padding:0px',
                            //anchor: '100%',
                            bodyStyle:'background:#DFE9F6;',
                           colspan:6
                        },
                          layout: {
                                      type: 'table',
                                      columns: 6, 
                                      tdAttrs: {
                                        valign: 'middle'
                                      }
                                    },                        
                        items:[

                                       {
                                                      
                                                          xtype : 'combo',
                                                          id : 'codigoempleado',
                                                          store : storeEmpleados,
                                                          displayField:'nombreempleado',
                                                          forceSelection : false,
                                                          triggerAction : 'all',
                                                          queryMode:'local',
                                                          disabled:false,
                                                          selectOnFocus : false,
                                                          valueField:'codigoempleado',
                                                          hiddenName : 'codigoempleado',
                                                          fieldLabel: '<b>NOMBRE (*)</b>',
                                                          labelWidth:200,
                                                          width:700,
                                                          colspan:6,
                                                          allowBlank: false,
                                                          emptyText : 'SELECCIONE UN EMPLEADO',
                                                          padding:10,
                                                          
                                                          listeners: {
                                                         
                                                         change: function(field, newVal, oldVal) {
                                                          Ext.getCmp('refresh_btn').setDisabled(false);
                                                          Ext.getCmp('opciones_btn').setDisabled(false);
                                                            
                                                            storeOpcion1.clearFilter();
                                                            Ext.getCmp('opcion1').clearValue();
                                                            storeOpcion1.load({params:{codigoempleado:newVal,opcion:1}});                                                          
                                                            storeOpcion2.load({params:{codigoempleado:newVal,opcion:2}}); 
                                                            storeOpcion3.load({params:{codigoempleado:newVal,opcion:3}}); 
                                                            
                                                          /**********Carga el primer elemento del store.******************/
                                                            if (typeof  Ext.getCmp('opcion1').getStore().lastOptions !== "undefined") {
                                                                     // Grab the first value from the store
                                                                     Ext.getCmp('opcion1').setValue( Ext.getCmp('opcion1').getStore().first().get( Ext.getCmp('opcion1').valueField));
                                                                  }
                                                               else{    // When the store loads
                                                                  Ext.getCmp('opcion1').getStore().on("load", function(store, items){
                                                                      // Grab the first item of the newly loaded data
                                                                      Ext.getCmp('opcion1').setValue(items[0].get(Ext.getCmp('opcion1').valueField));
                                                                      });
                                                                    }  
                                                            /***********************************************/

                                            /**********Carga el primer elemento del store.******************/
                                                            if (typeof  Ext.getCmp('opcion2').getStore().lastOptions !== "undefined") {
                                                                     // Grab the first value from the store
                                                                     Ext.getCmp('opcion2').setValue( Ext.getCmp('opcion2').getStore().first().get( Ext.getCmp('opcion2').valueField));
                                                                  }
                                                               else{    // When the store loads
                                                                  Ext.getCmp('opcion2').getStore().on("load", function(store, items){
                                                                      // Grab the first item of the newly loaded data
                                                                      Ext.getCmp('opcion2').setValue(items[0].get(Ext.getCmp('opcion2').valueField));
                                                                      });
                                                                    }  
                                                            /***********************************************/ 

                                              /**********Carga el primer elemento del store.******************/
                                                            if (typeof  Ext.getCmp('opcion3').getStore().lastOptions !== "undefined") {
                                                                     // Grab the first value from the store
                                                                     Ext.getCmp('opcion3').setValue( Ext.getCmp('opcion3').getStore().first().get( Ext.getCmp('opcion3').valueField));
                                                                  }
                                                               else{    // When the store loads
                                                                  Ext.getCmp('opcion3').getStore().on("load", function(store, items){
                                                                      // Grab the first item of the newly loaded data
                                                                      Ext.getCmp('opcion3').setValue(items[0].get(Ext.getCmp('opcion3').valueField));
                                                                      });
                                                                    }  
                                                            /***********************************************/                                                                                                                        

                                                                                                                        

                                                            },scope:this,

                                                          }
                                                      
                                                  },
                                                
                                                     {
                                                  xtype : 'combo',
                                                  id : 'opcion1',
                                                  store : storeOpcion1,
                                                  padding:5,
                                                  displayField:'cargo',
                                                  fieldLabel:'<b>Opcion 1</b>',
                                                  valueField:'idcargo',
                                                  hiddenName : 'idcargo',
                                                  typeAhead : true,
                                                  queryMode:'local',
                                                  hideTrigger:true,  
                                                                                             
                                                  triggerAction : 'all',
                                                  disabled:true,
                                                  width:600,
                                                  colspan: 6,
                                                  
                                                  selectOnFocus : false
                                                },
                                                                                              
                                                {
                                                  xtype : 'combo',
                                                  id : 'opcion2',
                                                  padding:5,
                                                  store : storeOpcion2,
                                                  displayField:'cargo',
                                                  fieldLabel:'<b>Opcion 2</b>',
                                                  valueField:'idcargo',
                                                  hiddenName : 'idcargo',
                                                  typeAhead : true,
                                                  queryMode:'local',
                                                  hideTrigger:true,                                                  
                                                  triggerAction : 'all',
                                                  disabled:true,
                                                  width:600,
                                                  colspan: 6,
                                                  
                                                  selectOnFocus : false
                                                }  , 
                                                                                              
                                                {
                                                  xtype : 'combo',
                                                  id : 'opcion3',
                                                  store : storeOpcion3,
                                                  padding:5,
                                                  displayField:'cargo',
                                                  fieldLabel:'<b>Opcion 3</b>',
                                                  valueField:'idcargo',
                                                  hiddenName : 'idcargo',
                                                  allowBlank: true,
                                                  queryMode:'local',
                                                  triggerAction : 'all',
                                                  hideTrigger:true,
                                                  disabled:true,
                                                  width:600,
                                                  colspan: 6,
                                                  selectOnFocus : false
                                                } 
                                                                            
                        
                        
                        ],
tbar:[
            '->','-',
            {
                xtype: 'button',
                padding:5,
                cls: 'contactBtn',
                iconCls:'icon-user_add',
                text: '<b>Opciones</b>',
                id: 'opciones_btn',
                disabled:true,

                handler:function(){
  var codigoE=Ext.getCmp('codigoempleado').getValue();
                                                           if(codigoE==null){
                                                    Ext.MessageBox.show({
                                                               title:'status',
                                                                msg:'Por favor seleccione previamente un empleado para poder asignarle opciones.',
                                                                buttons:Ext.MessageBox.OK,
                                                                icon: Ext.MessageBox.INFO
                                                                });                                                                

                                                           }else{
                                                           showFormOpciones(1,codigoE);

                                                           }                  
                  
                }
                
            },'-',
            {
                xtype: 'button',
                padding:5,
                cls: 'contactBtn',
                iconCls:'icon-refresh',
                text: '<b>Refrescar Formulario</b>',
                id: 'refresh_btn',
                disabled:true,
                
                handler:function(){
                  
                }
                
            }            
            ]                        
                    
                    }

            ]
         }
      
      ]

  });




});