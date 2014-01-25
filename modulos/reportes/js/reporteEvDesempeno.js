
Ext.onReady(function(){

/**************************** MODEL ******************************************/



Ext.define('empresasModel',{
  extend:'Ext.data.Model',
  fields:[
      {name:'idempresa',type:'int'},
      {name:'nombreempresa',type:'string'}
  ],
  idProperty:'company'
});


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









/**************************** STORES ******************************************/



var storeEmpresas=Ext.create('Ext.data.JsonStore',{

  model:'empresasModel',
  remoteSort:true,
     proxy:{
                type:'ajax',
                url:'procesos/empresas_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
          }
});


var storeGrupoO=Ext.create('Ext.data.JsonStore',{
    model:'gruposoModel',
    proxy:{
        type:'ajax',
        url:'procesos/gruposO_json.php',
        reader:{
            type:'json',
            root:'data'
        }

    }

});








/************************************ LLAMADAS A STORES PRINCIPALES ****************************************************/
storeEmpresas.load();

    

var panel_central=new Ext.Panel({
	 collapsible:false,
   iconCls:'icon-datos',
   width:'100%',
   border:false,
	 items:[
	 {
                
                    xtype : 'combo',
                    id : 'dataempresa',
                    store : storeEmpresas,
                    displayField:'nombreempresa',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'idempresa',
                    hiddenName : 'idempresa',
                    fieldLabel: '<b> EMPRESA (*)</b>',
                    labelWidth:200,
                    width:600,
                    padding:10,
                    allowBlank: false,
                    emptyText : 'SELECCIONE UNA EMPRESA',
                    listeners: {
                   change: function(field, newVal, oldVal) {
                         storeGrupoO.clearFilter();
                         Ext.getCmp('idgrupoo').clearValue();
                         storeGrupoO.load({params:{id_realiza:newVal}});
                         
                               }
                              }
    },
                {
                        xtype:'combo',
                        id : 'idgrupoo',
                        store :storeGrupoO,
                        displayField:'nombregrupo',
                        forceSelection:false,
                        triggerAction:'all',
                        queryMode:'local',
                        disabled:false,
                        selectOnFocus:false,
                        valueField:'idgrupoo',
                        hiddenName:'idgrupoo',
                        fieldLabel:'<b> GRUPO OCUPACIONAL </b>',
                        labelWidth:200,
                        width:600,
                        allowBlank:false,
                        emptyText:'SELECCIONE UN GRUPO OCUPACIONAL',
                        listeners:{
                               change:function(field,newVal,oldVal)
                               {
     
                               }
                        }
                 },    
 {
    xtype:'button',
    text:'<b>Evaluacion del desempeño</b>',
    width:300,
    height:30,
     handler: function(){
      
       var idGrupo=Ext.getCmp('idgrupoo').getValue();
       if(idGrupo!=null){
          location.href='procesos/evaluacionD.php?idgrupo='+idGrupo;   
       }else{
Ext.MessageBox.show({
                       title:'status',
                       msg:'Seleccione un grupo ocupacional .',
                       buttons:Ext.MessageBox.OK,
                       icon: Ext.MessageBox.INFO
                    });        
       }
       
        
    }
   },
{
 xtype:'hiddenfield',
 
 }                    

    //panelMatrix

	 
	 ]


});

/***     CONTENEDOR   ***/
    
  var main_panel=new Ext.Panel({
      title:'<b>REPORTE DE EVALUACION DEL DESEMPEÑO POR GRUPO OCUPACIONAL</b>',
      renderTo:'interfazrReporte1',
      iconCls:'icon-userconfig',
     width:'97%',
      collapsible:false,  
        items:[
        panel_central
        ]

  })



});