

Ext.onReady(function(){
    

 
/******************************************** MODEL********************************************************************/
/****************************************************************************************************************/

    Ext.define('empleadosModel',{
        extend:'Ext.data.Model',
        fields:[
            {
                name:'idcargo',type:'int'
            },
            {
                name:'departamento',type:'string'
            },
            {
                 name:'nombregrupo',type:'string'
            },
            {
                 name:'cargo',type:'string'
            },
            {
                 name:'codigoempleado',type:'string'
            },
            {
                 name:'nombre_e',type:'string'
            },
            {
                 name:'apellido_e',type:'string'
            },
            {
                name:'sexo',type:'string'
            },
            {
                name:'email',type:'string'
            }
            ,{
               name:'codigo_e', type:'string'
            },
            {
                name:'nombre_emp',type:'string'
            },
            {
                name:'codigo_cargo_jefe',type:'string'
            },
            {
                name:'evalua', type:'string'
            },
            {
                name:'idponderacion', type:'int'
            },
            {
                name:'jefe', type:'int'
            },
            {
                name:'coworkers', type:'int'
            },
            {
                name:'colaboradores', type:'int'
            },
            {
                name:'personal', type:'int'
            }
           

        ],
        idProperty:'company'
    });

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


   Ext.define('cargosOcupadosModel',{
    extend:'Ext.data.Model',
      fields:[
        {
            name:'idcargoJ',type:'int'
        },
        {
            name:'cargoJ',type:'string'
        }
      ],
      idProperty:'company'

   });


   Ext.define('JefeModel',{
        extend:'Ext.data.Model',
        fields:[    
        {
            name:'codigo_e',type:'string'
        },
        {
         name:'nombre_emp',type:'string'   
        }

        ],
        idProperty:'company'

   });

  

  



/******************************************** STORES ********************************************************************/
/****************************************************************************************************************/

var storeEmpleados=Ext.create('Ext.data.JsonStore',{
      model:'empleadosModel',
          proxy:{
                type:'ajax',
                url:'procesos/empleados_json.php',
                reader:{
                    type:'json',
                    root:'data'
                }
          }
});

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

var storeJefes=Ext.create('Ext.data.JsonStore',{
    model:'JefeModel',
    remoteSort:true,
    proxy:{
            type:'ajax',
            url:'procesos/jefes_json.php',
              reader:{
                    type:'json',
                    root:'data'

                    } 

           }
});

var storeCargosOcupados=Ext.create('Ext.data.JsonStore',{
    model:'cargosOcupadosModel',
    remoteSort:true,
    proxy:{
            type:'ajax',
            url:'procesos/cargosocupados_json.php',
            reader:{
                type:'json',
                root:'data'
            }

    }

});



 

/******************************************** SEL MODEL********************************************************************/
/****************************************************************************************************************/
    
       /************************************* smempleado             ***************************************/        
       var sm_empleado=new Ext.selection.CheckboxModel({
               listeners:{
                       selectionchange:function(selectionModel,selected,options){
                           var record=selected[0]; 

                   if(record!=undefined){
                               showformEmpleado(0); 
                               codigo=Ext.getCmp('codigoempleado');
                               codigo.setDisabled(true);

                             var tipo=record.get('sexo');
                                if(tipo=='M'){
                                     
                                    var radio=Ext.getCmp('sexo');
                                    radio.setValue({sexo:'M'});
                                    }  

                             if(tipo=='F'){
                                    
                                    var radio=Ext.getCmp('sexo');
                                    radio.setValue({sexo:'F'});
                                    }  

                              var evalua_jefe=record.get('evalua');
                                  if (evalua_jefe=='S') {
                                    
                                      var evaluar=Ext.getCmp('evalua');
                                      evaluar.setValue({evalua:'S'});
                                  }else{
                                      var evaluar=Ext.getCmp('evalua');
                                      evaluar.setValue({evalua:'N'});                                    


                                  }
                             
                             
                             var codigo_e_grid=record.get('codigo_e');
                             var codigo_cargo_superior=record.get('codigo_cargo_jefe');
                             storeJefes.load({params:{codigo:codigo_cargo_superior}});
                             //Ext.getCmp('idcargoS').setValue(codigo_cargo_superior);
                               formEmpleados.getForm().loadRecord(record);         


                               }
                             
       
                            
                           }
                      }
                      }); //fin del sm
       
   

       

/******************************************** formularios********************************************************************/
/****************************************************************************************************************/






  function showformEmpleado(accion){
     storeCargos.removeAll();
     storeCargos.clearFilter();
     storeCargos.load();
     storeCargosOcupados.removeAll();
     storeCargosOcupados.clearFilter();
     storeCargosOcupados.load();

    formEmpleados=Ext.widget('form',{
        layout:{
               type:'table',
               columns:4,
               tdAttrs:{
                valign:'middle'
               }
        },
        fieldDefaults: {
                    labelWidth: 150,
                    labelStyle: 'font-weight:bold'
                },
        defaults:{
            frame:true,
            border: true,
            style: 'margin: 2px 10px 5px 10px;'

        },
            items:[
              {
                xtype:'textfield',
                fieldLabel:'<b>Codigo del empleado</b>',
                id:'codigoempleado',
                name:'codigoempleado',
                allowBlank:false,
                width:250,
                colspan:4
              },{
                xtype:'textfield',
                fieldLabel:'<b>Nombre del empleado</b>',
                id:'nombre_e',
                name:'nombre_e',
                allowBlank:false,
                width:300,
                colspan:2
              },
              {
                xtype:'textfield',
                fieldLabel:'<b>Apellido del empleado</b>',
                id:'apellido_e',
                name:'apellido_e',
                width:300,
                allowBlank:false,
                colspan:2
              },
              {
                    xtype      : 'radiogroup',
                    fieldLabel : 'Sexo.',
                    id:'sexo',
                    allowBlank:false,
                    colspan:4,
                    columns:1,
                                      
                    items:[
                        {
                            boxLabel  : 'MASCULINO',
                            inputValue: 'M',
                            name:'sexo'
                           
                        },
                        {
                            boxLabel  : 'FEMENINO',
                            name:'sexo',
                            inputValue: 'F'
                            
                        }
                    ]
                   
            },{
                xtype:'textfield',
                fieldLabel:'<b>Email</b>',
                id:'email',
                name:'email',
                width:400,
                allowBlank:false,
                colspan:4,
                vtype:'email'

            },
            {
                 xtype : 'combo',
                    id : 'idcargo',
                    store:storeCargos,
                    displayField:'cargo',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'idcargo',
                    hiddenName : 'idcargo',
                    fieldLabel: 'Cargo (*)',
                    width:400,
                    colspan:4,
                    allowBlank: false,
                    emptyText : 'Seleccione un cargo'

            },
                    {
                        html:'<font style="color:##0000FF;font-family:verdana,arial,sans-serif;font-size:12px;"><b>JEFE INMEDIATO SUPERIOR </b></font>',
                        colspan:4,
                        height:25
                      } ,

                  {
                 xtype : 'combo',
                    id : 'idcargoS',
                    store:storeCargosOcupados,
                    displayField:'cargoJ',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'idcargoJ',
                    hiddenName : 'idcargoJ',
                    fieldLabel: 'Cargo (*)',
                    width:400,
                    colspan:4,
                    //allowBlank: false,
                    emptyText : 'Seleccione un cargo',
                    listeners:{
                        change:function(field,newVal,oldVal){
                            storeJefes.clearFilter();
                            Ext.getCmp('codigo_e').clearValue();
                            storeJefes.load({params:{codigo:newVal}});
                        }
                    }


                  } ,
                {
                 xtype : 'combo',
                    id : 'codigo_e',
                    store:storeJefes,
                    displayField:'nombre_emp',
                    forceSelection : false,
                    triggerAction : 'all',
                    queryMode:'local',
                    disabled:false,
                    selectOnFocus : false,
                    valueField:'codigo_e',
                    hiddenName : 'codigo_e',
                    fieldLabel: 'Empleado (*)',
                    width:400,
                    colspan:4,
                    //allowBlank: false,
                    emptyText : 'Seleccion un empleado '

                  },
                {
                    xtype      : 'radiogroup',
                    fieldLabel : '¿Evalua al Jefe?.',
                    id:'evalua',
                    allowBlank:false,
                    colspan:4,
                    columns:1,
                                      
                    items:[
                        {
                            boxLabel  : 'SI',
                            inputValue: 'S',
                            name:'evalua'
                           
                        },
                        {
                            boxLabel  : 'NO',
                            name:'evalua',
                            inputValue: 'N'
                            
                        }
                    ]
                   
                  },
                   {
                        html:'<font style="color:##0000FF;font-family:verdana,arial,sans-serif;font-size:12px;"><b>PONDERACIONES DEL PROCESO </b></font>',
                        colspan:4,
                        height:25
                   },
                    {
                                xtype:'fieldset',
                                title: 'Ponderaciones',
                                colspan:4,
                                items:[                              

                                                  {
                                                     xtype: 'numberfield',
                                                     id:'jefe',
                                                     fieldLabel:'<b>JEFE</b>',
                                                     allowBlank:true,
                                                     width:200,
                                                     minValue:0,
                                                     maxValue:100

                                                  },
                                                  {
                                                     xtype:'numberfield',
                                                     id:'coworkers',
                                                     fieldLabel:'<b>COWORKERS</b>',
                                                     allowBlank:true,
                                                     width:200,
                                                     minValue:0,
                                                     maxValue:100
                                                  },
                                                  {
                                                     xtype:'numberfield',
                                                     id:'colaboradores',
                                                     fieldLabel:'<b>COLABORADORES</b>',
                                                     allowBlank:true,
                                                     width:200,
                                                     minValue:0,
                                                     maxValue:100
                                                  }
                                                  ,
                                                  {
                                                     xtype:'numberfield',
                                                     id:'personal',
                                                     fieldLabel:'<b>PERSONAL</b>',
                                                     allowBlank:true,
                                                     width:200,
                                                     minValue:0,
                                                     maxValue:100
                                                  }
                                                 

                                        ]
                                        }                   
            
        

        ],
        buttons:[
        {
            text:'<b>Registrar</b>',
            scale:'large',
            iconCls: 'icon-OK',
            handler: function(){

                if(this.up('form').getForm().isValid()){
                        var post_codigoempleado=Ext.getCmp('codigoempleado').getValue();
                        var post_nombre_e=Ext.getCmp('nombre_e').getValue();
                        var post_apellido=Ext.getCmp('apellido_e').getValue();
                        var post_email=Ext.getCmp('email').getValue();
                        var post_sexoG=Ext.getCmp('sexo').getChecked()[0].getGroupValue();
                        var post_cargo_selec=Ext.getCmp('idcargo').getValue();
                        var post_jefe=Ext.getCmp('codigo_e').getValue();
                        var post_evalua=Ext.getCmp('evalua').getChecked()[0].getGroupValue();

                        var post_pjefe=Ext.getCmp('jefe').getValue();
                        var post_pcolaboradores=Ext.getCmp('colaboradores').getValue();
                        var post_pcoworker=Ext.getCmp('coworkers').getValue();
                        var post_ppersonal=Ext.getCmp('personal').getValue();
                        


                        if(post_pjefe==null){post_pjefe=0;}
                        if(post_pcolaboradores==null){post_pcolaboradores=0;}
                        if(post_pcoworker==null){post_pcoworker=0;}
                        if(post_ppersonal==null){post_ppersonal=0;}
                        

                        if(accion!=0){//ingresar nueva competencia
                                Ext.Ajax.request({
                                    url:'procesos/guardar_empleadoEV.php?codigoempleado='+post_codigoempleado+'&nombre_e='+post_nombre_e+'&apellido_e='+post_apellido+'&email='+post_email+'&sexo='+post_sexoG+'&cargo='+post_cargo_selec+'&jefe='+post_jefe+'&evalua='+post_evalua+'&pjefe='+post_pjefe+'&pcoworker='+post_pcoworker+'&pcolaboradores='+post_pcolaboradores+'&ppersonal='+post_ppersonal,
                                    method:'POST',
                                    waitMsg:'Registrando datos',
                                    success:function(result,request){
                                        var jsonData=JSON.parse(result.responseText);
                                         var bandera=jsonData[0].bandera;
                                         var msj=jsonData[0].msg;

                                          if (bandera==1) {
                                                storeEmpleados.load();
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
                                                    title:'Codigo de Empleado, ya existe',
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
                                
                                

                            
                             Ext.Ajax.request({
                                    url:'procesos/update_empleadoEV.php?codigoempleado='+post_codigoempleado+'&nombre_e='+post_nombre_e+'&apellido_e='+post_apellido+'&email='+post_email+'&sexo='+post_sexoG+'&cargo='+post_cargo_selec+'&jefe='+post_jefe+'&evalua='+post_evalua+'&pjefe='+post_pjefe+'&pcoworker='+post_pcoworker+'&pcolaboradores='+post_pcolaboradores+'&ppersonal='+post_ppersonal,
                                    method:'POST',
                                    waitMsg:'Registrando los datos',
                                    success:function(result,request){
                                        var jsonData=JSON.parse(result.responseText);
                                        var bandera=jsonData[0].bandera;
                                        var msj=jsonData[0].msg;

                                        if (bandera==1) {
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

        },
        {
            text:'<b>Cancelar</b>',
            scale:'large',
            iconCls: 'icon-CANCEL',
            handler:function(){
                this.up('form').getForm().reset();
                this.up('window').destroy();
            }

        }
        ]
        

    });



    winCompetencias =Ext.widget('window',{
        title:'REGISTRO Y MODIFICACION DE UN EMPLEADO',
        closable:false,
        width:700,
        height:600,
        layout:'fit',
        resizable:true,
        modal:true,
        items:formEmpleados

    });

    

    
    winCompetencias.show();    
   }//fin de form competencias.




 
storeEmpleados.load();



 
/********************************************       DATA GRIDS    ************************************************/
/****************************************************************************************************************/  
                                      
 
 /************************************************--- GRID DE PUESTOS ---***********************************************/
    var gridEmpleado = Ext.create('Ext.grid.Panel', {
    store: storeEmpleados,
		stateful: true,
        collapsible: false,
        selModel: sm_empleado,
        multiSelect: true,
        width:'99%',
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
                text:'<b>DEPARTAMENTO</b>',
                sortable:true,
                dataIndex:'departamento',
                width:200
            },
            {
                text:'<b> GRUPO OCUPACIONAL</b>',
                sortable:true,
                dataIndex:'nombregrupo',
                width:175,
                hidden:true

            },
            {
                text:'<b>CARGO</b>',
                sortable:true,
                dataIndex:'cargo',
                width:175
            },
            {
                text:'<b>CODIGO EMPLEADO</b>',
                sortable:false,
                dataIndex:'codigoempleado',
                width:150,
                hidden:true
            }            
            ,
            {
                text     : '<b>NOMBRE</b>',
                sortable :  true,
                flex:1,
                dataIndex: 'nombre_e',
                width:150

            },
             {
                text     : '<b>APELLIDO</b>',
                sortable :  true,
                flex:1,
                dataIndex: 'apellido_e',
                width:150

            }
            ,{
                text:'<b>SEXO</b>',
                sortable: true,
                dataIndex:'sexo',
                width:50
            },{
                text:'<b>CORREO ELECTRONICO</b>',
                sortable: false,
                dataIndex:'email',
                width:200,
                hidden:true

            },{
                text:'<b>JEFE</b>',
                sortable:false,
                dataIndex:'codigo_e',
                width:100,
                hidden:true                

            },{

                text:'<b>SUPERIOR</b>',
                sortable: true,
                dataIndex:'nombre_emp',
                width:200                 
            },{
                text:'<b>CARGO SUPERIOR</b>',
                dataIndex:'codigo_cargo_jefe',
                hidden:true
            },
            {
                text:'<b>EVALUA</b>',
                dataIndex:'evalua',
                hidden:true
            },
            {
                text:'idponderacion',
                dataIndex:'idponderacion',
                hidden:true
            },
            {
                text:'valorjefe',
                dataIndex:'jefe',
                hidden:true
            },
            {
                text:'valorcoworkers',
                dataIndex:'coworkers',
                hidden:true
            },
            {
                text:'valorcolaborador',
                dataIndex:'colaboradores',
                hidden:true
            },
            {
                text:'valorpersonal',
                dataIndex:'personal',
                hidden:true 
            }
                        

            
            
        ],/*
        viewConfig: {
            stripeRows: true,
            enableTextSelection: true
        },
        bbar:Ext.create('Ext.PagingToolbar',{
            pageSize:5,
            //store:storeCargosEV,
            displayInfo:true,
            displayMsg: 'Displaying Invoices {0} - {1} of {2}',
            emptyMsg: "No invoices to display"
        }),*/

        tbar:[
            '->','-',

            {
                xtype: 'button',
                padding:5,
                cls: 'contactBtn',
                text: '<b>Agregar Empleado</b>',
                id: 'btnaddcargo',
                iconCls: 'icon-addEmpleado',
                handler:function(){
                   showformEmpleado(1);
                }
                
            },'-',
            {
                xtype: 'button',
                cls: 'contactBtn',
                text: '<b>Borrar Empleado</b>',
                id: 'btndeletecargo',
                iconCls: 'icon-deleteEmpleado',
                handler:function(){

                    Ext.MessageBox.confirm('Borrado','¿Esta seguro de borrar los cargos seleccionados?',function(btn){
                        if (btn==='yes') {

                                var selections=gridEmpleado.selModel.getSelection();

                                Ext.each(selections,function(record){
                                    id=record.get('codigoempleado');
                                    nombre=record.get('nombre_e');


                                   Ext.Ajax.request({
                                        url:'procesos/eliminar_empleado.php?id='+id+'&nombre='+nombre,
                                        method:'POST',
                                        success:function(result,request){
                                                var jsonData=JSON.parse(result.responseText);
                                                var bandera=jsonData[0].bandera;
                                                var msj=jsonData[0].msg;


                                                if(bandera==1){

                                                    storeEmpleados.load();
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
		renderTo:'interfazGestionEmpleados',
        width: "95%",
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
						title:'GESTION DE EMPLEADOS ',
						tabConfig:{
					cls: 'x-btn-text-icon',
					iconCls: 'icon-empleado'
					},
						defaults: {
							bodyStyle:'padding:0px',
							anchor: '100%',
							bodyStyle:'background:#DFE9F6;'
						 },
						 items:[
							 	{
									
									//height: 600,
									items:[gridEmpleado]
								}
						      ]
					 }/*fin de competencias*/
					 
					 
					 

					  ]//fin itemm tabpanel
         }//fin compo  tabpanel
			
			]

	});

	


});//terminacion onReady










