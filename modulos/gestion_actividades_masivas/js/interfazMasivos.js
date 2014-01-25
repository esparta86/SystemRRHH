
Ext.onReady(function(){
Ext.QuickTips.init();
  Ext.apply(Ext.QuickTips.getQuickTip(), {showDelay: 500, dismissDelay: 20000});

Ext.apply(Ext.form.VTypes,{  
    years: function(val, field){  
        try{  
            var birth = field.getValue();  
            var now = new Date();  
            // The number of milliseconds in one year  
            var ONE_YEAR = 1000 * 60 * 60 * 24 * 365;  
                // Convert both dates to milliseconds  
                var date1_ms = birth.getTime()  
                var date2_ms = now.getTime()  
                // Calculate the difference in milliseconds  
                var difference_ms = Math.abs(date1_ms - date2_ms)  
                // Convert back to years  
                var years = difference_ms/ONE_YEAR;
        
        if ((parseInt(years)==8) || (parseInt(years)>=8)){
          return false;
        }else{
          return true;
        }
            //return years >= 18;  
        }catch(e){  
            return false;  
        }  
    },  
    yearsText: 'No puedes Sobrepasar de seis a&ntilde;os', //mensaje de error  
}); 

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


Ext.define('actividadesModel', {
    extend: 'Ext.data.Model',
    fields: [
     {name:'idmasivo',type:'int'},
     {name:'idareaxactividad', type:'int'},
     {name:'nombreactividad',type:'string'},
     {name:'idareaa', type:'int'},
     {name:'nombreareas', type:'string'},
     {name:'idtemaxarea', type:'int'},
     {name:'temaxarea',type:'string'},
     {name:'idcargo',type:'int'},
     {name:'responsable', type:'string'},
     {name:'tema',type:'string'},
     {name:'area_en',type:'string'},
     {name:'fechaRevision',type:'string'},
     {name:'fechaini',type:'string'},
     {name:'fechafin',type:'string'},
     {name:'fecharealinicio',type:'string'},
     {name:'fecharealfin',type:'string'},
     {name:'sininiciar', type:'int'},
     {name:'tsininiciar',type:'string'},
     {name:'sinfinalizar', type:'int'},
     {name:'tsinfinalizar',type:'string'},
     {name:'comentario', type:'string'},
     {name:'estado'}
    ],
    
});

Ext.define('actividadModel',{
   extend:'Ext.data.Model',
    fields:[
      {
        name:'idareaxactividad',type:'int'
      },
      {
        name:'nombreactividad',type:'string'
      }      
    ]
});


Ext.define('areas_a_Model',{
   extend:'Ext.data.Model',
    fields:[
      {
        name:'idareaa',type:'int'
      },
      {
        name:'nombreareaa',type:'string'
      }      
    ]
});


Ext.define('temasxareaModel',{
  extend:'Ext.data.Model',
  fields:[
          {
            name:'idtemaxarea',type:'int'
          },
          {
            name:'temaxarea',type:'string'
          }
         ]
});


Ext.define('responsablesModel',{
  extend:'Ext.data.Model',
  fields:[
          {
            name:'idcargo',type:'int'
          },
          {
            name:'responsable',type:'string'
          }
         ]
});


/********************* STORES***************************/

var storeAreasxActividad =  Ext.create('Ext.data.JsonStore', {
        model: 'actividadModel',
    root: 'data', 
        proxy: {
            type: 'ajax',
            url: 'procesos/areasxActividad_json.php',
            reader: {
                type: 'json',
                root:'data'
            }
        }
  });


var storeAreasA =  Ext.create('Ext.data.JsonStore', {
        model: 'areas_a_Model',
    root: 'data', 
        proxy: {
            type: 'ajax',
            url: 'procesos/areasxA_json.php',
            reader: {
                type: 'json',
                root:'data'
            }
        }
  });


var storeTemaxArea=Ext.create('Ext.data.JsonStore',{
    model:'temasxareaModel',
    root:'data',
    proxy:{
       type:'ajax',
       url:'procesos/temasxarea_json.php',
       reader:{
             type:'json',
             root:'data'
       }
    }

});

var storeResponsable=Ext.create('Ext.data.JsonStore',{
    model:'responsablesModel',
    root:'data',
    proxy:{
       type:'ajax',
       url:'procesos/responsables_json.php',
       reader:{
             type:'json',
             root:'data'
       }
    }

});

var storeconocimientos =  Ext.create('Ext.data.JsonStore', {
        model: 'actividadesModel',
     
        proxy: {
            type: 'ajax',
            url: 'procesos/actividades_json.php',
            reader: {
                type: 'json',
                root:'data'
            }
        }
  });

var storehabilidades = Ext.create('Ext.data.JsonStore', {
        model: 'actividadesModel',
    root: 'data', 
        proxy: {
            type: 'ajax',
            url: 'procesos/actividades_json.php',
            reader: {
                type: 'json',
                root:'data'
            }
        }
  });

var storeexperiencia = Ext.create('Ext.data.JsonStore', {
        model: 'actividadesModel',
    root: 'data', 
        proxy: {
            type: 'ajax',
            url: 'procesos/actividades_json.php',
            reader: {
                type: 'json',
                root:'data'
            }
        }
  });

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


var smConocimiento=new Ext.selection.CheckboxModel({
            listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];

                    if(record!=undefined){
                        
                        showFormActividades(0,1,record.get('idmasivo'));
                        var iniciado=record.get('sininiciar');
                        var finalizado=record.get('sinfinalizar');

                        if(iniciado!=0){
                          var iniciado2=Ext.getCmp('sinini');
                          iniciado2.setValue(true);
                        }

                        if(finalizado!=0){
                          var finalizado2=Ext.getCmp('sinfini');
                          finalizado2.setValue(true);                          

                        }
                        
                        Ext.getCmp('formMasivo').getForm().loadRecord(record);
                    }

                }
            }

        });

