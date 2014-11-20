<?php

	include_once($_SERVER['DOCUMENT_ROOT'] . '/../config/config.php');
	include_once(BASE_PATH . 'includes/common.php');

	$return["status"] = "";

	if (isset($_POST['email'])) {
		$testing = ($_SERVER['SERVER_NAME'] == TEST_SITE) ? true : false; //check config.php for the test site name
		$to = ($testing) ? TEST_EMAIL : CLIENT_EMAIL; //check config.php for the email addys
		$from = $_POST['email'];
		$subject = "A contact form has been submitted";
		$message = "";

		foreach($_POST as $key=>$val) {
			if ($val != "" && $key != "timestamp") {
				$field = ucfirst(str_replace("_"," ",$key));
				$message .= "-----------------------------------------------------------
				{$field}: {$val}\n";
			}
		}

		$message .="-----------------------------------------------------------";

		$header = "From: {$from}\n";
		if (!$testing)
			$header .= "Bcc: bryan@mindspace.net,richard@mindspace.net\n";
		$header .= "Reply-To: {$from}\n";

		if(mail($to, $subject, $message, $header)) {
			$return["status"] = "Your information has been received. Thanks and we&#8217;ll be in touch shortly!";
		} else {
			$return["status"] = "<h3>Sorry, but there was an error processing your request.</h3>";
		}
	}

	header("Content-type: application/json");
	echo json_encode($return);
