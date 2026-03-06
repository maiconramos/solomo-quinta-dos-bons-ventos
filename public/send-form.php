<?php
/**
 * Solomo LP Boilerplate - Form Proxy
 * Recebe a requisição do frontend (form POST), processa e envia para o Webhook do n8n.
 * Evita exposição da URL real do Webhook.
 *
 * A URL do webhook é injetada automaticamente pelo GitHub Actions no deploy.
 */

header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$n8n_webhook_url = "__N8N_WEBHOOK_URL__";

if (empty($n8n_webhook_url) || strpos($n8n_webhook_url, 'http') !== 0) {
    http_response_code(500);
    echo json_encode(['error' => 'Webhook URL not configured. Run deploy via GitHub Actions.']);
    exit;
}

// Aceita form POST (x-www-form-urlencoded) ou JSON
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') !== false) {
    $data = json_decode(file_get_contents('php://input'), true) ?: [];
} else {
    $data = $_POST;
}

$name  = htmlspecialchars(strip_tags($data['nome'] ?? $data['name'] ?? ''));
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(strip_tags($data['telefone'] ?? $data['phone'] ?? ''));

if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(['error' => 'Name and email are required']);
    exit;
}

$payload = json_encode([
    'name'   => $name,
    'email'  => $email,
    'phone'  => $phone,
    'source' => 'landing_page',
    'date'   => date('Y-m-d H:i:s')
]);

$ch = curl_init($n8n_webhook_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

http_response_code($http_status >= 200 && $http_status < 300 ? 200 : $http_status);

if ($curl_error) {
    echo json_encode(['error' => 'Internal Server Error', 'message' => 'Failed to connect to integration service']);
} else {
    echo json_encode([
        'success' => $http_status >= 200 && $http_status < 300,
        'message' => 'Formulário processado'
    ]);
}
?>
