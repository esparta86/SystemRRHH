
Ext.onReady(function(){
  Ext.tip.QuickTipManager.init();

/************************************************   MODEL *************************************************************/

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

/*************************************************  STORE *******************************************************************/

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



/************************************** LLAMDA A STORES**************************************************/
storeCargos.load();

/***************************************** FUNCIONES *********************************************************************/

function clear_formulario(){

  
}

function llenarDescripcionCargo(codigocargo){
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Cargando ..."});
      myMask.show();
       Ext.getCmp('cod_cargo_evaluar').setValue(codigocargo);
      Ext.Ajax.request({
        url:'procesos/info_cargo_json.php?codigo='+codigocargo,
        method:'POST',
        waitMsg: 'Loading...',
        success: function(result,request){
         myMask.destroy();

          var jsonData=JSON.parse(result.responseText);
          var areao=jsonData[0].areaOr;
          var repo=jsonData[0].reporta;
          var bandera=jsonData[0].estado;
          if(bandera==false){//sin datos.
             //Ext.Msg.alert('SIN DATOS', "la descripcion del cargo no ha sido llenada."); 
              Ext.getCmp('area_organizativa').setValue('...');
              Ext.getCmp('reporta_a').setValue(repo);
              Ext.getCmp('supervisa_a').setValue('...');
              Ext.getCmp('experiencia_min').setValue('...');
              Ext.getCmp('nivela').setValue('...');
              Ext.getCmp('proposito').setValue('...');
              Ext.getCmp('funciones').setValue('...');
              Ext.getCmp('subfunciones').setValue('...');

          }else{
              Ext.getCmp('area_organizativa').setValue(jsonData[0].areaOr);
              Ext.getCmp('reporta_a').setValue(jsonData[0].reporta);
              Ext.getCmp('supervisa_a').setValue(jsonData[0].supervisa);
              Ext.getCmp('experiencia_min').setValue(jsonData[0].experiencia);
              Ext.getCmp('nivela').setValue(jsonData[0].nivel);
              Ext.getCmp('proposito').setValue(jsonData[0].proposito);
              Ext.getCmp('funciones').setValue(jsonData[0].funciones);
              Ext.getCmp('subfunciones').setValue(jsonData[0].subfun);            


          }

          

        }//fin del success

      });

}//fin de funcion llebarDescripcionCargo

/********************************************************************************************************************/

var formDescriptor=Ext.widget('form',{
            padding:10,
            width:'100%',
            autoScroll:true,
                               
                  
              defaults:{
                            frame:true,
                            border: false,
                            style: 'margin: 10px 10px 10px 10px;',
                            anchor: '95%'

                        },  
                        items:[

                        {
                        html:'<font style="color:#81C10E;font-family:verdana,arial,sans-serif;font-size:20px;"><b>I. GENERALES DEL CARGO </b></font>',
                        width:'80%',
                        height:30
                      },
                      {
                    xtype:'hiddenfield',
                    id:'cod_cargo_evaluar',
                    name:'cod_cargo_evaluar'
                       },

                       {
                          xtype:'textfield',
                          id:'area_organizativa',
                          fieldLabel:'<b>AREA ORGANIZATIVA</b>' ,
                          anchor:'60%',
                          allowBlank:false
                          

                        },                   

                        {
                          xtype:'textfield',
                          id:'reporta_a',
                          fieldLabel:'<b>REPORTA A</b>' ,
                          anchor:'60%',
                          allowBlank:false
                          

                        },{
                           xtype:'textfield',
                           id:'supervisa_a',
                           fieldLabel:'<b>SUPERVISA A </b>',
                           anchor:'60%',
                           allowBlank:false
                           

                         },
                         {
                          xtype:'textareafield',
                          id:'experiencia_min',
                          grow:true,
                          fieldLabel:'<b>EXPERIENCIA MINIMA</b>',
                          anchor:'60%',
                          allowBlank:false
                         },
                        {
                          xtype:'textareafield',
                          id:'nivela',
                          grow:true,
                          fieldLabel:'<b>NIVEL ACADEMICO</b>',
                          anchor:'60%',
                          allowBlank:false

                         },                         
                      {
                        html:'<font style="color:#81C10E;font-family:verdana,arial,sans-serif;font-size:20px;"><b>II. ANALISIS FUNCIONAL </b></font>',
                        width:'80%',
                        height:30
                      },
                        {
                          xtype:'textareafield',
                          id:'proposito',
                          grow:true,
                          fieldLabel:'<b>PROPOSITO CLAVE</b>',
                          anchor:'60%',
                          allowBlank:false
                         },
                         {
                          xtype:'htmleditor',
                        enableSourceEdit:false,
                        enableColors:false,
                        enableLinks:false,
                        fontFamilies:["Arial","Tahoma","Verdana"],
                          id:'funciones',
                          autoScroll:false,
                          grow:true,
                          fieldLabel:'<b>FUNCIONES</b>',
                          anchor:'60%',
                          allowBlank:false,
                          height:200

                         },
                         {
                          xtype:'htmleditor',
                        enableSourceEdit:false,
                        enableColors:false,
                        enableLinks:false,
                        fontFamilies:["Arial","Tahoma","Verdana"],
                          id:'subfunciones',
                          grow:true,
                          fieldLabel:'<b>  SUB - FUNCIONES</b>',
                          anchor:'60%',
                          allowBlank:false,
                          height:200,
                          
                         }                                                 








                        ] ,
                        buttons:[
                        {
                          text:'<b>GUARDAR DESCRIPCION</b>',
                          scale:'large',
                          iconCls:'icon-save',
                          handler: function(){
                              if(this.up('form').getForm().isValid()){
                              var post_codigopuesto=Ext.getCmp('cod_cargo_evaluar').getValue();
                              var post_area_o=Ext.getCmp('area_organizativa').getValue();
                              var post_reporta_a=Ext.getCmp('reporta_a').getValue();
                              var post_supervisa=Ext.getCmp('supervisa_a').getValue();
                              var post_experiencia=Ext.getCmp('experiencia_min').getValue();
                              var post_nivela=Ext.getCmp('nivela').getValue();
                              var post_proposito=Ext.getCmp('proposito').getValue();
                              var post_funciones=Ext.getCmp('funciones').getValue();
                              var post_subfunciones=Ext.getCmp('subfunciones').getValue();

                                               Ext.Ajax.request({
                                               url:'procesos/guardarModificarDescrip.php?post_codigopuesto='+post_codigopuesto+'&post_area_o='+post_area_o+'&post_reporta_a='+post_reporta_a+'&post_supervisa='+post_supervisa+'&post_experiencia='+post_experiencia+'&post_nivela='+post_nivela+'&post_proposito='+post_proposito+'&post_funciones='+post_funciones+'&post_subfunciones='+post_subfunciones,
                                               method:'POST',
                                                     success: function(result,request){
                                           
                                                                  var jsonData=JSON.parse(result.responseText);
                                                                                       var bandera=jsonData[0].bandera;
                                                                                       var msj=jsonData[0].msg;
                                           
                                                                                  if (bandera==1) {
                                                                                              // store......load();
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

                                                                                        if(bandera==3){
                                                                                                Ext.MessageBox.show({
                                                                                                    title:'Sin modificar',
                                                                                                    msg:msj,
                                                                                                    buttons:Ext.MessageBox.OK,
                                                                                                    icon: Ext.MessageBox.WARNING
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
                                        Ext.Msg.alert('Warning', "Por favor, complete el formulario"); 
                                        } 


                          }

                        },
{
                          text:'<b>LIMPIAR FORMULARIO</b>',
                          scale:'large',
                          iconCls:'icon-OK',
                        }                        
                        ]                                

           });



/************ PANELES ***********/

var panel_central=new Ext.Panel({
	 title:'DESCRIPCION DEL PUESTO',
	 collapsible:false,
   iconCls:'icon-datos',
   width:'100%',
   height:'95%',

 defaults:{
                            
                            border: true,
                            style: 'margin: 10px 10px 5px 10px;',
                            anchor: '100%'

                        }   ,
	 items:[
	 {
                
                    xtype : 'combo',
                    id : 'dataempresa',
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
                    //colspan:4,
                    allowBlank: false,
                    emptyText : 'SELECCIONE UN CARGO',
                    listeners: {
                   change: function(field, newVal, oldVal) {
                      /* obtener id de empresa */
                          llenarDescripcionCargo(newVal);

                     }
                    }
                
            },
            
          
              formDescriptor

            

	 
	 ]


});

/***     CONTENEDOR   ***/
    
  var main_panel=new Ext.Panel({
      title:'<b>GESTION DE USUARIOS</b>',
      renderTo:'interfazGestionAdmin',
      iconCls:'icon-userconfig',
     width:'100%',
      collapsible:false,  
        items:[
        
        panel_central
        ]

  })

});