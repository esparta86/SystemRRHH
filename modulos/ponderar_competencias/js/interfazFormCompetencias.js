Ext.onReady(function(){

/*********************** MODEL *******************************************/
  Ext.define('gruposoModel',{
    extend:'Ext.data.Model',
      fields:[
            {
                name:'idgrupoo',type:'int'
            },
             {
                name:'nombregrupo', type:'string'
             }
      ],
      idProperty:'company'
  });

/******************************** STORES ************************************************/

var storeGrupoO=Ext.create('Ext.data.JsonStore',{
    model:'gruposoModel',
    remoteSort:true,
    proxy:{
        type:'ajax',
        url:'procesos/gruposO_json.php',
        reader:{
            type:'json',
            root:'data'
        }

    }

});








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
                     anchor:'90%',
                     border:false

                     },
                     items:[
                        {
                        padding:5,
                        html:'<font style="color:#FFFF;font-family:verdana,arial,sans-serif;font-size:14px;"><b>EN ESTE FORMULARIO: </b>'+
                        'El presente Formulario es exclusivo para la persona encargada de Recursos Humanos. Usted completará información específica sobre ponderaciones de los distintos cargos de la Institución, determinadas por las competencias y experiencias que el cargo requiere. Todos los campos deben ser llenados para poder procesar correctamente la información.'+
                        '</font>',
                        width:'50%',
                        height:80,
                        border:false
                        }

                      ]
         }


        ]

      });//fin de aply

      this.callParent(arguments);
     


  }//fin de init
  ,
