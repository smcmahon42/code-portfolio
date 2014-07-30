<?php

	$site_config = $_SERVER['DOCUMENT_ROOT'] . '/../../mindspace_v3_config.php';
	if (file_exists($site_config)) {
		include($site_config);
	}

	defined('DS') ? null : define('DS', DIRECTORY_SEPARATOR);
	if (!defined('DB_HOST')) { define('DB_HOST', 'localhost'); }
	if (!defined('DB_USER')) { define('DB_USER', 'root'); }
	//if (!defined('DB_PASS')) { define('DB_PASS', 'dat3R'   ); }
	if (!defined('DB_PASS')) { define('DB_PASS', 'root'   ); }
	if (!defined('DB_NAME')) { define('DB_NAME', 'msgamified'    ); }

	define('BASE_PATH', dirname(dirname(__FILE__)) . DS);
	define('CLASS_PATH', BASE_PATH . 'models' . DS);
	define('CONTROLLER_PATH', BASE_PATH . 'controllers' . DS);
	define('WWW_VIEW_PATH', BASE_PATH . 'views' . DS . 'www' . DS);
	define('ADMIN_VIEW_PATH', BASE_PATH . 'views' . DS . 'admin' . DS);

	//the following are based on what's in the msfw static, and are used in contactmail.php
	define('TEST_SITE', "msv3-www.local");
    define('TEST_EMAIL', "jamie@mindspace.net"); //developer email here
	define('CLIENT_EMAIL', "todd@mindspace.net"); //edit the client email here
