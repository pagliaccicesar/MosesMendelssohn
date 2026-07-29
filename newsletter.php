<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$email = $_POST["email"];

$mail = new PHPMailer(true);

try{
$mail->isSMTP();
$mail->Host="smtp.hostinger.com";
$mail->SMTPAuth=true;
$mail->Username="info@mendelssohn.com.ar";
$mail->Password="Moses--2080";
$mail->SMTPSecure="tls";
$mail->Port=587;
$mail->setFrom("info@asociacionmendelssohn.com.ar","Newsletter");
$mail->addAddress("info@asociacionmendelssohn.com.ar");
$mail->Subject="Nueva suscripción";
$mail->Body="Nuevo suscriptor:\n\n".$email;
$mail->send();
echo "OK";

}catch(Exception $e){
echo "ERROR";
}
