<?php //MAKE SURE THIS STAYS ON LINE 1, OR IT WILL BREAK

include_once($_SERVER['DOCUMENT_ROOT'] . '/../config/config.php');

// include the common.php file for the autoload
include_once(BASE_PATH . 'includes/common.php');

// Set up include path for Zend Framework
ini_set( "include_path", BASE_PATH . "frameworks" );

//zamf browser (http://www.zamfbrowser.org/) is available for mac and windows
//it allows for more customized testing than the exchange.swf we have -ATF
$using_zamf = false;

// Zend_Amf_Server require.
require_once( BASE_PATH . "frameworks/Zend/Amf/Server.php" );

if($using_zamf){
	// Require the ZendAmfServiceBrowser class
	require_once(BASE_PATH . "frameworks/browser/ZendAmfServiceBrowser.php" );
}

// Start Server
$server = new Zend_Amf_Server();

// Register Classes
$server->setClass( "zendtest" );
$server->setClass( "exchange" );
$server->setClass( "users" );


if($using_zamf){
	// Add the ZamfBrowser service class so ZamfBrowser can retrieve method information.
	$server->setClass( "ZendAmfServiceBrowser" );

	// Set a reference to the Zend_Amf_Server object so ZendAmfServiceBrowser class can retrieve method information.
	ZendAmfServiceBrowser::$ZEND_AMF_SERVER = $server;
}

// Handle ZendAMF request
$response = $server->handle();

// IMPORTANT!: Send the response back to flash
echo $response;

?>