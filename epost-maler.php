<?php
// E-postmaler for Kepler — PHP-versjon av server/epost-maler.js
function kepler_kontaktlinje() {
  return 'Kepler Bilservice AS · Semslinna 1, 3170 Sem · 33 33 44 00 · post@kepler.no';
}
function kepler_ramme($tittel, $innholdHtml) {
  $kontakt = kepler_kontaktlinje();
  return '<!DOCTYPE html><html lang="nb"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>'
    . '<body style="margin:0;background:#f2f2f2;font-family:Arial,Helvetica,sans-serif;color:#2c2e35">'
    . '<div style="max-width:560px;margin:0 auto;padding:24px 16px">'
    . '<div style="background:#16171b;border-radius:10px 10px 0 0;padding:22px 28px">'
    . '<div style="font-size:20px;font-weight:800;letter-spacing:.18em;color:#ffffff">KEPLER <span style="color:#cc0000">BILSERVICE</span></div></div>'
    . '<div style="background:#ffffff;border-radius:0 0 10px 10px;padding:28px">'
    . '<h1 style="font-size:20px;margin:0 0 14px">' . $tittel . '</h1>' . $innholdHtml . '</div>'
    . '<div style="font-size:12px;color:#595b61;padding:16px 8px;line-height:1.6">' . $kontakt . '<br>Gratis avbestilling inntil 24 timer før oppmøte.</div>'
    . '</div></body></html>';
}
function kepler_rader($par) {
  $ut = '<table style="width:100%;border-collapse:collapse;font-size:15px">';
  foreach ($par as $p) {
    if (!isset($p[1]) || $p[1] === '' || $p[1] === null) continue;
    $ut .= '<tr><td style="padding:7px 0;color:#595b61;width:42%;vertical-align:top">' . $p[0] . '</td><td style="padding:7px 0;font-weight:bold">' . htmlspecialchars((string)$p[1]) . '</td></tr>';
  }
  return $ut . '</table>';
}
function kepler_tekst($par, $innledning, $avslutning = '') {
  $linjer = [];
  foreach ($par as $p) if (isset($p[1]) && $p[1] !== '') $linjer[] = $p[0] . ': ' . $p[1];
  return $innledning . "\n\n" . implode("\n", $linjer) . "\n\n" . $avslutning . "\n\n" . kepler_kontaktlinje();
}
function lagEpost($type, $d) {
  $kunde = isset($d['kunde']) ? $d['kunde'] : [];
  $navn = isset($kunde['navn']) ? $kunde['navn'] : '';
  $g = function ($k) use ($d) { return isset($d[$k]) ? $d[$k] : ''; };
  $avsn = function ($html) { return '<p style="font-size:15px;line-height:1.6;margin:16px 0 0">' . $html . '</p>'; };
  switch ($type) {
    case 'order-confirmation': {
      $par = [['Ordrenummer', $g('ref')], ['Navn', $navn], ['E-post', isset($kunde['epost']) ? $kunde['epost'] : ''], ['Telefon', isset($kunde['tlf']) ? $kunde['tlf'] : ''], ['Tjenester', $g('tjenester')], ['Totalpris', $g('total')], ['Betalingsstatus', $g('betaling')], ['Dato', $g('dato')]];
      return ['emne' => 'Ordrebekreftelse ' . $g('ref') . ' | Kepler Bilservice',
        'tekst' => kepler_tekst($par, 'Takk, ' . $navn . '! Vi har mottatt ordren din.', 'Hva skjer videre: vi ser over bestillingen og tar kontakt hvis noe er uklart. Du hører fra oss før timen.'),
        'html' => kepler_ramme('Takk, ' . htmlspecialchars($navn) . '! Vi har mottatt ordren din.', kepler_rader($par) . $avsn('<b>Hva skjer videre:</b> vi ser over bestillingen og tar kontakt hvis noe er uklart. Du hører fra oss før timen.'))];
    }
    case 'booking-confirmation': {
      $par = [['Bookingnummer', $g('ref')], ['Navn', $navn], ['E-post', isset($kunde['epost']) ? $kunde['epost'] : ''], ['Telefon', isset($kunde['tlf']) ? $kunde['tlf'] : ''], ['Tjeneste', $g('tjeneste')], ['Dato', $g('dato')], ['Tidspunkt', $g('tid')], ['Kommentar', $g('kommentar')], ['Adresse', 'Semslinna 1, 3170 Sem']];
      return ['emne' => 'Bookingbekreftelse ' . $g('ref') . ' | Kepler Bilservice',
        'tekst' => kepler_tekst($par, 'Hei ' . $navn . '! Timen din er registrert.', 'Avbestilling: gratis inntil 24 timer før oppmøte — ring 33 33 44 00.'),
        'html' => kepler_ramme('Timen din er registrert', kepler_rader($par) . $avsn('<b>Avbestilling:</b> gratis inntil 24 timer før oppmøte — ring 33 33 44 00.'))];
    }
    case 'booking-cancelled': {
      $par = [['Bookingnummer', $g('ref')], ['Tjeneste', $g('tjeneste')], ['Dato', $g('dato')]];
      return ['emne' => 'Bookingen er avbestilt | Kepler Bilservice',
        'tekst' => kepler_tekst($par, 'Hei ' . $navn . '! Bookingen din er avbestilt.', 'Vil du ha ny time? Ring 33 33 44 00 eller bestill på nettsiden.'),
        'html' => kepler_ramme('Bookingen er avbestilt', kepler_rader($par) . $avsn('Vil du ha ny time? Ring 33 33 44 00 eller bestill på nettsiden.'))];
    }
    case 'booking-changed': {
      $par = [['Bookingnummer', $g('ref')], ['Tjeneste', $g('tjeneste')], ['Ny dato/status', $g('detaljer')]];
      return ['emne' => 'Bookingen er endret | Kepler Bilservice',
        'tekst' => kepler_tekst($par, 'Hei ' . $navn . '! Bookingen din er endret.', 'Stemmer ikke dette? Ring 33 33 44 00.'),
        'html' => kepler_ramme('Bookingen er endret', kepler_rader($par) . $avsn('Stemmer ikke dette? Ring 33 33 44 00.'))];
    }
    case 'contact-confirmation': {
      $par = [['Referanse', $g('ref')], ['Navn', $navn], ['E-post', isset($kunde['epost']) ? $kunde['epost'] : ''], ['Telefon', isset($kunde['tlf']) ? $kunde['tlf'] : ''], ['Melding', $g('melding')]];
      return ['emne' => 'Vi har mottatt henvendelsen din | Kepler Bilservice',
        'tekst' => kepler_tekst($par, 'Hei ' . $navn . '! Takk for henvendelsen.', 'Vi tar kontakt så snart vi kan, normalt innen én arbeidsdag.'),
        'html' => kepler_ramme('Takk for henvendelsen', kepler_rader($par) . $avsn('Vi tar kontakt så snart vi kan, normalt innen én arbeidsdag.'))];
    }
    case 'waitlist-confirmation': {
      $par = [['Referanse', $g('ref')], ['Gjelder', $g('detaljer')], ['Navn', $navn], ['E-post', isset($kunde['epost']) ? $kunde['epost'] : ''], ['Telefon', isset($kunde['tlf']) ? $kunde['tlf'] : '']];
      return ['emne' => 'Du står på ventelisten | Kepler Bilservice',
        'tekst' => kepler_tekst($par, 'Hei ' . $navn . '! Du står nå på ventelisten.', 'Blir det ledig plass, kontakter vi deg på telefon eller e-post med en gang.'),
        'html' => kepler_ramme('Du står på ventelisten', kepler_rader($par) . $avsn('Blir det ledig plass, kontakter vi deg med en gang.'))];
    }
    case 'payment-confirmation': {
      $par = [['Ordrenummer', $g('ref')], ['Beløp', $g('total')], ['Status', 'Betalt']];
      return ['emne' => 'Betaling mottatt for ' . $g('ref') . ' | Kepler Bilservice',
        'tekst' => kepler_tekst($par, 'Hei ' . $navn . '! Vi har mottatt betalingen.', 'Kvitteringen gjelder som betalingsbekreftelse.'),
        'html' => kepler_ramme('Betaling mottatt', kepler_rader($par))];
    }
    case 'payment-failed': {
      $par = [['Ordrenummer', $g('ref')]];
      return ['emne' => 'Betalingen gikk ikke gjennom | Kepler Bilservice',
        'tekst' => kepler_tekst($par, 'Hei ' . $navn . '! Betalingen gikk dessverre ikke gjennom.', 'Ordren din er trygt lagret. Prøv igjen, eller ring 33 33 44 00 så hjelper vi deg.'),
        'html' => kepler_ramme('Betalingen gikk ikke gjennom', kepler_rader($par) . $avsn('Ordren din er trygt lagret. Prøv igjen, eller ring 33 33 44 00 så hjelper vi deg.'))];
    }
    case 'admin-new-order': {
      $par = [['Ordrenummer', $g('ref')], ['Kunde', $navn], ['Telefon', isset($kunde['tlf']) ? $kunde['tlf'] : ''], ['E-post', isset($kunde['epost']) ? $kunde['epost'] : ''], ['Tjenester', $g('tjenester')], ['Totalpris', $g('total')], ['Betalingsstatus', $g('betaling')]];
      return ['emne' => 'Ny ordre ' . $g('ref'), 'tekst' => kepler_tekst($par, 'Ny ordre mottatt.'), 'html' => kepler_ramme('Ny ordre', kepler_rader($par))];
    }
    case 'admin-new-booking': {
      $par = [['Bookingnummer', $g('ref')], ['Kunde', $navn], ['Telefon', isset($kunde['tlf']) ? $kunde['tlf'] : ''], ['Tjeneste', $g('tjeneste')], ['Dato', $g('dato')], ['Tidspunkt', $g('tid')], ['Kommentar', $g('kommentar')]];
      return ['emne' => 'Ny booking ' . $g('ref'), 'tekst' => kepler_tekst($par, 'Ny booking mottatt.'), 'html' => kepler_ramme('Ny booking', kepler_rader($par))];
    }
    case 'admin-new-contact': {
      $par = [['Referanse', $g('ref')], ['Navn', $navn], ['Telefon', isset($kunde['tlf']) ? $kunde['tlf'] : ''], ['E-post', isset($kunde['epost']) ? $kunde['epost'] : ''], ['Melding', $g('melding')]];
      return ['emne' => 'Ny henvendelse ' . $g('ref'), 'tekst' => kepler_tekst($par, 'Ny henvendelse mottatt.'), 'html' => kepler_ramme('Ny henvendelse', kepler_rader($par))];
    }
    case 'admin-email-error': {
      $par = [['Mottaker', $g('til')], ['Type', $g('epostType')], ['Feil', $g('feil')]];
      return ['emne' => 'E-postsending feilet', 'tekst' => kepler_tekst($par, 'En e-post kunne ikke sendes. Ordren/bookingen er lagret.'), 'html' => kepler_ramme('E-postsending feilet', kepler_rader($par) . $avsn('Ordren/bookingen er lagret — følg opp kunden manuelt.'))];
    }
    default:
      $t = isset($d['tekst']) ? $d['tekst'] : '';
      return ['emne' => 'Kepler Bilservice', 'tekst' => $t, 'html' => kepler_ramme('Kepler Bilservice', '<p>' . htmlspecialchars($t) . '</p>')];
  }
}
