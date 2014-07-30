<?php

    include_once(ADMIN_VIEW_PATH . 'header.php');

    $this->parse_viewlets('gate');
	$this->parse_viewlets('');

    include_once(ADMIN_VIEW_PATH . 'footer.php');

