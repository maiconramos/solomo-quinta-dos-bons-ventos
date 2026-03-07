<?php
/**
 * Solomo LP Boilerplate - Meta Conversions API (CAPI) Proxy
 * Receives tracking events from the frontend, hashes PII, and sends to Meta Graph API.
 * For Lead events, also forwards data to the n8n webhook.
 *
 * Placeholders replaced at deploy time by GitHub Actions:
 *   [[PIXEL_ID]]         -> Meta Pixel ID (via inject-api-secrets.ts)
 *   [[ACCESS_TOKEN]]     -> Meta CAPI access token (via inject-api-secrets.ts)
 *   __N8N_WEBHOOK_URL__  -> n8n webhook URL (via sed in workflow)
 */

// --- CORS Headers ---
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// --- Preflight ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// --- Only POST ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// --- Placeholders ---
$pixel_id     = "[[PIXEL_ID]]";
$access_token = "[[ACCESS_TOKEN]]";
$n8n_webhook  = "__N8N_WEBHOOK_URL__";

// --- Graceful skip if tracking not configured (local dev) ---
// Check if values look like real tokens (not empty, not placeholders with brackets)
if (empty($pixel_id) || empty($access_token)
    || strpos($pixel_id, '[[') !== false
    || strpos($access_token, '[[') !== false) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Tracking not configured, skipping']);
    exit;
}

// --- Parse JSON body ---
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON payload']);
    exit;
}

// --- Validate required fields ---
$event_name       = $data['event_name'] ?? '';
$event_id         = $data['event_id'] ?? '';
$event_source_url = $data['event_source_url'] ?? '';

if (empty($event_name) || empty($event_id) || empty($event_source_url)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields: event_name, event_id, event_source_url']);
    exit;
}

// --- Capture client IP server-side (same pattern as send-form.php) ---
$ip = $_SERVER['HTTP_X_FORWARDED_FOR']
    ?? $_SERVER['HTTP_X_REAL_IP']
    ?? $_SERVER['REMOTE_ADDR']
    ?? '';
if (strpos($ip, ',') !== false) {
    $ip = trim(explode(',', $ip)[0]);
}

// --- Build user_data for Meta ---
$user_data_raw = $data['user_data'] ?? [];
$custom_data_raw = $data['custom_data'] ?? [];

$meta_user_data = [];

// Hash email (SHA256, lowercase, trimmed) — Meta requires em as array
if (!empty($user_data_raw['email'])) {
    $meta_user_data['em'] = [hash('sha256', strtolower(trim($user_data_raw['email'])))];
}

// Hash phone (SHA256, digits only WITH country code)
// Meta requires country code — Brazilian phones get 55 prefix
if (!empty($user_data_raw['phone'])) {
    $phone_clean = preg_replace('/[^0-9]/', '', $user_data_raw['phone']);
    // Add Brazil country code if not already present (phones with 10-11 digits = local)
    if (strlen($phone_clean) <= 11) {
        $phone_clean = '55' . $phone_clean;
    }
    $meta_user_data['ph'] = [hash('sha256', $phone_clean)];
}

// Hash first name (SHA256, lowercase, trimmed) — extracted from full name
if (!empty($custom_data_raw['name'])) {
    $name_parts = explode(' ', trim($custom_data_raw['name']));
    $first_name = strtolower(trim($name_parts[0]));
    if (!empty($first_name)) {
        $meta_user_data['fn'] = [hash('sha256', $first_name)];
    }
    // Last name if available
    if (count($name_parts) > 1) {
        $last_name = strtolower(trim(end($name_parts)));
        if (!empty($last_name)) {
            $meta_user_data['ln'] = [hash('sha256', $last_name)];
        }
    }
}

// Country — always Brazil for this LP (hashed)
$meta_user_data['country'] = [hash('sha256', 'br')];

// Non-hashed fields (do NOT hash these per Meta docs)
if (!empty($user_data_raw['fbp'])) {
    $meta_user_data['fbp'] = $user_data_raw['fbp'];
}
if (!empty($user_data_raw['fbc'])) {
    $meta_user_data['fbc'] = $user_data_raw['fbc'];
}
// client_user_agent is REQUIRED for website events
if (!empty($user_data_raw['client_user_agent'])) {
    $meta_user_data['client_user_agent'] = $user_data_raw['client_user_agent'];
}

