/**************************************************************************************/    
/* CREACION DEL FORMULARIO */

Ext.onReady(function(){
    

    /*********************************************************** definir SM ****************************************/

    Ext.define('gruposOModel',{
        extend:'Ext.data.Model',
        fields:[
        {
            name:'id_grupo',type:'int'

        },
        {
            name:'nombreg',type:'string'
        },
        {
            name:'descripciong',type:'string'
        }
        ],
        idProperty:'company'

    });


     Ext.define('competenciasG',{
            extend:'Ext.data.Model',
            fields:[
            {
                name:'id_comp',type:'int'
            },
            {
                name:'nombreC',type:'string'
            }
            ]

     });




    /***********************************************************************************************************************/
    /**************************************************** STORES  **********************************************************/
    /***********************************************************************************************************************/



     var storeGrupos=Ext.create('Ext.data.JsonStore',{
        model:'gruposOModel',
        proxy:{
               type:'ajax',
               url:'procesos/gruposO_json.php',
               reader:{
                type:'json',
                root:'data'
               }
        }

    });



     var storeCompetencias1=Ext.create('Ext.data.JsonStore',{
        model:'competenciasG',
        proxy:{
               type:'ajax',
               url:'procesos/competencias_json.php',
               reader:{
                type:'json',
                root:'data'
               }
        }


     });
       
   /***********************************************************************************************************************/
    /**************************************************** SM  **********************************************************/
    /***********************************************************************************************************************/
      

   var smGrupos = new Ext.selection.CheckboxModel( {
        listeners:{
            selectionchange: function(selectionModel, selected, options){
                // Bunch of code to update store
                    //console.log(selectionModel, selected, options);
                    var record = selected[0];
                //alert(record.get('idactividades'));
                    if (record!=undefined){
                        showformGruposOcupacionales(0,record.get('id_grupo'));  /*recuperamos el id_grupo para cargar las competencias de acuerdo al grupo ocupacional*/
                        //formSub.getForm().loadRecord(record);
                        Ext.getCmp('formGO').getForm().loadRecord(record);
                       
                    }
            }
        }
    });
   




   /***********************************************************************************************************************/
    /**************************************************** FORMS  **********************************************************/
    /***********************************************************************************************************************/


function showformGruposOcupacionales(accion,grupo_o){
  
   //console.log(grupo_o);



    Ext.define('Ext.ux.MessagePanel',{
        extend:'Ext.form.Panel',

        initComponent:function(){
            Ext.apply(this,{
            
            items:[
                 {
                    xtype:'form',
                    id:'formGO',
                    padding:10,
                    defaults:{
                    anchor:'100%'
                  },

                 items:[
                     //    {
                     // xtype:'fieldset',
                     // title:'Informacion General',
                     // defaultType: 'textfield',
                      //  layout: 'anchor',
                      //  defaults: {
                      //      anchor: '60%'
                       // },
                       // items:[
                                   {
                                    xtype:'hiddenfield',
                                    id:'id_grupo',
                                    name:'id_grupo'
                                      
                                   },
                       
                                  {
                                    xtype:'textfield',
                                    fieldLabel:'<b>NOMBRE DEL GRUPO</b> ',
                                    id:'nombreg',
                                    name:'nombreg',
                                    allowBlank:false,
                                    anchor:'50%'
                                  },{
                                    xtype:'textareafield',
                                    fieldLabel:'<b>DESCRIPCION DEL GRUPO</b>',
                                    id:'descripciong',
                                    name:'descripciong',
                                    allowBlank:false,
                                    anchor:'70%'
                                  }

                         //    ]

           //}//fin fielset
                    ]
               }//fin de form 
            ],
              buttons:[
                 {
                    text:'<b>Registrar</b>',
                    iconCls: 'icon-OK',
                    scale:'large',
                    handler: function(){
                        
                        
                        if(Ext.getCmp('formGO').getForm().isValid()) {//enviar informacion
                              var post_nombreGrupo=Ext.getCmp('nombreg').getValue();
                              var post_descripGrupo=Ext.getCmp('descripciong').getValue();
                              var post_competencias=Ext.encode(Ext.getCmp('data').getValue());
							  //var post_competencias=Ext.getCmp('data').getValue();
                              
                              if(accion!=0){//se ingresara un nuevo grupo
                                        Ext.Ajax.request({
                                          url:'procesos/guardar_grupo.php?nombre_g='+post_nombreGrupo+'&descripcion='+post_descripGrupo+'&competencias='+post_competencias,
                                          method:'POST',
                                          success:function(result,request){
                                              var jsonData=JSON.parse(result.responseText);
                                              var bandera=jsonData[0].bandera;
                                              var msj=jsonData[0].msg;

                                               if (bandera==1) {
                                                storeGrupos.load();
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
                                                    title:'Grupo ocupacional ya existe',
                                                    msg:msj,
                                                    buttons:Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.WARNING
                                                });

                                            }
                                            if(bandera==4){
                                              storeGrupos.load();
                                                Ext.MessageBox.show({
                                                    title:'Exito',
                                                    msg:msj,
                                                    buttons:Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.WARNING
                                                });

                                            }



                                          }//fin del success

                                        })//fin de ajax


                              }else{
                                //actualizacion de datos
                                var post_idGrupo=Ext.getCmp('id_grupo').getValue();

                                Ext.Ajax.request({
                                  url:'procesos/update_grupo.php?nombre_g='+post_nombreGrupo+'&descripcion='+post_descripGrupo+'&competencias='+post_competencias+'&idGrupo='+post_idGrupo,
                                  method:'POST',
                                  success:function(result,request){

                                    var jsonData=JSON.parse(result.responseText);
                                    var bandera=jsonData[0].bandera;
                                    var msj=jsonData[0].msg;

                                    if (bandera==1) {
                                                                storeGrupos.load();
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



                                     }//fin de success
                                     ,
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

                        Ext.getCmp('formGO').getForm().reset();
                        this.up('window').destroy();


                        }else{
                           Ext.Msg.alert('Warning', "Por favor, complete el formulario"); 
                        }

                    },
                    scope:this
                 },{
                    text:'<b>Cancelar</b>',
                    scale:'large',
                    iconCls: 'icon-CANCEL',
                    handler:function(){
                                    this.up('form').getForm().reset();
                                    this.up('window').destroy();
                                }
                 }

        ]

            });//fin de apply

            this.callParent(arguments);

            this.loadCheckboxes(grupo_o);

        }//fin init
        ,
        loadCheckboxes:function(grupo_o){
          //console.log(grupo_o);
            Ext.Ajax.request({
               url:'procesos/competencias_json.php?id_grupo='+grupo_o,
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
                console.log(response);
               }
               var checkboxGroup={
                  xtype:'checkboxgroup',
                  columns:2,
                  fieldLabel:'Competencias',
                  name:'data',
                  id:'data',
                  bodyPadding: 10,
                  cls: 'x-check-group-alt',
                  style:{
                    padding:'10px'
                    },  
                    items:[]
               };

               var i, len = jsonResponse.data.length, competencia;

                for(i=0;i<len;i++){
                  competencia=jsonResponse.data[i];

                  checkboxGroup.items.push({
                       xtype:'checkbox',
                       boxLabel:competencia.nombreC,
                       name:'data',
                       inputValue:competencia.id_comp,
                       checked:competencia.selected
                      });
                }

                this.add(checkboxGroup)

        }

    });

    var messagePanel=new Ext.ux.MessagePanel();


   


    winGrupos =Ext.widget('window',{
        title:'REGISTRO Y MODIFICACION GRUPOS OCUPACIONALES',
        closable:false,
        width:900,
        height:600,
        layout:'fit',
        resizable:true,
        modal:true,
        items:messagePanel
        //items:formGrupos

    });

    
    
    winGrupos.show();



}//FIN DE FUNCION FORM



storeGrupos.load();
//storeCompetencias1.load();





    var gridgrupos = Ext.create('Ext.grid.Panel', {
      store: storeGrupos,
		stateful: true,
        collapsible: false,
        selModel: smGrupos,
        multiSelect: true,
        selModel:smGrupos,

        stateId: 'stateGrid',
        columns: [
            {
                text: 'ID_GRUPO',
                sortable:false,
                dataIndex:'id_grupo',
                hidden:true
            },
            {
                text     : '<b>NOMBRE </b>',
                sortable :  true,
                flex:1,
                dataIndex: 'nombreg'
            },

            {
                text     : '<b>DESCRIPCION </b> ',
                sortable :  true,
                flex:1,
                dataIndex: 'descripciong'
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
                text: '<b>Agregar Grupo Ocupacional</b>',
                iconCls: 'icon-addGroup',
                id: 'buton12',
                 handler:function(){
                  showformGruposOcupacionales(1,0);
                } 
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                text: '<b>Borrar Grupo Ocupacional</b>',
                iconCls: 'icon-deleteGroup',
                id: 'buton13',
                handler:function(){
                            Ext.MessageBox.confirm('Borrado','Esta seguro de borrar al grupo ocupacional, se borarran sus competencias asignadas',function(btn){
                                if(btn==='yes'){
                                    var selections  =gridgrupos.selModel.getSelection();

                                    Ext.each(selections,function(record)
                                    {
                                        id=record.get('id_grupo');
                                        nombre=record.get('nombreg');
                                        //alert(".... "+id);

                                          Ext.Ajax.request({
                                                url:'procesos/eliminar_grupo_o.php?id_g='+id+'&nombre='+nombre,
                                                method:'POST',
                                                success:function(result,request){
                                                    var jsonData=JSON.parse(result.responseText);
                                                    var bandera=jsonData[0].bandera;
                                                    var msj=jsonData[0].msg;

                                                    
                                                    if(bandera==1){//recargar si hay exito
                                                        
                                                        storeGrupos.load();
                                                    }
                                                    if (bandera==3||bandera==2) {//solo si hay problemas mostrar msj
                                                       Ext.Msg.alert('Status',msj); 
                                                    }



                                                }


                                            });

                                    });
                                }

                            });
                }
                
            },'-'
        ]
        
    });

 
/*CREACION DE LA INTERFAZ*/ 


		var tabs = Ext.widget({
        xtype: 'form',
        id: 'tabForm',
		renderTo:'interfazGestionGO',
        width: "85%",
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
						title:'GESTION DE GRUPOS OCUPACIONALES',
                                tabConfig:{
                            cls: 'x-btn-text-icon',
                            iconCls: 'icon-group'
                            },
						defaults: {
							bodyStyle:'padding:0px',
							anchor: '100%',
							bodyStyle:'background:#DFE9F6;'
						 },
						 items:[
							 	{
									
									height: 400,
									items:[gridgrupos]
								}
						      ]
					 }

					  ]//fin itemm tabpanel
         }//fin compo  tabpanel
			
			]

	});

	










});//terminacion onReady










