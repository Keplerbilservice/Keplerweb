<?php
// Kepler Bilservice — serverer nettsiden med riktig tittel/beskrivelse per rute
$CFG = @include __DIR__ . '/config.php';
$DOMENE = ($CFG && !empty($CFG['domene'])) ? $CFG['domene'] : 'https://www.kepler.no';
$FIL = __DIR__ . '/Kepler nettsted design C.dc.html';
$RUTER = [
  '/' => ['Kepler Bilservice | Bilpleie, rustbeskyttelse, coating og Smart Repair', 'Profesjonell bilpleie, rustbeskyttelse, coating og Smart Repair på Sem i Tønsberg. Prisgaranti og dokumenterte resultater.'],
  '/tjenester' => ['Alle tjenester | Kepler Bilservice', 'Se alle tjenester: vask, polering, coating, antirust, Smart Repair og mer. Faste priser.'],
  '/kampanjer' => ['Kampanjer | Kepler Bilservice', 'Aktuelle kampanjer hos Kepler Bilservice.'],
  '/aktuelt' => ['Nyheter | Kepler Bilservice', 'Nyheter fra verkstedet på Sem.'],
  '/bestill' => ['Bestill time | Kepler Bilservice', 'Bestill time hos Kepler Bilservice.'],
  '/bedrift' => ['Bedrift | Kepler Bilservice', 'Bilpleie og vedlikehold for bedrifter og bilparker.'],
  '/bilsalg' => ['Bilsalg | Kepler Bilservice og Vestfold Bilsalg', 'Vi selger bilen din i oppdrag, eller kjøper den direkte. Gratis verdivurdering.'],
  '/min-side' => ['Min side | Kepler Bilservice', 'Dine bestillinger og servicehistorikk.'],
];
$sti = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$sti = rtrim($sti, '/') ?: '/';
if ($sti === '/sitemap.xml') {
  header('Content-Type: application/xml; charset=utf-8');
  $naa = date('Y-m-d');
  echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n" . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
  foreach ($RUTER as $rute => $x) if ($rute !== '/bestill' && $rute !== '/min-side')
    echo '  <url><loc>' . $DOMENE . $rute . '</loc><lastmod>' . $naa . '</lastmod></url>' . "\n";
  echo '</urlset>'; exit;
}
if ($sti === '/robots.txt') {
  header('Content-Type: text/plain; charset=utf-8');
  echo "User-agent: *\nDisallow: /admin\nDisallow: /api\nDisallow: /bestill\nDisallow: /min-side\nSitemap: $DOMENE/sitemap.xml\n"; exit;
}
if (!isset($RUTER[$sti])) $sti = '/';
list($tittel, $beskrivelse) = $RUTER[$sti];
$html = file_get_contents($FIL);
$ekstra = '<title>' . $tittel . '</title>' . "\n"
  . '<meta name="description" content="' . htmlspecialchars($beskrivelse) . '">' . "\n"
  . '<link rel="canonical" href="' . $DOMENE . $sti . '">' . "\n"
  . ($sti !== '/' ? '<script>if(!location.hash)location.hash=' . json_encode($sti) . ';</script>' . "\n" : '')
  . '</head>';
echo str_replace('</head>', $ekstra, $html);
