<?php
/**
 * Solomo LP - Form Proxy
 * Recebe dados do frontend (JSON ou form POST), enriquece com IP, e envia para o webhook n8n.
 * A URL do webhook e injetada automaticamente pelo GitHub Actions no deploy.
 */

// CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Max-Age: 86400");
    http_response_code(204);
    exit;
}

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$n8n_webhook_url = "__N8N_WEBHOOK_URL__";

// Verificacao dupla: check se placeholder foi substituido E se e URL HTTP valida
if (empty($n8n_webhook_url) || strpos($n8n_webhook_url, 'http') !== 0) {
    http_response_code(500);
    echo json_encode(['error' => 'Webhook URL not configured. Run deploy via GitHub Actions.']);
    exit;
}

// Aceita JSON ou form POST (x-www-form-urlencoded)
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') !== false) {
    $data = json_decode(file_get_contents('php://input'), true) ?: [];
} else {
    $data = $_POST;
}

// Backwards compat: aceita nome/name, telefone/phone
$name  = htmlspecialchars(strip_tags($data['name'] ?? $data['nome'] ?? ''));
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(strip_tags($data['phone'] ?? $data['telefone'] ?? ''));

if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(['error' => 'Name and email are required']);
    exit;
}

// Captura IP do visitante
$ip = $_SERVER['HTTP_X_FORWARDED_FOR']
    ?? $_SERVER['HTTP_X_REAL_IP']
    ?? $_SERVER['REMOTE_ADDR']
    ?? '';
// Pega apenas o primeiro IP se houver lista
if (strpos($ip, ',') !== false) {
    $ip = trim(explode(',', $ip)[0]);
}

// Dados extras do frontend
$page_url   = htmlspecialchars(strip_tags($data['page_url'] ?? ''));
$user_agent = htmlspecialchars(strip_tags($data['user_agent'] ?? ''));
$form_name  = htmlspecialchars(strip_tags($data['form_name'] ?? 'lead_form'));
$form_id    = htmlspecialchars(strip_tags($data['form_id'] ?? ''));

$payload = json_encode([
    'name'       => $name,
    'email'      => $email,
    'phone'      => $phone,
    'ip'         => $ip,
    'page_url'   => $page_url,
    'user_agent' => $user_agent,
    'form_name'  => $form_name,
    'form_id'    => $form_id,
    'source'     => 'landing_page',
    'date'       => date('Y-m-d H:i:s'),
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
        'message' => 'Formulario processado',
    ]);
}
?>
