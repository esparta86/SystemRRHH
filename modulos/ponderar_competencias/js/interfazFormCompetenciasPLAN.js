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

                     },
                     items:[
                        {
                        padding:5,
                        html:'<font style="color:#FFFF;font-family:verdana,arial,sans-serif;font-size:14px;"><b>EN ESTE FORMULARIO: </b>'+
                        'El presente Formulario es exclusivo para la persona encargada de Recursos Humanos. Usted completará información específica sobre ponderaciones de los distintos cargos de la Institución, determinadas por las competencias y experiencias que el cargo requiere. Todos los campos deben ser llenados para poder procesar correctamente la información.'+
                        '</font>',
                        width:'70%',
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
          url:'procesos/componentesPLAN_json.php?idgrupo='+idgrupo_o,
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
                                          // applied to each contained panel
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
              } ,{
                html:'<font style="background-color:#B8CFEE;font-family:verdana,arial,sans-serif;font-size:15px;"><b><CENTER>DE TIPO POTENCIAL</CENTER></b></font>',
                colspan:10,
                height: 30,
                width:'100%'
              }                           
          );


/********************************** COMPETENCIAS POTENCIALES******************************************************************/          

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
                           
                            width: 300,
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
                    
                      width: 300,
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
               
                width: 300,
                height:'100%',
                title: ''+competencias.nombre_clasificacion,
                
                html: '<font class="signi">'+competencias.descripcionclasifica+'</font>',
                collapsible: true,
                collapsed:false,
                colspan:2,
                rowspan:suma_clasificacion              


                   } ,         

                 {
                
                width: 300,
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
                  
                width: 400,
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
                id: 'CP_'+competencias.idcompetencia,
                colspan:2,
                width:50,
                name: 'CP_'+competencias.idcompetencia,
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
                html:'<CENTER><font style="color:#FFFF;font-family:verdana,arial,sans-serif;font-size:16px;"><b>SUMA DE COMPETENCIAS DE POTENCIAL </b></font></CENTER>',
                colspan:6,
                height: 30,
                width:'100%'
              },
             {
                xtype: 'numberfield',
                id: 'sumapotencial',
                colspan:4,
                width:100,
                name: 'sumapotencial',
                maxValue: 100,
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false,
                minValue: 100,
                readOnly:true
              }             
                              
              );

    /******************************************************DESEMPEÑO****************************************************************************/
panel.add(
              {
                html:'<CENTER><font style="color:#FFfF;font-family:verdana,arial,sans-serif;font-size:15px;"><b>DE TIPO DESEMPEÑO</b></font></CENTER>',
                colspan:10,
                height: 30,
                width:'100%'
              }                           
          );


