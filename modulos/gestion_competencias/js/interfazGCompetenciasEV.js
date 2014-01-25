Ext.onReady(function(){
    var winCompetencias;

    //Ext.tip.QuickTipManager.init();
/******************************************** MODEL********************************************************************/
/****************************************************************************************************************/

    Ext.define('areasEV',{
        extend:'Ext.data.Model',
        fields:[
            {
                name:'id_area_ev',type:'int'
            },
            {
                name:'nombreclasificacion',type:'string'
            },
            {
                 name:'descripcionclasificacion',type:'string'
            }
        ],
        idProperty:'company'
    });



    Ext.define('subclasificacion',{
        extend:'Ext.data.Model',
        fields:[
        {
            name:'clasificacion',type:'int'
        },
        {
            name:'nombreclasificacion',type:'string'
        },
        {
            name:'idpadre',type:'int'

        },
        {
            name:'subcategoria',type:'string'
        },
        {
            name:'descripcioncomp', type:'string'
        },'subclasificacionr','excerpt','threadid'
        ],
        idProperty:'company'
    });

/*model de competencias */
    Ext.define('competenciasModel',{
    extend:'Ext.data.Model',
    fields:[
        
        {name:'idpadre',type:'int'},
        {name:'id_competencia',type:'int'},
        {name:'idclasificacion',type:'int'},
        {name:'idarea',type:'int'},
        {name:'tipo',type:'int'},
        {name:'tipocompetencia',type:'string'},
        {name:'area',type:'string'},
        {name:'clasificacion',type:'string'},
        {name:'subcategoria',type:'string'},
        {name:'nombrecompetencia',type:'string'},
        {name:'descripcion',type:'string'}
    ],
    idProperty:'company'

});


    Ext.define('areaModel',{
    extend:'Ext.data.Model',
    fields:[
        {name:'idarea', type:'int'},
        {name:'area',type:'string'}
    ],
    idProperty:'company'
})

    Ext.define('EscalasModel',{
        extend:'Ext.data.Model',
        fields:[
        {name:'idescala',type:'int'},
        {name:'nombreescala',type:'string'},
        {name:'n_after',type:'int'}

        ]
    });

/******************************************** STORES ********************************************************************/
/****************************************************************************************************************/
/*  
  var storeAreas=Ext.create('Ext.data.JsonStore',{
        model:'areaModel',
        proxy:{
               type:'ajax',
               url:'procesos/areas_json.php',
               reader:{
                type:'json',
                root:'data'
               }
        }

    });
*/

 var storeAreas=Ext.create('Ext.data.JsonStore',{
        model:'areaModel',
        proxy:{
               type:'ajax',
               url:'procesos/areas_json.php',
               reader:{
                type:'json',
                root:'data'
               }
        }

    });


    var storeAreasEv=Ext.create('Ext.data.JsonStore',{
        model:'areasEV',
       remoteSort:true,
          proxy:{
                type:'ajax',
                url:'procesos/areasEV.php',
                reader:{
                    type:'json',
                    root:'data'
                }
               
          },
    });
    

    var storeSubclasificacion=Ext.create('Ext.data.JsonStore',{
        //pageSize:1,
        model:'subclasificacion',
        //remoteSort:true,
          proxy:{
                type:'ajax',
                url:'procesos/subclasificacionEV.php',
                reader:{
                    type:'json',
                    root:'data'
                }
               
          },


    });

    /*STORE DE COMPETENCIAS*/

	var storeCompetencias=Ext.create('Ext.data.JsonStore',{
        model:'competenciasModel',
        proxy:{
            type:'ajax',
            url:'procesos/competenciasEV_json.php',
            reader:{
                type:'json',
                root:'data'
            }
        }

});

/******************************************** SEL MODEL********************************************************************/
/****************************************************************************************************************/
    
       var sm = new Ext.selection.CheckboxModel( {
        listeners:{
            selectionchange: function(selectionModel, selected, options){
                // Bunch of code to update store
                    //console.log(selectionModel, selected, options);
                    var record = selected[0];
                //alert(record.get('idactividades'));
                    if (record!=undefined){
                        showFormSubcategoria(0);
                        formSub.getForm().loadRecord(record);
                       
                    }
            }
        }
    });

        var smClasificacion=new Ext.selection.CheckboxModel({
            listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];

                    if(record!=undefined){
                        showFormClasificacion(0);
                        formClasificacion.getForm().loadRecord(record);
                    }

                }
            }

        });
 
  var smCompetencias=new Ext.selection.CheckboxModel({
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];
                    if(record!=undefined){

                        var ventana_PanelFormCompetencia=showformCompetencias(0);
 /*establecer los valores de radio button*/ 
                        var categoria=record.get('tipo');
                        
                         if(categoria==1){
                            var radios = Ext.getCmp("tipo");
                           
                            radios.setValue({tipo:"1"});
                         }
                         if(categoria==2){
                            var radios = Ext.getCmp("tipo");
                           
                            radios.setValue({tipo:"2"});
                         }                        
                                

                        Ext.getCmp('form_competencias').getForm().loadRecord(record);
                        /* obtengo la referencia del objeto del form_competencia y luego llamo su metodo loadcomponenete
                        * en este momento ya se definio el objeto form. por tanto puedo obtener su id_competencia.
                        * porque ya se llamo a loadRecord. 
                        */
                        ventana_PanelFormCompetencia.loadComponentes(0,Ext.getCmp('id_competencia').getValue());
                        

                    }

                }

        }
       });



