<?php
	class DBManager
	{
		var $obj_con;
		var $conectar;
		var $gestor;
		var $servidor;
		var $usuario;
		var $contra;
		var $db;


		function __construct()
		{
			$this->gestor=GESTOR;
			$this->servidor=SERVIDOR;
			$this->usuario=USUARIO;
			$this->contra=PASS;
			$this->db=DB;
			$this->obj_con=&ADONewConnection($this->gestor);
		}



		function conectar()
		{
			@$this->conectar=$this->obj_con->PConnect($this->servidor,$this->usuario,$this->contra,$this->db);
                        $this->obj_con->Execute("set names 'utf8'");
			if($this->conectar)
            {
                     return true;
			}
			else
			{
                     return false;
			}
		}

		function  desconectar()
                {
			@$this->obj_con->Close();
		}


	}



?>