var d, len_d = jsonResponse.data2.length, competenciasD;
for (var d = 0; d < len_d; d++) {
            competenciasD=jsonResponse.data2[d];
            
                                /*proc para calcular el numero de filas que tendra la subcategoria y clasificacion*/
                              var sumaD=0;
                                var suma_clasificacionD=0;
                                var height_vD=0;   
                                var ultima_competenciaD=0;           
                                    for(var j=0;j<len_d;j++){
                                      elementos=jsonResponse.data2[j];
                                        if(competenciasD.id_padre==elementos.id_padre){
                                           sumaD=sumaD+1;
                                           height_vD=height_vD+100;
                                           }

                                        if(competenciasD.idclasificacion==elementos.idclasificacion)
                                        {
                                          suma_clasificacionD=suma_clasificacionD+1;
                                        }

                                        ultima_competenciaD=elementos.idcompetencia;

                                      }
                                  /*************************************************************************/
          

             
          
if(d!=0){
           var d_anterior=d-1;
            elementos3=jsonResponse.data2[d_anterior];
        if(competenciasD.idclasificacion==elementos3.idclasificacion){
              //no renderizar la celda de clasificacion
            } else{//renderizar clasificacion.
              
                  panel.add(
                              {
                           
                            width: 300,
                            height:'100%',
                            title: ''+competenciasD.nombre_clasificacion,
                           
                            html: '<font class="signi">'+competenciasD.descripcionclasifica+'</font>',
                            collapsible: true,
                            collapsed:false,
                            colspan:2,
                            rowspan:suma_clasificacionD              


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
                    
                      width: 300,
                      height:'100%',
                      title: ''+competenciasD.subcategoria,
                      //bodyStyle: "padding: 5px;",
                      html: '<font class="signi">'+competenciasD.descripcionsub+'</font>',
                      collapsible: true,
                      collapsed:false,
                      colspan:2,
                      rowspan:sumaD              


                         },
                         {
                           xtype: 'numberfield',
                          id:'CD_'+competenciasD.id_padre,
                          name:'CD_'+competenciasD.id_padre,
                          width:50,
                          height:'100%',
                          hideTrigger: true,
                          keyNavEnabled: false,
                          mouseWheelEnabled: false,
                          colspan:2,
                          readOnly:true,
                          rowspan:sumaD

                         }                  
                      );
            }


           


          }else{
           // console.log("renderizar clasificacion "+competencias.nombre_clasificacion);

        panel.add(
               {
               
                width: 300,
                height:'100%',
                title: ''+competenciasD.nombre_clasificacion,
                
                html: '<font class="signi">'+competenciasD.descripcionclasifica+'</font>',
                collapsible: true,
                collapsed:false,
                colspan:2,
                rowspan:suma_clasificacionD              


                   } ,         

                 {
                
                width: 300,
                height:'100%',
                title: ''+competenciasD.subcategoria,
                //bodyStyle: "padding: 5px;",
                html: '<font class="signi">'+competenciasD.descripcionsub+'</font>',
                collapsible: true,
                collapsed:false,
                colspan:2,
                rowspan:sumaD              


                   },
                    {
                           xtype: 'numberfield',
                         id:'CD_'+competenciasD.id_padre,
                         name:'CD_'+competenciasD.id_padre,
                          width:50,
                          height:'100%',
                          hideTrigger: true,
                          keyNavEnabled: false,
                          mouseWheelEnabled: false,
                          colspan:2,
                          readOnly:true,
                          rowspan:sumaD

                         }                    
                );  




          }//fin de else
   
             panel.add(
             {
                  
                width: 400,
                height: '100%',
                title: ''+competenciasD.nombrecompetencia,
                //bodyStyle: "padding: 5px;",
                html: '<font class="signi">'+competenciasD.descripcioncompetencia+'</font>',
                collapsible: true,
                collapsed:true,
                colspan:2,
                 
             },
             {
                xtype: 'numberfield',
                id: 'CDE_'+competenciasD.idcompetencia,
                colspan:2,
                width:50,
                name: 'CDE_'+competenciasD.idcompetencia,
                maxValue: 100,
                minValue: 1,
                value:competenciasD.valordeseable,
                allowBlank: false, 
                listeners: {
                  'change': function(){
                    this.actualizar(jsonResponse);
                  },scope:this
                }
              }
           
             );

   

          }      



