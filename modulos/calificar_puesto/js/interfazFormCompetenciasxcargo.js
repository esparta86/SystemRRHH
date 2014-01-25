
Ext.onReady(function(){

Ext.QuickTips.init();
  
  Ext.apply(Ext.QuickTips.getQuickTip(), {showDelay: 500, dismissDelay: 20000});
/************************ MODEL *********************/

Ext.define('cargosModel',{
     extend:'Ext.data.Model',
     fields:[
        {
       name:'idcargo',type:'int'
        },
        {
        name:'cargo',type:'string'
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

Ext.define('Ext.ux.MessagePanel',{
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
                        html:'<font style="color:#FFFF;font-family:verdana,arial,sans-serif;font-size:14px;"><b>EN ESTE FORMULARIO: </b>'+
                        'En el presente Formulario usted completará información del valor deseable de cada competencia para un cargo especifico,como parte del proceso de evaluacion del desempeño. Todos los campos deben ser llenados para poder procesar correctamente la información.'+
                        '</font>',
                        width:'70%',
                        height:80,
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
  set_cargo: function(cargo_cod){
        this.loadComponentes(cargo_cod);
  }
  ,
  loadComponentes:function(idcargo){
        Ext.Ajax.request({
          url:'procesos/componentes_json.php?id_cargo='+idcargo,
          reader:{
                    type:'json',
                    root:'data'
                 },
                success:this.onLoad,
                scope:this          
        });
    
    },
    onLoad:function(response){

      id_panel=Ext.getCmp('cargo').getValue();
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
                                              style: 'margin: 10px 3px 3px 5px;'
                                      },
                                      layout: {
                                      type: 'table',
                                      columns: 8, 
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
                html:'<CENTER><font style="color:#FFfF;font-family:verdana,arial,sans-serif;font-size:16px;"><b>D(deseable)</b></font></CENTER>',
                colspan:4,
                height: 30,
                width:'100%'
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
                            
                            width: 400,
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
                      width: 400,
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
               
                width: 400,
                height:'102%',
                title: ''+competencias.nombre_clasificacion,
                
                html: '<font class="signi">'+competencias.descripcionclasifica+'</font>',
                collapsible: true,
                collapsed:false,
                colspan:2,
                rowspan:suma_clasificacion              


                   } ,         

                 {
                
                width: 400,
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
                colspan:2,
                 


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
                    value:competencias.valordeseable,

                  listConfig: {
                  getInnerTpl: function() {
                    return '<div data-qtip="{valor} . {descripcion}">{valor}</div>';
                  }
                },
                    
                    labelWidth:200,
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
                colspan:8,
                height: 30,
                width:'100%'
              }
         );


         }
            

          }

      
            panel.add({
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
                      ],colspan:4

             },{
xtype:'hiddenfield',
                   
                    colspan:2,              

             },
 {
                
                html:'<CENTER><font style="color:#FFfF;font-family:verdana,arial,sans-serif;font-size:16px;"><b>Avenida Los Olivos, Senda l-1, N°3, Residencial Escalón, San Salvador, El Salvador, C. A. Tel. (503) 2262-2861</b></font></CENTER>',
                colspan:8,
                height: 30,
                width:'100%',
                padding:5,
                border:false
              }             
              );


          




            

          
          this.add(panel);
      }





    }/* fin de onload**/
    ,
 
   submit_formulario:function(jsonResponse){
      var i,len=jsonResponse.data.length,elementos;
      var bandera=true;

      var evaluacionxcargo=new Array();

            for(var i=0;i<len;i++){
              elementos=jsonResponse.data[i];
              evaluacionxcargo[i]=elementos.idcompetencia+'_'+Ext.getCmp('V_'+elementos.idcompetencia).getValue();
             var a=Ext.getCmp('V_'+elementos.idcompetencia).getValue();
                        if( a==null||a==0){
                            bandera=false;
                            
                        }              

            }/* fin de for.*/

            if(bandera==true){

              var post_evaluacionxcargo=Ext.encode(evaluacionxcargo);
              var post_idcargo=Ext.getCmp('cargo').getValue();
                    Ext.Ajax.request({
                               url:'procesos/guardar_ponderacionesxcargo.php?ponderaciones='+post_evaluacionxcargo+'&idcargo='+post_idcargo,
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
                                                                msg:'Por favor complete el formulario, no es posible dejar una competencia sin evaluar del cargo.',
                                                                buttons:Ext.MessageBox.OK,
                                                                icon: Ext.MessageBox.INFO
                                                                });                

            }



   }


});


storeCargos.load();



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
      title:'<b>INGRESO DE EVALUACION DESEABLE POR CARGO</b>',
      renderTo:'interfazFormCompetencias',
      iconCls:'icon-userconfig',
     width:'100%',
     id:'main',
     name:'main',
      collapsible:false,  
        items:[
            {
                
                    xtype : 'combo',
                    id : 'cargo',
                    store : storeCargos,
                    displayField:'cargo',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'idcargo',
                    hiddenName : 'idcargo',
                    fieldLabel: '<b>SELECCIONE UN CARGO (*)</b>',
                    labelWidth:200,
                    width:550,
                    
                    allowBlank: false,
                    emptyText : 'SELECCIONE UN CARGO',
                    padding:10,
                    
                    listeners: {
                   change: function(field, newVal, oldVal) {
                                          
                       panel_medio.removeAll(true);
                       var MessagePanel=new Ext.ux.MessagePanel();
                       MessagePanel.set_cargo(newVal);
                       panel_medio.add(MessagePanel);
                       panel_medio.doLayout();
                       panel_medio.update();
                       
                        },scope:this

                    }
                
            },
            panel_medio       
        
        ]

  });





});