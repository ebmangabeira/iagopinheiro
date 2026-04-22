<?php
header("Content-Type: text/plain; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo "Método não permitido.";
    exit;
}

if (!function_exists("mail")) {
    http_response_code(500);
    echo "A função de envio de e-mail não está disponível neste servidor.";
    exit;
}

function sanitizeSingleLine($value)
{
    $value = strip_tags(trim((string) $value));

    return preg_replace("/[\r\n]+/", " ", $value) ?: "";
}

function formatAddress($email, $name = "")
{
    $email = sanitizeSingleLine($email);
    $name = sanitizeSingleLine($name);

    if ($name === "") {
        return $email;
    }

    return sprintf('"%s" <%s>', addcslashes($name, "\\\""), $email);
}

// Em produção, prefira configurar por variável de ambiente.
$mailTo = getenv("SITE_CONTACT_EMAIL") ?: "contato@iagopinheiro.com";
$fromEmail = getenv("SITE_FROM_EMAIL") ?: "contato@iagopinheiro.com";
$fromName = getenv("SITE_FROM_NAME") ?: "Site Iago Pinheiro";
$subject = "Novo contato do site";

if (
    strpos($mailTo, "seudominio.com") !== false ||
    strpos($fromEmail, "seudominio.com") !== false
) {
    http_response_code(500);
    echo "Configure o e-mail do formulário no arquivo mail.php ou nas variáveis de ambiente.";
    exit;
}

if (!filter_var($mailTo, FILTER_VALIDATE_EMAIL) || !filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(500);
    echo "Os e-mails de configuração do formulário são inválidos.";
    exit;
}

$name = sanitizeSingleLine($_POST["name"] ?? "");
$email = filter_var(trim((string) ($_POST["email"] ?? "")), FILTER_SANITIZE_EMAIL);
$phone = sanitizeSingleLine($_POST["phone"] ?? "");
$message = trim((string) ($_POST["message"] ?? ""));

if ($name === "" || !filter_var($email, FILTER_VALIDATE_EMAIL) || $phone === "" || $message === "") {
    http_response_code(400);
    echo "Preencha todos os campos corretamente e tente novamente.";
    exit;
}

$safeName = htmlspecialchars($name, ENT_QUOTES, "UTF-8");
$safeEmail = htmlspecialchars($email, ENT_QUOTES, "UTF-8");
$safePhone = htmlspecialchars($phone, ENT_QUOTES, "UTF-8");
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, "UTF-8"));

$content = "<html><body style=\"font-family: Arial, sans-serif; color: #111;\">";
$content .= "<h2 style=\"margin-bottom: 16px;\">Novo contato pelo formulário do site</h2>";
$content .= "<p><strong>Nome:</strong> {$safeName}</p>";
$content .= "<p><strong>E-mail:</strong> {$safeEmail}</p>";
$content .= "<p><strong>Telefone:</strong> {$safePhone}</p>";
$content .= "<p><strong>Mensagem:</strong><br>{$safeMessage}</p>";
$content .= "</body></html>";

$headers = array(
    "MIME-Version: 1.0",
    "Content-type: text/html; charset=UTF-8",
    "From: " . formatAddress($fromEmail, $fromName),
    "Reply-To: " . formatAddress($email, $name),
    "X-Mailer: PHP/" . phpversion(),
);

if (mail($mailTo, $subject, $content, implode("\r\n", $headers))) {
    http_response_code(200);
    echo "Mensagem enviada com sucesso.";
    exit;
}

http_response_code(500);
echo "Não foi possível enviar a mensagem. Verifique a configuração de e-mail do servidor.";
