
Ext.onReady(function(){

/**************************** MODEL ******************************************/

Ext.define('Jefes_Model',{
extend:'Ext.data.Model',
  fields:[
      {name:'codigoempleado',type:'string'},
      {name:'nombreempleado',type:'string'}
  ],
  idProperty:'company'

});

Ext.define('colaboradoresModel',{
  extend:'Ext.data.Model',
  fields:[
   {name:'codigoempleado',type:'string'},
   {name:'nombrecolaborador',type:'string'},
   {name:'apellidoscolaborador',type:'string'},
   {name:'cargoactual',type:'string'}
  ],
  idProperty:'company'


});

   Ext.define('departamentoModel',{
    extend:'Ext.data.Model',
    fields:[
        {
            name:'id_dpto',type:'int'
        },
        {
            name:'departamento', type:'string'
        }
    ],
    idProperty:'company'

  });


   Ext.define('empleadosModel',{
     extend:'Ext.data.Model',

     fields:[
     {
      name:'codigo_empleado',type:'string'
     },
     {
      name:'nombre_empleado',type:'string'
     }
     ],
     idProperty:'company'

   });





/**************************** STORES ******************************************/

var storeDepto=Ext.create('Ext.data.JsonStore',{
      model:'departamentoModel',
       remoteSort:true,
          proxy:{
                type:'ajax',
                url:'procesos/departamentos_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
          }
});

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

var storeJefes=Ext.create('Ext.data.JsonStore',{
  model:'Jefes_Model',
  remoteSort:true,
      proxy:{
            type:'ajax',
            url:'procesos/jefes_json.php',
            reader:{
               type:'json',
               root:'data'
            }
      }
});




var storeColaboradores=Ext.create('Ext.data.JsonStore',{
  model:'colaboradoresModel',
  remoteSort:true,
     proxy:{
                type:'ajax',
                url:'procesos/colaboradores_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
               
          }
});


/*************************************** sm ***************************************************************************/

/************************************* sm ..             ***************************************/    
var smUsuario=new Ext.selection.CheckboxModel({
  mode:'SINGLE',
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];    
            if(record!=undefined){
                      
                   // alert('empleadoseleccionado: '+record.get('codigoempleado')+'/ jefe '+Ext.getCmp('dataempresa').getValue());
                   showUsuariosForm(0,record.get('codigoempleado'),Ext.getCmp('dataempresa').getValue());  
                    var nombreselect='Se selecciono :'+record.get('apellidoscolaborador')+', '+record.get('nombrecolaborador');
                    Ext.getCmp('nombrec').setValue(nombreselect);
                   
                    Ext.getCmp('formEvaluadores').getForm().loadRecord(record);

                     
                        
                        
                        }
                    
                    
                    }
               }
               }); //fin del sm


/************************************ LLAMADAS A STORES PRINCIPALES ****************************************************/
//storeEmpresas.load();
//storeProcesosE.load({params:{idempre:0}});
storeColaboradores.load({params:{jefeselect:"0"}});
storeJefes.load();