// Always override IP server-side (do NOT hash)
$meta_user_data['client_ip_address'] = $ip;

// --- Build event payload for Meta ---
$event_data = [
    'event_name'       => htmlspecialchars(strip_tags($event_name)),
    'event_time'       => time(),
    'event_id'         => htmlspecialchars(strip_tags($event_id)),
    'event_source_url' => filter_var($event_source_url, FILTER_SANITIZE_URL),
    'action_source'    => 'website',
    'user_data'        => $meta_user_data,
];

// Include custom_data if present
if (!empty($custom_data_raw) && is_array($custom_data_raw)) {
    $sanitized_custom = [];
    foreach ($custom_data_raw as $key => $value) {
        if (is_string($value)) {
            $sanitized_custom[htmlspecialchars(strip_tags($key))] = htmlspecialchars(strip_tags($value));
        }
    }
    if (!empty($sanitized_custom)) {
        $event_data['custom_data'] = $sanitized_custom;
    }
}

$meta_payload = ['data' => [$event_data]];

// Include test_event_code if provided
$test_event_code = $data['test_event_code'] ?? '';
if (!empty($test_event_code)) {
    $meta_payload['test_event_code'] = htmlspecialchars(strip_tags($test_event_code));
}

// --- Send to Meta Graph API ---
$meta_url = "https://graph.facebook.com/v21.0/" . urlencode($pixel_id) . "/events?access_token=" . urlencode($access_token);

$ch = curl_init($meta_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($meta_payload));
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$meta_response  = curl_exec($ch);
$meta_status    = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$meta_curl_err  = curl_error($ch);
curl_close($ch);

$meta_ok = !$meta_curl_err && $meta_status >= 200 && $meta_status < 300;

// --- For Lead events: also forward to n8n webhook ---
$n8n_ok = true; // default true (non-Lead events skip this)
if (strtolower($event_name) === 'lead'
    && !empty($n8n_webhook)
    && strpos($n8n_webhook, 'http') === 0
    && strpos($n8n_webhook, '__') === false) {

    $n8n_payload = json_encode([
        'name'       => htmlspecialchars(strip_tags($custom_data_raw['name'] ?? '')),
        'email'      => htmlspecialchars(strip_tags($user_data_raw['email'] ?? '')),
        'phone'      => htmlspecialchars(strip_tags($user_data_raw['phone'] ?? '')),
        'source'     => 'landing_page',
        'page_url'   => filter_var($event_source_url, FILTER_SANITIZE_URL),
        'user_agent' => $user_data_raw['client_user_agent'] ?? '',
        'ip'         => $ip,
        'form_name'  => htmlspecialchars(strip_tags($custom_data_raw['form_name'] ?? 'lead-form')),
        'form_id'    => htmlspecialchars(strip_tags($custom_data_raw['form_id'] ?? '')),
        'date'       => date('Y-m-d H:i:s'),
    ]);

    $ch2 = curl_init($n8n_webhook);
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch2, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch2, CURLOPT_POST, true);
    curl_setopt($ch2, CURLOPT_POSTFIELDS, $n8n_payload);
    curl_setopt($ch2, CURLOPT_TIMEOUT, 10);

    $n8n_response = curl_exec($ch2);
    $n8n_status   = curl_getinfo($ch2, CURLINFO_HTTP_CODE);
    $n8n_curl_err = curl_error($ch2);
    curl_close($ch2);

    $n8n_ok = !$n8n_curl_err && $n8n_status >= 200 && $n8n_status < 300;
}

// --- Response (debug enabled temporarily for test_event_code validation) ---
$response_data = [
    'success' => $meta_ok,
    'message' => $meta_ok ? 'Event tracked successfully' : 'Failed to send event to Meta',
    'debug' => [
        'meta_status'   => $meta_status,
        'meta_response' => json_decode($meta_response, true),
        'had_test_code' => !empty($test_event_code),
        'event_name'    => $event_data['event_name'],
        'event_id'      => $event_data['event_id'],
        'user_data_keys' => array_keys($meta_user_data),
    ],
];

http_response_code($meta_ok ? 200 : 500);
echo json_encode($response_data);
?>