panel.add(
             {
                html:'<CENTER><font style="color:#FFFF;font-family:verdana,arial,sans-serif;font-size:16px;"><b>SUMA DE COMPETENCIAS DE DESEMPEÑO</b></font></CENTER>',
                colspan:6,
                height: 30,
                width:'100%'
              },
             {
                xtype: 'numberfield',
                id: 'sumadesempeno',
                colspan:4,
                width:100,
                name: 'sumadesempeno',
                maxValue: 100,
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false,
                minValue: 100,
                readOnly:true
              } 
              ,
              {
                html:'<CENTER><font style="color:#FFFF;font-family:verdana,arial,sans-serif;font-size:16px;"><b>COMPETENCIAS + DESEMPEÑO </b></font></CENTER>',
                colspan:6,
                height: 30,
                width:'100%'
              },
             {
                xtype: 'numberfield',
                id: 'sumatotal',
                colspan:4,
                width:100,
                name: 'sumatotal',
                maxValue: 200,
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false,
                minValue: 200,
                readOnly:true
              }                          
                              
              );


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





          this.add(panel);
          this.actualizar(jsonResponse);

        }



    }/* fin de onload**/
    ,
   actualizar: function(jsonResponse){
    var i, len = jsonResponse.data.length,lend2=jsonResponse.data2.length,elementos,elementos2;
     var suma_total=0;
     var sumapotencial=0;
     var sumadesempeno=0;
     var subclasificacion=new Array();
     var subclasificacion2=new Array();
     var i_sub=0;
     var i_sub2=0;
    /*Calcula la suma de las competencias de potencial*/
    for (var i = 0; i < len; i++) {
      elementos=jsonResponse.data[i];
         
         sumapotencial=sumapotencial+Ext.getCmp('CP_'+elementos.idcompetencia).getValue();
    }
    /* Calcula la suma de las competencias de desempeño */
    for(var k=0;k<lend2;k++){
       elementos2=jsonResponse.data2[k];
        sumadesempeno=sumadesempeno+Ext.getCmp('CDE_'+elementos2.idcompetencia).getValue();

    }
   
   /***************************************** PROCESO OBTENER SUBCATEGORIAS O IDPADRES DE COMPETENCIAS DE POTENCIAL **********************************************************/
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


   /***************************************** PROCESO OBTENER SUBCATEGORIAS O IDPADRES DE COMPETENCIAS DE DESEMPEÑO **********************************************************/
           for(var j=0;j<lend2;j++){
                                              elemento2=jsonResponse.data2[j];
                                              elementobefore=jsonResponse.data2[j-1];
                                              if(j!=0){
                                                if(elemento2.id_padre==elementobefore.id_padre){
                                                  
                                                   }else{
                                                    subclasificacion2[i_sub2]=elemento2.id_padre;
                                                  
                                                    i_sub2++;

                                                   }

                                                 }else{
                                                   subclasificacion2[i_sub2]=elemento2.id_padre;
                                                   
                                                    i_sub2++;
                                                 }


                                      }/* fin de for.*/
  /************************************ CALCULAR SUMAS PARCIALES  DE POTENCIAL *****************************************************/
      var n_subcategoria=subclasificacion.length;
      var n_subcategoria2=subclasificacion2.length;
      for(var h=0;h<n_subcategoria;h++){
                                                var suma_subcategoria=0;
                                                  for(var j=0;j<len;j++){
                                                      elemento=jsonResponse.data[j];
                                                         if(elemento.id_padre==subclasificacion[h])
                                                         {
                                                            suma_subcategoria= suma_subcategoria+Ext.getCmp('CP_'+elemento.idcompetencia).getValue();
                                                         }

                                                  }
                                                  /*set suma de subcategoria*/
                                                  Ext.getCmp('S_'+subclasificacion[h]).setValue(suma_subcategoria);
                                                  //console.log(suma_subcategoria);

                                        }
 /************************************ CALCULAR SUMAS PARCIALES  DE DESEMPEÑO  *****************************************************/
 
 for(var h=0;h<n_subcategoria2;h++){
                                                var suma_subcategoria=0;
                                                  for(var j=0;j<lend2;j++){
                                                      elemento=jsonResponse.data2[j];
                                                         if(elemento.id_padre==subclasificacion2[h])
                                                         {
                                                            suma_subcategoria= suma_subcategoria+Ext.getCmp('CDE_'+elemento.idcompetencia).getValue();
                                                         }

                                                  }
                                                  /*set suma de subcategoria*/
                                                  Ext.getCmp('CD_'+subclasificacion2[h]).setValue(suma_subcategoria);
                                                  //console.log(suma_subcategoria);

                                        }    


    //Ext.getCmp('total_suma').setValue(suma);
    sumatotal=sumadesempeno+sumapotencial;
      Ext.getCmp('sumapotencial').setValue(sumapotencial);
      Ext.getCmp('sumadesempeno').setValue(sumadesempeno);
      Ext.getCmp('sumatotal').setValue(sumatotal);
    Ext.example.msg('Resultado Actual',' SUMA : '+sumatotal);
   },
   submit_form:function(jsonResponse){

     var i, len = jsonResponse.data.length, len2=jsonResponse.data2.length,elementos,elementos2;
     var bandera=true;
     var sumaP=0;
     var sumaD=0;
     var sumaT=0;
     var myponderaciones=new Array();
         for (var i = 0; i < len; i++) {/* construir url*/
            elementos=jsonResponse.data[i];
            sumaP=sumaP+Ext.getCmp('CP_'+elementos.idcompetencia).getValue();
            myponderaciones[i]=elementos.idcompetencia+'_'+Ext.getCmp('CP_'+elementos.idcompetencia).getValue();
             var a=Ext.getCmp('CP_'+elementos.idcompetencia).getValue();
            if( a==null||a==0){
                bandera=false;
                
            }
            
          }

          for(var j=0;j<len2;j++){
            elementos2=jsonResponse.data2[j];
            sumaD=sumaD+Ext.getCmp('CDE_'+elementos2.idcompetencia).getValue();
            myponderaciones.push(elementos2.idcompetencia+'_'+Ext.getCmp('CDE_'+elementos2.idcompetencia).getValue());

      var a=Ext.getCmp('CDE_'+elementos2.idcompetencia).getValue();
            if( a==null||a==0){
                bandera=false;
                
            }            


          }

        sumaT=sumaD+sumaP;




if(bandera==true){
    if(sumaT!=200)  {/* no enviar*/
                                          Ext.MessageBox.show({
                                                                    title:'Status',
                                                                    msg:'La suma de todas las ponderaciones tiene que ser igual a 200',
                                                                    buttons:Ext.MessageBox.OK,
                                                                    icon: Ext.MessageBox.INFO
                                                                });        
    }else{

           var post_ponderaciones=Ext.encode(myponderaciones);
           var post_idgrupoo= Ext.getCmp('idgrupoo').getValue();
           Ext.Ajax.request({
           url:'procesos/guardar_ponderaciones_plan.php?ponderaciones='+post_ponderaciones+'&idgrupo='+post_idgrupoo,
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
      title:'<b>PONDERACION DE COMPETENCIAS DE ACUERDO A GRUPOS OCUPACIONALES: PLAN Y SUCESION  </b>',
      renderTo:'interfazFormCompetenciasplan',
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