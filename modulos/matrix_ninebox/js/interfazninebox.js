
Ext.onReady(function(){

Ext.QuickTips.init();
  
  Ext.apply(Ext.QuickTips.getQuickTip(), {showDelay: 500, dismissDelay: 20000});
/************************ MODEL *********************/



Ext.define('DepartamentoModel',{
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

/********************* STORES***************************/

var storeDepartamentos=Ext.create('Ext.data.JsonStore',{
    model:'DepartamentoModel',
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



/*************************************************/

Ext.define('Ext.ux.FormularioMatrixNine',{
  extend:'Ext.form.Panel',

  initComponent:function(){
      Ext.apply(this,{
        //autoScroll:true,
        border:false,
        items:[
           {
                     xtype:'form',
                     id:'formMatrix',
                     padding:10,
                     
                     defaults:{
                      



                     },
                     items:[
                        {
                        padding:5,
                        html:'<font style="color:#0000FF;font-family:verdana,arial,sans-serif;font-size:14px;">'+
                        ' La matriz “9 Boxes“ es una forma visual de ubicar a los talentos en la institución. Al realizar la matriz “9 Box”, nos encontraremos con cuatro grupos. El enfoque se da en: LISTA DE OBSERVACIÓN, HUESOS DUROS, FORTALECIDOS Y CRECIMIENTO ACELERADO </font>',
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
  set_departamento: function(departamento_cod){
        this.loadComponentes(departamento_cod);
        
  }
  ,
  loadComponentes:function(departamento_cod){
       
  Ext.Ajax.request({
          url:'procesos/componentesMatrix_json.php?id_dpto='+departamento_cod,
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


console.log(jsonResponse.limiteI);

  panelMatrix=Ext.create('Ext.panel.Panel', {
                                      width: '100%',
                                      
                                      defaults: {
                                          
                                              frame:false,
                                              height: 25,
                                              border: true,
                                              style: 'margin: 3px 3px 3px 3px;'
                                      },
                                      layout: {
                                      type: 'table',
                                      columns: 5, 
                                      tdAttrs: {
                                        valign: 'middle'
                                      }
                                    }
                                      
                                    }); 


  panelMatrix.add(
 {
                            
                            width: 100,
                            html: '<font class="signi"> <br><br><br><br><br>D<br>E<br>S<br>E<br>M<br>P<br>E<br>Ñ<br>O</font>',
                            collapsible: false,
                            collapsed:false,
                            colspan:1,
                            rowspan:3,
                            height:600,
                            bodyStyle: {
                                      'text-align':'center',
                                      'font-size': '20px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                            



  },      
{
                            
                            width: 100,
                            height:200,
                            html: '<font class="signi"><br><br>'+jsonResponse.limiteS+'</font>',
                            collapsible: false,
                            collapsed:false,
                            colspan:1,
                          bodyStyle: {
                                      'text-align':'center',
                                      'font-size': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'padding': '30px'
                                      
                                    }                                      
 },
 /* CUADRANTE 7*/
 {
                            
                            width: 300,
                            height:200,
                            title: '<CENTER>HUEZOS DURO</CENTER>',
                            html: '<font class="signi"> '+jsonResponse.cuadrante7+'</font>',
                            collapsible: true,
                            collapsed:false,
                            autoScroll:true,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#a0e020',
                                      'font-size': '12px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                            
                                          
 },
 /* CUADRANTE 8*/
{
                            
                            width: 300,
                            height:200,
                            title: '<CENTER>FORTALECIDOS</CENTER>',
                            html: '<font class="signi"> '+jsonResponse.cuadrante8+' </font>',
                            collapsible: true,
                            collapsed:false,
                            autoScroll:true,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#9cccfc',
                                      'font-size': '12px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                            
 },

/* CUADRANTE 9*/
{
                            
                            width: 300,
                            height:200,
                            title: '<CENTER>CRECIMIENTO ACELERADO</CENTER>',
                            html: '<font class="signi"> '+jsonResponse.cuadrante9+'</font>',
                            collapsible: true,
                            collapsed:false,
                            colspan:1,
                            autoScroll:true,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#f87888',
                                      'font-size': '12px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                            
                               
                            }
                            ,

 {
                            
                            width: 100,
                            height:200,
                            html: '<font class="signi"><br><br>'+jsonResponse.limiteIn+' </font>',
                            collapsible: false,
                            collapsed:false,
                            colspan:1,
                        bodyStyle: {
                                      'text-align':'center',
                                      'font-size': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'padding': '30px'

                                      
                                    }                                        
 },
 /* CUADRANTE 4*/
 {
                            
                            width: 300,
                            height:200,
                            title: '<CENTER>HUEZOS DURO</CENTER>',
                            html: '<font class="signi"> '+jsonResponse.cuadrante4+' </font>',
                            collapsible: true,
                            collapsed:false,
                            autoScroll:true,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#a0e020',
                                      'font-size': '12px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                            
                                     
 },
 /* CUADRANTE 5 */
{
                            
                            width: 300,
                            height:200,
                            title: '<CENTER>FORTALECIDOS</CENTER>',
                            html: '<font class="signi"> '+jsonResponse.cuadrante5+' </font>',
                            collapsible: true,
                            autoScroll:true,
                            collapsed:false,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#9cccfc',
                                      'font-size': '12px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                                        
 },
 /* CUADRANTE 6*/
{
                            
                            width: 300,
                            height:200,
                            title: '<CENTER>FORTALECIDOS</CENTER>',
                            html: '<font class="signi"> '+jsonResponse.cuadrante6+' </font>',
                            collapsible: true,
                            collapsed:false,
                            autoScroll:true,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#9cccfc',
                                      'font-size': '12px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                            
 }
,

 {
                            
                            width: 100,
                            height:200,
                            html: '<font class="signi"><br><br> '+jsonResponse.limiteI+' </font>',
                            collapsible: false,
                            collapsed:false,
                            colspan:1,
                        bodyStyle: {
                                      'text-align':'center',
                                      'font-size': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'padding': '30px'
                                      
                                    }                                        
 },
 /* CUADRANTE 1 */
 {
                            
                            width: 300,
                            height:200,
                            title: '<CENTER>NO ENTRAN</CENTER>',
                            autoScroll:true,
                            html: '<font class="signi"> '+jsonResponse.cuadrante1+'</font>',
                            collapsible: true,
                            collapsed:false,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#606365',
                                      'font-size': '12px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                            
 },
 /* CUADRANTE 2*/
{
                            
                            width: 300,
                            height:200,
                            title: '<CENTER>LISTA OBSERVACION</CENTER>',
                            html: '<font class="signi"> '+jsonResponse.cuadrante2+'</font>',
                            collapsible: true,
                            collapsed:false,
                            autoScroll:true,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#A4A9AD',
                                      'font-size': '12px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                                          
 },
 /* CUADRANTE 3*/
{
                            
                            width: 300,
                            height:200,
                            title: '<CENTER>LISTA OBSERVACION</CENTER>',
                            html: '<font class="signi"> '+jsonResponse.cuadrante3+' </font>',
                            collapsible: true,
                            collapsed:false,
                            autoScroll:true,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#A4A9AD',
                                      'font-size': '12px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                                
  },
  {

                xtype:'hiddenfield',
                   padding:10,
                    colspan:2,              

},
{
                            
                            width: 300,
                            height:50,
                            html: '<font class="signi"><CENTER> '+jsonResponse.limiteI+'</CENTER></font>',
                            collapsible: false,
                            collapsed:false,
                            colspan:1,
                        bodyStyle: {
                                      'text-align':'center',
                                      'font-size': '20px',
                                      'text-shadow': '1px 1px 1px #777'
                                      
                                    }                                         
 },
 {
                            
                            width: 300,
                            height:50,
                            html: '<font class="signi"><CENTER> '+jsonResponse.limiteIn+' </CENTER></font>',
                            collapsible: false,
                            collapsed:false,
                            colspan:1,
                          bodyStyle: {
                                      'text-align':'center',
                                      'font-size': '20px',
                                      'text-shadow': '1px 1px 1px #777'
                                      
                                    }                                         
 },
 {
                            
                            width: 300,
                            height:50,
                            html: '<font class="signi"><CENTER> '+jsonResponse.limiteS+'</CENTER> </font>',
                            collapsible: false,
                            collapsed:false,
                            colspan:1,
                        bodyStyle: {
                                      'text-align':'center',
                                      'font-size': '20px',
                                      'text-shadow': '1px 1px 1px #777'
                                      
                                    }                                                        
                                        
 },
 {

                xtype:'hiddenfield',
                   padding:10,
                    colspan:2,              

}, 
  {
                            
                            
                            html: '<font class="signi"> POTENCIAL</font>',
                            collapsible: false,
                            collapsed:false,
                            colspan:3,
                            height:50,                           
                            bodyStyle: {
                                      'text-align':'center',
                                      'font-size': '20px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                            



  },
{

                xtype:'hiddenfield',
                   padding:10,
                    colspan:5,              

},
{

                xtype:'hiddenfield',
                   padding:10,
                    colspan:3,              

},
{
                            
                            width: 300,
                            height:200,
                            title: 'LISTA OBSERVACION',
                            html: '<font class="signi"> Bajo desempeño pero con un alto potencial. Estas personas no entran en el Plan de Sucesión y Carrera por su bajo nivel de desempeño, sin embargo entran en una lista de observación puesto que en cualquier momento, dependiendo de su desempeño pudieran pasar al grupo de los empleados fortalecidos. Son personas que no pueden ser promovidas en el momento actual </font>',
                            collapsible: true,
                            collapsed:true,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#A4A9AD',
                                      'font-size': '12px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'
                                    }                                
  },
  {
                            
                            width: 300,
                            height:200,
                            title: 'CRECIMIENTO ACELERADO',
                            html: '<font class="signi"> Alto desempeño con muy alto potencial de liderazgo, talento crítico. Si salen de la empresa, hay un sentido alto de pérdida debido a su excelente desempeño y su potencial significativo de crecimiento, así como al valor agregado que daba a su trabajo y su multifuncionalidad. Son personas que pueden ser promovidas a dos niveles superiores </font>',
                            collapsible: true,
                            collapsed:true,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#f87888',
                                      'font-size': '12px',
                                      'padding': '20px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'                                      
                                    }                                
  },
  {

                xtype:'hiddenfield',
                   padding:10,
                    colspan:3,              

},
  {
                            
                            width: 300,
                            height:200,
                            title: 'FORTALECIDOS',
                            html: '<font class="signi"> Alto desempeño con potencial de liderazgo, talento crítico, si salen de la empresa, hay un sentido alto de pérdida debido a su excelente desempeño y su potencial significativo de crecimiento. Son personas que pueden ser promovidas a un nivel superior. </font>',
                            collapsible: true,
                            collapsed:true,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#9cccfc',
                                      'font-size': '12px',
                                      'padding': '5px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'                                                                            
                                    }                                
  },
{
                            
                            width: 300,
                            height:200,
                            title: 'HUEZOS DUROS',
                            html: '<font class="signi"> Son talentos valiosos, consistentes, confiables y sólidos, buen desempeño , son el conocimiento de la institución. Es gente cuyo conocimiento técnico ayudará a desarrollar a la institución. Si salen de la empresa, hay un sentido alto de pérdida debido a su alto conocimiento técnico. Tienen habilidad para desarrollarse en otra posición similar a la actual en cuanto a tamaño y alcance de la misma </font>',
                            collapsible: true,
                            collapsed:true,
                            colspan:1,
                            bodyStyle: {
                                      'color': '#000',
                                      'background': '#a0e020',
                                      'font-size': '12px',
                                      'padding': '5px',
                                      'text-shadow': '1px 1px 1px #777',
                                      'box-shadow': 'inset 0 0 10px #157AB6'                                                                                                                 
                                    }                                
  }






 ); 


 







 this.add(panelMatrix);
    

       }/*fin del success*/

    }/* fin de onload**/
    ,
 
   submit_formulario:function(jsonResponse){
      


   }


});


storeDepartamentos.load();


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



var tabs = Ext.widget({
        xtype: 'form',
        id: 'tabForm',
    renderTo:'interfazFormNineBox',
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
                    title:'MATRIX NINE BOX',
                    tabConfig:{
                    cls: 'x-btn-text-icon',
                    iconCls: 'icon-subcategoria'
                    },
                        defaults:{
                        bodyStyle:'padding:0px',
                            anchor: '90%',
                            bodyStyle:'background:#DFE9F6;'
                        
                        },
                        items:[

                                       {
                                                      
                                                          xtype : 'combo',
                                                          id : 'departamento',
                                                          store : storeDepartamentos,
                                                          displayField:'departamento',
                                                          forceSelection : false,
                                                          triggerAction : 'all',
                                                          queryMode:'local',
                                                          disabled:false,
                                                          selectOnFocus : false,
                                                          valueField:'id_dpto',
                                                          value:0,
                                                         hiddenName : 'id_dpto',
                                                          fieldLabel: '<b>DEPARTAMENTO (*)</b>',
                                                          labelWidth:200,
                                                          width:550,
                                                          anchor:'50%',
                                                          
                                                          allowBlank: false,
                                                          emptyText : 'SELECCIONE UN DEPARTAMENTO',
                                                          padding:10,
                                                          
                                                          listeners: {
                                                         
                                                         change: function(field, newVal, oldVal) {
                                                                               
                                                            panel_medio.removeAll(true);
                                                             var FormularioEval=new Ext.ux.FormularioMatrixNine();
                                                             FormularioEval.set_departamento(newVal);
                                                             panel_medio.add(FormularioEval);
                                                             panel_medio.doLayout();
                                                             panel_medio.update();

                                                             
                                                              },scope:this

                                                          }
                                                      
                                                  },{
                                                     xtype:'button',
                                                     text:'<b>Actualizar Matriz</b>',
                                                     anchor:'10%',
                                                     iconCls: 'icon-OK',
                                                     handler:function(){
                                                        var depto=Ext.getCmp('departamento').getValue();
                                                        panel_medio.removeAll(true);
                                                            var FormularioEval=new Ext.ux.FormularioMatrixNine();
                                                             FormularioEval.set_departamento(depto);
                                                             panel_medio.add(FormularioEval);
                                                             panel_medio.doLayout();
                                                             panel_medio.update();                                                        

                                                     }


                                                  },


                                            panel_medio                        
                            
                        
                        
                        ]
                    
                    }

            ]
         }
      
      ]

  });




});