
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

Ext.define('valoracionModel',{
  extend:'Ext.data.Model',
  fields:[
  {
    name:'idvaloracion',type:'int'
  },
  {
    name:'valor',type:'int'
  },
  {
    name:'descripcion', type:'string'
  }
  ],
  idProperty:'company'

});

/********************* STORES***************************/

var storeEmpleados=Ext.create('Ext.data.JsonStore',{
    model:'empleadosModel',
    remoteSort:true,
       proxy:{
            type:'ajax',
            url:'procesos/empleadosPLAN_json.php',
                reader:{
                    type:'json',
                    root:'data'
                    }
            }

});
/*
var storeValoracion=Ext.create('Ext.data.JsonStore',{
  model:'valoracionModel',
  remoteSort:true,
  proxy:{
        type:'ajax',
        url:'procesos/valoracion_json.php',
         reader:{
            type:'json',
            root:'data'
         }

    }

});
*/



/*************************************************/

Ext.define('Ext.ux.FormularioEvaluacionxEmpleado',{
  extend:'Ext.form.Panel',

  initComponent:function(){
      Ext.apply(this,{
        autoScroll:true,
        border:false,
        items:[
           {
                     xtype:'form',
                     id:'formEvaluadores',
                     padding:10,
                     
                     defaults:{
                      //anchor:'100%',


                     },
                     items:[
                        {
                        padding:5,
                        html:'<font style="color:#0000FF;font-family:verdana,arial,sans-serif;font-size:14px;">'+
                        ' En el presente Formulario usted completará información específica sobre conocimientos, competencias y experiencias que el empleado requiere, como parte del proceso de Plan de Sucesión y Carrera. Todos los campos deben ser llenados para poder procesar correctamente la información. </font>',
                        width:'70%',
                        height:75,
                        border:false
                        },
                                     

                      ]
         }


        ]

      });//fin de aply

      this.callParent(arguments);
      //this.loadComponentes();


  }//fin de init
  ,
  set_evaluado: function(evaluado_cod){
        this.loadComponentes(evaluado_cod);
        
  }
  ,
  loadComponentes:function(empleadocodigo){
    
        
        Ext.Ajax.request({
          url:'procesos/componentesPLAN_json.php?codigoemp='+empleadocodigo,
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
                
                   

          var i, len = jsonResponse.data.length, competencias;
          var panel=null;

            
           panel=Ext.create('Ext.panel.Panel', {
                                      width: '80%',
                                      
                                      defaults: {
                                          // applied to each contained panel
                                              frame:false,
                                              height: 25,
                                              border: true,
                                              style: 'margin: 5px 3px 3px 5px;'
                                      },
                                      layout: {
                                      type: 'table',
                                      columns: 10, 
                                      tdAttrs: {
                                        valign: 'middle'
                                      }
                                    }
                                      
                                    });
        

  
          panel.add(
            {
                html:'<CENTER><font style="color:#FFFF;font-family:verdana,arial,sans-serif;font-size:16px;"><b>COMPETENCIAS PROFESIONALES</b></font></CENTER>',
                colspan:6,
                height: 30,
                width:'100%'
              },
              {
                html:'<CENTER><font style="color:#FFfF;font-family:verdana,arial,sans-serif;font-size:14px;"><b>I (Nivel Real)</b></font></CENTER>',
                colspan:4,
                height: 30,
                width:'150'
              },
                               
                          
            {   
                html:'<CENTER><font style="color:#FFfF;font-family:verdana,arial,sans-serif;font-size:14px;"><b>COMPETENCIAS DE TIPO POTENCIAL</b></font></CENTER>',
                colspan:10,
                height: 30
                
              }                            
          );
           



              
          for (var i = 0; i < len; i++) {
            competencias=jsonResponse.data[i];
            if(competencias.idcompetencia!=0){

 /*proc para calcular el numero de filas que tendra la subcategoria y clasificacion*/
                                var suma=0;
                                var suma_clasificacion=0;
                                var height_v=0;              
                                    for(var j=0;j<len;j++){
                                      elementos=jsonResponse.data[j];
                                        if(competencias.id_padre==elementos.id_padre){
                                           suma=suma+1;
                                           height_v=height_v+100;
                                           }

                                        if(competencias.idclasificacion==elementos.idclasificacion)
                                        {
                                          suma_clasificacion=suma_clasificacion+1;
                                        }
                                      
                                      }
                                  /*************************************************************************/                              
if(i!=0){
   var i_anterior=i-1;
            elementos3=jsonResponse.data[i_anterior];
        if(competencias.idclasificacion==elementos3.idclasificacion){
              //no renderizar la celda de clasificacion
            } else{//renderizar clasificacion.
              
                  panel.add(
                              {
                            
                            width: 300,
                            height:'102%',
                            title: ''+competencias.nombre_clasificacion,
                            html: '<font class="signi">'+competencias.descripcionclasifica+'</font>',
                            collapsible: true,
                            collapsed:false,
                            colspan:2,
                            rowspan:suma_clasificacion              


                               }                  
                            );             

            }

      /* agregar paneles subclasificacion */
            if(competencias.id_padre==elementos3.id_padre){
              //no renderizar celda de subclasificacion

            }else{
                    //renderizar la subcalsificacion
                    panel.add(
                       {
                      //id:''+competencias.id_padre,
                      //name:''+competencias.id_padre,
                      width: 500,
                      height:'102%',
                      title: ''+competencias.subcategoria,
                      //bodyStyle: "padding: 5px;",
                      html: '<font class="signi">'+competencias.descripcionsub+'</font>',
                      collapsible: true,
                      collapsed:false,
                      colspan:2,
                      rowspan:suma              


                         }                  
                      );
            }




}else{


        panel.add(
               {
               
                width: 300,
                height:'102%',
                title: ''+competencias.nombre_clasificacion,
                
                html: '<font class="signi">'+competencias.descripcionclasifica+'</font>',
                collapsible: true,
                collapsed:false,
                colspan:2,
                rowspan:suma_clasificacion              


                   } ,         

                 {
                
                width: 500,
                height:'102%',
                title: ''+competencias.subcategoria,
                //bodyStyle: "padding: 5px;",
                html: '<font class="signi">'+competencias.descripcionsub+'</font>',
                collapsible: true,
                collapsed:false,
                colspan:2,
                rowspan:suma              


                   }                  
                ); 


}

      


             panel.add(
             {
                id:'P_'+competencias.idcompetencia,
                name:'P_'+competencias.idcompetencia,
                width: 500,
                height: '100%',
                title: ''+competencias.nombrecompetencia,
                
                html: '<font class="signi">'+competencias.descripcioncompetencia+'</font>',
                collapsible: true,
                collapsed:true,
                colspan:4,
                 


             },
           { 
            
                    xtype : 'combo',
                    id : 'V_'+competencias.idcompetencia,
                                  store:Ext.create('Ext.data.JsonStore',{
                                              model:'valoracionModel',
                                              remoteSort:true,
                                              autoLoad:true,
                                              proxy:{
                                                    type:'ajax',
                                                    url:'procesos/valoracion_json.php?idcomp='+competencias.idcompetencia,
                                                     reader:{
                                                        type:'json',
                                                        root:'data'
                                                     }

                                                }

                                            }),


                    displayField:'valor',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'valor',
                    value:competencias.valor,

                  listConfig: {
                  getInnerTpl: function() {
                    return '<div data-qtip="{valor} . {descripcion}">{valor}</div>';
                  }
                },
                    
                    
                    width:60,
                    colspan:2,
                    allowBlank: false,
                    emptyText : 'SELECCIONE',
                    

              }
                         
           
             );

           

         }else{
           panel.add(
            {
                html:'<CENTER><font style="color:#FFFF;font-family:verdana,arial,sans-serif;font-size:16px;"><b>EL PUESTO NO POSEE COMPETENCIAS.</b> contacte al Administrador del Sistema.</font></CENTER>',
                colspan:10,
                height: 30,
                width:'100%'
              }
         );


         }
            

          }

panel.add( {   
                html:'<CENTER><font style="color:#FFfF;font-family:verdana,arial,sans-serif;font-size:16px;"><b>COMPETENCIAS DE TIPO DE DESEMPEÑO</b></font></CENTER>',
                colspan:10,
                height: 30
                
              }
  );


/*************************************************************  RENDERIZAR COMPETENCIAS DE DESEMPEÑO **********************************/

 var len2=jsonResponse.data2.length,competenciasD;
 var elementos4;
 for (var i = 0; i < len2; i++) {
            competenciasD=jsonResponse.data2[i];
            if(competenciasD.idcompetencia!=0){

 /*proc para calcular el numero de filas que tendra la subcategoria y clasificacion*/
                                var suma=0;
                                var suma_clasificacion=0;
                                var height_v=0;              
                                    for(var j=0;j<len2;j++){
                                      elementos4=jsonResponse.data2[j];
                                        if(competenciasD.id_padre==elementos4.id_padre){
                                           suma=suma+1;
                                           height_v=height_v+100;
                                           }

                                        if(competenciasD.idclasificacion==elementos4.idclasificacion)
                                        {
                                          suma_clasificacion=suma_clasificacion+1;
                                        }
                                      
                                      }
                                  /*************************************************************************/                              
if(i!=0){
   var i_anterior=i-1;
            elementos3=jsonResponse.data2[i_anterior];
        if(competenciasD.idclasificacion==elementos3.idclasificacion){
              //no renderizar la celda de clasificacion
            } else{//renderizar clasificacion.
              
                  panel.add(
                              {
                            
                            width: 300,
                            height:'102%',
                            title: ''+competenciasD.nombre_clasificacion,
                            html: '<font class="signi">'+competenciasD.descripcionclasifica+'</font>',
                            collapsible: true,
                            collapsed:false,
                            colspan:2,
                            rowspan:suma_clasificacion              


                               }                  
                            );             

            }

      /* agregar paneles subclasificacion */
            if(competenciasD.id_padre==elementos3.id_padre){
              //no renderizar celda de subclasificacion

            }else{
                    //renderizar la subcalsificacion
                    panel.add(
                       {
                      //id:''+competencias.id_padre,
                      //name:''+competencias.id_padre,
                      width: 500,
                      height:'102%',
                      title: ''+competenciasD.subcategoria,
                      //bodyStyle: "padding: 5px;",
                      html: '<font class="signi">'+competenciasD.descripcionsub+'</font>',
                      collapsible: true,
                      collapsed:false,
                      colspan:2,
                      rowspan:suma              


                         }                  
                      );
            }




}else{
  panel.add(
               {
               
                width: 300,
                height:'102%',
                title: ''+competenciasD.nombre_clasificacion,
                html: '<font class="signi">'+competenciasD.descripcionclasifica+'</font>',
                collapsible: true,
                collapsed:false,
                colspan:2,
                rowspan:suma_clasificacion              
                   } ,         

                 {
               
                width: 500,
                height:'102%',
                title: ''+competenciasD.subcategoria,
                //bodyStyle: "padding: 5px;",
                html: '<font class="signi">'+competenciasD.descripcionsub+'</font>',
                collapsible: true,
                collapsed:false,
                colspan:2,
                rowspan:suma              
               }                  
                ); 


}

      


             panel.add(
             {
                id:'P_'+competenciasD.idcompetencia,
                name:'P_'+competenciasD.idcompetencia,
                width: 500,
                height: '100%',
                title: ''+competenciasD.nombrecompetencia,
                
                html: '<font class="signi">'+competenciasD.descripcioncompetencia+'</font>',
                collapsible: true,
                collapsed:true,
                colspan:4,
                 


             },
           { 
            
                    xtype : 'combo',
                    id : 'V_'+competenciasD.idcompetencia,
                                  store:Ext.create('Ext.data.JsonStore',{
                                              model:'valoracionModel',
                                              remoteSort:true,
                                              autoLoad:true,
                                              proxy:{
                                                    type:'ajax',
                                                    url:'procesos/valoracion_json.php?idcomp='+competenciasD.idcompetencia,
                                                     reader:{
                                                        type:'json',
                                                        root:'data'
                                                     }

                                                }

                                            }),


                    displayField:'valor',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'valor',
                    value:competenciasD.valor,

                  listConfig: {
                  getInnerTpl: function() {
                    return '<div data-qtip="{valor} . {descripcion}">{valor}</div>';
                  }
                },
                    
                    
                    width:60,
                    colspan:2,
                    allowBlank: false,
                    emptyText : 'SELECCIONE',
                    

              }
                         
           
             );

           

         }else{
           panel.add(
            {
                html:'<CENTER><font style="color:#FFFF;font-family:verdana,arial,sans-serif;font-size:16px;"><b>EL PUESTO NO POSEE COMPETENCIAS.</b> contacte al Administrador del Sistema.</font></CENTER>',
                colspan:10,
                height: 30,
                width:'100%'
              }
         );


         }
            

          }











      
            panel.add(
               
           
                {
                xtype:'hiddenfield',
                   padding:10,
                    colspan:5,              

            }                 
                 ,
            {
                xtype:'hiddenfield',
                   padding:10,
                    colspan:5,              

            }                                 

              ,

            {
xtype:'hiddenfield',
                   padding:10,
                    colspan:2,              

            },
              {
                dockedItems: [
                          {
                              xtype: 'toolbar',
                              dock: 'top',
                              items: [
                                  {
                                      xtype: 'button',
                                      text: '<b>REGISTRAR</b>',
                                      iconCls: 'icon-OK',
                                      handler: function(){
                                        this.submit_formulario(jsonResponse);
                                      },scope:this
                                                                    
                                  },
                                  '->',
                                  {
                                      xtype: 'button',
                                      text: '<b>LIMPIAR</b>',
                                      iconCls: 'icon-CANCEL'
                                                                             
                                  }
                              ]
                          }
                      ],colspan:6

             },{
xtype:'hiddenfield',
                   
                    colspan:2,              

             },
 {
                
                html:'<CENTER><font style="color:#FFfF;font-family:verdana,arial,sans-serif;font-size:16px;"><b>Avenida Los Olivos, Senda l-1, N°3, Residencial Escalón, San Salvador, El Salvador, C. A. Tel. (503) 2262-2861</b></font></CENTER>',
                colspan:10,
                height: 30,
                width:'100%',
                padding:5,
                border:false
              }             
              );


          




            

          
          this.add(panel);



       }/*fin de succeful*/ 


    }/* fin de onload**/
    ,
 
   submit_formulario:function(jsonResponse){
      var i,len=jsonResponse.data.length,len2=jsonResponse.data2.length,elementos,elementos2;
      var bandera=true;

      var evaluacionxempleado=new Array();
      

            for(var i=0;i<len;i++){
              elementos=jsonResponse.data[i];
              evaluacionxempleado[i]=elementos.idcompetencia+'_'+Ext.getCmp('V_'+elementos.idcompetencia).getValue();
              var a=Ext.getCmp('V_'+elementos.idcompetencia).getValue();
              
                        if( a==null||a==0){
                            bandera=false;
                    
                        } 
           

            }/* fin de for.*/

for(var i=0;i<len2;i++){
              elementos2=jsonResponse.data2[i];
              evaluacionxempleado.push(elementos2.idcompetencia+'_'+Ext.getCmp('V_'+elementos2.idcompetencia).getValue());
              var a=Ext.getCmp('V_'+elementos2.idcompetencia).getValue();
              
                        if( a==null||a==0){
                            bandera=false;
                    
                        } 
           

            }/* fin de for.*/            

            if(bandera==true){
              
              var post_evaluacionxempleado=Ext.encode(evaluacionxempleado);
              
              var post_evaluado=Ext.getCmp('empleado').getValue();
              
              
                    Ext.Ajax.request({
                               url:'procesos/guardar_ponderacionesPLANxempleado.php?evaluacion='+post_evaluacionxempleado+'&codigoe='+post_evaluado,
                               method:'POST',
                                     success: function(result,request){
                           
                                                var jsonData=JSON.parse(result.responseText);
                                                                       var bandera=jsonData[0].bandera;
                                                                       var msj=jsonData[0].msg;
                           
                                                                  if (bandera==1) {
                                                                              // location.href='ponderarcompetencias.php';
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
                              

              


            }else{
  Ext.MessageBox.show({
                                                               title:'status',
                                                                msg:'Por favor complete el formulario.',
                                                                buttons:Ext.MessageBox.OK,
                                                                icon: Ext.MessageBox.INFO
                                                                });                

            }
            



   }


});


storeEmpleados.load();



//var MessagePanel=new Ext.ux.MessagePanel();
//console.log(MessagePanel);


/***     CONTENEDOR   ***/

 var panel_medio=new Ext.Panel({
  id:'panelmedio',
  name:'panelmedio',
  width:'100%',
  collapsible:false,
  border:false,
    items:[
    ]

 });
  
  var main_panel=new Ext.Panel({
      title:'<b>FORMULARIO DEL VALOR DESEABLE DE UN EMPLEADO </b>',
      renderTo:'interfazFormCompetencias',
      iconCls:'icon-key',
     width:'100%',
     id:'main',
     name:'main',
      collapsible:false,  
        items:[
            {
                
                    xtype : 'combo',
                    id : 'empleado',
                    store : storeEmpleados,
                    displayField:'nombreempleado',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'codigoempleado',
                    hiddenName : 'codigoempleado',
                    fieldLabel: '<b>SELECCIONE UN EMPLEADO (*)</b>',
                    labelWidth:200,
                    width:550,
                    
                    allowBlank: false,
                    emptyText : 'SELECCIONE UN EMPLEADO',
                    padding:10,
                    
                    listeners: {
                   
                   change: function(field, newVal, oldVal) {
                                         
                       panel_medio.removeAll(true);
                       var FormularioEval=new Ext.ux.FormularioEvaluacionxEmpleado();
                       FormularioEval.set_evaluado(newVal);
                       panel_medio.add(FormularioEval);
                       panel_medio.doLayout();
                       panel_medio.update();
                       
                        },scope:this

                    }
                
            },
            panel_medio       
        
        ]

  });





});