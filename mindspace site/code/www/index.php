<?php

    include_once($_SERVER['DOCUMENT_ROOT'] . '/../config/config.php');
    include_once(BASE_PATH . 'includes/common.php');
	include_once(BASE_PATH . 'includes/ChromePhp.php');

    session_start();

    $page_path = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['SCRIPT_NAME'];

    if (file_exists($page_path) && ($_SERVER['SCRIPT_NAME'] != '/index.php')) {
        include($page_path);
    } else {
        $www = new www;
    }
