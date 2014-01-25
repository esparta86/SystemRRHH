
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
     {name:'idactividad',type:'int'},
     {name:'idopciones', type:'int'},
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
     {name:'masivo', type:'string'},
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
                   var masiva=record.get('masivo');
                        showFormActividades(0,1);
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
                if(masiva=='SI'){
                                Ext.getCmp('simasivo').setVisible(true);                                  
                                }                        

                        formActividad.getForm().loadRecord(record);
                    }

                }
            }

        });

var smHabilidades=new Ext.selection.CheckboxModel({
            listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];

                    if(record!=undefined){
                        showFormActividades(0,2);
                       
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


                        formActividad.getForm().loadRecord(record);
                    }

                }
            }

        });


var smExperiencia=new Ext.selection.CheckboxModel({
            listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];

                    if(record!=undefined){
                        showFormActividades(0,3);
                       
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


                        formActividad.getForm().loadRecord(record);
                    }

                }
            }

        });



/***************************** funciones **********************/
  function showFormActividades(accion,areaid){

    storeAreasxActividad.load({params:{area:areaid}});
    storeResponsable.load();

    
   
    formActividad=Ext.widget('form',{
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
                          , {
                          xtype:'hiddenfield',
                          id:'idactividad',
                          colspan:6,
                          name:'idactividad'
                          },
                        {
                          xtype:'hiddenfield',
                          id:'idopciones',
                          colspan:6,
                          name:'idopciones'
                          } ,{
                            xtype:'label',
                            id:'simasivo',
                            name:'simasivo',
                            html:'<b>Esta actividad pertence a una actividad masiva. si desea modificar la actividad masiva, vaya al formulario de actividades masivas<br> si realiza cambios aqui la actividad sera modificada y ya no sera una actividad masiva</b>',
                            colspan:6,
                            hidden:true
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
                              var post_opc=Ext.getCmp('opcionseleccionada').getValue();
                              var post_codempleado=Ext.getCmp('codigoempleado').getValue();
                              var post_idResponsable=Ext.getCmp('idcargo').getValue();

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
                                      url:'procesos/guardar_actividad.php?idactividad='+post_idactividad+'&idEspecializacion='+post_idareaEspe+'&idtema='+post_idtema+'&tema='+post_tema+'&area_en='+post_areaEspe_en+'&fechaRevision='+post_fechaRevision+'&fechaPInicio='+post_fechaPInicio+'&fechaPFinal='+post_fechaPFinalizacion+'&fechaRInicio='+post_fechaRInicio+'&fechaRFinal='+post_fechaRFinal+'&checkI='+post_checkInicio+'&checkF='+post_checkFinal+'&comentario='+post_comentario+'&opc='+post_opc+'&codigoemp='+post_codempleado+'&responsable='+post_idResponsable,
                                      method:'POST',
                                      success:function(result,request){
                                          var jsonData=JSON.parse(result.responseText);
                                          var bandera=jsonData[0].bandera;
                                          var msj=jsonData[0].msg;

                                            if (bandera==1) {
                                                storeconocimientos.load({params:{codempleado:post_codempleado,opc:post_opc,idarea:1}});
                                                storehabilidades.load({params:{codempleado:post_codempleado,opc:post_opc,idarea:2}});
                                                storeexperiencia.load({params:{codempleado:post_codempleado,opc:post_opc,idarea:3}});

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

                              }else{/*actualizacion*/
                                var post_idactividadT=Ext.getCmp('idactividad').getValue();
                                var post_idopciones=Ext.getCmp('idopciones').getValue();

                                     Ext.Ajax.request({
                                     url:'procesos/update_actividad.php?idactividad='+post_idactividad+'&idEspecializacion='+post_idareaEspe+'&idtema='+post_idtema+'&tema='+post_tema+'&area_en='+post_areaEspe_en+'&fechaRevision='+post_fechaRevision+'&fechaPInicio='+post_fechaPInicio+'&fechaPFinal='+post_fechaPFinalizacion+'&fechaRInicio='+post_fechaRInicio+'&fechaRFinal='+post_fechaRFinal+'&checkI='+post_checkInicio+'&checkF='+post_checkFinal+'&comentario='+post_comentario+'&opc='+post_opc+'&codigoemp='+post_codempleado+'&responsable='+post_idResponsable+'&idactividadT='+post_idactividadT+'&idopcion='+post_idopciones,
                                     method:'POST',
                                           success: function(result,request){
                                 
                                                        var jsonData=JSON.parse(result.responseText);
                                                                             var bandera=jsonData[0].bandera;
                                                                             var msj=jsonData[0].msg;
                                 
                                                                        if (bandera==1) {

                                                storeconocimientos.load({params:{codempleado:post_codempleado,opc:post_opc,idarea:1}});
                                                storehabilidades.load({params:{codempleado:post_codempleado,opc:post_opc,idarea:2}});
                                                storeexperiencia.load({params:{codempleado:post_codempleado,opc:post_opc,idarea:3}});

                                                                                     
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




    });
  
          var win = Ext.widget('window', {
                title: 'REGISTRO Y MODIFICACION DE ACTIVIDADES',
                closable: false,
                width: 1000,
                height:500,
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
        text:'ID_ACTIVIDAD',
        sortable:false,
        dataIndex:'idactividad',
        hidden:true
      },
      {
        text:'ID_OPCION',
        sortable:false,
        dataIndex:'idopciones',
        hidden:true
      },
      {
        text:'IDAREAXACTIVIDAD',
        sortable:false,
        dataIndex:'idareaxactividad',
        hidden:true
      },
      {
        text:'<b>MASIVA</b>',
        sortable:true,
        dataIndex:'masivo',
        width:75
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
              showFormActividades(1,1);
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
                      id = record.get('idactividad');
                  Ext.Ajax.request({
                                 url:'procesos/eliminar_actividad.php?id='+id,
                                 method:'POST',
                                 success:function(result,request){
                                                       var jsonData=JSON.parse(result.responseText);
                                                       var bandera=jsonData[0].bandera;
                                                       var msj=jsonData[0].msg;

                                                        if(bandera==1){
                                                      var opcion=Ext.getCmp('opcionseleccionada').getValue();
                                                      var codempleado=Ext.getCmp('codigoempleado').getValue();                                                
                                                      storeconocimientos.load({params:{codempleado:codempleado,opc:opcion,idarea:1}});
                                                      storehabilidades.load({params:{codempleado:codempleado,opc:opcion,idarea:2}});
                                                      storeexperiencia.load({params:{codempleado:codempleado,opc:opcion,idarea:3}});
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
        text:'ID_ACTIVIDAD',
        sortable:false,
        dataIndex:'idactividad',
        hidden:true
      },
      {
        text:'ID_OPCION',
        sortable:false,
        dataIndex:'idopciones',
        hidden:true
      },
      {
        text:'IDAREAXACTIVIDAD',
        sortable:false,
        dataIndex:'idareaxactividad',
        hidden:true
      },
      {
        text:'<b>MASIVA</b>',
        sortable:true,
        dataIndex:'masivo',
        width:75
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
             showFormActividades(1,2);
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
                      id = record.get('idactividad');
                  Ext.Ajax.request({
                                 url:'procesos/eliminar_actividad.php?id='+id,
                                 method:'POST',
                                 success:function(result,request){
                                                       var jsonData=JSON.parse(result.responseText);
                                                       var bandera=jsonData[0].bandera;
                                                       var msj=jsonData[0].msg;

                                                        if(bandera==1){
                                                      var opcion=Ext.getCmp('opcionseleccionada').getValue();
                                                      var codempleado=Ext.getCmp('codigoempleado').getValue();                                                
                                                      storeconocimientos.load({params:{codempleado:codempleado,opc:opcion,idarea:1}});
                                                      storehabilidades.load({params:{codempleado:codempleado,opc:opcion,idarea:2}});
                                                      storeexperiencia.load({params:{codempleado:codempleado,opc:opcion,idarea:3}});
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
        text:'ID_ACTIVIDAD',
        sortable:false,
        dataIndex:'idactividad',
        hidden:true
      },
      {
        text:'ID_OPCION',
        sortable:false,
        dataIndex:'idopciones',
        hidden:true
      },
      {
        text:'IDAREAXACTIVIDAD',
        sortable:false,
        dataIndex:'idareaxactividad',
        hidden:true
      },
      {
        text:'<b>MASIVA</b>',
        sortable:true,
        dataIndex:'masivo',
        width:75
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
          showFormActividades(1,3);
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
                  id = record.get('idactividad');
                  Ext.Ajax.request({
                                 url:'procesos/eliminar_actividad.php?id='+id,
                                 method:'POST',
                                 success:function(result,request){
                                                       var jsonData=JSON.parse(result.responseText);
                                                       var bandera=jsonData[0].bandera;
                                                       var msj=jsonData[0].msg;

                                                        if(bandera==1){
                                                      var opcion=Ext.getCmp('opcionseleccionada').getValue();
                                                      var codempleado=Ext.getCmp('codigoempleado').getValue();                                                
                                                      storeconocimientos.load({params:{codempleado:codempleado,opc:opcion,idarea:1}});
                                                      storehabilidades.load({params:{codempleado:codempleado,opc:opcion,idarea:2}});
                                                      storeexperiencia.load({params:{codempleado:codempleado,opc:opcion,idarea:3}});
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
                     //items:[
                       /* {
                        padding:5,
                        html:'<font style="color:#0000FF;font-family:verdana,arial,sans-serif;font-size:14px;">'+
                        ' En el presente Formulario usted completará información específica sobre conocimientos, competencias y experiencias que el empleado requiere, como parte del proceso de Plan de Sucesión y Carrera. Todos los campos deben ser llenados para poder procesar correctamente la información. </font>',
                        width:'70%',
                        height:75,
                        border:false
                        },*/

                                     

                      //]
         }


        ]

      });//fin de aply

      this.callParent(arguments);
      //this.loadComponentes();


  }//fin de init
  ,
  set_infoempleado: function(codigoempleado,opcion,idcargo_opcion,area){
        this.loadComponentes(codigoempleado,opcion,idcargo_opcion,area);
        
  }
  ,
  loadComponentes:function(codigoempleado,opcion,idcargo_opcion,area){
    //console.log('empleado: '+codigoempleado+' opcion '+idcargo_opcion);
      
  Ext.Ajax.request({
          url:'procesos/componentesformulario_json.php?empleado='+codigoempleado+'&idcargopc='+idcargo_opcion+'&opcion='+opcion+'&area_selec='+area,
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
                html:'<center><font style="font-family:verdana,arial,sans-serif;font-size:12px;"><b>I (Nivel Real)</b></font></center>',
                height: 20,
                width:'100%',
                colspan:2
              },
              {
                html:'<center><font style="font-family:verdana,arial,sans-serif;font-size:12px;"><b>D (Deseable)</b></font></center>',
                height: 20,
                width:'100%',
                colspan:2
              },
              {
                html:'<center><font style="font-family:verdana,arial,sans-serif;font-size:12px;"><b>B (Brecha)</b></font></center>',
                height: 20,
                width:'100%',
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
                html:'<center><font style="font-family:verdana,arial,sans-serif;font-size:12px;"><b>'+compConocimiento.real+'</b></font></center>',
                colspan:2,
                width:100               
              },
                {
                            
                html:'<center><font style="font-family:verdana,arial,sans-serif;font-size:12px;"><b>'+compConocimiento.deseado+'</b></font></center>',
                colspan:2,
                width:100
              },
               {
                html:'<center><font style="font-family:verdana,arial,sans-serif;font-size:12px;"><b>'+compConocimiento.brecha+'</b></font></center>',
                colspan:2,
                width:100
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


storeEmpleados.load();


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

var panel_habilidades=new Ext.Panel({
  id:'panelhabilidades',
  name:'panelhabilidades',
  width:'90%',
  collapsible:false,
  border:false,
    
    items:[
    ]

 }); 

var panel_experiencia=new Ext.Panel({
  id:'panelexperiencia',
  name:'panelexperiencia',
  width:'90%',
  collapsible:false,
  border:false,
    
    items:[
    ]

 }); 



var tabs = Ext.widget({
        xtype: 'form',
        id: 'tabForm',
    renderTo:'interfazFormTalento',
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
                                                  colspan: 4,
                                                  
                                                  selectOnFocus : false
                                                },
                                                {
                                                      xtype:'button',
                                                      text:'<b>Analizar</b>',
                                                      colspan:2,
                                                      iconCls:'icon-analyse',
                                                      width:150,
                                                      handler:function(){
                                                             //panel_medio.remove(gridconocimientos,true);
                                                             panel_conocimiento.removeAll(true,true);
                                                             gridconocimientos.setVisible(false);
                                                             gridhabilidades.setVisible(false);
                                                             gridExperiencia.setVisible(false);

                                                             var FormularioConocimiento=new Ext.ux.FormularioTalento();
                                                             var empleado=Ext.getCmp('codigoempleado').getValue();
                                                             var codOpcion1=Ext.getCmp('opcion1').getValue();
                                                             FormularioConocimiento.set_infoempleado(empleado,1,codOpcion1,1);
                                                             panel_conocimiento.add(FormularioConocimiento);
                                                             panel_conocimiento.doLayout();
                                                             panel_conocimiento.update();
                                                             gridconocimientos.setVisible(true);

                                                            panel_habilidades.removeAll(true,true);
                                                            var FormularioHabilidad=new Ext.ux.FormularioTalento();
                                                             FormularioHabilidad.set_infoempleado(empleado,1,codOpcion1,2);
                                                             panel_habilidades.add(FormularioHabilidad);
                                                             panel_habilidades.doLayout();
                                                             panel_habilidades.update();
                                                             gridhabilidades.setVisible(true);

                                                             panel_experiencia.removeAll(true,true);
                                                             var FormularioExperiencia=new Ext.ux.FormularioTalento();
                                                             FormularioExperiencia.set_infoempleado(empleado,1,codOpcion1,3);
                                                             panel_experiencia.add(FormularioExperiencia);
                                                             panel_experiencia.doLayout();
                                                             panel_experiencia.update();
                                                             gridExperiencia.setVisible(true);

                                                             Ext.getCmp('nameOpcion').setText('SE SELECCIONO :OPCION 1');
                                                             Ext.getCmp('opcionseleccionada').setValue(1);

                                                             
                                                             storeconocimientos.load({params:{codempleado:empleado,opc:1,idarea:1}});
                                                             storehabilidades.load({params:{codempleado:empleado,opc:1,idarea:2}});
                                                             storeexperiencia.load({params:{codempleado:empleado,opc:1,idarea:3}});

                                                             




                                                             /*gridhabilidades.setVisible(false);*/

                                                         
                                                      }

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
                                                  colspan: 4,

                                                  selectOnFocus : false
                                                }  , 
                                                  {
                                                      xtype:'button',
                                                      text:'<b>Analizar</b>',
                                                      colspan:2,
                                                      width:150,
                                                      iconCls:'icon-analyse',
                                                      handler:function(){
                                                            panel_conocimiento.removeAll(true,true);
                                                             gridconocimientos.setVisible(false);
                                                             gridhabilidades.setVisible(false);
                                                             gridExperiencia.setVisible(false);

                                                             var FormularioConocimiento=new Ext.ux.FormularioTalento();
                                                             var empleado=Ext.getCmp('codigoempleado').getValue();
                                                             var codOpcion2=Ext.getCmp('opcion2').getValue();
                                                             FormularioConocimiento.set_infoempleado(empleado,2,codOpcion2,1);
                                                             panel_conocimiento.add(FormularioConocimiento);
                                                             panel_conocimiento.doLayout();
                                                             panel_conocimiento.update();
                                                             gridconocimientos.setVisible(true);

                                                            panel_habilidades.removeAll(true,true);
                                                            var FormularioHabilidad=new Ext.ux.FormularioTalento();
                                                             FormularioHabilidad.set_infoempleado(empleado,2,codOpcion2,2);
                                                             panel_habilidades.add(FormularioHabilidad);
                                                             panel_habilidades.doLayout();
                                                             panel_habilidades.update();
                                                             gridhabilidades.setVisible(true);

                                                            panel_experiencia.removeAll(true,true);
                                                             var FormularioExperiencia=new Ext.ux.FormularioTalento();
                                                             FormularioExperiencia.set_infoempleado(empleado,1,codOpcion2,3);
                                                             panel_experiencia.add(FormularioExperiencia);
                                                             panel_experiencia.doLayout();
                                                             panel_experiencia.update();
                                                             gridExperiencia.setVisible(true);  

                                                             Ext.getCmp('nameOpcion').setText('SE SELECCIONO :OPCION 2');
                                                             Ext.getCmp('opcionseleccionada').setValue(2);  

                                                             storeconocimientos.load({params:{codempleado:empleado,opc:2,idarea:1}});
                                                             storehabilidades.load({params:{codempleado:empleado,opc:2,idarea:2}});
                                                             storeexperiencia.load({params:{codempleado:empleado,opc:2,idarea:3}});

                                                                                                                   
                                                         
                                                      }

                                                     },                                               
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
                                                  colspan: 4,
                                                  selectOnFocus : false
                                                } , 
                                                  {
                                                      xtype:'button',
                                                      text:'<b>Analizar</b>',
                                                      colspan:2,
                                                      width:150,
                                                      iconCls:'icon-analyse',
                                                      
                                                      handler:function(){

                                                             panel_conocimiento.removeAll(true,true);
                                                             gridconocimientos.setVisible(false);
                                                             gridhabilidades.setVisible(false);
                                                             gridExperiencia.setVisible(false);

                                                             var FormularioConocimiento=new Ext.ux.FormularioTalento();
                                                             var empleado=Ext.getCmp('codigoempleado').getValue();
                                                             var codOpcion3=Ext.getCmp('opcion3').getValue();
                                                             FormularioConocimiento.set_infoempleado(empleado,3,codOpcion3,1);
                                                             panel_conocimiento.add(FormularioConocimiento);
                                                             panel_conocimiento.doLayout();
                                                             panel_conocimiento.update();
                                                             gridconocimientos.setVisible(true);

                                                            panel_habilidades.removeAll(true,true);
                                                            var FormularioHabilidad=new Ext.ux.FormularioTalento();
                                                             FormularioHabilidad.set_infoempleado(empleado,3,codOpcion3,2);
                                                             panel_habilidades.add(FormularioHabilidad);
                                                             panel_habilidades.doLayout();
                                                             panel_habilidades.update();
                                                             gridhabilidades.setVisible(true);

                                                            panel_experiencia.removeAll(true,true);
                                                             var FormularioExperiencia=new Ext.ux.FormularioTalento();
                                                             FormularioExperiencia.set_infoempleado(empleado,3,codOpcion3,3);
                                                             panel_experiencia.add(FormularioExperiencia);
                                                             panel_experiencia.doLayout();
                                                             panel_experiencia.update();
                                                             gridExperiencia.setVisible(true);  

                                                             Ext.getCmp('nameOpcion').setText('SE SELECCIONO :OPCION 3');
                                                             Ext.getCmp('opcionseleccionada').setValue(3);   

                                                             storeconocimientos.load({params:{codempleado:empleado,opc:3,idarea:1}});
                                                             storehabilidades.load({params:{codempleado:empleado,opc:3,idarea:2}});
                                                             storeexperiencia.load({params:{codempleado:empleado,opc:3,idarea:3}});

                                                         
                                                      }

                                                   },
                                                   {
                                                    xtype:'hiddenfield',
                                                    id:'opcionseleccionada',
                                                    name:'opcionseleccionada'
                                                   },
                                                    {
                                                      xtype:'label',
                                                      id:'nameOpcion',
                                                      name:'nameOpcion',
                                                      
                                                    },                                                   
                                                                                        
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