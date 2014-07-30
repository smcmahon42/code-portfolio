<?php

    include_once($_SERVER['DOCUMENT_ROOT'] . '/../config/config.php');
    include_once(BASE_PATH . 'includes/common.php');

    switch ($_REQUEST['option']) {
        case 'get_points' :
            $guest_id = $_REQUEST['guest_id'];
            $guest = new guest;
            $guest->load($guest_id);
            echo json_encode($guest->tally());
            break;
        case 'save_points' :
            $guest_id = $_POST['guest_id'];
            $points = $_POST['points'];
            $tasks = $_POST['tasks'];
            $guest = new guest;
            $guest->load($guest_id);
            $guest->points = $_POST['points'];
            $guest->tasks = $_POST['tasks'];
            $guest->store();
            break;
    }