var smHabilidades=new Ext.selection.CheckboxModel({
            listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];

                    if(record!=undefined){
                        
                        showFormActividades(0,2,record.get('idmasivo'));
                       
                        var iniciado=record.get('sininiciar');
                        var finalizado=record.get('sinfinalizar');

                        if(iniciado!=0){
                          var iniciado2=Ext.getCmp('sinini');
                          iniciado2.setValue(true);
                        }

                        if(finalizado!=0){
                          var finalizado2=Ext.getCmp('sinfini');
                          finalizado2.setValue(true);                          

                        }


                        Ext.getCmp('formMasivo').getForm().loadRecord(record);
                    }

                }
            }

        });


var smExperiencia=new Ext.selection.CheckboxModel({
            listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];

                    if(record!=undefined){
                      
                        showFormActividades(0,3,record.get('idmasivo'));
                       
                        var iniciado=record.get('sininiciar');
                        var finalizado=record.get('sinfinalizar');

                        if(iniciado!=0){
                          var iniciado2=Ext.getCmp('sinini');
                          iniciado2.setValue(true);
                        }

                        if(finalizado!=0){
                          var finalizado2=Ext.getCmp('sinfini');
                          finalizado2.setValue(true);                          

                        }


                        Ext.getCmp('formMasivo').getForm().loadRecord(record);
                    }

                }
            }

        });

