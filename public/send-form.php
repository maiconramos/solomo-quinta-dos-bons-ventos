<?php
/**
 * Solomo LP Boilerplate - Form Proxy
 * Recebe a requisição do frontend React (JSON), processa e envia para o Webhook do n8n.
 * Evita exposição da URL real do Webhook e permite tratamento de CORS.
 *
 * SETUP: Substitua a variável $n8n_webhook_url pela URL real do webhook n8n do projeto.
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// IMPORTANTE: Em produção, substitua pela URL real do webhook n8n
$n8n_webhook_url = "COLOQUE_A_URL_DO_N8N_AQUI";

$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, TRUE);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload']);
    exit;
}

$payload = json_encode([
    'name'  => htmlspecialchars(strip_tags($data['name'] ?? '')),
    'email' => filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL),
    'phone' => htmlspecialchars(strip_tags($data['phone'] ?? '')),
    'source'=> 'landing_page',
    'date'  => date('Y-m-d H:i:s')
]);

$payloadArray = json_decode($payload, true);
if (empty($payloadArray['name']) || empty($payloadArray['email'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Name and email are required']);
    exit;
}

$ch = curl_init($n8n_webhook_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
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