set_grupo: function(idgrupo_o){
        this.loadComponentes(idgrupo_o);
        
  }  
  ,
  loadComponentes:function(idgrupo_o){
        
        Ext.Ajax.request({
          url:'procesos/componentes_json.php?idgrupo='+idgrupo_o,
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
          var panel =Ext.create('Ext.panel.Panel', {
                                      width: '90%',
                                      border:false,                                      
                                      
                                      defaults: {
                                          
                                              frame:false,
                                              height: 25,
                                              border: true,
                                              style: 'margin: 5px 3px 5px 5px;'
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
                colspan:8,
                height: 30,
                width:'100%'
              },
              {
                html:'<CENTER><font style="color:#FFfF;font-family:verdana,arial,sans-serif;font-size:10px;"><b>PONDERACION</b></font></CENTER>',
                colspan:2,
                height: 30,
                width:'100%'
              }              
          );



          for (var i = 0; i < len; i++) {
            competencias=jsonResponse.data[i];
              

                                /*proc para calcular el numero de filas que tendra la subcategoria y clasificacion*/
                                var suma=0;
                                var suma_clasificacion=0;
                                var height_v=0;   
                                var ultima_competencia=0;           
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

                                        ultima_competencia=elementos.idcompetencia;

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
                           
                            width:300,
                            //flex:true,
                            height:'100%',
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
                    
                      width:300,
                      //flex:1,
                      height:'100%',
                      title: ''+competencias.subcategoria,
                      //bodyStyle: "padding: 5px;",
                      html: '<font class="signi">'+competencias.descripcionsub+'</font>',
                      collapsible: true,
                      collapsed:false,
                      colspan:2,
                      rowspan:suma              


                         },
                         {
                           xtype: 'numberfield',
                          id:'S_'+competencias.id_padre,
                          width:50,
                          height:'100%',
                          hideTrigger: true,
                          keyNavEnabled: false,
                          mouseWheelEnabled: false,
                          colspan:2,
                          readOnly:true,
                          rowspan:suma

                         }                  
                      );
            }


           


          }else{
           // console.log("renderizar clasificacion "+competencias.nombre_clasificacion);

        panel.add(
               {
               
                width:300,
                //flex:1,
                height:'100%',
                title: ''+competencias.nombre_clasificacion,
                
                html: '<font class="signi">'+competencias.descripcionclasifica+'</font>',
                collapsible: true,
                collapsed:false,
                colspan:2,
                rowspan:suma_clasificacion              


                   } ,         

                 {
                
                width:300,
                //flex:1,
                height:'100%',
                title: ''+competencias.subcategoria,
                //bodyStyle: "padding: 5px;",
                html: '<font class="signi">'+competencias.descripcionsub+'</font>',
                collapsible: true,
                collapsed:false,
                colspan:2,
                rowspan:suma              


                   },
                    {
                           xtype: 'numberfield',
                          id:'S_'+competencias.id_padre,
                          width:50,
                          height:'100%',
                          hideTrigger: true,
                          keyNavEnabled: false,
                          mouseWheelEnabled: false,
                          colspan:2,
                          readOnly:true,
                          rowspan:suma

                         }                    
                );  




          }//fin de else
   
             panel.add(
             {
                  
                width:400,
                height: '100%',
                title: ''+competencias.nombrecompetencia,
                //bodyStyle: "padding: 5px;",
                html: '<font class="signi">'+competencias.descripcioncompetencia+'</font>',
                collapsible: true,
                collapsed:true,
                colspan:2,
                 
             },
             {
                xtype: 'numberfield',
                id: 'D_'+competencias.idcompetencia,
                colspan:2,
                width:50,
                name: 'D_'+competencias.idcompetencia,
                maxValue: 100,
                minValue: 1,
                value:competencias.valordeseable,
                allowBlank: false, 
                listeners: {
                  'change': function(){
                    this.actualizar(jsonResponse);/**/
                  },scope:this
                }
              }
           
             );


        




            

          }

          panel.add(
             {
                html:'<CENTER><font style="color:#FFFF;font-family:verdana,arial,sans-serif;font-size:16px;"><b>SUMA</b></font></CENTER>',
                colspan:6,
                height: 30,
                width:'100%'
              },
             {
                xtype: 'numberfield',
                id: 'total_suma',
                colspan:4,
                width:100,
                name: 'total_suma',
                maxValue: 100,
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false,
                minValue: 100,
                readOnly:true
              }             
                              
              )
      
            panel.add(
                {
                    xtype:'hiddenfield',
                   
                    colspan:2,
                    
                }              
            ,
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
                                      handler:function(){
                                         this.submit_form(jsonResponse);

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

             },
{
                    xtype:'hiddenfield',
                   
                    colspan:2,
                               }
             ,
 {
                
                html:'<CENTER><font style="color:#FFfF;font-family:verdana,arial,sans-serif;font-size:16px;"><b>Avenida Los Olivos, Senda l-1, N°3, Residencial Escalón, San Salvador, El Salvador, C. A. Tel. (503) 2262-2861</b></font></CENTER>',
                colspan:10,
                height: 30,
                width:'100%'
              }             
              );





          this.add(
            panel);
          this.actualizar(jsonResponse);

        }



    }/* fin de onload**/
    ,
   actualizar: function(jsonResponse){
    var i, len = jsonResponse.data.length, elementos;
     var suma=0;
     var subclasificacion=new Array();
     var i_sub=0;
    for (var i = 0; i < len; i++) {
      elementos=jsonResponse.data[i];
         
         suma=suma+Ext.getCmp('D_'+elementos.idcompetencia).getValue();
    }
   
   /***************************************** PROCESO OBTENER SUBCATEGORIAS O IDPADRES. **********************************************************/
           for(var j=0;j<len;j++){
                                              elemento=jsonResponse.data[j];
                                              elementobefore=jsonResponse.data[j-1];
                                              if(j!=0){
                                                if(elemento.id_padre==elementobefore.id_padre){
                                                  
                                                   }else{
                                                    subclasificacion[i_sub]=elemento.id_padre;
                                                  
                                                    i_sub++;

                                                   }

                                                 }else{
                                                   subclasificacion[i_sub]=elemento.id_padre;
                                                   
                                                    i_sub++;
                                                 }


                                      }/* fin de for.*/
  /************************************ CALCULAR SUMAS PARCIALES *****************************************************/
      var n_subcategoria=subclasificacion.length;
      for(var h=0;h<n_subcategoria;h++){
                                                var suma_subcategoria=0;
                                                  for(var j=0;j<len;j++){
                                                      elemento=jsonResponse.data[j];
                                                         if(elemento.id_padre==subclasificacion[h])
                                                         {
                                                            suma_subcategoria= suma_subcategoria+Ext.getCmp('D_'+elemento.idcompetencia).getValue();
                                                         }

                                                  }
                                                  /*set suma de subcategoria*/
                                                  Ext.getCmp('S_'+subclasificacion[h]).setValue(suma_subcategoria);
                                                  //console.log(suma_subcategoria);

                                        }


    Ext.getCmp('total_suma').setValue(suma);
    Ext.example.msg('Resultado Actual',' SUMA : '+suma);
   },
   submit_form:function(jsonResponse){

     var i, len = jsonResponse.data.length, elementos;
     var bandera=true;
     var suma=0;
     var myponderaciones=new Array();
         for (var i = 0; i < len; i++) {/* construir url*/
            elementos=jsonResponse.data[i];
            suma=suma+Ext.getCmp('D_'+elementos.idcompetencia).getValue();
            myponderaciones[i]=elementos.idcompetencia+'_'+Ext.getCmp('D_'+elementos.idcompetencia).getValue();
             var a=Ext.getCmp('D_'+elementos.idcompetencia).getValue();
            if( a==null||a==0){
                bandera=false;
                
            }
            
          } 

if(bandera==true){
    if(suma!=100)  {/* no enviar*/
                                          Ext.MessageBox.show({
                                                                    title:'Status',
                                                                    msg:'La suma de todas las ponderaciones tiene que ser igual a 100',
                                                                    buttons:Ext.MessageBox.OK,
                                                                    icon: Ext.MessageBox.INFO
                                                                });        
    }else{

           var post_ponderaciones=Ext.encode(myponderaciones);
           var post_idgrupoo= Ext.getCmp('idgrupoo').getValue();
           Ext.Ajax.request({
           url:'procesos/guardar_ponderaciones.php?ponderaciones='+post_ponderaciones+'&idgrupo='+post_idgrupoo,
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

  }/* fin de bandera*/
  else{

     Ext.MessageBox.show({
                                                               title:'status',
                                                                msg:'Por favor complete el formulario, Todas las competencias deben tener un valor distinto y mayor que 0.',
                                                                buttons:Ext.MessageBox.OK,
                                                                icon: Ext.MessageBox.INFO
                                                                });    
      }

    


   }


});



storeGrupoO.load();


/***     CONTENEDOR   ***/

var panelmedio=new Ext.Panel({
  id:'panelmedio',
  name:'panelmedio',
  width:'100%',
  collapsible:false,
  border:false,
    items:[
    ]

 });
  
  var main_panel=new Ext.Panel({
      title:'<b>PONDERACION DE COMPETENCIAS DE ACUERDO A GRUPOS OCUPACIONALES </b>',
      renderTo:'interfazFormCompetencias',
      iconCls:'icon-userconfig',
     width:'95%',
     border:false,
      collapsible:false,  
        items:[
                {
                
                    xtype : 'combo',
                    id : 'idgrupoo',
                    store :storeGrupoO,
                    displayField:'nombregrupo',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'idgrupoo',
                    hiddenName : 'idgrupoo',
                    fieldLabel: ' <b>GRUPO OCUPACIONAL (*)</b>',
                    width:500,
                    allowBlank: false,
                    emptyText : 'SELECCIONE UN GRUPO OCUPACIONAL',
                    labelWidth:200,
                    padding:10,
                    listeners:{
                        change:function(field,newVal,oldVal){
                      panelmedio.removeAll(true);
                       var MessagePanel=new Ext.ux.MessagePanel();
                       MessagePanel.set_grupo(newVal);
                       panelmedio.add(MessagePanel);
                       panelmedio.doLayout();
                       panelmedio.update();                          


                        }

                    }
                
            }        

        ,
       panelmedio
        ]

  })

});