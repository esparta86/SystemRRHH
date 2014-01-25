


Ext.onReady(function(){
    

 
/******************************************** MODEL********************************************************************/
/****************************************************************************************************************/

    Ext.define('cargosModel',{
        extend:'Ext.data.Model',
        fields:[
            {
                name:'idcargo',type:'int'
            },
            {
                name:'id_dpto',type:'int'
            },
            {
                 name:'departamento',type:'string'
            },
            {
                 name:'nombrepuesto',type:'string'
            },
            {
                 name:'jerarquia',type:'int'
            }
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




/******************************************** STORES ********************************************************************/
/****************************************************************************************************************/

var storeCargos=Ext.create('Ext.data.JsonStore',{
      model:'cargosModel',
      pageSize:5,
       remoteSort:true,
       
          proxy:{
                type:'ajax',
                url:'procesos/cargos.php',
                reader:{
                    type:'json',
                    root:'data'
                }
               
          }


});


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
 

/******************************************** SEL MODEL********************************************************************/
/****************************************************************************************************************/
    
        var sm_cargos = new Ext.selection.CheckboxModel( {
        listeners:{
            selectionchange: function(selectionModel, selected, options){
                // Bunch of code to update store
                    //console.log(selectionModel, selected, options);
                    var record = selected[0];
                //alert(record.get('idactividades'));
                    if (record!=undefined){
                        showformCargos(0);
                        formCompetencias.getForm().loadRecord(record);
                       
                    }
            }
        }
    });
   

       

/******************************************** formularios********************************************************************/
/****************************************************************************************************************/






  function showformCargos(accion){
     storeDepto.load();
     //storeGrupoO.load();

    formCompetencias=Ext.widget('form',{
        padding:5,
            defaults: {
            anchor: '100%'
        },
        items:[
        {
            xtype:'fieldset',
            title: 'Informacion General del Cargo',

            defaultType: 'textfield',
            layout: 'anchor',
            items:[
            {
                xtype:'hiddenfield',
                id:'idcargo',
                name:'idcargo'
            },
           
              {
                xtype:'textfield',
                fieldLabel:'NOMBRE DEL CARGO',
                id:'nombrepuesto',
                name:'nombrepuesto',
                allowBlank:false,
                anchor:'85%'
              },
                  {
                xtype:'numberfield',
                fieldLabel:'JERARQUIA',
                id:'jerarquia',
                minValue:0,
                maxValue:20,
                anchor:'40%',
                allowBlank:false
                 }
            ]
        },{
            xtype:'fieldset',
            title:'Informacion adicional',
            layout:'anchor',
            defaults:{
                anchor:'85%'
            },
            items:[
            {
                
                    xtype : 'combo',
                    id : 'id_dpto',
                    store : storeDepto,
                    displayField:'departamento',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'id_dpto',
                    hiddenName : 'id_dpto',
                    fieldLabel: 'DEPARTAMENTO AL QUE PERTENECE (*)',
                    width:400,
                    colspan:4,
                    allowBlank: false,
                    emptyText : 'SELECCIONE UN DEPARTAMENTO'
                
            }
            
             

             

            ]
        }

        ],
        buttons:[
        {
            text:'Registrar',
            iconCls: 'icon-OK',
            handler: function(){

                if(this.up('form').getForm().isValid()){
                        var post_nombrepuesto=Ext.getCmp('nombrepuesto').getValue();
                        var post_jerarquia=Ext.getCmp('jerarquia').getValue();
                        var post_iddpto=Ext.getCmp('id_dpto').getValue();
                        



                        if(accion!=0){//ingresar nueva competencia
                            
                                Ext.Ajax.request({
                                    url:'procesos/guardar_cargo.php?puesto='+post_nombrepuesto+'&jerarquia='+post_jerarquia+'&id_dpto='+post_iddpto,
                                    method:'POST',
                                    waitMsg:'Registrando datos',
                                    success:function(result,request){
                                        var jsonData=JSON.parse(result.responseText);
                                         var bandera=jsonData[0].bandera;
                                         var msj=jsonData[0].msg;

                                          if (bandera==1) {
                                                storeCargos.load();

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
                                                    title:'Cargo ya existe',
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

                                

                        }else{//actualizacion
                                var post_id_cargo=Ext.getCmp('idcargo').getValue();
                                

                                
                               Ext.Ajax.request({
                                    url:'procesos/update_cargo.php?puesto='+post_nombrepuesto+'&jerarquia='+post_jerarquia+'&id_dpto='+post_iddpto+'&&idcargo='+post_id_cargo,
                                    method:'POST',
                                    waitMsg:'Registrando los datos',
                                    success:function(result,request){
                                        var jsonData=JSON.parse(result.responseText);
                                        var bandera=jsonData[0].bandera;
                                        var msj=jsonData[0].msg;

                                        if (bandera==1) {
                                                                storeCargos.load();
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
                                                    title:'Error de conexion',
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

        },
        {
            text:'Cancelar',
            iconCls: 'icon-CANCEL',
            handler:function(){
                this.up('form').getForm().reset();
                this.up('window').destroy();
            }

        }
        ]
        

    });

    winCompetencias =Ext.widget('window',{
        title:'REGISTRO Y MODIFICACION DE COMPETENCIAS',
        closable:false,
        width:550,
        height:300,
        layout:'fit',
        resizable:true,
        modal:true,
        items:formCompetencias

    });

    
    
    winCompetencias.show();    
   }//fin de form competencias.




 
storeCargos.load();


 
/********************************************       DATA GRIDS    ************************************************/
/****************************************************************************************************************/  


                                           
 
 /************************************************--- GRID DE PUESTOS ---***********************************************/
    var gridPuestos = Ext.create('Ext.grid.Panel', {
        store: storeCargos,
		stateful: true,
        collapsible: false,
        selModel: sm_cargos,
        multiSelect: true,
        width:'100%',
        height:500,
        
        stateId: 'stateGrid',
        resizable: {
            handles: 's'  
        },
        columns: [
            
            {
                text:'IDCARGO',
                sortable:false,
                dataIndex:'idcargo',
                hidden:true

            },
            {
                text: 'ID_DPTO',
                sortable:false,
                dataIndex:'id_dpto',
                hidden:true
            },

           
            {
                text:'<b>DEPARTAMENTO</b>',
                sortable:false,
                dataIndex:'departamento',
                width:350
            }
            ,
            {
                text     : '<b>NOMBRE DEL PUESTO</b>',
                sortable :  true,
                flex:1,
                dataIndex: 'nombrepuesto',
                width:200

            }
            ,{
                text:'<b>JERARQUIA</b>',
                sortable: true,
                dataIndex:'jerarquia',
                width:100
            }

            
            
        ],
        viewConfig: {
            stripeRows: true,
            enableTextSelection: true
        },
        bbar:Ext.create('Ext.PagingToolbar',{
            pageSize:5,
            store:storeCargos,
            displayInfo:true,
            displayMsg: 'Displaying Invoices {0} - {1} of {2}',
            emptyMsg: "No invoices to display"
        }),

        tbar:[
            '->','-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                text: '<b>Agregar Cargo</b>',
                id: 'btnaddcargo',
                iconCls: 'icon-addCargo',
                handler:function(){
                   showformCargos(1);
                }
                
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                text: '<b>Borrar Cargo</b>',
                id: 'btndeletecargo',
                iconCls: 'icon-deleteCargo',
                handler:function(){

                    Ext.MessageBox.confirm('Borrado','¿Esta seguro de borrar los cargos seleccionados?',function(btn){
                        if (btn==='yes') {

                                var selections=gridPuestos.selModel.getSelection();

                                Ext.each(selections,function(record){
                                    id=record.get('idcargo');
                                    nombre=record.get('nombrepuesto');


                                   Ext.Ajax.request({
                                        url:'procesos/eliminar_puesto.php?id='+id+'&nombre='+nombre,
                                        method:'POST',
                                        success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                var bandera=jsonData[0].bandera;
                                                var msj=jsonData[0].msg;


                                                if(bandera==1){

                                                    storeCargos.load();
                                                }

                                                if (bandera==2||bandera==3) {

                                                                     Ext.MessageBox.show({
                                                                            title:'Sin Exito',
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



/*************************************    CREACION DE INTERFAZ         *********************************************/
/*******************************************************************************************************************/



		var tabs = Ext.widget({
        xtype: 'form',
        id: 'tabForm',
		renderTo:'interfazGestionP_EV',
        width: "80%",
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
				activeTab: 0,
				defaults:{
					bodyPadding: 10,
					layout: 'anchor'
				},
				items:[
					
					 {
						title:'GESTION DE CARGOS ',
						tabConfig:{
					cls: 'x-btn-text-icon',
					iconCls: 'icon-cargos'
					},
						defaults: {
							bodyStyle:'padding:0px',
							anchor: '100%',
							bodyStyle:'background:#DFE9F6;'
						 },
						 items:[
							 	{
									
									//height: 600,
									items:[gridPuestos]
								}
						      ]
					 }/*fin de competencias*/
					 
					 
					 

					  ]//fin itemm tabpanel
         }//fin compo  tabpanel
			
			]

	});

	


});//terminacion onReady










