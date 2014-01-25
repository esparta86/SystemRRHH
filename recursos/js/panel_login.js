Ext.ns('login_conamype');
login_conamype.Panel = 
{
	init: function()
	{
            Ext.form.Field.prototype.msgTarget='side';
            
            var form_login = new Ext.FormPanel
            ({
                id          :   'id_form_login',
                labelAlign  :   'top',
                autoHeight  :   true,
                autoScroll  :   false,
                border      :   true,
                bodyStyle   :   'padding: 10px 20px 30px 10px;',
                frame        :false,
                layout      :{
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
                                html    :   '<img src="recursos/img/avance.png"/>',
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
                                            if (Ext.getCmp('id_form_login').getForm().isValid())
                                                    {
                                                         Ext.getCmp('id_form_login').getForm().submit
                                                        ({
                                                            waitMsg :  'VALIDANDO DATOS...',
                                                            url     : 'modulos/procesos_login/login.php',
                                                            method: 'POST',
                                                            success: function(form, action)
                                                            {                           
                                                                var result=action.responseText;
                                                                switch(action.result.bandera)
                                                                {
                                                                    case 1:
                                                                        Ext.MessageBox.show
                                                                        ({
                                                                           msg: 'REDIRECCIONANDO...',
                                                                           width:300,
                                                                           wait:true,
                                                                           waitConfig: {interval:300},
                                                                           icon:'security'
                                                                        });
                                                                        location.href='modulos/menu.php';
                                                                        break;
                                                                    case 2:
                                                                        Ext.getCmp('pass_emp').focus(false,1000);
                                                                        Ext.MessageBox.show
                                                                         ({
                                                                                title: 'ERROR DE INGRESO DE DATOS',
                                                                                msg: '<b>USUARIO O CONTRASEÑA INCORRECTOS, INTENTE DE NUEVO!!!</b>',
                                                                                buttons: Ext.MessageBox.OK,
                                                                                icon: Ext.MessageBox.ERROR
                                                                        });
                                                                        
                                                                    break;

                                                                    case 3:
                                                                        Ext.getCmp('pass_emp').focus(false,1000);
                                                                        Ext.MessageBox.show
                                                                         ({
                                                                                title: 'USUARIO DESACTIVADO',
                                                                                msg: '<b>   SU USUARIO ESTA DESACTIVO, CONTACTE CON EL ADMINISTRADOR!</b>',
                                                                                buttons: Ext.MessageBox.OK,
                                                                                icon: Ext.MessageBox.WARNING
                                                                        });
                                                                    break;
                                                                    default:
                                                                        Ext.getCmp('pass_emp').focus(false,1000);
                                                                        Ext.MessageBox.show
                                                                         ({
                                                                                title: 'ERROR DE SISTEMA',
                                                                                msg: '<b>OCURRIO UN ERROR AL MOMENTO DE CONECTARSE AL SISTEMA!!!</b>',
                                                                                buttons: Ext.MessageBox.OK,
                                                                                icon: Ext.MessageBox.WARNING
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


                                                    }else
                                                    {
                                                        Ext.getCmp('pass_emp').focus(false,1000);
                                                         Ext.MessageBox.show
                                                         ({
                                                            title   : 'VERIFICAR ERRORES',
                                                            msg     : '<b>LA INFORMACION INGRESADA ES INCORRECTA, REVISAR EL FORMULARIO!!!</b>',
                                                            buttons : Ext.MessageBox.OK,
                                                            icon    : Ext.MessageBox.ERROR
                                                         });   
                                                         
                                                    }
                                        }/*fin de handler*/

                                     }                                                             

                      ]
                
            });
                            
                            
                    
                    
            
			
            var main = new Ext.Panel
            ({
                    title: 'SISTEMA ONLINE DE COMPETENCIAS DE RECURSOS HUMANOS',
                    iconCls:'users',
                    border:true,
                    bodyStyle: 'padding:11px; background-color:#E0ECF8; ',
                    items    :[form_login],
                    renderTo:'cuadro_login',
                    bbar:[{text:'<center><b><font size="2">Avance y Desempe&ntilde;o s.a. de c.v </font></b><b><font size="1"> &copy;'+ new Date().getFullYear()+'</font></b></center>'}]

            });
            //Ext.getCmp('nick_emp').focus(false,1000);

	}
};

Ext.onReady(login_conamype.Panel.init,login_conamype.Panel);