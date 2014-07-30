<?php

/*Set this to true to engage testing mode.*/

    $testing = true;

/*Student's Variables, mostly sent from the form*/
	$fname = $_POST['firstname'];
	$lname = $_POST['lastname'];
	$email = $_POST['email'];
	$subject = 'Go Big Bingo Contact Form';
	$textissue = $_POST['issue'];
	
//$to = "richard@mindspace.net, darren@mindspace.net, todd@mindspace.net, bryan@mindspace.net";
$to = "bryan@mindspace.net";

    $MsMessage = "
        -----------------------------------------------------------
        Name: " . $fname . " " . $lname . "
        -----------------------------------------------------------
        Email: " . $email . "
        -----------------------------------------------------------
        Issue: " . $textissue . "
        -----------------------------------------------------------
        ";

/*Bring in the phpmailer class [http://phpmailer.worxware.com/]*/
include_once('class.phpmailer.php');

/*Email sent to ACI*/
    //Instantiate a new PHPmailer object.
    $MsMail = new PHPMailer();
    $MsMail->WordWrap = 80;
    $MsMail->SetFrom($emailaddr, $name);
	$MsMail->AddAddress($to);
    $MsMail->Subject = $subject;
    $MsMail->Body = $MsMessage;

if(!$MsMail->Send()) {
    echo 'contact-error<br>';
    echo $MsMail->ErrorInfo;
} else {
    echo "contact-sent\n";
}

?>  