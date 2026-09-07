<?php
// Kepler Bilservice — API for domene.no (PHP + MySQL)
// Erstatter Node-serveren. Alle /api/-kall rutes hit via .htaccess.
header('Content-Type: application/json; charset=utf-8');
$CFG = @include __DIR__ . '/config.php';
if (!$CFG) { http_response_code(500); echo json_encode(['error' => 'config.php mangler. Kopier config.eksempel.php til config.php og fyll inn.']); exit; }
require __DIR__ . '/epost-maler.php';

try {
  $pdo = new PDO('mysql:host=' . $CFG['db_host'] . ';dbname=' . $CFG['db_navn'] . ';charset=utf8mb4', $CFG['db_bruker'], $CFG['db_passord'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
} catch (Exception $e) { http_response_code(500); echo json_encode(['error' => 'Får ikke kontakt med databasen. Sjekk config.php.']); exit; }

// Tabeller opprettes automatisk første gang
$pdo->exec("CREATE TABLE IF NOT EXISTS poster (id VARCHAR(64) PRIMARY KEY, type VARCHAR(24) NOT NULL, opprettet DATETIME NOT NULL, data JSON NOT NULL, INDEX(type), INDEX(opprettet)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
$pdo->exec("CREATE TABLE IF NOT EXISTS varsler (nr INT AUTO_INCREMENT PRIMARY KEY, tid DATETIME NOT NULL, kanal VARCHAR(8), til VARCHAR(190), type VARCHAR(190), tekst TEXT, status VARCHAR(190)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
$pdo->exec("CREATE TABLE IF NOT EXISTS logg (nr INT AUTO_INCREMENT PRIMARY KEY, tid DATETIME NOT NULL, tekst TEXT) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
$pdo->exec("CREATE TABLE IF NOT EXISTS innstillinger (k VARCHAR(64) PRIMARY KEY, v JSON NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
$pdo->exec("CREATE TABLE IF NOT EXISTS svv_cache (regnr VARCHAR(8) PRIMARY KEY, tid INT NOT NULL, data JSON NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

function no() { return date('Y-m-d H:i:s'); }
function iso($mysql) { return str_replace(' ', 'T', $mysql) . '+02:00'; }
function loggfor($pdo, $tekst) { $s = $pdo->prepare('INSERT INTO logg (tid, tekst) VALUES (?, ?)'); $s->execute([no(), $tekst]); }
function hentInnstilling($pdo, $k, $standard) {
  $s = $pdo->prepare('SELECT v FROM innstillinger WHERE k = ?'); $s->execute([$k]);
  $rad = $s->fetch(PDO::FETCH_NUM);
  return $rad ? json_decode($rad[0], true) : $standard;
}
function settInnstilling($pdo, $k, $v) {
  $s = $pdo->prepare('INSERT INTO innstillinger (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)');
  $s->execute([$k, json_encode($v, JSON_UNESCAPED_UNICODE)]);
}
function nesteNummer($pdo) {
  $t = hentInnstilling($pdo, 'teller', 1000) + 1;
  settInnstilling($pdo, 'teller', $t);
  return $t;
}
function lagrePost($pdo, $type, $id, $data) {
  $s = $pdo->prepare('INSERT INTO poster (id, type, opprettet, data) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)');
  $s->execute([$id, $type, no(), json_encode($data, JSON_UNESCAPED_UNICODE)]);
}
function hentPoster($pdo, $type) {
  $s = $pdo->prepare('SELECT data FROM poster WHERE type = ? ORDER BY opprettet DESC'); $s->execute([$type]);
  return array_map(function ($r) { return json_decode($r[0], true); }, $s->fetchAll(PDO::FETCH_NUM));
}
function hentPost($pdo, $type, $id) {
  $s = $pdo->prepare("SELECT data FROM poster WHERE type = ? AND (id = ? OR JSON_UNQUOTE(JSON_EXTRACT(data, '$.orderNumber')) = ?)");
  $s->execute([$type, $id, $id]);
  $rad = $s->fetch(PDO::FETCH_NUM);
  return $rad ? json_decode($rad[0], true) : null;
}
function uuid() { $d = random_bytes(16); $d[6] = chr(ord($d[6]) & 0x0f | 0x40); $d[8] = chr(ord($d[8]) & 0x3f | 0x80); return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($d), 4)); }

// ---------- E-post og SMS ----------
function sendEpostNaa($CFG, $til, $emne, $tekst, $html) {
  $grense = '=_kepler_' . md5(uniqid());
  $topp = 'From: ' . mb_encode_mimeheader($CFG['epost_fra_navn'], 'UTF-8') . ' <' . $CFG['epost_fra'] . ">\r\n"
    . 'Reply-To: ' . $CFG['epost_svar_til'] . "\r\n"
    . "MIME-Version: 1.0\r\n"
    . 'Content-Type: multipart/alternative; boundary="' . $grense . '"';
  $kropp = "--$grense\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n" . $tekst
    . "\r\n--$grense\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n" . ($html ?: nl2br(htmlspecialchars($tekst)))
    . "\r\n--$grense--";
  return @mail($til, '=?UTF-8?B?' . base64_encode($emne) . '?=', $kropp, $topp, '-f' . $CFG['epost_fra']);
}
function normaliserTlf($raatt) {
  $rent = preg_replace('/[\s\-\.]/', '', (string)$raatt);
  return preg_match('/^(?:\+47|0047)?([49]\d{7})$/', $rent, $m) ? '+47' . $m[1] : null;
}
function varsle($pdo, $CFG, $kanal, $til, $type, $tekst, $html = null) {
  $status = 'fanget';
  $inn = hentInnstilling($pdo, 'varsling', ['epostPaa' => true, 'smsPaa' => true, 'maler' => []]);
  if ($kanal === 'epost') {
    if (empty($inn['epostPaa'])) $status = 'deaktivert';
    elseif ($til) $status = sendEpostNaa($CFG, $til, $type, $tekst, $html) ? 'sendt' : 'feilet: mail() avvist';
  } else {
    $nummer = normaliserTlf($til);
    if (empty($inn['smsPaa'])) $status = 'deaktivert';
    elseif (!$nummer) $status = 'avvist: ugyldig eller manglende telefonnummer';
    elseif (!$CFG['twilio_sid']) $status = 'fanget (SMS ikke koblet til)';
    else {
      $til = $nummer;
      $ch = curl_init('https://api.twilio.com/2010-04-01/Accounts/' . $CFG['twilio_sid'] . '/Messages.json');
      curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 10,
        CURLOPT_USERPWD => $CFG['twilio_sid'] . ':' . $CFG['twilio_token'],
        CURLOPT_POSTFIELDS => http_build_query(['From' => $CFG['twilio_fra'], 'To' => $nummer, 'Body' => $tekst])]);
      $svar = json_decode((string)curl_exec($ch), true);
      $status = isset($svar['sid']) ? 'sendt (' . $svar['sid'] . ')' : 'feilet: ' . (isset($svar['message']) ? $svar['message'] : 'ukjent feil');
    }
  }
  $s = $pdo->prepare('INSERT INTO varsler (tid, kanal, til, type, tekst, status) VALUES (?, ?, ?, ?, ?, ?)');
  $s->execute([no(), $kanal, $til ?: '(mangler mottaker)', $type, $tekst, $status]);
}
$STANDARD_MALER = [
  'smsBooking' => 'Kepler: Timen din er bekreftet {detaljer}. Ref {ref}.',
  'smsPaaminnelse' => 'Kepler: Paaminnelse - du har time i morgen: {detaljer}. Ref {ref}.',
  'smsFerdig' => 'Kepler: Arbeidet paa bilen din er ferdig. Ref {ref}.',
  'smsHenting' => 'Kepler: Bilen din er klar til henting. Ref {ref}.',
  'smsVenteliste' => 'Kepler: Ledig plass fra ventelisten: {detaljer}. Ring 33 33 44 00.',
  'smsVentelistePaameldt' => 'Kepler: Hei {navn}. Du er satt paa venteliste for {detaljer}. Vi gir beskjed hvis det blir ledig plass.',
  'smsOrdre' => 'Kepler: Hei {navn}. Vi har mottatt bestillingen din. Ordrenummer {ref}. Du faar mer informasjon paa e-post.',
  'smsBetaling' => 'Kepler: Betalingen for ordre {ref} er mottatt. Takk for bestillingen.',
  'smsEndret' => 'Kepler: Timen din ({ref}) er endret: {detaljer}. Ring 33 33 44 00 ved sporsmal.',
  'smsAvbestilt' => 'Kepler: Timen din ({ref}) er avbestilt: {detaljer}. Ring 33 33 44 00 for ny time.',
  'smsAdminBooking' => 'Kepler: Ny booking {ref} fra {navn}: {detaljer}.',
  'smsAdminOrdre' => 'Kepler: Ny ordre {ref} fra {navn}.',
  'statusEndret' => 'Hei {navn}! Ordre {ref} har fatt ny status: {detaljer}.',
  'venteliste' => 'Hei {navn}! Det er blitt ledig plass: {detaljer}. Ring 33 33 44 00 for a sikre timen.'
];
function fyllMal($pdo, $mal, $felter) {
  global $STANDARD_MALER;
  $inn = hentInnstilling($pdo, 'varsling', ['maler' => []]);
  $tekst = isset($inn['maler'][$mal]) ? $inn['maler'][$mal] : (isset($STANDARD_MALER[$mal]) ? $STANDARD_MALER[$mal] : '{detaljer}');
  return preg_replace_callback('/\{(\w+)\}/', function ($m) use ($felter) { return isset($felter[$m[1]]) ? $felter[$m[1]] : ''; }, $tekst);
}

// ---------- Sesjon ----------
session_name('kepler_sesjon');
session_start();
function krevAdmin() {
  if (empty($_SESSION['bruker'])) { http_response_code(401); echo json_encode(['error' => 'Krever innlogging.']); exit; }
  return $_SESSION['bruker'];
}

// ---------- Ruting ----------
$sti = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$sti = preg_replace('#^.*?/api/#', '/api/', $sti);
$metode = $_SERVER['REQUEST_METHOD'];
$inn = json_decode(file_get_contents('php://input'), true) ?: [];
function svar($data, $kode = 200) { http_response_code($kode); echo json_encode($data, JSON_UNESCAPED_UNICODE); exit; }

// ---- Ordre ----
if ($sti === '/api/orders' && $metode === 'POST') {
  $kunde = isset($inn['customer']) ? $inn['customer'] : null;
  $varer = isset($inn['items']) ? $inn['items'] : null;
  if (!$kunde || empty($kunde['name']) || (empty($kunde['phone']) && empty($kunde['email'])) || !is_array($varer) || !count($varer))
    svar(['error' => 'Ugyldig ordre. Oppgi kunde (navn og telefon eller e-post) og minst én vare.'], 400);
  $sum = isset($inn['total']) ? $inn['total'] : array_sum(array_map(function ($i) { return (isset($i['price']) ? $i['price'] : 0) * (isset($i['quantity']) ? $i['quantity'] : 1); }, $varer));
  $ordre = ['id' => uuid(), 'orderNumber' => 'KB-' . nesteNummer($pdo), 'createdAt' => date('c'), 'status' => 'new',
    'paymentStatus' => 'pending', 'paymentAttempts' => [], 'customer' => $kunde, 'items' => $varer, 'total' => $sum,
    'source' => isset($inn['source']) ? $inn['source'] : ''];
  lagrePost($pdo, 'ordre', $ordre['id'], $ordre);
  loggfor($pdo, 'Ordre ' . $ordre['orderNumber'] . ' opprettet for ' . $kunde['name']);
  $navnListe = implode(', ', array_map(function ($i) { return ((isset($i['quantity']) && $i['quantity'] > 1) ? $i['quantity'] . ' x ' : '') . (isset($i['name']) ? $i['name'] : $i['productId']); }, $varer));
  $dataO = ['ref' => $ordre['orderNumber'], 'kunde' => ['navn' => $kunde['name'], 'tlf' => isset($kunde['phone']) ? $kunde['phone'] : '', 'epost' => isset($kunde['email']) ? $kunde['email'] : ''],
    'tjenester' => $navnListe, 'total' => 'kr ' . number_format($sum, 0, ',', ' ') . ',-', 'betaling' => 'Ikke betalt', 'dato' => date('d.m.Y')];
  $mK = lagEpost('order-confirmation', $dataO);
  varsle($pdo, $CFG, 'epost', isset($kunde['email']) ? $kunde['email'] : '', $mK['emne'], $mK['tekst'], $mK['html']);
  $mA = lagEpost('admin-new-order', $dataO);
  varsle($pdo, $CFG, 'epost', $CFG['epost_admin'], $mA['emne'], $mA['tekst'], $mA['html']);
  if (!empty($kunde['phone'])) varsle($pdo, $CFG, 'sms', $kunde['phone'], 'Ordrebekreftelse', fyllMal($pdo, 'smsOrdre', ['navn' => $kunde['name'], 'ref' => $ordre['orderNumber']]));
  if ($CFG['admin_sms']) varsle($pdo, $CFG, 'sms', $CFG['admin_sms'], 'Ny ordre', fyllMal($pdo, 'smsAdminOrdre', ['ref' => $ordre['orderNumber'], 'navn' => $kunde['name']]));
  svar($ordre, 201);
}
if ($sti === '/api/orders' && $metode === 'GET') svar(hentPoster($pdo, 'ordre'));
if (preg_match('#^/api/orders/([^/]+)/car-ready$#', $sti, $m) && $metode === 'POST') {
  $bruker = krevAdmin();
  $ordre = hentPost($pdo, 'ordre', urldecode($m[1]));
  if (!$ordre) svar(['error' => 'Fant ikke ordren.'], 404);
  $tlf = isset($ordre['customer']['phone']) ? $ordre['customer']['phone'] : '';
  if (!normaliserTlf($tlf)) svar(['error' => 'Kunden mangler gyldig mobilnummer.'], 400);
  varsle($pdo, $CFG, 'sms', $tlf, 'Klar til henting (' . $ordre['orderNumber'] . ')', fyllMal($pdo, 'smsHenting', ['navn' => $ordre['customer']['name'], 'ref' => $ordre['orderNumber']]));
  loggfor($pdo, 'Bil-klar-SMS sendt for ' . $ordre['orderNumber'] . ' av ' . $bruker['navn']);
  svar(['ok' => true]);
}
if (preg_match('#^/api/orders/([^/]+)$#', $sti, $m)) {
  $ordre = hentPost($pdo, 'ordre', urldecode($m[1]));
  if (!$ordre) svar(['error' => 'Fant ikke ordren.'], 404);
  if ($metode === 'GET') svar($ordre);
  if ($metode === 'PATCH') {
    if (!empty($inn['status'])) {
      $ordre['status'] = $inn['status'];
      varsle($pdo, $CFG, 'epost', isset($ordre['customer']['email']) ? $ordre['customer']['email'] : '', 'Ordrestatus endret',
        fyllMal($pdo, 'statusEndret', ['navn' => $ordre['customer']['name'], 'ref' => $ordre['orderNumber'], 'detaljer' => $inn['status']]));
    }
    if (!empty($inn['paymentStatus'])) $ordre['paymentStatus'] = $inn['paymentStatus'];
    lagrePost($pdo, 'ordre', $ordre['id'], $ordre);
    loggfor($pdo, 'Ordre ' . $ordre['orderNumber'] . ' oppdatert');
    svar($ordre);
  }
}

// ---- Booking ----
if ($sti === '/api/bookings' && $metode === 'POST') {
  $kunde = isset($inn['customer']) ? $inn['customer'] : null;
  if (!$kunde || empty($kunde['name']) || empty($inn['serviceId']) || empty($inn['date']))
    svar(['error' => 'Ugyldig booking. Oppgi kunde, tjeneste og dato.'], 400);
  $b = ['id' => uuid(), 'createdAt' => date('c'), 'status' => 'new', 'customer' => $kunde, 'serviceId' => $inn['serviceId'],
    'date' => $inn['date'], 'time' => isset($inn['time']) ? $inn['time'] : '', 'comment' => isset($inn['comment']) ? $inn['comment'] : '', 'source' => isset($inn['source']) ? $inn['source'] : ''];
  lagrePost($pdo, 'booking', $b['id'], $b);
  loggfor($pdo, 'Booking opprettet for ' . $kunde['name'] . ' (' . $b['serviceId'] . ' ' . $b['date'] . ')');
  $ref = strtoupper(substr($b['id'], 0, 8));
  $dataB = ['ref' => $ref, 'kunde' => ['navn' => $kunde['name'], 'tlf' => isset($kunde['phone']) ? $kunde['phone'] : '', 'epost' => isset($kunde['email']) ? $kunde['email'] : ''],
    'tjeneste' => $b['serviceId'], 'dato' => $b['date'], 'tid' => $b['time'], 'kommentar' => $b['comment']];
  $bK = lagEpost('booking-confirmation', $dataB);
  varsle($pdo, $CFG, 'epost', isset($kunde['email']) ? $kunde['email'] : '', $bK['emne'], $bK['tekst'], $bK['html']);
  $bA = lagEpost('admin-new-booking', $dataB);
  varsle($pdo, $CFG, 'epost', $CFG['epost_admin'], $bA['emne'], $bA['tekst'], $bA['html']);
  if (!empty($kunde['phone'])) varsle($pdo, $CFG, 'sms', $kunde['phone'], 'Bookingbekreftelse',
    fyllMal($pdo, 'smsBooking', ['navn' => $kunde['name'], 'ref' => $ref, 'detaljer' => $b['serviceId'] . ' ' . $b['date'] . ($b['time'] ? ' kl. ' . $b['time'] : '')]));
  if ($CFG['admin_sms']) varsle($pdo, $CFG, 'sms', $CFG['admin_sms'], 'Ny booking', fyllMal($pdo, 'smsAdminBooking', ['ref' => $ref, 'navn' => $kunde['name'], 'detaljer' => $b['serviceId'] . ' ' . $b['date']]));
  svar($b, 201);
}
if ($sti === '/api/bookings' && $metode === 'GET') svar(hentPoster($pdo, 'booking'));
if (preg_match('#^/api/bookings/([^/]+)$#', $sti, $m)) {
  $b = hentPost($pdo, 'booking', urldecode($m[1]));
  if (!$b) svar(['error' => 'Fant ikke bookingen.'], 404);
  $ref = strtoupper(substr($b['id'], 0, 8));
  $kunde = isset($b['customer']) ? $b['customer'] : [];
  if ($metode === 'PATCH') {
    if (!empty($inn['status'])) $b['status'] = $inn['status'];
    if (!empty($inn['date'])) $b['date'] = $inn['date'];
    lagrePost($pdo, 'booking', $b['id'], $b);
    loggfor($pdo, 'Booking ' . $ref . ' oppdatert til ' . $b['status']);
    $avbestilt = in_array($b['status'], ['cancelled', 'avbestilt']);
    $mal = lagEpost($avbestilt ? 'booking-cancelled' : 'booking-changed',
      ['ref' => $ref, 'kunde' => ['navn' => isset($kunde['name']) ? $kunde['name'] : ''], 'tjeneste' => $b['serviceId'], 'dato' => $b['date'], 'detaljer' => $b['date'] . ' (' . $b['status'] . ')']);
    varsle($pdo, $CFG, 'epost', isset($kunde['email']) ? $kunde['email'] : '', $mal['emne'], $mal['tekst'], $mal['html']);
    $felter = ['navn' => isset($kunde['name']) ? $kunde['name'] : '', 'ref' => $ref, 'detaljer' => $b['date'] . ' (' . $b['status'] . ')'];
    if (!empty($kunde['phone'])) {
      varsle($pdo, $CFG, 'sms', $kunde['phone'], 'Booking endret', fyllMal($pdo, $avbestilt ? 'smsAvbestilt' : 'smsEndret', $felter));
      if (in_array($b['status'], ['done', 'ferdig'])) varsle($pdo, $CFG, 'sms', $kunde['phone'], 'Ferdigstilt', fyllMal($pdo, 'smsFerdig', $felter));
      if (in_array($b['status'], ['ready', 'klar'])) varsle($pdo, $CFG, 'sms', $kunde['phone'], 'Klar til henting', fyllMal($pdo, 'smsHenting', $felter));
    }
    svar($b);
  }
  if ($metode === 'DELETE') {
    $pdo->prepare('DELETE FROM poster WHERE id = ?')->execute([$b['id']]);
    loggfor($pdo, 'Booking slettet');
    $mal = lagEpost('booking-cancelled', ['ref' => $ref, 'kunde' => ['navn' => isset($kunde['name']) ? $kunde['name'] : ''], 'tjeneste' => $b['serviceId'], 'dato' => $b['date']]);
    varsle($pdo, $CFG, 'epost', isset($kunde['email']) ? $kunde['email'] : '', $mal['emne'], $mal['tekst'], $mal['html']);
    if (!empty($kunde['phone'])) varsle($pdo, $CFG, 'sms', $kunde['phone'], 'Booking avbestilt',
      fyllMal($pdo, 'smsAvbestilt', ['navn' => isset($kunde['name']) ? $kunde['name'] : '', 'ref' => $ref, 'detaljer' => $b['serviceId'] . ' ' . $b['date']]));
    svar(['ok' => true]);
  }
}

// ---- Kontakt, venteliste, nyhetsbrev ----
if ($sti === '/api/contact' && $metode === 'POST') {
  if (empty($inn['name']) || (empty($inn['email']) && empty($inn['phone']))) svar(['error' => 'Oppgi navn og e-post eller telefon.'], 400);
  $ref = 'KH-' . nesteNummer($pdo);
  lagrePost($pdo, 'henvendelse', $ref, ['id' => $ref, 'name' => $inn['name'], 'email' => isset($inn['email']) ? $inn['email'] : '', 'phone' => isset($inn['phone']) ? $inn['phone'] : '', 'message' => isset($inn['message']) ? $inn['message'] : '', 'tid' => date('c')]);
  $dataK = ['ref' => $ref, 'kunde' => ['navn' => $inn['name'], 'tlf' => isset($inn['phone']) ? $inn['phone'] : '', 'epost' => isset($inn['email']) ? $inn['email'] : ''], 'melding' => mb_substr(isset($inn['message']) ? $inn['message'] : '', 0, 400)];
  $kK = lagEpost('contact-confirmation', $dataK);
  varsle($pdo, $CFG, 'epost', isset($inn['email']) ? $inn['email'] : '', $kK['emne'], $kK['tekst'], $kK['html']);
  $kA = lagEpost('admin-new-contact', $dataK);
  varsle($pdo, $CFG, 'epost', $CFG['epost_admin'], $kA['emne'], $kA['tekst'], $kA['html']);
  svar(['id' => $ref], 201);
}
if ($sti === '/api/waitlist' && $metode === 'POST') {
  if (empty($inn['name']) || (empty($inn['email']) && empty($inn['phone']))) svar(['error' => 'Oppgi navn og kontaktinfo.'], 400);
  $ref = 'VL-' . nesteNummer($pdo);
  $detaljer = isset($inn['details']) ? $inn['details'] : '';
  lagrePost($pdo, 'venteliste', $ref, ['id' => $ref, 'name' => $inn['name'], 'email' => isset($inn['email']) ? $inn['email'] : '', 'phone' => isset($inn['phone']) ? $inn['phone'] : '', 'details' => $detaljer, 'tid' => date('c')]);
  $dataV = ['ref' => $ref, 'kunde' => ['navn' => $inn['name'], 'tlf' => isset($inn['phone']) ? $inn['phone'] : '', 'epost' => isset($inn['email']) ? $inn['email'] : ''], 'detaljer' => $detaljer];
  $vK = lagEpost('waitlist-confirmation', $dataV);
  varsle($pdo, $CFG, 'epost', isset($inn['email']) ? $inn['email'] : '', $vK['emne'], $vK['tekst'], $vK['html']);
  if (!empty($inn['phone'])) varsle($pdo, $CFG, 'sms', $inn['phone'], 'Ventelistebekreftelse', fyllMal($pdo, 'smsVentelistePaameldt', ['navn' => $inn['name'], 'detaljer' => $detaljer]));
  varsle($pdo, $CFG, 'epost', $CFG['epost_admin'], 'Ny ventelistepåmelding ' . $ref, $inn['name'] . ' — ' . $detaljer, null);
  svar(['id' => $ref], 201);
}
if ($sti === '/api/newsletter' && $metode === 'POST') {
  $epost = strtolower(trim(isset($inn['email']) ? $inn['email'] : ''));
  if (!filter_var($epost, FILTER_VALIDATE_EMAIL)) svar(['error' => 'Oppgi en gyldig e-postadresse.'], 400);
  $navn = isset($inn['name']) ? $inn['name'] : '';
  lagrePost($pdo, 'nyhetsbrev', $epost, ['epost' => $epost, 'navn' => $navn, 'kilde' => 'nettsted-skjema', 'tid' => date('c')]);
  loggfor($pdo, 'Nyhetsbrev-påmelding: ' . $epost);
  if ($CFG['mailchimp_api_key'] && $CFG['mailchimp_audience_id']) {
    $dc = explode('-', $CFG['mailchimp_api_key'])[1];
    $ch = curl_init('https://' . $dc . '.api.mailchimp.com/3.0/lists/' . $CFG['mailchimp_audience_id'] . '/members/' . md5($epost));
    curl_setopt_array($ch, [CURLOPT_CUSTOMREQUEST => 'PUT', CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 10,
      CURLOPT_USERPWD => 'kepler:' . $CFG['mailchimp_api_key'],
      CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
      CURLOPT_POSTFIELDS => json_encode(['email_address' => $epost, 'status_if_new' => 'pending',
        'merge_fields' => $navn ? ['FNAME' => explode(' ', $navn)[0], 'LNAME' => implode(' ', array_slice(explode(' ', $navn), 1))] : new stdClass(),
        'tags' => ['nettsted-skjema']])]);
    curl_exec($ch);
  }
  svar(['ok' => true, 'melding' => 'Takk! Sjekk innboksen din for å bekrefte påmeldingen.'], 201);
}
if ($sti === '/api/newsletter' && $metode === 'GET') { krevAdmin(); svar(hentPoster($pdo, 'nyhetsbrev')); }

// ---- Statens vegvesen ----
if (preg_match('#^/api/kjoretoy/([^/]+)$#', $sti, $m)) {
  $regnr = strtoupper(preg_replace('/\s/', '', urldecode($m[1])));
  if (!preg_match('/^[A-ZÆØÅ]{2}\d{4,5}$/u', $regnr)) svar(['error' => 'Ugyldig registreringsnummer.'], 400);
  $s = $pdo->prepare('SELECT tid, data FROM svv_cache WHERE regnr = ?'); $s->execute([$regnr]);
  $c = $s->fetch(PDO::FETCH_ASSOC);
  if ($c && time() - $c['tid'] < 86400) svar(json_decode($c['data'], true));
  if (!$CFG['svv_api_key']) svar(['error' => 'SVV-nøkkel mangler i config.php.'], 503);
  $ch = curl_init('https://akfell-datautlevering.atlas.vegvesen.no/enkeltoppslag/kjoretoydata?kjennemerke=' . urlencode($regnr));
  curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 10, CURLOPT_HTTPHEADER => ['SVV-Authorization: Apikey ' . $CFG['svv_api_key']]]);
  $svarSvv = json_decode((string)curl_exec($ch), true);
  $k = isset($svarSvv['kjoretoydataListe'][0]) ? $svarSvv['kjoretoydataListe'][0] : null;
  if (!$k) { loggfor($pdo, 'SVV-oppslag feilet for ' . $regnr); svar(['error' => 'Fant ikke kjøretøyet.'], 404); }
  $tg = isset($k['godkjenning']['tekniskGodkjenning']) ? $k['godkjenning']['tekniskGodkjenning'] : [];
  $t = isset($tg['tekniskeData']) ? $tg['tekniskeData'] : [];
  $pent = function ($str) { return implode(' ', array_map(function ($w) { return preg_match('/^[A-ZÆØÅ-]{4,}$/u', $w) ? mb_convert_case(mb_strtolower($w), MB_CASE_TITLE) : $w; }, explode(' ', (string)$str))); };
  $merke = isset($t['generelt']['merke'][0]['merke']) ? $t['generelt']['merke'][0]['merke'] : '';
  if (!$merke) svar(['error' => 'Fant ikke kjøretøyet.'], 404);
  $farge = isset($t['karosseriOgLasteplan']['rFarge'][0]['kodeNavn']) ? $t['karosseriOgLasteplan']['rFarge'][0]['kodeNavn'] : '';
  $klasseTekst = (isset($tg['kjoretoyklassifisering']['beskrivelse']) ? $tg['kjoretoyklassifisering']['beskrivelse'] : '') . ' ' . (isset($tg['kjoretoyklassifisering']['tekniskKode']['kodeNavn']) ? $tg['kjoretoyklassifisering']['tekniskKode']['kodeNavn'] : '');
  $data = ['regnr' => $regnr, 'merke' => $pent($merke),
    'modell' => isset($t['generelt']['handelsbetegnelse'][0]) ? $t['generelt']['handelsbetegnelse'][0] : '',
    'aar' => isset($k['forstegangsregistrering']['registrertForstegangNorgeDato']) ? (int)substr($k['forstegangsregistrering']['registrertForstegangNorgeDato'], 0, 4) : null,
    'farge' => $pent($farge),
    'moerk' => (bool)(preg_match('/sort|svart|mørk|blå|grå|brun|grønn/iu', $farge) && !preg_match('/lys/iu', $farge)),
    'drivstoff' => $pent(isset($t['miljodata']['miljoOgdrivstoffGruppe'][0]['drivstoffKodeMiljodata']['kodeNavn']) ? $t['miljodata']['miljoOgdrivstoffGruppe'][0]['drivstoffKodeMiljodata']['kodeNavn'] : ''),
    'lengde' => isset($t['dimensjoner']['lengde']) ? $t['dimensjoner']['lengde'] : null,
    'klasse' => preg_match('/buss|M2|M3/i', $klasseTekst) ? 'stor' : (preg_match('/varebil|N1|N2|N3/i', $klasseTekst) ? 'varebil' : 'personbil'),
    'kilde' => 'Statens vegvesen'];
  $pdo->prepare('INSERT INTO svv_cache (regnr, tid, data) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE tid = VALUES(tid), data = VALUES(data)')
    ->execute([$regnr, time(), json_encode($data, JSON_UNESCAPED_UNICODE)]);
  svar($data);
}

// ---- Admin: innlogging, varsler, innstillinger ----
if ($sti === '/api/login' && $metode === 'POST') {
  foreach ($CFG['brukere'] as $b) {
    if (strtolower(trim(isset($inn['email']) ? $inn['email'] : '')) === $b['epost'] && (isset($inn['password']) ? $inn['password'] : '') === $b['passord']) {
      $_SESSION['bruker'] = ['epost' => $b['epost'], 'navn' => $b['navn'], 'rolle' => $b['rolle']];
      loggfor($pdo, $b['navn'] . ' logget inn');
      svar(['ok' => true, 'bruker' => $_SESSION['bruker']]);
    }
  }
  loggfor($pdo, 'Avvist innloggingsforsøk for ' . (isset($inn['email']) ? $inn['email'] : '(tom)'));
  svar(['error' => 'Feil e-post eller ugyldig passord.'], 401);
}
if ($sti === '/api/logout' && $metode === 'POST') { session_destroy(); svar(['ok' => true]); }
if ($sti === '/api/notifications' && $metode === 'GET') {
  krevAdmin();
  $rader = $pdo->query('SELECT tid, kanal, til, type, tekst, status FROM varsler ORDER BY nr DESC LIMIT 2000')->fetchAll(PDO::FETCH_ASSOC);
  svar(array_map(function ($r) { $r['tid'] = iso($r['tid']); return $r; }, $rader));
}
if ($sti === '/api/settings/varsling') {
  krevAdmin();
  $gjeldende = hentInnstilling($pdo, 'varsling', ['epostPaa' => true, 'smsPaa' => true, 'maler' => []]);
  if ($metode === 'PUT') {
    if (isset($inn['epostPaa'])) $gjeldende['epostPaa'] = (bool)$inn['epostPaa'];
    if (isset($inn['smsPaa'])) $gjeldende['smsPaa'] = (bool)$inn['smsPaa'];
    if (isset($inn['maler']) && is_array($inn['maler'])) $gjeldende['maler'] = array_merge($gjeldende['maler'], $inn['maler']);
    settInnstilling($pdo, 'varsling', $gjeldende);
    loggfor($pdo, 'Varslingsinnstillinger oppdatert');
  }
  svar($gjeldende);
}
if ($sti === '/api/notify' && $metode === 'POST') {
  $bruker = krevAdmin();
  if (empty($inn['kanal']) || empty($inn['til']) || empty($inn['tekst'])) svar(['error' => 'Oppgi kanal, mottaker og tekst.'], 400);
  varsle($pdo, $CFG, $inn['kanal'], $inn['til'], 'Manuell melding fra ' . $bruker['navn'], $inn['tekst']);
  svar(['ok' => true]);
}

// ---- Betaling (testmodus) ----
if ($CFG['test_modus'] && $sti === '/api/payments/test-success' && $metode === 'POST') {
  $ordre = hentPost($pdo, 'ordre', isset($inn['orderId']) ? $inn['orderId'] : '');
  if (!$ordre) svar(['error' => 'Fant ikke ordren.'], 404);
  if ($ordre['paymentStatus'] !== 'paid') {
    $ordre['paymentStatus'] = 'paid'; $ordre['status'] = 'confirmed';
    $ordre['paymentAttempts'] = [['tid' => date('c'), 'resultat' => 'paid']];
    lagrePost($pdo, 'ordre', $ordre['id'], $ordre);
    loggfor($pdo, 'Ordre ' . $ordre['orderNumber'] . ' betalt');
    $pM = lagEpost('payment-confirmation', ['ref' => $ordre['orderNumber'], 'kunde' => ['navn' => $ordre['customer']['name']], 'total' => 'kr ' . number_format($ordre['total'], 0, ',', ' ') . ',-']);
    varsle($pdo, $CFG, 'epost', isset($ordre['customer']['email']) ? $ordre['customer']['email'] : '', $pM['emne'], $pM['tekst'], $pM['html']);
    if (!empty($ordre['customer']['phone'])) varsle($pdo, $CFG, 'sms', $ordre['customer']['phone'], 'Betaling mottatt', fyllMal($pdo, 'smsBetaling', ['ref' => $ordre['orderNumber']]));
  }
  svar($ordre);
}
if ($CFG['test_modus'] && $sti === '/api/payments/test-failed' && $metode === 'POST') {
  $ordre = hentPost($pdo, 'ordre', isset($inn['orderId']) ? $inn['orderId'] : '');
  if (!$ordre) svar(['error' => 'Fant ikke ordren.'], 404);
  if ($ordre['paymentStatus'] !== 'paid') { $ordre['paymentStatus'] = 'failed'; lagrePost($pdo, 'ordre', $ordre['id'], $ordre); }
  loggfor($pdo, 'Ordre ' . $ordre['orderNumber'] . ' betaling feilet');
  $fM = lagEpost('payment-failed', ['ref' => $ordre['orderNumber'], 'kunde' => ['navn' => $ordre['customer']['name']]]);
  varsle($pdo, $CFG, 'epost', isset($ordre['customer']['email']) ? $ordre['customer']['email'] : '', $fM['emne'], $fM['tekst'], $fM['html']);
  varsle($pdo, $CFG, 'epost', $CFG['epost_admin'], 'Betaling feilet for ' . $ordre['orderNumber'], 'Følg opp kunden: ' . $ordre['customer']['name'], null);
  svar($ordre);
}

svar(['error' => 'Ukjent adresse: ' . $sti], 404);
