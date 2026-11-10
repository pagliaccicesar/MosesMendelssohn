<?php

/*use PHPMailer\PHPMailer\PHPMailer;
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
$mail->Username="info@asociacionmendelssohn.com.ar";
$mail->Password="Moses--2080";
$mail->SMTPSecure="tls";
$mail->Port=587;
$mail->setFrom("info@asociacionmendelssohn.com.ar","Newsletter");
$mail->addAddress("info@asociacionmendelssohn.com.ar");
$mail->Subject="Nueva suscripcion";
$mail->Body="Nuevo suscriptor:\n\n".$email;
$mail->send();
echo "OK";

}catch(Exception $e){
echo "ERROR";
}*/







use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header("Content-Type: text/plain; charset=UTF-8");

// Solo aceptar solicitudes POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit("ERROR");
}

// Clave secreta de Google reCAPTCHA v3
$secretKey = "6Ld8ORcuAAAAACTDiz_Vqtn9-bM-NzlSz0GnrBIK";

// Recibir datos
$nombre = trim($_POST["nombre"] ?? "");
$apellido = trim($_POST["apellido"] ?? "");
$email = trim($_POST["email"] ?? "");
$token = trim($_POST["recaptcha_token"] ?? "");

// Validar campos
if (
    $nombre === "" ||
    $apellido === "" ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    $token === ""
) {
    http_response_code(400);
    exit("ERROR_DATOS");
}

// ===============================
// Verificar Google reCAPTCHA v3
// ===============================

$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_URL => "https://www.google.com/recaptcha/api/siteverify",
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query([
        "secret" => $secretKey,
        "response" => $token
    ]),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 15
]);

$captchaResponse = curl_exec($ch);
$curlError = curl_errno($ch);

curl_close($ch);

// Comprobar respuesta de Google
if ($captchaResponse === false || $curlError !== 0) {
    http_response_code(500);
    exit("ERROR_CAPTCHA");
}

$captchaData = json_decode($captchaResponse, true);

// Validar puntuación, acción y dominio
$allowedHosts = [
    "asociacionmendelssohn.com.ar",
    "www.asociacionmendelssohn.com.ar"
];

if (
    !is_array($captchaData) ||
    ($captchaData["success"] ?? false) !== true ||
    ($captchaData["action"] ?? "") !== "newsletter" ||
    !in_array(($captchaData["hostname"] ?? ""), $allowedHosts, true) ||
    ($captchaData["score"] ?? 0) < 0.5
) {
    http_response_code(403);
    exit("ERROR_CAPTCHA");
}

// ===============================
// Enviar email con PHPMailer
// ===============================

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {

    $mail->isSMTP();
    $mail->Host = "smtp.hostinger.com";
    $mail->SMTPAuth = true;

    $mail->Username = "info@asociacionmendelssohn.com.ar";
    $mail->Password = "Moses--2080";

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->CharSet = "UTF-8";

    $mail->setFrom(
        "info@asociacionmendelssohn.com.ar",
        "Newsletter"
    );

    $mail->addAddress("info@asociacionmendelssohn.com.ar");

    $mail->Subject = "Nueva suscripcion al Newsletter";

    // Evitar saltos de línea en los datos personales
    $nombre = preg_replace('/[\r\n]+/', ' ', $nombre);
    $apellido = preg_replace('/[\r\n]+/', ' ', $apellido);

    $mail->Body =
        "Nuevo suscriptor:\n\n" .
        "Nombre: " . $nombre . "\n" .
        "Apellido: " . $apellido . "\n" .
        "Email: " . $email;

    $mail->send();

    echo "OK";

} catch (Exception $e) {

    error_log("Error Newsletter: " . $mail->ErrorInfo);

    http_response_code(500);
    echo "ERROR_ENVIO";

}

