

Ext.onReady(function(){
    var winCompetencias;

    //Ext.tip.QuickTipManager.init();
/******************************************** MODEL********************************************************************/
/****************************************************************************************************************/
    /*modelo de escalas de ponderacion*/
    Ext.define('subclasificacion',{
        extend:'Ext.data.Model',
        fields:[
        {
            name:'id_competencia',type:'int'

        },
        {
            name:'subclasificacion',type:'string'
        },
        {
            name:'descripcioncomp', type:'string'
        },'subclasificacionr','excerpt','threadid'
        ],
        idProperty:'company'
    });

/*model de competencias */
    Ext.define('competenciasModel',{
    extend:'Ext.data.Model',
    fields:[
        {name:'id_area',type:'int'},
        {name:'idpadre',type:'int'},
        {name:'id_competencia',type:'int'},
        {name:'idclasificacion',type:'int'},
        {name:'area',type:'string'},
        {name:'clasificacion',type:'string'},
        {name:'subcategoria',type:'string'},
        {name:'nombrecompetencia',type:'string'},
        {name:'descripcion',type:'string'}
    ],
    idProperty:'company'

});

/*model de areas*/    

Ext.define('areaModel',{
    extend:'Ext.data.Model',
    fields:[
        {name:'id_area', type:'int'},
        {name:'area',type:'string'}
    ],
    idProperty:'company'
})


    


/******************************************** STORES ********************************************************************/
/****************************************************************************************************************/
    var storeAreas=Ext.create('Ext.data.JsonStore',{
        model:'areaModel',
        proxy:{
               type:'ajax',
               url:'procesos/areas_json.php',
               reader:{
                type:'json',
                root:'data'
               }
        }

    });

    var storeSubclasificacion=Ext.create('Ext.data.JsonStore',{
        pageSize:1,
        model:'subclasificacion',
        remoteSort:true,
          proxy:{
                type:'ajax',
                url:'procesos/subclasificacion.php',
                reader:{
                    type:'json',
                    root:'data'
                }
               
          },


    });

    /*STORE DE COMPETENCIAS*/
var storeCompetencias=Ext.create('Ext.data.JsonStore',{
        model:'competenciasModel',
        proxy:{
            type:'ajax',
            url:'procesos/competencias_json.php',
            reader:{
                type:'json',
                root:'data'
            }
        }

});

/******************************************** SEL MODEL********************************************************************/
/****************************************************************************************************************/
    
       var sm = new Ext.selection.CheckboxModel( {
        listeners:{
            selectionchange: function(selectionModel, selected, options){
                // Bunch of code to update store
                    //console.log(selectionModel, selected, options);
                    var record = selected[0];
                //alert(record.get('idactividades'));
                    if (record!=undefined){
                        showFormSubcategoria(0);
                        formSub.getForm().loadRecord(record);
                       
                    }
            }
        }
    });

       var smCompetencias=new Ext.selection.CheckboxModel({
        listeners:{
                selectionchange:function(selectionModel,selected,options){
                    var record=selected[0];
                    if(record!=undefined){
                        showformCompetencias(0);
                        /*establecer los valores de radio button*/ 
                        var categoria=record.get('idclasificacion');
                        
                         if(categoria==1){
                            var radios = Ext.getCmp("idclasificacion");
                           
                            radios.setValue({idclasificacion:"1"});
                         }
                         if(categoria==2){
                            var radios = Ext.getCmp("idclasificacion");
                           
                            radios.setValue({idclasificacion:"2"});
                         }
                        

                        formCompetencias.getForm().loadRecord(record);
                    }

                }

        }
       });



/******************************************** formularios********************************************************************/
/****************************************************************************************************************/


/*formulario subcategoria*/ 
    function showFormSubcategoria(accion){

	formSub=Ext.widget('form',{
            padding:10,
            layout:{
                 type: 'table',
                            columns: 4, 
                            tdAttrs: {
                                valign: 'middle'
                            }
                        },
                         fieldDefaults: {
                    labelAlign: 'top',
                    labelWidth: 100,
                    labelStyle: 'font-weight:bold'
                },
                defaults: {
                            frame:true,
                            border: true,
                            style: 'margin: 5px 5px 5px 5px;'
                },
                items:[
                {
                    xtype:'hiddenfield',
                    id:'id_competencia',
                    colspan:4,
                    name:'id'
                },{
                    xtype:'textfield',
                    fieldLabel:'NOMBRE DE SUB- CLASIFICACION',
                    id:'subclasificacion',
                    name:'subclasificacion',
                    width:400,
                    colspan:4,
                    allowBlank:false
                },
                {
                    xtype:'textareafield',
                    fieldLabel:' DESCRIPCION (Max caracteres 600 )',
                    id:'descripcioncomp',
                    name:'descripcioncomp',
                    width:400,
                    colspan:4,
                    allowBlank:false
                }

                ],
                buttons:[{
                    text:' Registrar ',
                    iconCls: 'icon-OK',
                    handler:function(){//enviar datos
                          if (this.up('form').getForm().isValid()) {
                              var post_subclasificacion=Ext.getCmp('subclasificacion').getValue();
                              var post_descrip=Ext.getCmp('descripcioncomp').getValue();
                                if(accion!=0){//ingresar nueva subcategoria
                                        
                                     Ext.Ajax.request({

                                        url:'procesos/guardar_subclasificacion.php?subclasificacion='+post_subclasificacion+'&descrip='+post_descrip,
                                        method:'POST',
                                        waitMsg:' Registrando los datos ',
                                        success: function(result,request){
                                            var jsonData=JSON.parse(result.responseText);
                                            var bandera=jsonData[0].bandera;
                                            var msj=jsonData[0].msg;

                                            


                                            if (bandera==1) {
                                                storeSubclasificacion.load();
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
                                                    title:'Subcategoria Duplicada',
                                                    msg:msj,
                                                    buttons:Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.WARNING
                                                });

                                            }


                                        },
                                        failure: function(result,request){
                                              Ext.MessageBox.show({
                                                    title:'Subcategoria Duplicada',
                                                    msg:'CONEXION AL SISTEMA INTERRUMPIDO, RECARGUE LA PAGINA E INTENTE DE NUEVO',
                                                    buttons:Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.WARNING
                                                });
                                                
                                            }

                                     });

                                }else{//actualizacion de datos de subcategoria
                                    var id_comp=Ext.getCmp('id_competencia').getValue();
                                    
                                      Ext.Ajax.request({

                                        url:'procesos/update_subclasificacion.php?subclasificacion='+post_subclasificacion+'&descrip='+post_descrip+'&id='+id_comp,
                                        method:'POST',
                                        waitMsg:' Registrando los datos ',
                                        success: function(result,request){
                                            var jsonData=JSON.parse(result.responseText);
                                            var bandera=jsonData[0].bandera;
                                            var msj=jsonData[0].msg;

                                            if (bandera==1) {
                                                                storeSubclasificacion.load();
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
                                                    title:'Subcategoria Duplicada',
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

                },{
                    text:' Cancelar ',
                    iconCls: 'icon-CANCEL',
                    handler:function(){
                        this.up('form').getForm().reset();
                        this.up('window').destroy();
                    }

                }
                ]

        });




   
/*****************************************CREACION DE LA VENTANA EMERGENTE**************************************************************/

        var win = Ext.widget('window', {
                title: 'REGISTRO Y MODIFICACION DE SUBCATEGORIAS',
                closable: false,
                width: 500,
                height: 250,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: formSub
            });
         win.show();


    }// fin de la funcion de formadd



  function showformCompetencias(accion){
     
      storeAreas.load();    
     var clasificacionF=0;

    

    formCompetencias=Ext.widget('form',{
        padding:5,
            defaults: {
            anchor: '100%'
        },
        items:[
        {
            xtype:'fieldset',
            title: 'Informacion General',

            defaultType: 'textfield',
            layout: 'anchor',
            defaults: {
                anchor: '85%'
            },
            items:[
            {
                xtype:'hiddenfield',
                id:'id_competencia',
                name:'id_competencia'
            },
           
              {
                xtype:'textfield',
                fieldLabel:'NOMBRE DE COMPETENCIA',
                id:'nombrecompetencia',
                name:'nombrecompetencia',
                allowBlank:false
              },{
                xtype:'textareafield',
                fieldLabel:'DESCRIPCION',
                id:'descripcion',
                name:'descripcion',
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
                    id : 'subcategoria',
                    store : storeSubclasificacion,
                    displayField:'subclasificacion',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'id_competencia',
                    hiddenName : 'id_competencia',
                    fieldLabel: 'SELECCIONE UNA SUB CLASIFICACION (*)',
                    width:400,
                    colspan:4,
                    allowBlank: false,
                    emptyText : 'SELECCIONE UNA SUB CLASIFICACION'
                
            },
            {
                    xtype      : 'radiogroup',
                    fieldLabel : 'CATEGORIA DE LA COMPETENCIA.',
                    id:'idclasificacion',
                    allowBlank:false,
                                      
                    items:[
                        {
                            boxLabel  : 'DESEMPEÑO',
                            inputValue: '1',
                            name:'idclasificacion'
                           
                        },
                        {
                            boxLabel  : 'POTENCIAL',
                            name:'idclasificacion',
                            inputValue: '2'
                            
                        }
                    ]
                   
            },
             {
                
                    xtype : 'combo',
                    id : 'area',
                    store : storeAreas,
                    displayField:'area',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'id_area',
                    hiddenName : 'id_area',
                    fieldLabel: 'SELECCIONE UN AREA (*)',
                    width:400,
                    colspan:4,
                    allowBlank: false,
                    emptyText : 'SELECCIONE UN AREA'
                
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
                        var post_nombrecompetencia=Ext.getCmp('nombrecompetencia').getValue();
                        var post_descripcion=Ext.getCmp('descripcion').getValue();
                        var post_subcategoria=Ext.getCmp('subcategoria').getValue();
                        //var post_categoria=Ext.getCmp('categoria').getValue();
                        var pcategoria=Ext.getCmp('idclasificacion').getChecked()[0];
                        var post_categoria=pcategoria.getGroupValue();
                        var post_area=Ext.getCmp('area').getValue();
                        


                        if(accion!=0){//ingresar nueva competencia
                                Ext.Ajax.request({
                                    url:'procesos/guardar_competencia.php?nombrecompetencia='+post_nombrecompetencia+'&descripcionComp='+post_descripcion+'&subcategoria='+post_subcategoria+'&area='+post_area+'&categoria='+post_categoria,
                                    method:'POST',
                                    waitMsg:'Registrando datos',
                                    success:function(result,request){
                                        var jsonData=JSON.parse(result.responseText);
                                         var bandera=jsonData[0].bandera;
                                         var msj=jsonData[0].msg;

                                          if (bandera==1) {
                                                storeCompetencias.load();
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
                                                    title:'Competencia ya existe',
                                                    msg:msj,
                                                    buttons:Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.WARNING
                                                });

                                            }


                                    },
                                     failure: function(result,request){
                                              Ext.MessageBox.show({
                                                    title:'Subcategoria Duplicada',
                                                    msg:'CONEXION AL SISTEMA SE INTERRUMPIO, RECARGUE LA PAGINA E INTENTE DE NUEVO',
                                                    buttons:Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.WARNING
                                                });
                                                
                                            }                                   

                                });

                        }else{//actualizacion
                                var post_id_competencia=Ext.getCmp('id_competencia').getValue();
                                //alert('datos: id_competencia '+post_id_competencia+' | categoria '+post_categoria+'| area = '+post_area+' subclasificacion= '+post_subcategoria);
                                Ext.Ajax.request({
                                    url:'procesos/update_competencia.php?nombrecompetencia='+post_nombrecompetencia+'&descripcionComp='+post_descripcion+'&subcategoria='+post_subcategoria+'&area='+post_area+'&categoria='+post_categoria+'&idcompetencia='+post_id_competencia,
                                    method:'POST',
                                    waitMsg:'Registrando los datos',
                                    success:function(result,request){
                                        var jsonData=JSON.parse(result.responseText);
                                        var bandera=jsonData[0].bandera;
                                        var msj=jsonData[0].msg;

                                        if (bandera==1) {
                                                                storeCompetencias.load();
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
                                                    title:'Error de sistema',
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
        width:500,
        height:400,
        layout:'fit',
        resizable:true,
        modal:true,
        items:formCompetencias

    });

    
    
    winCompetencias.show();    
   }//fin de form competencias.


 // pluggable renders
    function renderTopic(value, p, record) {
        return Ext.String.format(
            '<b><a href="http://sencha.com/forum/showthread.php?t={2}" target="_blank">{0}</a></b><a href="http://sencha.com/forum/forumdisplay.php?f={3}" target="_blank">{1} Forum</a>',
            value,
            record.data.forumtitle,
            record.getId(),
            record.data.forumid
        );
    }


 function renderLast(value, p, r) {
        return Ext.String.format('{0}<br/>by {1}', r.get('lastposter'));
    }
    var pulginExpanded=true;




//storeSubclasificacion.load();
    
 
/********************************************       DATA GRIDS    ************************************************/
/****************************************************************************************************************/                                                 
 /***************************************** CREO EL GRID  DE SUBCLASIFICACION **********************************/
 var gridSubclasificacion=Ext.create('Ext.grid.Panel',{
 	store:storeSubclasificacion,
 	stateful:true,
 	collapsible:false,
 	selModel:sm,
 	multiSelect:true,
 	stateId:'stateGrid',

 	columns:[
 		{
 			text:'ID',
 			 sortable:false,
 			 dataIndex:'id_competencia',
 			 hidden:true,
             width:50
 		},{
 			text:' SUB-CLASIFICACION',
 			sortable:true,
 			flex:1,
            width:300,
 			dataIndex:'subclasificacion'
 		},{
            text:'DESCRIPCION',
            sortable:false,
            width:800,
            dataIndex:'descripcioncomp'
        }

 	],
 	height:'100%',
 	width:'100%',
 	viewConfig: {
            stripeRows: true,
            enableTextSelection: true

        },
        bbar:Ext.create('Ext.PagingToolbar',{
            store:storeSubclasificacion,
            displayInfo:true,
            displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display",
            items:[
              '-',{
                text:'Show Preview',
                pressed:pulginExpanded,
                enableToggle:true,
                toggleHandler: function(btn, pressed) {
                    var preview = Ext.getCmp('gv').getPlugin('preview');
                    preview.toggleExpanded(pressed);
                }

              }
            ]
        }),
        tbar:[
        '->','-',
        {
        	xtype:'button',
        	cls:'contactBtn',
        	text:'Agregar Subcategoria',
        	id:'btnAddSub',
            iconCls: 'icon-addSub',
            handler:function(){
                showFormSubcategoria(1);
            }
        },'-',
        {
            xtype:'button',
            cls:'contactBtn',
            text:'Borrar Subcategoria',
            id:'btnBorrarSub',
            iconCls: 'icon-DelSub',
            handler:function(){
                        Ext.MessageBox.confirm('Borrado','¿Esta seguro de borrar las Sub Categorias seleccionadas?',function(btn){
                            if(btn==='yes'){
                                   var selections=gridSubclasificacion.selModel.getSelection();
                                   Ext.each(selections,function(record){
                                        id=record.get('id_competencia');
                                        nombre=record.get('subclasificacion');
                                            Ext.Ajax.request({
                                                url:'procesos/eliminar_subclasificacion.php?id_comp='+id+'&nombre='+nombre,
                                                method:'POST',
                                                success:function(result,request){
                                                                var jsonData=JSON.parse(result.responseText);
                                                                var bandera=jsonData[0].bandera;
                                                                var msj=jsonData[0].msg;

                                                                if(bandera==1){
                                                                    storeSubclasificacion.loadPage(1);
                                                                }
                                                                if (bandera==2||bandera==3) {

                                                                     Ext.MessageBox.show({
                                                                            title:'Sin Exito',
                                                                            msg:msj,
                                                                            buttons:Ext.MessageBox.OK,
                                                                            icon: Ext.MessageBox.WARNING
                                                                        });//fin de msj

                                                                }


                                                              }//fin de success

                                            }); //fin de ajax
                                   });//fin de each selection

                            }
                            //storeSubclasificacion.loadPage(1);


                        });

                    }
        }

        ]


 });

 /************************************************--- GRID DE COMPETENCIAS ---***********************************************/
    var gridCompetencias = Ext.create('Ext.grid.Panel', {
        store: storeCompetencias,
		stateful: true,
        collapsible: false,
        selModel: smCompetencias,
        multiSelect: true,

        stateId: 'stateGrid',
        columns: [
            {
                text:'ID_AREA',
                sortable:false,
                dataIndex:'id_area',
                hidden:true
            },
            {
                text:'ID_PADRE',
                sortable:false,
                dataIndex:'idpadre',
                hidden:true

            },
            {
                text: 'ID_COMP',
                sortable:false,
                dataIndex:'id_competencia',
                hidden:true
            },

            {
                text:'idclasificacion',
                sortable:false,
                dataIndex:'idclasificacion',
                hidden:true
            },
            {
                text:'<b>AREA</b>',
                sortable:false,
                dataIndex:'area',
                width:100
            },
            {
                text:'<b>CLASIFICACION</b>',
                sortable:false,
                dataIndex:'clasificacion',
                width:100
            },
            {
                text:'<b>SUB CATEGORIA</b>',
                sortable:false,
                dataIndex:'subcategoria',
                width:250
            }
            ,
            {
                text     : '<b>NOMBRE DE LA COMPETENCIA</b>',
                sortable :  true,
                flex:1,
                dataIndex: 'nombrecompetencia',
                width:150

            }
            ,{
                text:'<b>DESCRIPCION</b>',
                sortable: true,
                dataIndex:'descripcion',
                width:700
            }

            
            
        ],
        height: '100%',
        width: '100%',
        width:'99%',
        viewConfig: {
            stripeRows: true,
            enableTextSelection: true
        },

        tbar:[
            '->','-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                text: '<b>Agregar Competencia</b>',
                id: 'btnaddCompetencia',
                iconCls: 'icon-addSub',
                handler:function(){
                   showformCompetencias(1);
                }
                
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                text: '<b>Borrar Competencia</b>',
                id: 'btndeleteCompetencia',
                iconCls: 'icon-DelSub',
                handler:function(){

                    Ext.MessageBox.confirm('Borrado','¿Esta seguro de borrar las competencias seleccionadas?',function(btn){
                        if (btn==='yes') {

                                var selections=gridCompetencias.selModel.getSelection();

                                Ext.each(selections,function(record){
                                    id=record.get('id_competencia');
                                    nombre=record.get('nombrecompetencia');

                                    Ext.Ajax.request({
                                        url:'procesos/eliminar_competencia.php?id='+id+'&nombre='+nombre,
                                        method:'POST',
                                        success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                var bandera=jsonData[0].bandera;
                                                var msj=jsonData[0].msg;


                                                if(bandera==1){

                                                    storeCompetencias.load();
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


/*LLAMA A STORE SUBCLASIFICACION*/ 
storeCompetencias.load();
storeSubclasificacion.loadPage(1);




/*************************************    CREACION DE INTERFAZ         *********************************************/
/*******************************************************************************************************************/



		var tabs = Ext.widget({
        xtype: 'form',
        id: 'tabForm',
		renderTo:'interfazGestionC',
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
				activeTab: 0,
				defaults:{
					bodyPadding: 10,
					layout: 'anchor'
				},
				items:[
					 
					
					{
					title:'GESTION DE SUB-CLASIFICACION',
					tabConfig:{
					cls: 'x-btn-text-icon',
					iconCls: 'icon-subcategoria'
					},
					    defaults:{
						bodyStyle:'padding:0px',
							anchor: '100%',
							bodyStyle:'background:#DFE9F6;'
						
						},
						items:[{
						height:400,
                        items:[gridSubclasificacion]
						}
						
						]
					
					},/*fin de subclasificacion*/
				
					 {
						title:'GESTION DE COMPETENCIAS',
						tabConfig:{
					cls: 'x-btn-text-icon',
					iconCls: 'icon-competencias'
					},
						defaults: {
							bodyStyle:'padding:0px',
							anchor: '100%',
							bodyStyle:'background:#DFE9F6;'
						 },
						 items:[
							 	{
									
									height: 400,
									items:[gridCompetencias]
								}
						      ]
					 }/*fin de competencias*/
					 
					 
					 

					  ]//fin itemm tabpanel
         }//fin compo  tabpanel
			
			]

	});

	


});//terminacion onReady