/***************************** funciones **********************/
  function showFormActividades(accion,areaid,masivoid){

    storeAreasxActividad.load({params:{area:areaid}});
    storeResponsable.load();

    Ext.define('Ext.ux.FormularioMasivo',{
        extend:'Ext.form.Panel',
        initComponent:function(){
          Ext.apply(this,{
              items:[
                  {
                    xtype:'form',
                    id:'formMasivo',
                    padding:10,
                    layout:{
                            type: 'table',
                            columns: 6, 
                            tdAttrs: {
                                valign: 'middle'
                            }
                          },
                  fieldDefaults: {
                    labelAlign: 'top',
                    labelWidth: 100,
                    labelStyle: 'font-weight:bold'
                    
                    },
                    defaults:{
                            frame:true,
                            border: true,
                            style: 'margin: 5px 5px 5px 5px;'                      
                    },
                  items:[
                         {
                          xtype:'hiddenfield',
                          id:'idmasivo',
                          colspan:6,
                          name:'idmasivo'
                          },
                                   
                         {
                          xtype : 'combo',
                          id : 'idareaxactividad',
                          store :storeAreasxActividad,
                          displayField:'nombreactividad',
                          forceSelection : false,
                          triggerAction : 'all',
                          queryMode:'local',
                          disabled:false,
                          selectOnFocus : false,
                          valueField:'idareaxactividad',
                          hiddenName : 'idareaxactividad',
                          fieldLabel: 'Actividad (*)',
                          width:300,
                          colspan:2,
                          allowBlank: false,
                          emptyText : 'Seleccione una actividad',
                          listeners:{
                            change:function(field,newVal,olVal){
                                          storeAreasA.clearFilter();
                                          //Ext.getCmp('idareaa').clearValue();
                                          storeAreasA.load({params:{idareaxactividad:newVal}});
                                            //Ext.getCmp('area_en').reset();
                                            //Ext.getCmp('tema').reset();
                                            //Ext.getCmp('idtemaxarea').reset();

                                          if(newVal==5||newVal==6){
                                            Ext.getCmp('idtemaxarea').disable();
                                            Ext.getCmp('idtemaxarea').setVisible(false);
                                            Ext.getCmp('area_en').setVisible(true);
                                            if(Ext.getCmp('area_en').isDisabled()){
                                              Ext.getCmp('area_en').setDisabled(false);
                                            }
                                            formActividad.doLayout();
                                          }else if (newVal==4||newVal==3||newVal==1||newVal==2||newVal==8) {
                                            Ext.getCmp('area_en').setVisible(false);
                                            Ext.getCmp('idtemaxarea').setVisible(true);
                                            Ext.getCmp('idtemaxarea').setDisabled(false);
                                            Ext.getCmp('tema').setVisible(false);
                                            Ext.getCmp('idareaa').setVisible(true);
                                            formActividad.doLayout();
                                          }else if(newVal==7||newVal==9||newVal==10){
                                            Ext.getCmp('idareaa').setVisible(false);
                                            Ext.getCmp('tema').setVisible(true);
                                            if(Ext.getCmp('area_en').isVisible()){
                                              Ext.getCmp('area_en').setDisabled(true);
                                            }else{
                                              Ext.getCmp('idtemaxarea').setDisabled(true);
                                            }
                                formActividad.doLayout();
                              }

                            }
                          }
                      
                        },
                                               
                        {
                          xtype: 'textfield',
                          fieldLabel: '<b>Digite su Tema</b>',
                          id: 'tema',
                          name: 'tema',
                          width:200,
                          colspan:2,
                          hidden:true

                        },
                          {
                          xtype : 'combo',
                          id : 'idareaa',
                          store : storeAreasA,
                          displayField:'nombreareaa',
                          forceSelection : false,
                          triggerAction : 'all',
                          queryMode:'local',
                          disabled:false,
                          selectOnFocus : false,
                          valueField:'idareaa',
                          hiddenName : 'idareaa',
                          fieldLabel: 'Area de especialización (*)',
                          width:300,
                          colspan:2,
                          allowBlank:true,
                          emptyText : 'Seleccione una area',
                          listeners:{
                             change:function(field,newVal,oldVal){
                                storeTemaxArea.load({params:{id_area_a:newVal}});
                                //console.log(newVal);

                             }
                          }
                      
                        },
                        {
                          xtype: 'textfield',
                          fieldLabel: '<b>En: </b>',
                          id: 'area_en',
                          name: 'area_en',
                          width:300,
                          hidden:true,
                          colspan:2

                        },                        
                        {
                          xtype : 'combo',
                          id : 'idtemaxarea',
                          store : storeTemaxArea,
                          displayField:'temaxarea',
                          forceSelection : false,
                          triggerAction : 'all',
                          queryMode:'local',
                          disabled:false,
                          selectOnFocus : false,
                          valueField:'idtemaxarea',
                          hiddenName : 'idtemaxarea',
                          fieldLabel: 'Temas asociados (*)',
                          width:300,
                          colspan:2,
                          allowBlank: true,
                          emptyText : 'Seleccione un tema'
                      
                        },
                          {
                          xtype : 'combo',
                          id : 'idcargo',
                          store : storeResponsable,
                          displayField:'responsable',
                          forceSelection : false,
                          triggerAction : 'all',
                          queryMode:'local',
                          disabled:false,
                          selectOnFocus : false,
                          valueField:'idcargo',
                          hiddenName : 'idcargo',
                          fieldLabel: 'Responsable (*)',
                          width:300,
                          colspan:2,
                          allowBlank: false,
                          emptyText : 'Seleccione un responsable'
                      
                        },
                          {
                          xtype:'hiddenfield',
                          colspan:4
                          
                          } 
                          ,
                        {
                          xtype: 'datefield',
                          fieldLabel: '<b>Fecha de Revisi&oacute;n</b>',
                          id: 'fechaRevision',
                          format: 'd/m/Y',
                          value:new Date(),
                          readOnly:true,
                          colspan:2,
                          name: 'fechaRevision',
                          allowBlank: false
                        },
                          {
                          xtype:'hiddenfield',
                          colspan:4
                          
                          }
                          ,
                          {
                        xtype: 'datefield',
                        fieldLabel: '<b>Fecha Programada de Inicio</b>',
                        id: 'fechaini',
                        format: 'd/m/Y',
                        colspan:2,
                        //vtype:'years',
                        name: 'fechaini',
                        allowBlank: false
                         },
                          {
                          xtype:'hiddenfield',
                          colspan:1
                          },
                          {
                          xtype: 'datefield',
                          fieldLabel: '<b>Fecha Programada de Finalizaci&oacute;n</b>',
                          id: 'fechafin',
                          format: 'd/m/Y',
                          colspan:2,
                          vtype:'years',
                          name: 'fechafin',
                          allowBlank: false
                          },
                          {
                          xtype:'hiddenfield',
                          colspan:1,
                          },
                          {
                          xtype: 'datefield',
                          fieldLabel: '<b>Fecha Real de Inicio</b>',
                          id: 'fecharealinicio',
                          format: 'd/m/Y',
                          vtype:'years',
                          name: 'fecharealini',
                          allowBlank: false,
                          colspan:2
                          },
                          {
                                 xtype: 'checkboxfield',
                                 id: 'sinini', 
                                 name: 'sinini',                                
                                 boxLabel: '<b>Sin Iniciar</b>',
                                 inputValue: 'true',
                                 colspan:1,
                                 handler: function(field, value) {
                                  if (value) {
                                    Ext.getCmp('fecharealinicio').disable();
                                    Ext.getCmp('fecharealfin').disable();
                                    Ext.getCmp('sinfini').setValue(true);
                                    Ext.getCmp('sinfini').disable();  
                                  } else {
                                    Ext.getCmp('fecharealfin').enable();
                                    Ext.getCmp('fecharealinicio').enable();
                                    Ext.getCmp('sinfini').setValue(false);
                                    Ext.getCmp('sinfini').enable();
                                  }            
                                }
                          },
                          {
                            xtype: 'datefield',
                            fieldLabel: '<b>Fecha Real de Finalizaci&oacute;n</b>',
                            id: 'fecharealfin',
                            format: 'd/m/Y',
                            vtype:'years',
                            name: 'fecharealfin',
                            allowBlank: false,
                            colspan:2
                          },
                          {
                           xtype: 'checkboxfield',
                           id: 'sinfini',
                           name: 'sinfini',                                
                           boxLabel: '<b>Sin Finalizar</b>',
                           inputValue: 'true',
                           colspan:1,
                           uncheckedValue: 'false',
                           handler: function(field, value) {
                            if (value) {
                              Ext.getCmp('fecharealfin').disable();
                            } else {
                              Ext.getCmp('fecharealfin').enable();
                            }            
                          }
                         },
                         {
                               xtype: 'textareafield',
                              fieldLabel: '<b>Comentario</b>',
                              id: 'comentario',
                              name: 'comentario',
                              width:800,
                              colspan:6,
                              allowBlank: true,

                          } 


                        ]                    

                  }/*fin de form*/

                  ],
           buttons:[
                                        {
                        text:' Registrar ',
                        iconCls: 'icon-OK',
                        handler:function(){ 
                           if(this.up('form').getForm().isValid())
                           {
                              var post_idactividad=Ext.getCmp('idareaxactividad').getValue();
                              var post_idareaEspe=Ext.getCmp('idareaa').getValue();
                              var post_tema=Ext.getCmp('tema').getValue();
                              var post_idtema=Ext.getCmp('idtemaxarea').getValue();
                              var post_areaEspe_en=Ext.getCmp('area_en').getValue();
                              var post_fechaRevision=Ext.util.Format.date(Ext.getCmp('fechaRevision').getValue(),'Y-m-d');
                              var post_fechaPInicio=Ext.util.Format.date(Ext.getCmp('fechaini').getValue(),'Y-m-d');
                              var post_fechaPFinalizacion=Ext.util.Format.date(Ext.getCmp('fechafin').getValue(),'Y-m-d');
                              var post_fechaRInicio=Ext.util.Format.date(Ext.getCmp('fecharealinicio').getValue(),'Y-m-d');
                              var post_checkInicio=Ext.getCmp('sinini').getValue();
                              var post_fechaRFinal=Ext.util.Format.date(Ext.getCmp('fecharealfin').getValue(),'Y-m-d');
                              var post_checkFinal=Ext.getCmp('sinfini').getValue();
                              var post_comentario=Ext.getCmp('comentario').getValue();
                              //var post_opc=Ext.getCmp('opcionseleccionada').getValue();
                              //var post_codempleado=Ext.getCmp('codigoempleado').getValue();
                              var post_idResponsable=Ext.getCmp('idcargo').getValue();
                              var post_competencias=Ext.encode(Ext.getCmp('competencias').getValue());


                              if(post_idareaEspe==null){
                                post_idareaEspe=0;
                              }                              
                              if(post_idtema==null){
                                post_idtema=0;
                              }
                              if(post_fechaRInicio==null){
                                post_fechaRInicio=0;
                              }
                              if(post_fechaRFinal==null){
                                post_fechaRFinal=0;
                              }

                              if(accion!=0){
                                   Ext.Ajax.request({
                                      url:'procesos/guardar_actividadMasiva.php?idactividad='+post_idactividad+'&idEspecializacion='+post_idareaEspe+'&idtema='+post_idtema+'&tema='+post_tema+'&area_en='+post_areaEspe_en+'&fechaRevision='+post_fechaRevision+'&fechaPInicio='+post_fechaPInicio+'&fechaPFinal='+post_fechaPFinalizacion+'&fechaRInicio='+post_fechaRInicio+'&fechaRFinal='+post_fechaRFinal+'&checkI='+post_checkInicio+'&checkF='+post_checkFinal+'&comentario='+post_comentario+'&responsable='+post_idResponsable+'&competencia='+post_competencias,
                                      method:'POST',
                                      success:function(result,request){
                                          var jsonData=JSON.parse(result.responseText);
                                          var bandera=jsonData[0].bandera;
                                          var msj=jsonData[0].msg;

                                            if (bandera==1) {
                                                storeconocimientos.load({params:{idarea:1}});
                                                storehabilidades.load({params:{idarea:2}});
                                                storeexperiencia.load({params:{idarea:3}});

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


                                      },
                                      failure:function(result,request){
                                  Ext.MessageBox.show({
                                                    title:'Subcategoria Duplicada',
                                                    msg:'CONEXION AL SISTEMA SE INTERRUMPIO, RECARGUE LA PAGINA E INTENTE DE NUEVO',
                                                    buttons:Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.WARNING
                                                });                                        
                                      }
                                   });

                              }else{
                                var post_idmasivo=Ext.getCmp('idmasivo').getValue();
                                     Ext.Ajax.request({
                                     url:'procesos/update_actividadMasiva.php?idactividad='+post_idactividad+'&idEspecializacion='+post_idareaEspe+'&idtema='+post_idtema+'&tema='+post_tema+'&area_en='+post_areaEspe_en+'&fechaRevision='+post_fechaRevision+'&fechaPInicio='+post_fechaPInicio+'&fechaPFinal='+post_fechaPFinalizacion+'&fechaRInicio='+post_fechaRInicio+'&fechaRFinal='+post_fechaRFinal+'&checkI='+post_checkInicio+'&checkF='+post_checkFinal+'&comentario='+post_comentario+'&responsable='+post_idResponsable+'&idmasivo='+post_idmasivo+'&competencia='+post_competencias,
                                     method:'POST',
                                           success: function(result,request){
                                 
                                                        var jsonData=JSON.parse(result.responseText);
                                                                             var bandera=jsonData[0].bandera;
                                                                             var msj=jsonData[0].msg;
                                 
                                                                        if (bandera==1) {

                                                                                storeconocimientos.load({params:{idarea:1}});
                                                                                storehabilidades.load({params:{idarea:2}});
                                                                                storeexperiencia.load({params:{idarea:3}});
                                                                                     
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
                                                                                 
                                              } //fin de failure         
                                 
                                 
                                     });//fin de request
                                 
                                



                              }

                        this.up('form').getForm().reset();
                        this.up('window').destroy();                              


                           }else{
                            Ext.Msg.alert('Warning', "Por favor, complete el formulario"); 
                           }


                           }                       
                      },
                      {
                        text:' Cancelar ',
                        iconCls: 'icon-CANCEL',
                        handler:function(){
                            this.up('form').getForm().reset();
                            this.up('window').destroy();
                        }

                    }
 

                    
                    ]


          });/*fin de apply*/
          this.callParent(arguments);
          this.loadCheckboxes(areaid,masivoid);

        }/*fin de init*/
        ,
loadCheckboxes:function(idarea,masivoid){
          
            Ext.Ajax.request({
               url:'procesos/competencias_json.php?id_area='+idarea+'&idactivity='+0+'&masivoid='+masivoid,
               reader:{
                type:'json',
                root:'data'
               },
                success:this.onLoad,
                scope:this
            });
        },
        onLoad:function(response){
          var jsonResponse=Ext.decode(response.responseText);
          if(jsonResponse.success){
        var checkboxGroup={
                  xtype:'checkboxgroup',
                  columns:2,
                  fieldLabel:'Competencias que aplica',
                  labelWidth:200,
                  name:'competencias',
                  id:'competencias',
                  bodyPadding: 10,
                  cls: 'x-check-group-alt',
                  style:{
                    padding:'10px'
                    },  
                    items:[]
               };
               var i, len = jsonResponse.data.length, competencia;
          for(i=0;i<len;i++){
                  competencia=jsonResponse.data[i];
                  checkboxGroup.items.push({
                       xtype:'checkbox',
                       boxLabel:competencia.nombreC,
                       name:'competencias',
                       inputValue:competencia.id_comp,
                       checked:competencia.selected
                      });
                }
                this.add(checkboxGroup);                          

          }
          
        }/*fin de onload*/

    }); 
   
   var formActividad=new Ext.ux.FormularioMasivo();

   var win = Ext.widget('window', {
                title: 'REGISTRO Y MODIFICACION DE ACTIVIDADES',
                closable: false,
                width: 1000,
                height:600,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formActividad
            });
         win.show();




  }/*finde de funcion */



var gridconocimientos = Ext.create('Ext.grid.Panel', {
        store: storeconocimientos,
        stateful: true,
        collapsible: false,
       selModel: smConocimiento,
        multiSelect: true,
        stateId: 'stateGrid',
        hidden:true,
        width:800,
      columns:[
      {
        text:'ID_MASIVO',
        sortable:false,
        dataIndex:'idmasivo',
        hidden:true
      },      
      {
        text:'IDAREAXACTIVIDAD',
        sortable:false,
        dataIndex:'idareaxactividad',
        hidden:true
      },
      {
        text:'<b>ACTIVIDAD</b>',
        sortable:true,
        dataIndex:'nombreactividad',
        flex:1
      },
      {
        text:'IDAREA',
        sortable:false,
        dataIndex:'idareaa',
        hidden:true
      },
      {
        text:'<b>NOMBRE AREA</b>',
        sortable:true,
        dataIndex:'nombreareas',
        flex:1
      },
      {
        text:'IDTEMA',
        sortable:false,
        dataIndex:'idtemaxarea',
        hidden:true
      },
      {
        text:'<b>TEMA</b>',
        sortable:true,
        dataIndex:'temaxarea',
        flex:1
      },
      {
        text:'IDCARGO',
        sortable:false,
        dataIndex:'idcargo',
        hidden:true
      },
      {
        text:'<b>RESPONSABLE</b>',
        sortable:true,
        dataIndex:'responsable',
        flex:1
      },
      {
        text:'<b>TEMA</b>',
        sortable:true,
        dataIndex:'tema',
        flex:1
      },
      {
        text:'<b>AREA EN</b>',
        sortable:true,
        dataIndex:'area_en',
        flex:1
      },
      {
        text:'<b>REVISION</b>',
        sortable:true,
        dataIndex:'fechaRevision',
        flex:1
      },
      {
        text:'<b>FECHA DE INICIO</b>',
        sortable:true,
        dataIndex:'fechaini',
        flex:1
      },
      {
        text:'<b>FECHA FIN</b>',
        sortable:true,
        dataIndex:'fechafin',
        flex:1
      },
      {
        text:'<b>INICIO REAL</b>',
        sortable:true,
        dataIndex:'fecharealinicio',
        flex:1,
        hidden:true
      },
      {
        text:'<b>FINAL REAL</b>',
        sortable:true,
        dataIndex:'fecharealfin',
        flex:1,
        hidden:true
      },
      {
        text:'SIN INICIAR',
        sortable:false,
        dataIndex:'sininiciar',
        hidden:true
      },
      {
        text:'<b>SIN INICIAR</b>',
        sortable:true,
        dataIndex:'tsininiciar',
        flex:1,
        hidden:true
      },
      {
        text:'SIN FINALIZAR',
        sortable:false,
        dataIndex:'sinfinalizar',
        hidden:true
      },
      {
        text:'<b>SIN FINALIZAR</b>',
        sortable:true,
        dataIndex:'tsinfinalizar',
        flex:1,
        hidden:true

      },
      {
        text:'<b>COMENTARIOS</b>',
        sortable:false,
        dataIndex:'comentario',
        flex:1,
        hidden:true
      },
            {
                text     : '<b>ESTADO</b>',
                width    : 75,
                sortable : true,
                dataIndex: 'estado',
        renderer:function(val, meta, record) {
            var color = record.data.estado;
            return '<span style="color:white;background:'+color+';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
              }
            }
            
        ],
        height: 150,
        width: '100%',
        viewConfig: {
            stripeRows: true,
            enableTextSelection: true
        },
    tbar:[
      '->','-',
      {
                xtype: 'button',
                cls: 'contactBtn',
                text: '<b>Agregar</b>',
                iconCls: 'icon-addAct',
                
                handler:function(){
              showFormActividades(1,1,0);
        } 
            },'-',
      {
                xtype: 'button',
                cls: 'contactBtn',
                text: '<b>Borrar</b>',
                iconCls:'icon-delAct',
                
                handler:function(){
            Ext.MessageBox.confirm('Borrado', 'Esta seguro que quiere borrar las actividades  seleccionadas?', function(btn){
              if(btn === 'yes'){
                var selections = gridconocimientos.selModel.getSelection();
                Ext.each(selections,function(record){
                      id = record.get('idmasivo');
                  Ext.Ajax.request({
                                 url:'procesos/eliminar_actividadmasiva.php?id='+id,
                                 method:'POST',
                                 success:function(result,request){
                                                       var jsonData=JSON.parse(result.responseText);
                                                       var bandera=jsonData[0].bandera;
                                                       var msj=jsonData[0].msg;

                                                        if(bandera==1){
                                                storeconocimientos.load({params:{idarea:1}});
                                                storehabilidades.load({params:{idarea:2}});
                                                storeexperiencia.load({params:{idarea:3}});
                                                      
                                                          }
                                                        if (bandera==2||bandera==3) {
                                                                     Ext.MessageBox.show({
                                                                            title:'Sin Exito',
                                                                            msg:msj,
                                                                            buttons:Ext.MessageBox.OK,
                                                                            icon: Ext.MessageBox.WARNING
                                                                        });//fin de msj

                                                                }
                                                              }//fin de success

                                            }); //fin de ajax                      
                  
                });
              }
            });
        } 
            },'-'
    ]
    });


var gridhabilidades = Ext.create('Ext.grid.Panel', {
        store: storehabilidades,
        stateful: true,
        collapsible: false,
        selModel: smHabilidades,
        multiSelect: true,
        stateId: 'stateGrid',
        hidden:true,
      columns:[
      {
        text:'ID_MASIVO',
        sortable:false,
        dataIndex:'idmasivo',
        hidden:true
      },
      {
        text:'IDAREAXACTIVIDAD',
        sortable:false,
        dataIndex:'idareaxactividad',
        hidden:true
      },
      {
        text:'<b>ACTIVIDAD</b>',
        sortable:true,
        dataIndex:'nombreactividad',
        flex:1
      },
      {
        text:'IDAREA',
        sortable:false,
        dataIndex:'idareaa',
        hidden:true
      },
      {
        text:'<b>NOMBRE AREA</b>',
        sortable:true,
        dataIndex:'nombreareas',
        flex:1
      },
      {
        text:'IDTEMA',
        sortable:false,
        dataIndex:'idtemaxarea',
        hidden:true
      },
      {
        text:'<b>TEMA</b>',
        sortable:true,
        dataIndex:'temaxarea',
        flex:1
      },
      {
        text:'IDCARGO',
        sortable:false,
        dataIndex:'idcargo',
        hidden:true
      },
      {
        text:'<b>RESPONSABLE</b>',
        sortable:true,
        dataIndex:'responsable',
        flex:1
      },
      {
        text:'<b>TEMA</b>',
        sortable:true,
        dataIndex:'tema',
        flex:1
      },
      {
        text:'<b>AREA EN</b>',
        sortable:true,
        dataIndex:'area_en',
        flex:1
      },
      {
        text:'<b>REVISION</b>',
        sortable:true,
        dataIndex:'fechaRevision',
        flex:1
      },
      {
        text:'<b>FECHA DE INICIO</b>',
        sortable:true,
        dataIndex:'fechaini',
        flex:1
      },
      {
        text:'<b>FECHA FIN</b>',
        sortable:true,
        dataIndex:'fechafin',
        flex:1
      },
      {
        text:'<b>INICIO REAL</b>',
        sortable:true,
        dataIndex:'fecharealinicio',
        flex:1,
        hidden:true
      },
      {
        text:'<b>FINAL REAL</b>',
        sortable:true,
        dataIndex:'fecharealfin',
        flex:1,
        hidden:true
      },
      {
        text:'SIN INICIAR',
        sortable:false,
        dataIndex:'sininiciar',
        hidden:true
      },
      {
        text:'<b>SIN INICIAR</b>',
        sortable:true,
        dataIndex:'tsininiciar',
        flex:1,
        hidden:true
      },
      {
        text:'SIN FINALIZAR',
        sortable:false,
        dataIndex:'sinfinalizar',
        hidden:true
      },
      {
        text:'<b>SIN FINALIZAR</b>',
        sortable:true,
        dataIndex:'tsinfinalizar',
        flex:1,
        hidden:true

      },
      {
        text:'<b>COMENTARIOS</b>',
        sortable:false,
        dataIndex:'comentario',
        flex:1,
        hidden:true
      },
            {
                text     : '<b>ESTADO</b>',
                width    : 75,
                sortable : true,
                dataIndex: 'estado',
        renderer:function(val, meta, record) {
            var color = record.data.estado;
            return '<span style="color:white;background:'+color+';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
              }
            }
            
        ],
        height: 150,
        width: '100%',
        viewConfig: {
            stripeRows: true,
            enableTextSelection: true
        },
    tbar:[
      '->','-',
      {
                xtype: 'button',
                cls: 'contactBtn',
                text: '<b>Agregar</b>',
                iconCls: 'icon-addAct',
                
                handler:function(){
             showFormActividades(1,2,0);
        } 
            },'-',
      {
                xtype: 'button',
                cls: 'contactBtn',
                text: '<b>Borrar</b>',
                iconCls:'icon-delAct',
                
                handler:function(){
            Ext.MessageBox.confirm('Borrado', 'Esta seguro que quiere borrar los seleccionados?', function(btn){
              if(btn === 'yes'){
                var selections = gridhabilidades.selModel.getSelection();
                Ext.each(selections,function(record){
                      id = record.get('idmasivo');
                  Ext.Ajax.request({
                                 url:'procesos/eliminar_actividadmasiva.php?id='+id,
                                 method:'POST',
                                 success:function(result,request){
                                                       var jsonData=JSON.parse(result.responseText);
                                                       var bandera=jsonData[0].bandera;
                                                       var msj=jsonData[0].msg;

                                                        if(bandera==1){
                                                storeconocimientos.load({params:{idarea:1}});
                                                storehabilidades.load({params:{idarea:2}});
                                                storeexperiencia.load({params:{idarea:3}});                                                      

                                                          }
                                                        if (bandera==2||bandera==3) {
                                                                     Ext.MessageBox.show({
                                                                            title:'Sin Exito',
                                                                            msg:msj,
                                                                            buttons:Ext.MessageBox.OK,
                                                                            icon: Ext.MessageBox.WARNING
                                                                        });//fin de msj

                                                                }
                                                              }//fin de success

                                            }); //fin de ajax                      
                  
                });                
              }
            });
        } 
            },'-'
    ]
    });
  


  var gridExperiencia = Ext.create('Ext.grid.Panel', {
        store: storeexperiencia,
        stateful: true,
        collapsible: false,
        selModel: smExperiencia,
        multiSelect: true,
        stateId: 'stateGrid',
        hidden:true,
        columns: [
      {
        text:'ID_MASIVO',
        sortable:false,
        dataIndex:'idmasivo',
        hidden:true
      },
      {
        text:'IDAREAXACTIVIDAD',
        sortable:false,
        dataIndex:'idareaxactividad',
        hidden:true
      },
      {
        text:'<b>ACTIVIDAD</b>',
        sortable:true,
        dataIndex:'nombreactividad',
        flex:1
      },
      {
        text:'IDAREA',
        sortable:false,
        dataIndex:'idareaa',
        hidden:true
      },
      {
        text:'<b>NOMBRE AREA</b>',
        sortable:true,
        dataIndex:'nombreareas',
        flex:1
      },
      {
        text:'IDTEMA',
        sortable:false,
        dataIndex:'idtemaxarea',
        hidden:true
      },
      {
        text:'<b>TEMA</b>',
        sortable:true,
        dataIndex:'temaxarea',
        flex:1
      },
      {
        text:'IDCARGO',
        sortable:false,
        dataIndex:'idcargo',
        hidden:true
      },
      {
        text:'<b>RESPONSABLE</b>',
        sortable:true,
        dataIndex:'responsable',
        flex:1
      },
      {
        text:'<b>TEMA</b>',
        sortable:true,
        dataIndex:'tema',
        flex:1
      },
      {
        text:'<b>AREA EN</b>',
        sortable:true,
        dataIndex:'area_en',
        flex:1
      },
      {
        text:'<b>REVISION</b>',
        sortable:true,
        dataIndex:'fechaRevision',
        flex:1
      },
      {
        text:'<b>FECHA DE INICIO</b>',
        sortable:true,
        dataIndex:'fechaini',
        flex:1
      },
      {
        text:'<b>FECHA FIN</b>',
        sortable:true,
        dataIndex:'fechafin',
        flex:1
      },
      {
        text:'<b>INICIO REAL</b>',
        sortable:true,
        dataIndex:'fecharealinicio',
        flex:1,
        hidden:true
      },
      {
        text:'<b>FINAL REAL</b>',
        sortable:true,
        dataIndex:'fecharealfin',
        flex:1,
        hidden:true
      },
      {
        text:'SIN INICIAR',
        sortable:false,
        dataIndex:'sininiciar',
        hidden:true
      },
      {
        text:'<b>SIN INICIAR</b>',
        sortable:true,
        dataIndex:'tsininiciar',
        flex:1,
        hidden:true
      },
      {
        text:'SIN FINALIZAR',
        sortable:false,
        dataIndex:'sinfinalizar',
        hidden:true
      },
      {
        text:'<b>SIN FINALIZAR</b>',
        sortable:true,
        dataIndex:'tsinfinalizar',
        flex:1,
        hidden:true

      },
      {
        text:'<b>COMENTARIOS</b>',
        sortable:false,
        dataIndex:'comentario',
        flex:1,
        hidden:true
      },
            {
                text     : '<b>ESTADO</b>',
                width    : 75,
                sortable : true,
                dataIndex: 'estado',
        renderer:function(val, meta, record) {
            var color = record.data.estado;
            return '<span style="color:white;background:'+color+';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
              }
            }
                 
        ],
        height: 150,
        width: '100%',
        viewConfig: {
            stripeRows: true,
            enableTextSelection: true
        },
    tbar:[
      '->','-',
      {
                xtype: 'button',
                cls: 'contactBtn',
                text: '<b>Agregar</b>',
                iconCls: 'icon-addAct',
                handler:function(){
          showFormActividades(1,3,0);
        } 
            },'-',
      {
                xtype: 'button',
                cls: 'contactBtn',
                text: '<b>Borrar</b>',
                iconCls:'icon-delAct',
                handler:function(){
            Ext.MessageBox.confirm('Borrado', 'Esta seguro que quiere borrar los seleccionados?', function(btn){
              if(btn === 'yes'){
                  var selections = gridExperiencia.selModel.getSelection();
                  Ext.each(selections,function(record){
                  id = record.get('idmasivo');
                  Ext.Ajax.request({
                                 url:'procesos/eliminar_actividadmasiva.php?id='+id,
                                 method:'POST',
                                 success:function(result,request){
                                                       var jsonData=JSON.parse(result.responseText);
                                                       var bandera=jsonData[0].bandera;
                                                       var msj=jsonData[0].msg;

                                                        if(bandera==1){
                                                storeconocimientos.load({params:{idarea:1}});
                                                storehabilidades.load({params:{idarea:2}});
                                                storeexperiencia.load({params:{idarea:3}});                                                      
                                                          }
                                                        if (bandera==2||bandera==3) {
                                                                     Ext.MessageBox.show({
                                                                            title:'Sin Exito',
                                                                            msg:msj,
                                                                            buttons:Ext.MessageBox.OK,
                                                                            icon: Ext.MessageBox.WARNING
                                                                        });//fin de msj

                                                                }
                                                              }//fin de success

                                            }); //fin de ajax                      
                  
                });                
              }
            });
        } 
            },'-'
    ]
    });
/*************************************************/

Ext.define('Ext.ux.FormularioTalento',{
  extend:'Ext.form.Panel',
  initComponent:function(){
      Ext.apply(this,{
        //autoScroll:true,
        border:false,
        items:[
           {
                     xtype:'form',
                     //id:'formMatrix',
                     padding:10,
                     
                     defaults:{
                      



                     },
                     items:[
                                                           

                      ]
         }


        ]

      });//fin de aply

      this.callParent(arguments);
      


  }//fin de init
   ,
  setArea: function(area){
    this.loadComponentes(area);
  },
  loadComponentes:function(area){
  Ext.Ajax.request({
          url:'procesos/componentesformularioMasivo_json.php?area_selec='+area,
          reader:{
                    type:'json',
                    root:'data'
                 },
                success:this.onLoad,
                scope:this          
        });                
   
    },
    onLoad:function(response){
     var jsonResponse=Ext.decode(response.responseText);
     if(jsonResponse.success){
        
                   panel=Ext.create('Ext.panel.Panel', {
                                      width: '90%',
                                      border:false,
                                      defaults: {
                                          // applied to each contained panel
                                              frame:false,
                                              height: 25,
                                              border: true,
                                              style: 'margin: 0px 0px 0px 0px;',
                                              colspan:12
                                      },
                                      layout: {
                                      type: 'table',
                                      columns: 12, 
                                      tdAttrs: {
                                        valign: 'middle'
                                      }
                                    }
                                      
                                    });

         var idarea=jsonResponse.area;
         var nombreArea='';
         if(idarea==1){
             nombreArea='CONOCIMIENTO';
         }
         if(idarea==2){
             nombreArea='HABILIDADES/DESTREZAS'
         }
         if(idarea==3){
              nombreArea='EXPERIENCIA';
         }

               panel.add(
              {   
                html:'<CENTER><font style="color:#FFfF;font-family:verdana,arial,sans-serif;font-size:14px;"><b>'+nombreArea+'</b></font></CENTER>',
                colspan:12,
                height: 30,
                width:'100%'
              },
              {
              html:'<font style="color:#FFF;font-family:verdana,arial,sans-serif;font-size:12px;"><b>&nbsp;</b></font>',
                colspan:6,
                height: 20,
                width:'100%'
              },
              {
                html:'<center><font style="font-family:verdana,arial,sans-serif;font-size:12px;"><b># empleados opcion 1</b></font></center>',
                height: 20,
                //width:'100%',
                width:175,
                colspan:2
              },
              {
                html:'<center><font style="font-family:verdana,arial,sans-serif;font-size:12px;"><b># empleados opcion 2</b></font></center>',
                height: 20,
                //width:'100%',
                width:175,
                colspan:2
              },
              {
                html:'<center><font style="font-family:verdana,arial,sans-serif;font-size:12px;"><b># empleados opcion 3</b></font></center>',
                height: 20,
                //width:'100%',
                width:175,
                colspan:2
              } );
/*********************************************************** RENDERIZAR COMPETENCIAS ****************************************/
var len1=jsonResponse.data.length,compConocimiento;
var elementoTempo1;
for (var i = 0; i < len1; i++) {
      compConocimiento=jsonResponse.data[i];
/*proc para calcular el numero de filas que tendra la subcategoria*/
                                var suma=0;
                                var suma2=0;        
                                var height_v=0;              
                                var br='';
                                    for(var j=0;j<len1;j++){
                                      elementoTempo1=jsonResponse.data[j];
                                      suma2=suma2+1;
                                        if(compConocimiento.padreid==elementoTempo1.padreid){
                                           suma=suma+1;
                                           height_v=height_v+30;
                                           br=br+'<br>';
                                           }

                                      }
                                      if(suma==1){
                                        br='';
                                      }
                                  /*************************************************************************/    
   if(i!=0){
     var i_anterior=i-1;
        elementos3=jsonResponse.data[i_anterior];
        /* agregar paneles subcategoria */
            if(compConocimiento.padreid==elementos3.padreid){
              //no renderizar celda de subclasificacion
            }else{
                    //renderizar la subcalsificacion
                    panel.add(
                                   
                       {
                      
                      width: 300,
                      //height:'102%',
                      styleHtmlContent: true,
                      html: '<center><font class="signi"><b>'+br+compConocimiento.subcategoria+'</b></font></center>',
                      collapsible: false,
                      collapsed:false,
                      colspan:4,
                      rowspan:suma,
                      height:height_v,
                          bodyStyle: {
                                      'color': '#04408C',
                                      'background': '#DEE8F5',
                                      'font-size': '12px',
                                      'padding': '3px',
                                      //'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                      


                         }                  
                      );
            }              

   }else{
 panel.add ( 
 {


                width: 300,
                //height:'102%',
                styleHtmlContent: true,
                html: '<center><font class="signi"><b>'+compConocimiento.subcategoria+'</b></font></center>',
                collapsible: false,
                collapsed:false,
                colspan:4,
                rowspan:suma,
                height:height_v,
                  bodyStyle: {
                                      'color': '#04408C',
                                      'background': '#DEE8F5',
                                      'font-size': '12px',
                                      'padding': '3px',
                                     // 'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                          
              } );       

   }

  panel.add(
             {
                //id:''+compConocimiento.idcompetencia,
                //name:'C_'+compConocimiento.idcompetencia,
                width: 500,
                height: 50,
                title: ''+compConocimiento.nombrecompetencia,
                
                collapsible:false,
                collapsed:true,
                colspan:2,
                
             },
             {
                html:'<center><font style="font-family:verdana,arial,sans-serif;font-size:12px;"><b>'+compConocimiento.opcion1+'</b></font></center>',
                colspan:2,
                width:175               
              },
                {
                            
                html:'<center><font style="font-family:verdana,arial,sans-serif;font-size:12px;"><b>'+compConocimiento.opcion2+'</b></font></center>',
                colspan:2,
                width:175
              },
               {
                html:'<center><font style="font-family:verdana,arial,sans-serif;font-size:12px;"><b>'+compConocimiento.opcion3+'</b></font></center>',
                colspan:2,
                width:175
              }                            

             );   

  }/*fin de for conocimiento*/


 
        this.add(panel);





     }/*fin de if de true de jsonresponse*/




    }/* fin de onload**/
    ,
 
   submit_formulario:function(jsonResponse){
      


   }


});


//storeEmpleados.load();


/***     CONTENEDOR   ***/

 var panel_conocimiento=new Ext.Panel({
  id:'panelconocimiento',
  name:'panelconocimiento',
  width:'90%',
  collapsible:false,
  border:false,
    
    items:[
    ]

 });

 var FormularioConocimiento=new Ext.ux.FormularioTalento();
 FormularioConocimiento.setArea(1);
 panel_conocimiento.add(FormularioConocimiento);
 panel_conocimiento.doLayout();
 panel_conocimiento.update(); 
 gridconocimientos.setVisible(true);

var panel_habilidades=new Ext.Panel({
  id:'panelhabilidades',
  name:'panelhabilidades',
  width:'90%',
  collapsible:false,
  border:false,
    
    items:[
    ]
 }); 

 var FormularioHabilidades=new Ext.ux.FormularioTalento();
 FormularioHabilidades.setArea(2);
 panel_habilidades.add(FormularioHabilidades);
 panel_habilidades.doLayout();
 panel_habilidades.update();
 gridhabilidades.setVisible(true);


var panel_experiencia=new Ext.Panel({
  id:'panelexperiencia',
  name:'panelexperiencia',
  width:'90%',
  collapsible:false,
  border:false,
    items:[
    ]
 }); 

var FormularioExperiencia=new Ext.ux.FormularioTalento();
FormularioExperiencia.setArea(3);
panel_experiencia.add(FormularioExperiencia);
panel_experiencia.doLayout();
panel_experiencia.update();
gridExperiencia.setVisible(true);



storeconocimientos.load({params:{idarea:1}});
storehabilidades.load({params:{idarea:2}});
storeexperiencia.load({params:{idarea:3}});

var tabs = Ext.widget({
        xtype: 'form',
        id: 'tabForm',
    renderTo:'interfazFormMasivo',
        width: "100%",
    height:"100%",
        border: false,
        defaults: {
    
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
        border:false,
        defaults:{
          bodyPadding: 10,
        
        },
 defaults: {
                            
                            border: false,
                            
                } ,
        items:[
                    {

                        defaults:{
                        bodyStyle:'padding:0px',
                        bodyStyle:'background:#DFE9F6;',
                           
                        },
                                                 
                        items:[
                                            {
                                              padding:5,
                                              html:'<font style="color:#0000FF;font-family:verdana,arial,sans-serif;font-size:14px;">'+
                                              ' En el presente Formulario usted podra agregar actividades masivamente a un grupo de empleados que poseen brechas en una competencia.<br> las'+
                                              ' columnas (# empleados opcion # ) muestra el numero de empleados que tienen brecha negativa en esa competencia especifica.</font>',
                                              width:'100%',
                                              height:55,
                                              border:false
                                              } ,
                                                                                        
                                            panel_conocimiento,
                                            gridconocimientos,
                                            panel_habilidades,
                                            gridhabilidades,
                                            panel_experiencia,
                                            gridExperiencia
                            
                        
                        
                        ],
tbar:[
            '->','-',
             
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