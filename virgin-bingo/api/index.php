<?php

    chdir('..');
    include_once('../config/config.php');
    include_once('../include/common.php');

    if (isset($_POST['option'])) {
        $method = $_POST['option'];
        $api = new api;
        if (method_exists($api, $method)) {
            $api->$method();
        }
    }
    exit;
