<?php
// Kepler Bilservice — innstillinger for domene.no
// 1) Kopier denne fila til config.php
// 2) Fyll inn databaseopplysningene fra domene.no-kontrollpanelet (MySQL/phpMyAdmin)
// 3) Last opp. config.php skal ALDRI ligge i GitHub (inneholder passord).

return [
  // MySQL fra domene.no-kontrollpanelet
  'db_host' => 'localhost',
  'db_navn' => 'FYLL_INN_DATABASENAVN',
  'db_bruker' => 'FYLL_INN_BRUKERNAVN',
  'db_passord' => 'FYLL_INN_PASSORD',

  // E-post (sendes med PHP mail() via domene.no)
  'epost_fra_navn' => 'Kepler Bilservice',
  'epost_fra' => 'post@kepler.no',
  'epost_svar_til' => 'kundeservice@kepler.no',
  'epost_admin' => 'verksted@kepler.no',

  // Admin-brukere (bytt passordene!)
  'brukere' => [
    ['epost' => 'admin@kepler.no',    'passord' => 'BYTT-MEG', 'navn' => 'Administrator', 'rolle' => 'Administrator'],
    ['epost' => 'ansatt@kepler.no',   'passord' => 'BYTT-MEG', 'navn' => 'Ansatt',        'rolle' => 'Ansatt'],
    ['epost' => 'redaktor@kepler.no', 'passord' => 'BYTT-MEG', 'navn' => 'Redaktør',      'rolle' => 'Redaktør'],
  ],

  // Valgfritt: Statens vegvesen (regnr-oppslag i bestillingen)
  'svv_api_key' => '',

  // Valgfritt: Mailchimp (nyhetsbrev)
  'mailchimp_api_key' => '',
  'mailchimp_audience_id' => '',

  // Valgfritt: Twilio (SMS). Tomt = SMS logges bare.
  'twilio_sid' => '',
  'twilio_token' => '',
  'twilio_fra' => 'Kepler',
  'admin_sms' => '',

  // true = testknapper for betaling er aktive (sett false når Vipps/ekte betaling kobles på)
  'test_modus' => true,

  'domene' => 'https://www.kepler.no',
];