/******************************************** formularios********************************************************************/
/****************************************************************************************************************/


/*formulario subcategoria*/ 
    function showFormSubcategoria(accion){

	formSub=Ext.widget('form',{
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
                    xtype:'hiddenfield',
                    id:'idpadre',
                    colspan:4,
                    name:'id'
                },{
                    xtype:'textfield',
                    fieldLabel:'NOMBRE DE SUB- CLASIFICACION',
                    id:'subcategoria',
                    name:'subcategoria',
                    width:400,
                    colspan:4,
                    allowBlank:false
                },
                {
                    xtype:'textareafield',
                    fieldLabel:' DESCRIPCION (Max caracteres 600 )',
                    id:'descripcioncomp',
                    name:'descripcioncomp',
                    width:400,
                    colspan:4,
                    allowBlank:false
                },
                 {
                
                    xtype : 'combo',
                    id : 'clasificacion',
                    store : storeAreasEv,
                    displayField:'nombreclasificacion',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'id_area_ev',
                    hiddenName : 'id_area_ev',
                    fieldLabel: 'SELECCIONE UNA CLASIFICACION (*)',
                    width:400,
                    colspan:4,
                    allowBlank: false,
                    emptyText : 'SELECCIONE UNA CLASIFICACION'
                
            }

                ],
                buttons:[{
                    text:' Registrar ',
                    iconCls: 'icon-OK',
                    handler:function(){//enviar datos
                          if (this.up('form').getForm().isValid()) {
                              var post_subclasificacion=Ext.getCmp('subcategoria').getValue();
                              var post_descrip=Ext.getCmp('descripcioncomp').getValue();
                              var post_categoria=Ext.getCmp('clasificacion').getValue();
                                if(accion!=0){//ingresar nueva subcategoria
                                        
                                     Ext.Ajax.request({

                                        url:'procesos/guardar_subclasificacionEV.php?subclasificacion='+post_subclasificacion+'&descrip='+post_descrip+'&clasificacion='+post_categoria,
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
                                                    title:'Subcategoria Duplicada',
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
                                    var id_comp=Ext.getCmp('idpadre').getValue();
                                    
                                      Ext.Ajax.request({

                                        url:'procesos/update_subclasificacionEV.php?subclasificacion='+post_subclasificacion+'&descrip='+post_descrip+'&id='+id_comp+'&clasificacion='+post_categoria,
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
                title: 'REGISTRO Y MODIFICACION DE SUBCATEGORIAS',
                closable: false,
                width: 500,
                height: 325,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formSub
            });
         win.show();


    }// fin de la funcion de formadd


/*********************************************************************************************************************************************************************/

  function showformCompetencias(accion){
    storeAreas.load();  

Ext.define('Ext.ux.PanelFormCompetencia',
{
    extend:'Ext.form.Panel',

    initComponent:function(){
        Ext.apply(this,{

            items:[
                    {
                        xtype:'form',
                        id:'form_competencias',
                        padding:10,
                        border:false,
                        defaults:{
                            anchor:'100%'
                        
                        },
                        items:[
                        {
                            xtype:'hiddenfield',
                            id:'id_competencia',
                            name:'id_competencia'
                            
                        }
                        ,

                         {
                            xtype:'textfield',
                            fieldLabel:'<b>NOMBRE DE COMPETENCIA</b>',
                            labelWidth:200,
                            id:'nombrecompetencia',
                            name:'nombrecompetencia',
                            allowBlank:false
                          }  
                          ,{
                            xtype:'textareafield',
                            fieldLabel:'<b>DESCRIPCION</b>',
                            labelWidth:200,
                            id:'descripcion',
                            name:'descripcion',
                            allowBlank:false
                           },{
                
                                xtype : 'combo',
                                id : 'idpadre',
                                store : storeSubclasificacion,
                                displayField:'subcategoria',
                                forceSelection : false,
                                triggerAction : 'all',
                                queryMode:'local',
                                disabled:false,
                                selectOnFocus : false,
                                valueField:'idpadre',
                                hiddenName : 'idpadre',
                                fieldLabel: '<b>SUB CLASIFICACION (*)</b>',
                                labelWidth:200,
                                width:400,
                                colspan:4,
                                allowBlank: false,
                                emptyText : 'SELECCIONE UNA SUB CLASIFICACION'
                            
                        },
                        {
                                    xtype      : 'radiogroup',
                                    fieldLabel : '<b>TIPO DE COMPETENCIA.</b>',
                                    labelWidth:200,
                                    id:'tipo',
                                    name:'tipo',
                                    allowBlank:false,
                                                      
                                    items:[
                                        {
                                            boxLabel  : 'POTENCIAL',
                                            inputValue: '1',
                                            name:'tipo'
                                           
                                        },
                                        {
                                            boxLabel  : 'DESEMPEÑO',
                                            name:'tipo',
                                            inputValue: '2'
                                            
                                        }
                                    ]
                                   
                            },
                             {
                
                                xtype : 'combo',
                                id : 'idarea',
                                store : storeAreas,
                                displayField:'area',
                                forceSelection : false,
                                triggerAction : 'all',
                                queryMode:'local',
                                disabled:false,
                                selectOnFocus : false,
                                valueField:'idarea',
                                hiddenName : 'idarea',
                                fieldLabel: '<b>SELECCIONE UN AREA (*)</b>',
                                labelWidth:200,
                                width:400,
                                colspan:4,
                                allowBlank: false,
                                emptyText : 'SELECCIONE UN AREA'
                            
                        } 
                        
                           


                        ]
                }//fin del form
        ]//fin de items                        
                        
                        
                            


        });//fin apply

    this.callParent(arguments);
    if(accion==1){/* si ingresa por defecto no se posee id_competencia*/
      Ext.getCmp('id_competencia').setValue(0);
      this.loadComponentes(accion,Ext.getCmp('id_competencia').getValue());
    }

   
    }/* fin de init*/
    ,
    loadComponentes:function(accion,idcompetencia){
        /* funcion que recupera el numero de descripciones por valor que tendra la competencia*/
            Ext.Ajax.request({
                      url:'procesos/valoresxescala_json.php?accion='+accion+'&idcompetencia='+idcompetencia,
                      reader:{
                                type:'json',
                                root:'data'
                             },
                            success:this.onLoad,
                            scope:this          


                    });        

     },
     onLoad: function(response){
        var jsonResponse=Ext.decode(response.responseText);
        var len=jsonResponse.data.length;

            panel=Ext.create('Ext.panel.Panel', {
                                      
                                      autoScroll:true,
                                      defaults: {
                                              frame:false,
                                              height: 25,
                                              border: true,
                                              anchor:'100%',
                                              style: 'margin: 10px 5px 3px 5px;'
                                      },
                                      layout: {
                                      type: 'table',
                                      columns: 2, 
                                      tdAttrs: {
                                        valign: 'middle'
                                      }
                                    }
                                      
                                    }); 
       for(var i=0;i<len;i++){
            valores=jsonResponse.data[i];
                panel.add(/* agregar cada campo al panel*/
                {
                 xtype:'textfield',
                 id:'DV_'+valores.idvalor,
                 name:'DV_'+valores.idvalor,
                 fieldLabel:'<b> Descripcion para valor:'+valores.idvalor+'</b>',
                 value:valores.descripcion,
                 allowBlank:false,
                 width:550,
                 labelWidth:200,
                 colspan:2

                }

                    );




       }//fin de for

       panel.add(
            {
                dockedItems: [
                          {
                              xtype: 'toolbar',
                              dock: 'top',
                              colspan:2,
                              width:'100%',
                              items: [
                                  {
                                      xtype: 'button',
                                      text: '<b>REGISTRAR</b>',
                                      iconCls: 'icon-OK',
                                      handler: function(){
                                        if(Ext.getCmp('form_competencias').up('form').getForm().isValid()){
                                                  
                                                       this.submit_formCompetencia(jsonResponse,accion);  
                                                  
                                                   
                                                   }//fin de verificar formulario             
                                        
                                            else{
                                                    Ext.Msg.alert('Warning', "Por favor, complete el formulario"); 
                                                }
                                      },scope:this
                                                                    
                                  },
                                  '->',
                                  {
                                      xtype: 'button',
                                      text: '<b>CANCELAR</b>',
                                      iconCls: 'icon-CANCEL',
                                      handler:function(){

                                         this.up('form').getForm().reset();
                                         this.up('window').destroy();
                                      }
                                                                             
                                  }
                              ]
                          }
                      ],colspan:4

             }       

                      
                            



        );

       this.add(
        panel);


     }/* fin onload*/
     ,
     submit_formCompetencia:function(jsonResponse,accion){

         var post_nombrecompetencia=Ext.getCmp('nombrecompetencia').getValue();
         var post_descripcion=Ext.getCmp('descripcion').getValue();
         var post_subclasificacion=Ext.getCmp('idpadre').getValue();
         var post_area=Ext.getCmp('idarea').getValue();
         var post_tipocompetencia=Ext.getCmp('tipo').getChecked()[0].getGroupValue();

            var descripcionxvalor=new Array();
            var len=jsonResponse.data.length,elementos;

            for(var i=0;i<len;i++){
                    elementos=jsonResponse.data[i];
                    descripcionxvalor[i]=elementos.idvalor+'_'+Ext.getCmp('DV_'+elementos.idvalor).getValue();
                 var a=Ext.getCmp('DV_'+elementos.idvalor).getValue();
                                if( a==null||a==0){
                                    bandera=false;
                                    
                                }            


            }//fin de for

        var post_descripcionxvalor=Ext.encode(descripcionxvalor);
if(accion==1){
        Ext.Ajax.request({
                                                         url:'procesos/guardar_competenciaEV.php?nombrecompetencia='+post_nombrecompetencia+'&descripcionComp='+post_descripcion+'&subcategoria='+post_subclasificacion+'&area='+post_area+'&tipocomp='+post_tipocompetencia+'&descripcionxvalor='+post_descripcionxvalor,
                                                            method:'POST',
                                                            waitMsg:'Registrando datos',
                                                            success:function(result,request){
                                                                var jsonData=JSON.parse(result.responseText);
                                                                 var bandera=jsonData[0].bandera;
                                                                 var msj=jsonData[0].msg;

                                                                  if (bandera==1) {
                                                                        storeCompetencias.load();
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


                                                        },
                                                    failure: function(result,request){
                                                                  Ext.MessageBox.show({
                                                                        title:'Error de conexion',
                                                                        msg:'CONEXION AL SISTEMA SE INTERRUMPIO, RECARGUE LA PAGINA E INTENTE DE NUEVO',
                                                                        buttons:Ext.MessageBox.OK,
                                                                        icon: Ext.MessageBox.WARNING
                                                                    });
                                                                    
                                                                }                                   

                                                      });
                

   }else{
     /* actualizar*/

     var post_idCompentencia=Ext.getCmp('id_competencia').getValue();


                                
                                Ext.Ajax.request({
                                    url:'procesos/update_competenciaEV.php?nombrecompetencia='+post_nombrecompetencia+'&descripcionComp='+post_descripcion+'&subcategoria='+post_subclasificacion+'&area='+post_area+'&tipocomp='+post_tipocompetencia+'&descripcionxvalor='+post_descripcionxvalor+'&idcompetencia='+post_idCompentencia,
                                    method:'POST',
                                    waitMsg:'Registrando los datos',
                                    success:function(result,request){
                                        var jsonData=JSON.parse(result.responseText);
                                        var bandera=jsonData[0].bandera;
                                        var msj=jsonData[0].msg;

                                        if (bandera==1) {
                                                                storeCompetencias.load();
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

Ext.getCmp('form_competencias').getForm().reset();
                        this.up('window').destroy();       

   
     }



});

var ventana_PanelFormCompetencia=new Ext.ux.PanelFormCompetencia();

    winCompetencias =Ext.widget('window',{
        title:'REGISTRO Y MODIFICACION DE COMPETENCIAS',
        closable:false,
        width:600,
        height:550,
        layout:'fit',
        resizable:true,
        modal:true,
        items:ventana_PanelFormCompetencia

    });

    
    
    winCompetencias.show(); 
    return ventana_PanelFormCompetencia;   
   }//fin de form competencias.


/*********************************************************************************************************************************************************************/

function showFormClasificacion(accion){

    formClasificacion=Ext.widget('form',{
        padding:5,
            defaults: {
            anchor: '100%'
        },
        items:[
        {
            xtype:'fieldset',
            title:'Informacion de la Clasificacion',
            defaultType:'textfield',
            layout:'anchor',
            defaults:{
                  anchor:'85%'
            },
            items:[
                {
                    xtype:'hiddenfield',
                    id:'id_area_ev',
                    name:'id_area_ev'
                },
                {
                      xtype:'textfield',
                      fieldLabel:'NOMBRE DE CLASIFICACION',
                      id:'nombreclasificacion',
                      name:'nombreclasificacion',
                      allowBlank:false
                }
                ,{
                    xtype:'textareafield',
                    fieldLabel:'DESCRIPCION',
                    id:'descripcionclasificacion',
                    name:'descripcionclasificacion',
                    allowBlank:false
                 }
            ]
        }
        ],
        buttons:[
            {
                text:'Registrar',
                iconCls:'icon-OK',
                handler:function(){
                    if(this.up('form').getForm().isValid()){
                            var post_clasificacion=Ext.getCmp('nombreclasificacion').getValue();
                            var post_descripcion=Ext.getCmp('descripcionclasificacion').getValue();


                            if(accion!=0){
                                Ext.Ajax.request({
                                        url:'procesos/guardar_clasificacionEV.php?nombreclasificacion='+post_clasificacion+'&descripcion='+post_descripcion,
                                        method:'POST',
                                        success:function(result,request){
                                            var jsonData=JSON.parse(result.responseText);
                                            var bandera=jsonData[0].bandera;
                                            var msj=jsonData[0].msg;

                                            if (bandera==1) {
                                                storeAreasEv.load();
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


                                        }//fin de succes
                                        ,failure: function(result,request){
                                              Ext.MessageBox.show({
                                                    title:'Subcategoria Duplicada',
                                                    msg:'CONEXION AL SISTEMA SE INTERRUMPIO, RECARGUE LA PAGINA E INTENTE DE NUEVO',
                                                    buttons:Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.WARNING
                                                });
                                                
                                            }

                                });//fin de ajax

                            }else{//ACTUALIZACION DE DATOS.

                                    var post_id_clasificacion=Ext.getCmp('id_area_ev').getValue();

                                    Ext.Ajax.request({
                                        url:'procesos/update_clasificacionEV.php?nombreclasificacion='+post_clasificacion+'&descripcion='+post_descripcion+'&id='+post_id_clasificacion,
                                        method:'POST',
                                        success:function(result,request){
                                            var jsonData=JSON.parse(result.responseText);
                                        var bandera=jsonData[0].bandera;
                                        var msj=jsonData[0].msg;

                                        if (bandera==1) {
                                                                storeAreasEv.load();
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


                                        } //find e success 
                                        ,
                                         failure: function(result,request){
                                              Ext.MessageBox.show({
                                                    title:'Error de sistema',
                                                    msg:'CONEXION AL SISTEMA INTERRUMPIDO, RECARGUE LA PAGINA E INTENTE DE NUEVO',
                                                    buttons:Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.WARNING
                                                });
                                                
                                            }                                      

                                    });//fin de ajax


                            }


                        this.up('form').getForm().reset();
                        this.up('window').destroy();

                    }else{
                        Ext.Msg.alert('Warning', "Por favor, complete el formulario"); 
                    }
                }//fin de handler
            },{
                text:'Cancelar',
                iconCls: 'icon-CANCEL',
                 handler:function(){
                   this.up('form').getForm().reset();
                   this.up('window').destroy();
                 }
            }


        ]


    });

     winClasificacion =Ext.widget('window',{
        title:'REGISTRO Y MODIFICACION DE CLASIFICACION',
        closable:false,
        width:500,
        height:250,
        layout:'fit',
        resizable:true,
        modal:true,
        items:formClasificacion

    });

    
    
    winClasificacion.show();

}//fin de showformclasificacion


 // pluggable renders
    function renderTopic(value, p, record) {
        return Ext.String.format(
            '<b><a href="http://sencha.com/forum/showthread.php?t={2}" target="_blank">{0}</a></b><a href="http://sencha.com/forum/forumdisplay.php?f={3}" target="_blank">{1} Forum</a>',
            value,
            record.data.forumtitle,
            record.getId(),
            record.data.forumid
        );
    }


 function renderLast(value, p, r) {
        return Ext.String.format('{0}<br/>by {1}', r.get('lastposter'));
    }
    var pulginExpanded=true;




storeSubclasificacion.load();
storeAreasEv.load();
storeCompetencias.load();
    
 
/********************************************       DATA GRIDS    ************************************************/
/****************************************************************************************************************/                                                 
 /***************************************** CREO EL GRID  DE SUBCLASIFICACION **********************************/
 var gridSubclasificacion=Ext.create('Ext.grid.Panel',{
 	store:storeSubclasificacion,
 	stateful:true,
 	collapsible:false,
 	selModel:sm,
 	multiSelect:true,
 	stateId:'stateGrid',

 	columns:[
        {
          text:'I_CLASIFICACION',
          sortable:false,
          dataIndex:'clasificacion',
          hidden:true
        },
        {
            text:'<b>CLASIFICACION</b>',
            sortable:true,
            dataIndex:'nombreclasificacion',
            width:300
        }
        ,
 		{
 			text:'ID',
 			 sortable:false,
 			 dataIndex:'idpadre',
 			 hidden:true,
             width:50
 		},{
 			text:'<b>SUB-CLASIFICACION</b>',
 			sortable:true,
 			flex:1,
            width:300,
 			dataIndex:'subcategoria'
 		},{
            text:'<b>DESCRIPCION</b>',
            sortable:true,
            width:800,
            dataIndex:'descripcioncomp'
        }

 	],/*
 	height:'100%',
 	width:'100%',
 	viewConfig: {
            stripeRows: true,
            enableTextSelection: true

        },
        bbar:Ext.create('Ext.PagingToolbar',{
            //store:storeSubclasificacion,
            displayInfo:true,
            displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display",
            items:[
              '-',{
                text:'Show Preview',
                pressed:pulginExpanded,
                enableToggle:true,
                toggleHandler: function(btn, pressed) {
                    var preview = Ext.getCmp('gv').getPlugin('preview');
                    preview.toggleExpanded(pressed);
                }

              }
            ]
        }),*/
        tbar:[
        '->','-',
        {
        	xtype:'button',
        	cls:'contactBtn',
        	text:'Agregar Subcategoria',
        	id:'btnAddSub',
            iconCls: 'icon-addSub',
            handler:function(){
                showFormSubcategoria(1);
            }
        },'-',
        {
            xtype:'button',
            cls:'contactBtn',
            text:'Borrar Subcategoria',
            id:'btnBorrarSub',
            iconCls: 'icon-DelSub',
            handler:function(){
                        Ext.MessageBox.confirm('Borrado','¿Esta seguro de borrar las Sub Categorias seleccionadas?',function(btn){
                            if(btn==='yes'){
                                   var selections=gridSubclasificacion.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('idpadre');
                                        nombre=record.get('subcategoria');
                                            Ext.Ajax.request({
                                                url:'procesos/eliminar_subclasificacion.php?id_comp='+id+'&nombre='+nombre,
                                                method:'POST',
                                                success:function(result,request){
                                                                var jsonData=JSON.parse(result.responseText);
                                                                var bandera=jsonData[0].bandera;
                                                                var msj=jsonData[0].msg;

                                                                if(bandera==1){
                                                                    storeSubclasificacion.loadPage(1);
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
                                   });//fin de each selection

                            }
                            //storeSubclasificacion.loadPage(1);


                        });

                    }
        }

        ]


 });

 /************************************************--- GRID DE COMPETENCIAS ---***********************************************/
    var gridCompetencias = Ext.create('Ext.grid.Panel', {
        store: storeCompetencias,
		stateful: true,
        collapsible: false,
        selModel: smCompetencias,
        multiSelect: true,

        stateId: 'stateGrid',
        columns: [
            
            {
                text:'ID_PADRE',
                sortable:false,
                dataIndex:'idpadre',
                hidden:true

            },
            {
                text: 'ID_COMP',
                sortable:false,
                dataIndex:'id_competencia',
                hidden:true
            },

            {
                text:'idclasificacion',
                sortable:false,
                dataIndex:'idclasificacion',
                hidden:true
            },
            {
                text:'idarea',
                sortable:false,
                dataIndex:'idarea',
                hidden:true
            },
            {       
                text:'tipo',
                sortable:false,
                dataIndex:'tipo',
                hidden:true
            }, 

            {
                text:'<b>TIPO </b>',
                sortable:true,
                dataIndex:'tipocompetencia',
                width:100
            },            

            {
                text:'<b> AREA </b>',
                sortable:true,
                dataIndex:'area',
                width:200
            },            

            {
                text:'<b>CLASIFICACION</b>',
                sortable:true,
                dataIndex:'clasificacion',
                width:200,
                hidden:true

            },
            {
                text:'<b>SUB CLASIFICACION</b>',
                sortable:true,
                dataIndex:'subcategoria',
                width:250
            }
            ,
            {
                text     : '<b>NOMBRE DE LA COMPETENCIA</b>',
                sortable :  true,
                flex:1,
                dataIndex: 'nombrecompetencia',
                width:250

            }
            ,{
                text:'<b>DESCRIPCION</b>',
                sortable: true,
                dataIndex:'descripcion',
                width:500
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
                text: '<b>Agregar Competencia</b>',
                id: 'btnaddCompetencia',
                iconCls: 'icon-addSub',
                handler:function(){
                   showformCompetencias(1);
                }
                
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                text: '<b>Borrar Competencia</b>',
                id: 'btndeleteCompetencia',
                iconCls: 'icon-DelSub',
                handler:function(){

                    Ext.MessageBox.confirm('Borrado','¿Esta seguro de borrar las competencias seleccionadas?',function(btn){
                        if (btn==='yes') {

                                var selections=gridCompetencias.selModel.getSelection();

                                Ext.each(selections,function(record){
                                    id=record.get('id_competencia');
                                    nombre=record.get('nombrecompetencia');

                                    Ext.Ajax.request({
                                        url:'procesos/eliminar_competencia.php?id='+id+'&nombre='+nombre,
                                        method:'POST',
                                        success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                var bandera=jsonData[0].bandera;
                                                var msj=jsonData[0].msg;


                                                if(bandera==1){

                                                    storeCompetencias.load();
                                                }

                                                if (bandera==2||bandera==3) {

                                                                     Ext.MessageBox.show({
                                                                            title:'Competencia no eliminada',
                                                                            msg:msj,
                                                                            buttons:Ext.MessageBox.OK,
                                                                            icon: Ext.MessageBox.WARNING
                                                                        });//fin de msj

                                                                }


                                        }//fin del sucess


                                    });

                                });


                        }


                    });
                    
                }

                
                
            },'-'
        ]
        
    });


/*LLAMA A STORE SUBCLASIFICACION*/ 
//storeCompetencias.load();
//storeSubclasificacion.loadPage(1);

var gridAreasEV=Ext.create('Ext.grid.Panel',
{
store:storeAreasEv,
stateful:true,
collapsible:false,
multiSelect:true,
selModel:smClasificacion,
stateId:'stateGrid',
columns:[
            {
                text:'ID_AREAEV',
                sortable:false,
                dataIndex:'id_area_ev',
                hidden:true
            }
            ,{
                text     : '<b>NOMBRE DE LA CLASIFICACION </b>',
                sortable :  true,
                flex:1,
                dataIndex: 'nombreclasificacion',
                width:125

            },
            {
                text:'<b>DESCRIPCION</b>',
                sortable: true,
                dataIndex:'descripcionclasificacion',
                width:900
            }
],
height:'100%',
width:'100%',
viewConfig: {
            stripeRows: true,
            enableTextSelection: true
        },
        tbar:[
            '->','-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                text: '<b>Agregar Clasificacion.</b>',
                id: 'btnaddAreaEV',
                iconCls: 'icon-addSub',
                handler:function(){
                    showFormClasificacion(1);

                }
                
                
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                text: '<b>Borrar Clasificacion</b>',
                id: 'btndeleteArea',
                iconCls: 'icon-DelSub',
                handler:function(){
                          Ext.MessageBox.confirm('Borrado','¿Esta seguro de borrar las clasificaciones seleccionadas?',function(btn){
                                        if(btn==='yes'){
                                            var selections=gridAreasEV.selModel.getSelection();

                                            Ext.each(selections,function(record){
                                                id=record.get('id_area_ev');
                                                nombre=record.get('nombreclasificacion');

                                                Ext.Ajax.request({
                                                    url:'procesos/eliminar_clasificacionEV.php?id='+id+'&nombre='+nombre,
                                                    method:'POST',
                                                    success:function(result,request){
                                                            
                                                            var jsonData=JSON.parse(result.responseText);
                                                            var bandera=jsonData[0].bandera;
                                                            var msj=jsonData[0].msg;


                                                             if(bandera==1){
                                                                        storeAreasEv.load();
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


                                                });

                                            });

                                        }

                             });
                        }
            },'-'


            ]

});


/*************************************    CREACION DE INTERFAZ         *********************************************/
/*******************************************************************************************************************/
  Ext.define('Ext.ux.FormularioEscalas',{
    extend:'Ext.form.Panel',
    initComponent:function(){
        Ext.apply(this,{
            border:false,
            items:[
            {
               xtype:'form',
               id:'formEscalas',
               border:false,

               items:[
               {
                        padding:5,
                        html:'<font style="color:#0000FF;font-family:verdana,arial,sans-serif;font-size:14px;"> SELECCIONE UNA ESCALA DE EVALUACION </font>',
                        width:'70%',
                        height:30,
                        border:false                
               }


               ]
           }//fin de form


            ],
buttons:[
                 {
                    text:'<b>Registrar</b>',
                    iconCls: 'icon-OK',
                    scale:'large',
                    handler: function(){
                            var post_escala=Ext.getCmp('idescala').getValue();
                                    Ext.Ajax.request({
                                    url:'procesos/guardarEscalaEvaluacion.php?idescala='+post_escala,
                                    method:'POST',
                                          success: function(result,request){
                            
                                                                         var jsonData=JSON.parse(result.responseText);
                                                                        var bandera=jsonData[0].bandera;
                                                                        var msj=jsonData[0].msg;
                            
                                                                   if (bandera==1) {
                                                                                
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
                }
        ]


        });
        this.callParent(arguments);
        this.loadComponentes();

    }//fin del init
    ,
    loadComponentes:function(){
        Ext.Ajax.request({
          url:'procesos/escalas_json.php',
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
  var i, len = jsonResponse.data.length, escalas,n_now;
  escalas=jsonResponse.data[0];
  n_now=escalas.n_now;



 panel=Ext.create('Ext.panel.Panel', {
                                      width: '80%',
                                      
                                      defaults: {
                                          // applied to each contained panel
                                              frame:false,
                                              height: 25,
                                              border: false,
                                              style: 'margin: 5px 3px 5px 5px;'
                                      },
                                      layout: {
                                      type: 'table',
                                      columns: 2, 
                                      tdAttrs: {
                                        valign: 'middle'
                                      }
                                    }
                                      
                                    });

var panel_intermedio=new Ext.Panel({
  id:'panelintermedio',
  name:'panelintermedio',
  width:'100%',
  collapsible:false,
  border:false,
    items:[
    ]

 });    



        panel.add(
 { 
            
                    xtype : 'combo',
                    id : 'idescala',
                                  store:Ext.create('Ext.data.JsonStore',{
                                              model:'EscalasModel',
                                              remoteSort:true,
                                              autoLoad:true,
                                              proxy:{
                                                    type:'ajax',
                                                    url:'procesos/escalas_sistema_json.php',
                                                     reader:{
                                                        type:'json',
                                                        root:'data'
                                                     }

                                                }

                                            }),


                    displayField:'nombreescala',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'idescala',
                    value:escalas.nombreescala,
                    n_after2:'n_after',                               
                    width:300,
                    colspan:2,
                    allowBlank: false,
                    emptyText : 'SELECCIONE',
                    listeners:{
                         /*
                            change: function(field,newval,oldval){
                                 var n_now=3;
                                 var n_after=newval;
                                 //console.log(field.getStore());
                                var store_escalas=field.getStore();
                                var index = Ext.StoreMgr.lookup(store_escalas).findExact('id',newval);
                                var rec = Ext.StoreMgr.lookup(store_escalas).getAt(index);
                                console.log(rec);

                                 panel_intermedio.removeAll(true);
                                    if(n_after<n_now){
                                                    var checkboxGroup={
                                                                      xtype:'checkboxgroup',
                                                                      columns:1,
                                                                      fieldLabel:'Seleccione los valores que deben eliminarse',
                                                                      name:'valores_actuales',
                                                                      id:'valores_actuales',
                                                                      bodyPadding: 10,
                                                                      cls: 'x-check-group-alt',
                                                                      style:{
                                                                        padding:'10px'
                                                                        },  
                                                                        items:[]
                                                                   };                                        

                                                      for(i=1;i<=n_now;i++){
                                            checkboxGroup.items.push({
                                                                   xtype:'checkbox',
                                                                   boxLabel:'Valor '+i,
                                                                   name:'valores_actuales',
                                                                   inputValue:i,
                                                                   checked:false
                                                                  });                                               

                                                        }

                                                            panel_intermedio.add(checkboxGroup);
                                                            panel_intermedio.doLayout();
                                                            panel_intermedio.update();

                                    }

                            },scope:this
                            */

                    }
                    

              }                
            )   ;  

       this.add(panel);
       this.add(panel_intermedio);
                 

    }



  });


  var FormularioEscalasPanel=new Ext.ux.FormularioEscalas();

		var tabs = Ext.widget({
        xtype: 'form',
        id: 'tabForm',
		renderTo:'interfazGestionC',
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
				activeTab: 3,
				defaults:{
					bodyPadding: 10,
					layout: 'anchor'
				},
				items:[
                    {
                    title:'SISTEMA DE ESCALAS DE PONDERACIONES',
                    tabConfig:{
                    cls: 'x-btn-text-icon',
                    iconCls: 'icon-subcategoria'
                    },
                        defaults:{
                        bodyStyle:'padding:0px',
                            anchor: '50%',
                            bodyStyle:'background:#DFE9F6;'
                        
                        },
                        items:[
                             FormularioEscalasPanel
                        
                        
                        ]
                    
                    },                

					 
					{
                    title:'GESTION DE CLASIFICACION',
                    tabConfig:{
                    cls: 'x-btn-text-icon',
                    iconCls: 'icon-subcategoria'
                    },
                        defaults:{
                        bodyStyle:'padding:0px',
                            anchor: '100%',
                            bodyStyle:'background:#DFE9F6;'
                        
                        },
                        items:[{
                        height:400,
                        items:[gridAreasEV]
                        }
                        
                        ]
                    
                    }
                    ,
					{
					title:'GESTION DE SUB-CLASIFICACION',
					tabConfig:{
					cls: 'x-btn-text-icon',
					iconCls: 'icon-subcategoria'
					},
					    defaults:{
						bodyStyle:'padding:0px',
							anchor: '100%',
							bodyStyle:'background:#DFE9F6;'
						
						},
						items:[{
						height:400,
                        items:[gridSubclasificacion]
						}
						
						]
					
					},/*fin de subclasificacion*/
				
					 {
						title:'GESTION DE COMPETENCIAS',
						tabConfig:{
					cls: 'x-btn-text-icon',
					iconCls: 'icon-competencias'
					},
						defaults: {
							bodyStyle:'padding:0px',
							anchor: '100%',
							bodyStyle:'background:#DFE9F6;'
						 },
						 items:[
							 	{
									
									//height: 600,
									items:[gridCompetencias]
								}
						      ]
					 }/*fin de competencias*/
					 
					 
					 

					  ]//fin itemm tabpanel
         }//fin compo  tabpanel
			
			]

	});

	


});//terminacion onReady










