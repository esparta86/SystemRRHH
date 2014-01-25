
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
            url:'procesos/empleados_json.php',
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


function showFormLogin(){

  formLogin=Ext.widget('form',{
    padding:5,
    id:'idloginsession',
layout      :  {
                type:'table',
                columns:4,
               },
  fieldDefaults: {
                labelAlign: 'top',
                labelWidth: 100,
                width: 250,
                labelStyle: 'font-weight:bold'
                },         
        items:[
                            {
                                xtype   :   'panel',
                                width   :   200,  
                                height  :   33,  
                                border  :   true,
                                html    :   '<img src="../../recursos/img/avance.png"/>',
                                colspan :2

                            },            

                            {
                                        xtype           :   'textfield',
                                        fieldLabel      :   '<b>Nombre de usuario</b>',
                                        id              :   'nick_emp',
                                        name            :   'nick_emp',
                                        colspan         :   2,
                                        disabled        :   false,
                                        fieldClass      :   'style_input_inscripcion',
                                        allowBlank      :   false,
                                        enableKeyEvents :   true,
                                        height          :   50,
                                        

                                        listeners       :
                                        {
                                            scope:this,  
                                            specialkey: function(f,e)
                                            {
                                                if (e.getKey() == e.ENTER ) 
                                                {
                                                    Ext.getCmp('pass_emp').focus();
                                                }
                                            }
                                        }
                              },
                               {
                                        xtype           :'hiddenfield',
                                        colspan         :2,

                                },                             
                               {
                                        xtype           :   'textfield',
                                        fieldLabel      :   '<b>Contrase&ntilde;a</b>',
                                        id              :   'pass_emp',
                                        name            :   'pass_emp',
                                        colspan         :   2,
                                        disabled        :   false,
                                        fieldClass      :   'style_input_inscripcion',
                                        allowBlank      :   false,
                                        inputType       : 'password',
                                        height          : 50
                                        
                                 },
                                     {
                                        xtype           :'hiddenfield',
                                        colspan         :2,
                                     }, 
                                      {
                                        
                                        xtype:'button',
                                        text:'<b> Iniciar sesion ...</b>',
                                        colspan: 2,
                                        width:200,
                                        height:40,
                                        handler:function(){
                                              if(Ext.getCmp('idloginsession').getForm().isValid())
                                              {
                                                        Ext.getCmp('idloginsession').getForm().submit
                                                        ({                                                
                                                            waitMsg :  'VALIDANDO DATOS...',
                                                            url     : '../procesos_login/login.php',
                                                            method: 'POST',
                                                            success:function(form,action){

                                                              var result=action.responseText;
                                                              console.log('result: '+result);
                                                              console.log('actio:n'+action);
                                                            switch(action.result.bandera)
                                                                {
                                                                  case 1:
                                                                  Ext.MessageBox.show
                                                                         ({
                                                                                title: 'ingreso exitoso',
                                                                                msg: '<b>Ahora puede proseguir con las evalu</b>',
                                                                                buttons: Ext.MessageBox.OK,
                                                                                icon: Ext.MessageBox.INFO
                                                                        });                                                                                                                                       

                                                                  break;

                                                                  case 2:
                                                                        ({
                                                                               title: 'ERROR DE INGRESO DE DATOS',
                                                                                msg: '<b>USUARIO O CONTRASEÑA INCORRECTOS, INTENTE DE NUEVO!!!</b>',
                                                                                buttons: Ext.MessageBox.OK,
                                                                                icon: Ext.MessageBox.ERROR
                                                                        });
                                                                  break;                                                                  


                                                                }                                                              


                                                            },
                                                            failure: function(response)
                                                            {
                                                                 Ext.getCmp('pass_emp').focus(false,1000);
                                                                 Ext.MessageBox.show
                                                                 ({
                                                                        title: 'ERROR DE SISTEMA',
                                                                        msg: '<b>OCURRIO  UN ERROR CON EL SERVIDOR DEL SISTEMA!!!</b>',
                                                                        buttons: Ext.MessageBox.OK,
                                                                        icon: Ext.MessageBox.WARNING
                                                                });
                                                                
                                                            }                                                            



                                                        });
                                              }
                                              else
                                                    {
                                                        Ext.getCmp('pass_emp').focus(false,1000);
                                                         Ext.MessageBox.show
                                                         ({
                                                            title   : 'verificar errores',
                                                            msg     : '<b>Ingrese su nombre de usuario y contraseña!</b>',
                                                            buttons : Ext.MessageBox.OK,
                                                            icon    : Ext.MessageBox.ERROR
                                                         });   
                                                         
                                                    }



                                        }
                                      }                                                                     

        ]
          

  });

  winLogin =Ext.widget('window',{
        title:'INICIO DE SESION',
        closable:false,
        width:600,
        height:200,
        layout:'fit',
        resizable:true,
        modal:true,
        items:formLogin

    });

  winLogin.show();




}/*fin de funcion showFormLogin*/

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
                        '<p><FONT STYLE="color:#0000FF;font-size:18px;padding-left: 20;"><B>INSTRUCCIONES</B></FONT>'+ 
                        '</P><br><p><FONT STYLE="color:#0000FF;font-size:16px;padding-left: 20;">Para realizar la evaluación de desempeño lea las competencias y elementos observables que se presentan a continuaci&oacute;n.<br>'+
                        'Seleccione para cada competencia la puntuacion que corresponda a:<br>'+
                        '<br></font><ol align="center"><li>1. Iniciado en la competencia.</li><li>2. Pr&oacute;ximo a cumplir las expectativas.</li>'+
                        '<li>3. Conforme a las expectativas.</li><li>4. Supera las expectativas.</li><li>5. Muy por encima de las expectativas.</li>'+
                        '</ol></font></p></font>'+
                        '<p><FONT STYLE="color:#0000FF;font-size:16px;padding-left: 20;"><br>Aseg&uacute;rese que la evaluaci&oacute;n sea justa: no permita que sus sentimientos personales influyan.<br> Esto debe ser hecho con mucha <b>RESPONSABILIDAD</b>,<b> OBJETIVIDAD Y COMPROMISO</b>'+
                        '</font></p><br><p><FONT STYLE="color:#0000FF;font-size:16px;padding-left: 20;">En la columna “COMENTE SU CALIFICACI&Oacute;N ” debe justificar su elecci&oacute;n con ejemplos reales.'+
                          '<br>Despu&eacute;s de las evaluaciones, jefes y colaboradores tendr&aacute;n una reuni&oacute;n para revisar los puntos fuertes y oportunidades de mejora.'+
                        '</font></p><br>',
                        width:'70%',
                        height:320,
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
  loadComponentes:function(idcargo){
    
        //console.log(idcargo);
        Ext.Ajax.request({
          url:'procesos/componentes_json.php?codigoemp='+idcargo,
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
                                              style: 'margin: 0px 3px 5px 5px;'
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
                html:'<CENTER><font style="color:#FFfF;font-family:verdana,arial,sans-serif;font-size:16px;"><b>COMENTE SU CALIFICACI&Oacute;N</b></font></CENTER>',
                colspan:2,
                height: 30,
                width:'300'
              }              
          );
           

var observacionDelEvaluador='';

              
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
                      width: 300,
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
                
                width: 300,
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

      /*obtener observaciones del evaluador si las hay*/
      observacionDelEvaluador=competencias.observacion;


             panel.add(
             {
                id:'P_'+competencias.idcompetencia,
                name:'P_'+competencias.idcompetencia,
                width: 400,
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
                    value:competencias.valor,

                  listConfig: {
                  getInnerTpl: function() {
                    return '<div <font style="font-size:12px;" data-qtip="{valor} . {descripcion}">{valor} </font></div>';
                  }
                },
                    
                    
                    width:60,
                    colspan:2,
                    allowBlank: false,
                    emptyText : 'SELECCIONE',
                    

              },
              {
                fieldLabel: '',
                xtype:'textarea',
                id:'T_'+competencias.idcompetencia,
                name:'T_'+competencias.idcompetencia,                
                allowBlank: false,
                colspan:2,
                width:'250',
                height:'50%',
                value:''+competencias.hechos
                
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
                
                html:'<CENTER><font style="color:#FFfF;font-family:verdana,arial,sans-serif;font-size:16px;"><b>OBSERVACIONES Y/0 COMENTARIOS</b></font></CENTER>',
                colspan:10,
                height: 30,
                width:'100%',
                padding:5,
                border:false
              },
           {
                
                html:'<CENTER><font style="color:#FFfF;font-family:verdana,arial,sans-serif;font-size:14px;"><b>COMENTARIOS DEL EVALUADOR/A</b></font></CENTER>',
                colspan:10,
                height: 30,
                width:'100%',
                padding:5,
                border:false
                  },
            {
                
                html:'<CENTER><font style="color:#FFfF;font-family:verdana,arial,sans-serif;font-size:10px;"><b>Si usted desea agregar comentarios o recomendaciones no contemplados en este formulario, puede hacerlo a continuaci&oacute;n.</b></font></CENTER>',
                colspan:10,
                height: 30,
                width:'100%',
                padding:5,
                border:true
                  },
                {
                xtype:'hiddenfield',
                   padding:10,
                    colspan:2,              

            } ,                 
                  {
                
                xtype: 'htmleditor',
                id:'observacionevaluador',
                name:'observacionevaluador',                
                enableColors: false,
                allowBlank:false,
               
                colspan:6,
                height:200,
                width:'100%',
                enableAlignments: false,
                value:observacionDelEvaluador,
                border:true 

                                  

              },
            {
                xtype:'hiddenfield',
                   padding:20,
                    colspan:2,              

            }                                 

              ,

            {
          xtype:'hiddenfield',
                   padding:20,
                    colspan:2,              

            },
          {
          xtype:'hiddenfield',
                   
                    colspan:10,              

            },  
            {
xtype:'hiddenfield',
                   
                    colspan:4,              

             },          
                      
             /* {

                dockedItems: [
                          {

                             xtype: 'toolbar',
                              dock: 'top',
                              items: [
                                  {
                                      xtype: 'button',
                                      text: '<b>ENVIAR EVALUACION</b>',
                                      iconCls: 'icon-OK',
                                      handler: function(){
                                        this.submit_formulario(jsonResponse);
                                      },scope:this
                                                                    
                                  },
                                  '->',
                               
                              ]
                          }
                      ],colspan:6

             }*/
                            {
                                      xtype: 'button',
                                      text: '<b>ENVIAR EVALUACION</b>',
                                      iconCls: 'icon-OK',
                                      colspan:2,
                                      handler: function(){
                                        this.submit_formulario(jsonResponse);
                                        
                                      },scope:this
                                                                    
                                  }             
             ,{
xtype:'hiddenfield',
                   
                    colspan:4,              

             },
 {
                
                html:'<CENTER><font style="color:#FFfF;font-family:verdana,arial,sans-serif;font-size:16px;"><b>Avance y Desempeño</b> visitanos en www.avanceydesempeno.com  o ll&aacute;manos al (503)2262-2861</font></CENTER>',
                colspan:10,
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
      var bandera2=true;
      var evaluacionxempleado=new Array();
      var hechosxcompetencia=new Array();

            for(var i=0;i<len;i++){
              elementos=jsonResponse.data[i];
              evaluacionxempleado[i]=elementos.idcompetencia+'_'+Ext.getCmp('V_'+elementos.idcompetencia).getValue()+'_'+Ext.getCmp('T_'+elementos.idcompetencia).getValue();
              //hechosxcompetencia[i]=elementos.idcompetencia+'_'+Ext.getCmp('T_'+elementos.idcompetencia).getValue();
              var a=Ext.getCmp('V_'+elementos.idcompetencia).getValue();
              var b=Ext.getCmp('T_'+elementos.idcompetencia).getValue();
                        if( a==null||a==0||b==null||b==0){
                            bandera=false;
                            
                        }
              if(a<=0||a>5){
                bandera2=false;
              } 
            //console.log('competencia : '+evaluacionxempleado[i]+' hechos :'+hechosxcompetencia[i]);             

            }/* fin de for.*/

            var observaciones=Ext.getCmp('observacionevaluador').getValue();
            
            if(observaciones==null||observaciones==0||observaciones==''){
              bandera=false;
                            
            }
        if(bandera2==true){
            if(bandera==true){
              
              var post_evaluacionxempleado=Ext.encode(evaluacionxempleado);
              var post_observacionxempleado=Ext.getCmp('observacionevaluador').getValue();
              var post_evaluado=Ext.getCmp('empleado').getValue();
              
              
                    Ext.Ajax.request({
                               url:'procesos/guardar_ponderacionesxempleado.php?evaluacion='+post_evaluacionxempleado+'&codigoe='+post_evaluado+'&observacion='+post_observacionxempleado,
                               method:'POST',
                                     success: function(result,request){
                           
                                                var jsonData=JSON.parse(result.responseText);
                                                                       var bandera=jsonData[0].bandera;
                                                                       var msj=jsonData[0].msg;
                           
                                                                  if (bandera==1) {
                                                                              storeEmpleados.clearFilter();
                                                                              storeEmpleados.load();

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

                                                                        if(bandera==4){
                                                                          showFormLogin();
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
                                                                msg:'Por favor complete todos los campos del formulario.',
                                                                buttons:Ext.MessageBox.OK,
                                                                icon: Ext.MessageBox.INFO
                                                                });                

            }

          }else{

 Ext.MessageBox.show({
                                                               title:'Error de ingreso de datos',
                                                                msg:'Unicamente puede asignar calificaciones entre 1 y 5 para cada competencia.',
                                                                buttons:Ext.MessageBox.OK,
                                                                icon: Ext.MessageBox.INFO
                                                                });             

          }
            



   }


});

storeEmpleados.clearFilter();
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
      title:'<b>EVALUACION DEL DESEMPEÑO POR EMPLEADO </b>',
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