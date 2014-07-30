<?php

	//note that if a model is loaded in zend.php using $server->setClass( "modelname" );
	//this class becomes obsolete, because you can call the object and method
	//directly from flash, such as $users->load_for_flash();
	
	class exchange {
		
		public function test_db () {
			$registry = registry::getInstance();
			$users = new users;
			return $users->load_for_flash();
		}
	}