/*********************** FORMULARIOS **********************************/
 
 function showUsuariosForm(accion,codigoEvaluado,codigoSuperior){
  storeDepto.load();

  Ext.define('Ext.ux.MessagePanel',{
      extend:'Ext.form.Panel',

      initComponent:function(){
            Ext.apply(this,{
              autoScroll :true,
              items:[
                {
                     xtype:'form',
                     id:'formEvaluadores',
                     padding:10,
                     defaults:{
                      anchor:'90%'
                     },
                     items:[
                        {padding:5,
                        html:'<font style="color:#FFFF;font-family:verdana,arial,sans-serif;font-size:12px;"><b>EN ESTA SECCION: </b>'+
                        'Ud. definira  en la <b>parte I:</b> SI existe un evaluador externo, <b>parte II:</b> los compañeros del empleado que seran evaluadores de este ,<b> parte III:</b> los compañeros que seran evaluados por el empleado '+
                        '</font>',
                        width:'100%',
                        height:50,
                        border:false

                      },
                      {
                                    xtype:'hiddenfield',
                                    id:'codigoempleado',
                                    name:'codigoempleado'
                                    

                      },

                      {
                        xtype:'textfield',
                        id:'nombrec',
                        name:'nombrec',
                        text:'',
                        width:'30%',
                        disabled:true

                       } ,
                       {padding:5,
                        html:'<font style="color:#FFFF;font-family:verdana,arial,sans-serif;font-size:12px;"><b>PARTE I: EVALUADORES EXTERNOS O INTERNOS </b></font>',
                        width:'100%',
                        height:30,
                        border:false

                      } ,                      
                   {
                
                    xtype : 'combo',
                    id : 'departamentos',
                    store : storeDepto,
                    displayField:'departamento',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'id_dpto',
                    hiddenName : 'id_dpto',
                    fieldLabel: '<b>SELECCIONE UN DEPARTAMENTO (*)</b>',
                    labelWidth:200,
                    width:550,
                    emptyText : 'SELECCIONE UN DEPARTAMENTO',
                    listeners: {
                   change: function(field, newVal, oldVal) {
                                          storeEmpleados.clearFilter();
                                          Ext.getCmp('empleados').clearValue();
                                          storeEmpleados.load({params:{depto:newVal}});
                                           }
                    }
                
                },
           {
                
                    xtype : 'combo',
                    id : 'empleados',
                    name:'empleados',
                    store : storeEmpleados,
                    displayField:'nombre_empleado',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'codigo_empleado',
                    hiddenName : 'codigo_empleado',
                    fieldLabel: '<b>SELECCIONE UN EMPLEADO (*)</b>',
                    labelWidth:200,
                    width:550,
                    emptyText : 'SELECCIONE UN EMPLEADO'
                    
                
            },
                      {
                        padding:5,
                        html:'<font style="color:#FFFF;font-family:verdana,arial,sans-serif;font-size:12px;"><b>PARTE II: EVALUADOS EXTERNOS O INTERNOS </b></font>',
                        width:'100%',
                        height:30,
                        border:false

                      },
                    {
                
                    xtype : 'combo',
                    id : 'departamento2',
                    store : storeDepto,
                    displayField:'departamento',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'id_dpto',
                    hiddenName : 'id_dpto',
                    fieldLabel: '<b>SELECCIONE UN DEPARTAMENTO (*)</b>',
                    labelWidth:200,
                    width:550,
                    emptyText : 'SELECCIONE UN DEPARTAMENTO',
                    listeners: {
                   change: function(field, newVal, oldVal) {
                                          storeEmpleados.clearFilter();
                                          Ext.getCmp('empleados2').clearValue();
                                          storeEmpleados.load({params:{depto:newVal}});
                                           }
                    }
                
                },
            {
                
                    xtype : 'combo',
                    id : 'empleados2',
                    name:'empleados2',
                    store : storeEmpleados,
                    displayField:'nombre_empleado',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'codigo_empleado',
                    hiddenName : 'codigo_empleado',
                    fieldLabel: '<b>SELECCIONE UN EMPLEADO (*)</b>',
                    labelWidth:200,
                    width:550,
                    emptyText : 'SELECCIONE UN EMPLEADO'
                    
                
            }                                                 


                     ]

                }//fin del form



              ],
  
              buttons:[
                 {
                    text:'<b>Aplicar cambios</b>',
                    iconCls: 'icon-OK',
                    scale:'large',
                    handler:function(){
                           if(typeof(Ext.getCmp('data'))!='undefined'){
                            var post_a_evaluar=Ext.encode(Ext.getCmp('data').getValue()); /*quienes evaluaran*/
                           }else{
                            var post_a_evaluar=0;
                           }
                           if(typeof(Ext.getCmp('data2'))!='undefined'){
                            var post_evaluados=Ext.encode(Ext.getCmp('data2').getValue());/* los evaluados*/
                           }else{
                            var post_evaluados=0;
                           }
                           

                           
                           
                           var post_codigo_empleado=Ext.getCmp('codigoempleado').getValue(); 
                           var post_codigo_empleado_externo=Ext.getCmp('empleados').getValue();/*Evaluador externo*/
                           var post_codigo_empleado_externo2=Ext.getCmp('empleados2').getValue();/*Evaluado externo o interno*/

                          var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Aplicando cambios, espere por favor ..."});
                          myMask.show();                           
                               Ext.Ajax.request({
                               url:'procesos/registrar_evaluadores.php?evaluadores='+post_a_evaluar+'&codigo_empleado='+post_codigo_empleado+'&codigoe_externo='+post_codigo_empleado_externo+'&evaluados='+post_evaluados+'&codigoe_externo2='+post_codigo_empleado_externo2,
                               method:'POST',
                                     success: function(result,request){
                                      myMask.destroy();
                           
                                                  var jsonData=JSON.parse(result.responseText);
                                                                       var bandera=jsonData[0].bandera;
                                                                       var msj=jsonData[0].msg;
                                                                       var jefe=Ext.getCmp('dataempresa').getValue();
                           
                                                                  if (bandera==1) {
                                                                               
                                                                               storeColaboradores.load({params:{jefeselect:jefe}});
                                                                               Ext.MessageBox.show({
                                                                               title:'Exito',
                                                                                msg:msj,
                                                                                buttons:Ext.MessageBox.OK,
                                                                                icon: Ext.MessageBox.INFO
                                                                                });
                                                                               }
                           
                                                                       if(bandera==2||bandera==3||bandera==4||bandera==5||bandera==6) { 
                                                                              
                                                                               storeColaboradores.load({params:{jefeselect:jefe}});                                                                               
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


                        this.up('form').getForm().reset();
                        this.up('window').destroy();                              
                           





                         }
                 },
                  {
                    text:'<b>Cancelar</b>',
                    iconCls: 'icon-CANCEL',
                    scale:'large',
                handler:function(){
                                    this.up('form').getForm().reset();
                                    this.up('window').destroy();
                                }                    
                  }
                    
                    ]                   


            }); //fin del apply
            this.callParent(arguments);
            this.loadCheckboxes(codigoSuperior,codigoEvaluado);

      }//fin del init
      ,
      loadCheckboxes:function(codigoSuperior,codigoEvaluado){
             Ext.Ajax.request({
                url:'procesos/coworkers_json.php?codigoJefe='+codigoSuperior+'&codigoEva='+codigoEvaluado,
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
             if (jsonResponse.success) {
               
   /*para evaluadores*/
        var checkboxGroup={
                  xtype:'checkboxgroup',
                  columns:2,
                  fieldLabel:'<b>PARTE III: </b>Compañeros evaluadores',
                  name:'data',
                  id:'data',
                  bodyPadding: 10,
                  cls: 'x-check-group-alt',
                  style:{
                    padding:'10px'
                    },  
                    items:[]
               };  

   /*para evaluados*/
 var checkboxGroup2={
                  xtype:'checkboxgroup',
                  columns:2,
                  fieldLabel:'<b>PARTE IV: </b>Compañeros evaluados',
                  name:'data2',
                  id:'data2',
                  bodyPadding: 10,
                  cls: 'x-check-group-alt',
                  style:{
                    padding:'10px'
                    },  
                    items:[]
               };      


 var i, len = jsonResponse.data.length, evaluador;

                for(i=0;i<len;i++){
                  evaluador=jsonResponse.data[i];

                      checkboxGroup.items.push({
                       xtype:'checkbox',
                       boxLabel:evaluador.nombrecompa,
                       name:'data',
                       inputValue:evaluador.codigoe,
                       checked:evaluador.selected
                      });
                }


     var len2=jsonResponse.data2.length;
       for(j=0;j<len2;j++){
          evaluando=jsonResponse.data2[j];

 checkboxGroup2.items.push({
                       xtype:'checkbox',
                       boxLabel:evaluando.nombrecompa,
                       name:'data',
                       inputValue:evaluando.codigoe,
                       checked:evaluando.selected
                      });          
          
       }
                


                this.add(checkboxGroup);
                this.add(checkboxGroup2);                                  

      }
    else{
          this.add(
          {
                            
                            anchor:'100%',
                            height:200,
                          
                            html: '<font class="signi"><CENTER> El empleado seleccionado no posee compañeros</CENTER></font>',
                            collapsible: false,
                            collapsed:false,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#FF0000',
                                      'font-size': '16px',
                                      'padding': '30px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                                        
 }

            )
    }
}
  });//fin de messagepanel
    

/*****************************************CREACION DE LA VENTANA EMERGENTE**************************************************************/

var  messagePanel=new Ext.ux.MessagePanel();

  winGrupos =Ext.widget('window',{
        title:'ASIGANACION DE EVALUADORES',
        closable:false,
        width:1100,
        height:700,
        layout:'fit',
        resizable:true,
        modal:true,
        items:messagePanel
        

    });

    
    
    winGrupos.show();


  

 }//fin de funcion showUsuarioForm


/**************************** DATA GRIDS ******************************************/

var gridUsuarios=Ext.create('Ext.grid.Panel',{
 	store:storeColaboradores,
 	stateful:true,
 	collapsible:false,
 	selModel:smUsuario,
 	multiSelect:false,
 	stateId:'stateGrid',

 	columns:[
     
 		
 		{
 			text:'<b>CODIGO DE EMPLEADO</b>',
 			sortable:true,
 			flex:1,
            width:100,
 			dataIndex:'codigoempleado'
 		},
    {
      text:'<b>NOMBRE </b>',
      sortable:true,
      flex:1,
            width:400,
      dataIndex:'nombrecolaborador'
    },
    
    {
      text:'<b>APELLIDOS</b>',
      sortable:true,
      flex:1,
            width:400,
      dataIndex:'apellidoscolaborador'
    },
    {
      text:'<b>CARGO ACTUAL</b>',
      sortable:true,
      dataIndex:'cargoactual',
      width:400
    }
  





        ],
 tbar:[
            '->','-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                text: '<b> Actualizar tabla </b>',
                iconCls: 'icon-refresh',
                id: 'buton12',
                padding:10,
                 handler:function(){
                  var jefe=Ext.getCmp('dataempresa').getValue();

                  storeColaboradores.load({params:{jefeselect:jefe}});

                } 
            }        

          ]
        


 	});


var tabs = Ext.widget({
        xtype: 'form',
        id: 'tabForm',
    renderTo:'interfazGestionAdmin',
        width: "100%",
    height:"100%",
        border: false,
    bodyStyle: 'background:#1C3E67;',
        bodyBorder: false,
    defaults: {
        anchor: '100%'
    },
        fieldDefaults: {
            labelWidth: 200,
      labelAlign:'right',
      bodyStyle: 'padding: 0px; background:#1C3E67;',
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
          title:'Asignacion de evaluadores',
          tabConfig:{
          cls: 'x-btn-text-icon',
          iconCls: 'icon-subcategoria'
          },
              defaults:{
            bodyStyle:'padding:0px',
              anchor: '100%',
              bodyStyle:'background:#DFE9F6;'
            
            },
            items:[
             {
                    xtype : 'combo',
                    id : 'dataempresa',
                    store : storeJefes,
                    displayField:'nombreempleado',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'codigoempleado',
                    hiddenName : 'codigoempleado',
                    fieldLabel: '<b>SELECCIONE UN JEFE </b>',
                    labelWidth:200,
                    width:450,
                    anchor:'50%',
                    //colspan:4,
                    allowBlank: false,
                    emptyText : 'SELECCIONE UN JEFE',
                    listeners: {
                   change: function(field, newVal, oldVal) {
                      /* obtener id de empresa */
                        storeColaboradores.load({params:{jefeselect:newVal}});

                     }
                 }
                
            },
              {padding:5,
                        html:'<font style="color:#FFFF;font-family:verdana,arial,sans-serif;font-size:20px;"><b>COLABORADORES </b></font>',
                        width:'100%',
                        height:35,
                        border:true

                      },
            
   gridUsuarios            
              
            
            ]
          
          }
 
            ]//fin itemm tabpanel
         }//fin compo  tabpanel
      
      ]

  });







});