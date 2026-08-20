// Kepler test-/utviklingsserver
// Kjør: NODE_ENV=test node server/server.js  (eller npm run start:test)
// Serverer prototypen statisk OG API-endepunktene testplanen krever.
// Test-endepunkter (/api/payments/test-*, /api/test/*) er KUN aktive når NODE_ENV !== 'production'.

const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Miljøvariabler fra server/.env (én KEY=verdi per linje). Filen er gitignorert — hemmeligheter skal aldri i git.
try {
  fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split('\n').forEach(l => {
    const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  });
} catch (e) {}

const app = express();
const { lagEpost } = require('./epost-maler');
const EPOST_FRA = (process.env.EMAIL_FROM_NAME || 'Kepler Bilservice') + ' <' + (process.env.EMAIL_FROM_ADDRESS || process.env.SMTP_FRA || 'post@kepler.no') + '>';
const ADMIN_EPOST = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.VARSEL_EPOST || 'verksted@kepler.no';
// E-post: settes SMTP_HOST/SMTP_USER/SMTP_PASS i miljøet, sendes ekte e-post (nodemailer).
// Uten SMTP fanges e-postene i databasen (testinnboksen /api/test/emails).
let transport = null;
try {
  const vert = process.env.EMAIL_SMTP_HOST || process.env.SMTP_HOST;
  if (vert) {
    const nodemailer = require('nodemailer');
    transport = nodemailer.createTransport({ host: vert, port: +(process.env.EMAIL_SMTP_PORT || process.env.SMTP_PORT || 587), auth: { user: process.env.EMAIL_SMTP_USER || process.env.SMTP_USER, pass: process.env.EMAIL_SMTP_PASSWORD || process.env.SMTP_PASS } });
  }
} catch (e) { console.warn('nodemailer ikke installert — e-post fanges lokalt'); }
// SMS: settes TWILIO_SID/TWILIO_TOKEN/TWILIO_FRA i miljøet, sendes ekte SMS; ellers fanges de i sendeloggen.
let smsKlient = null;
try {
  const sid = process.env.SMS_API_KEY || process.env.TWILIO_SID;
  const hemmelighet = process.env.SMS_API_SECRET || process.env.TWILIO_TOKEN;
  if (sid && process.env.SMS_TEST_MODE !== 'true') smsKlient = require('twilio')(sid, hemmelighet);
} catch (e) { console.warn('twilio ikke installert — SMS fanges lokalt'); }
const SMS_FRA = process.env.SMS_FROM_NAME || process.env.SMS_FROM_NUMBER || process.env.TWILIO_FRA || 'Kepler';
const SMS_PAA_GLOBALT = process.env.SMS_ENABLED !== 'false';
const ADMIN_SMS = process.env.ADMIN_SMS_NUMBER || '';

// Norske mobilnummer: godtar +47, 8 siffer, mellomrom/bindestreker. Returnerer normalisert nummer eller null.
function normaliserTlf(raatt) {
  const rent = String(raatt || '').replace(/[\s\-\.]/g, '');
  const m = rent.match(/^(?:\+47|0047)?([49]\d{7})$/);
  return m ? '+47' + m[1] : null;
}

// Rate limit: maks 10 SMS per nummer per døgn, og aldri identisk melding to ganger på rad innen 5 min
function smsTillatt(db, til, tekst) {
  const nå = Date.now();
  const tidligere = (db.varsler || []).filter(v => v.kanal === 'sms' && v.til === til);
  const sisteDøgn = tidligere.filter(v => nå - new Date(v.tid).getTime() < 864e5);
  if (sisteDøgn.length >= 10) { loggfør(db, 'SMS-grense nådd for ' + til + ' (mistenkelig aktivitet logget)'); return false; }
  const siste = tidligere[0];
  if (siste && siste.tekst === tekst && nå - new Date(siste.tid).getTime() < 300e3) return false; // duplikatvern
  return true;
}

const STANDARD_MALER = {
  ordreKunde: 'Takk, {navn}! Vi har mottatt ordre {ref}. Vi tar kontakt om noe er uklart. Sporsmal? Ring 33 33 44 00.',
  ordreAdmin: 'Ny ordre {ref} fra {navn} ({tlf}).',
  bookingKunde: 'Hei {navn}! Timen din er registrert: {detaljer}. Referanse {ref}. Gratis avbestilling inntil 24 timer for. Ring 33 33 44 00 ved endringer.',
  bookingAdmin: 'Ny booking {ref}: {navn} - {detaljer}.',
  kontaktKunde: 'Hei {navn}! Vi har mottatt henvendelsen din ({ref}) og svarer sa snart vi kan.',
  kontaktAdmin: 'Ny henvendelse {ref} fra {navn}.',
  bookingEndret: 'Hei {navn}! Timen din ({ref}) er endret: {detaljer}.',
  statusEndret: 'Hei {navn}! Ordre {ref} har fatt ny status: {detaljer}.',
  venteliste: 'Hei {navn}! Det er blitt ledig plass: {detaljer}. Ring 33 33 44 00 for a sikre timen.',
  smsBooking: 'Kepler: Timen din er bekreftet {detaljer}. Ref {ref}.',
  smsPaaminnelse: 'Kepler: Paaminnelse - du har time i morgen: {detaljer}. Ref {ref}.',
  smsFerdig: 'Kepler: Arbeidet paa bilen din er ferdig. Ref {ref}.',
  smsHenting: 'Kepler: Bilen din er klar til henting. Ref {ref}.',
  smsVenteliste: 'Kepler: Ledig plass fra ventelisten: {detaljer}. Ring 33 33 44 00.',
  smsVentelistePaameldt: 'Kepler: Hei {navn}. Du er satt paa venteliste for {detaljer}. Vi gir beskjed hvis det blir ledig plass.',
  smsOrdre: 'Kepler: Hei {navn}. Vi har mottatt bestillingen din. Ordrenummer {ref}. Du faar mer informasjon paa e-post.',
  smsBetaling: 'Kepler: Betalingen for ordre {ref} er mottatt. Takk for bestillingen.',
  smsEndret: 'Kepler: Timen din ({ref}) er endret: {detaljer}. Ring 33 33 44 00 ved sporsmal.',
  smsAvbestilt: 'Kepler: Timen din ({ref}) er avbestilt: {detaljer}. Ring 33 33 44 00 for ny time.',
  smsAdminBooking: 'Kepler: Ny booking {ref} fra {navn}: {detaljer}.',
  smsAdminOrdre: 'Kepler: Ny ordre {ref} fra {navn}.'
};
function innstillinger(db) {
  db.innstillinger = db.innstillinger || { epostPaa: true, smsPaa: true, maler: {} };
  return db.innstillinger;
}
function fyllMal(db, mal, felter) {
  const tekst = innstillinger(db).maler[mal] || STANDARD_MALER[mal] || '{detaljer}';
  return tekst.replace(/\{(\w+)\}/g, function (m, k) { return felter[k] || ''; });
}
function varsle(db, kanal, til, type, tekst, html) {
  const rad = { tid: new Date().toISOString(), kanal, til: til || '(mangler mottaker)', type, tekst, status: 'fanget' };
  const inn = innstillinger(db);
  try {
    if (kanal === 'epost') {
      if (!inn.epostPaa) { rad.status = 'deaktivert'; }
      else if (transport && til) {
        transport.sendMail({ from: EPOST_FRA, replyTo: process.env.EMAIL_REPLY_TO || undefined, to: til, subject: type, text: tekst, html: html || undefined })
          .then(function () { oppdaterStatus(rad.tid, 'sendt'); })
          .catch(function (err) {
            oppdaterStatus(rad.tid, 'feilet: ' + err.message);
            // Varsle admin om e-postfeil (aldri rekursivt)
            if (type !== 'E-postsending feilet') {
              const d2 = lesDb();
              const m = lagEpost('admin-email-error', { til: til, epostType: type, feil: err.message });
              varsle(d2, 'epost', ADMIN_EPOST, m.emne, m.tekst, m.html);
              skrivDb(d2);
            }
          });
        rad.status = 'sender';
      }
      db.emails.push({ til: til, emne: type, tekst: tekst, tid: rad.tid });
    } else {
      const nummer = normaliserTlf(til);
      const hendelsePaa = !inn.smsAv || !inn.smsAv[type];
      if (!SMS_PAA_GLOBALT || !inn.smsPaa || !hendelsePaa) { rad.status = 'deaktivert'; }
      else if (!nummer) { rad.status = 'avvist: ugyldig eller manglende telefonnummer'; }
      else if (!smsTillatt(db, nummer, tekst)) { rad.status = 'stoppet: grense eller duplikat'; }
      else {
        rad.til = nummer;
        if (smsKlient) {
          smsKlient.messages.create({ from: SMS_FRA, to: nummer, body: tekst })
            .then(function (svar) { oppdaterStatus(rad.tid, 'sendt (' + (svar.sid || '') + ')'); })
            .catch(function (err) {
              oppdaterStatus(rad.tid, 'feilet: ' + err.message);
              if (ADMIN_SMS && type !== 'SMS-systemfeil') { const d2 = lesDb(); varsle(d2, 'sms', ADMIN_SMS, 'SMS-systemfeil', 'Kepler: SMS til kunde feilet (' + type + '). Se sendeloggen.'); skrivDb(d2); }
            });
          rad.status = 'sender';
        }
      }
    }
  } catch (err) { rad.status = 'feilet: ' + err.message; }
  db.varsler = db.varsler || [];
  db.varsler.unshift(rad);
  db.varsler = db.varsler.slice(0, 2000);
}
function oppdaterStatus(tid, status) {
  const db = lesDb();
  const rad = (db.varsler || []).find(function (v) { return v.tid === tid; });
  if (rad) { rad.status = status; skrivDb(db); }
}
function sendEpost(db, til, emne, tekst) {
  const post = { til, emne, tekst, tid: new Date().toISOString() };
  db.emails.push(post);
  if (transport && til) {
    transport.sendMail({ from: process.env.SMTP_FRA || 'post@kepler.no', to: til, subject: emne, text: tekst })
      .catch(err => { const d2 = lesDb(); loggfør(d2, 'E-POSTFEIL til ' + til + ': ' + err.message + ' (ordren er lagret)'); skrivDb(d2); });
  }
}
const PORT = process.env.PORT || 3000;
const ER_TEST = process.env.NODE_ENV !== 'production';
const ROT = path.join(__dirname, '..');
const DB_FIL = path.join(__dirname, 'db.json');

app.use(express.json());

// ---------- Enkel fil-database ----------
function lesDb() {
  try { return JSON.parse(fs.readFileSync(DB_FIL, 'utf8')); }
  catch (e) { return { orders: [], bookings: [], emails: [], logg: [], teller: 1000 }; }
}
function skrivDb(db) { fs.writeFileSync(DB_FIL, JSON.stringify(db, null, 2)); }
function loggfør(db, tekst) { db.logg.unshift({ tid: new Date().toISOString(), tekst }); db.logg = db.logg.slice(0, 1000); }

// ---------- Brukere og sesjoner ----------
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
const BRUKERE = [
  { email: process.env.ADMIN_EMAIL || 'admin@kepler.no', passordHash: hash(process.env.ADMIN_PASSWORD || 'change-me'), navn: 'Administrator', rolle: 'Administrator' },
  { email: process.env.EMPLOYEE_EMAIL || 'ansatt@kepler.no', passordHash: hash(process.env.EMPLOYEE_PASSWORD || 'change-me'), navn: 'Ansatt', rolle: 'Ansatt' },
  { email: process.env.EDITOR_EMAIL || 'redaktor@kepler.no', passordHash: hash(process.env.EDITOR_PASSWORD || 'change-me'), navn: 'Redaktør', rolle: 'Redaktør' }
];
const sesjoner = new Map(); // token -> bruker
function sesjonFra(req) {
  const token = (req.headers.cookie || '').split(';').map(s => s.trim()).find(s => s.startsWith('kepler_sesjon='));
  return token ? sesjoner.get(token.split('=')[1]) : null;
}

// ---------- Admin-ruter med serverside-vern ----------
const ADMIN_FIL = path.join(ROT, 'Kepler admin.dc.html');

app.get('/admin/login', (req, res) => {
  res.send(`<!DOCTYPE html><html lang="nb"><head><meta charset="utf-8"><title>Logg inn | Kepler admin</title>
  <style>body{font-family:sans-serif;background:#16171b;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
  form{background:#fff;border-radius:16px;padding:48px;width:100%;max-width:440px}h1{font-size:22px;margin:0 0 20px}
  label{display:block;font-weight:700;margin:14px 0 4px}input{width:100%;box-sizing:border-box;padding:12px;font-size:16px;border:2px solid #ccc;border-radius:8px}
  button{margin-top:20px;width:100%;padding:14px;font-size:17px;font-weight:800;color:#fff;background:#cc0000;border:none;border-radius:8px;cursor:pointer}
  .feil{background:#fde8e8;border:2px solid #cc0000;padding:10px 12px;border-radius:8px;margin-top:14px}</style></head><body>
  <form method="post" action="/admin/login"><h1>Kepler administrasjon</h1>
  <label>E-post</label><input name="email" type="email" autocomplete="username">
  <label>Passord</label><input name="password" type="password" autocomplete="current-password">
  ${req.query.feil ? '<div class="feil">Feil e-post eller ugyldig passord.</div>' : ''}
  <button type="submit">Logg inn</button></form></body></html>`);
});

app.post('/admin/login', express.urlencoded({ extended: false }), (req, res) => {
  const bruker = BRUKERE.find(b => b.email === (req.body.email || '').toLowerCase().trim() && b.passordHash === hash(req.body.password || ''));
  const db = lesDb();
  if (!bruker) {
    loggfør(db, 'Avvist innloggingsforsøk for ' + (req.body.email || '(tom)')); skrivDb(db);
    return res.redirect('/admin/login?feil=1');
  }
  const token = crypto.randomBytes(24).toString('hex');
  sesjoner.set(token, bruker);
  loggfør(db, bruker.navn + ' logget inn'); skrivDb(db);
  res.setHeader('Set-Cookie', `kepler_sesjon=${token}; HttpOnly; Path=/; SameSite=Lax`);
  res.redirect('/admin');
});

app.post('/api/logout', (req, res) => {
  const token = (req.headers.cookie || '').match(/kepler_sesjon=([^;]+)/);
  if (token) sesjoner.delete(token[1]);
  res.setHeader('Set-Cookie', 'kepler_sesjon=; Max-Age=0; Path=/');
  res.json({ ok: true });
});

// Alle /admin-ruter krever sesjon; serverer admin-appen og synker sesjonen inn i klienten
app.get(['/admin', '/admin/:side'], (req, res) => {
  if (req.path === '/admin/login') return;
  const bruker = sesjonFra(req);
  if (!bruker) return res.redirect('/admin/login');
  let html = fs.readFileSync(ADMIN_FIL, 'utf8');
  const sesjon = JSON.stringify({ epost: bruker.email, navn: bruker.navn, rolle: bruker.rolle, tid: new Date().toISOString() });
  html = html.replace('</head>', `<script>localStorage.setItem('kepler_admin_sesjon', ${JSON.stringify(sesjon)});</script></head>`);
  res.send(html);
});

// ---------- Mailchimp (nyhetsbrev) ----------
// Nøkkelen ligger KUN i server/.env (MAILCHIMP_API_KEY) — aldri i klientkoden.
// Datasenteret leses fra nøkkelens suffiks (f.eks. -us21). Krever Node 18+ (global fetch).
const MC_NOKKEL = process.env.MAILCHIMP_API_KEY || '';
let MC_LISTE = process.env.MAILCHIMP_AUDIENCE_ID || '';
const MC_DC = MC_NOKKEL.split('-')[1] || '';
// Uten MAILCHIMP_AUDIENCE_ID i .env hentes kontoens første audience automatisk ved oppstart
if (MC_NOKKEL && MC_DC && !MC_LISTE) {
  fetch('https://' + MC_DC + '.api.mailchimp.com/3.0/lists?count=1', {
    headers: { Authorization: 'Basic ' + Buffer.from('kepler:' + MC_NOKKEL).toString('base64') }
  }).then(r => r.json()).then(svar => {
    const liste = (svar.lists || [])[0];
    if (liste) { MC_LISTE = liste.id; console.log('Mailchimp: bruker audience "' + liste.name + '" (' + liste.id + ')'); }
    else console.warn('Mailchimp: fant ingen audience — ' + (svar.detail || 'sjekk nøkkelen i server/.env'));
  }).catch(err => console.warn('Mailchimp: klarte ikke hente audience — ' + err.message));
}
function meldPaaNyhetsbrev(db, epost, navn, kilde) {
  epost = String(epost || '').trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(epost)) return false;
  db.nyhetsbrev = db.nyhetsbrev || [];
  if (db.nyhetsbrev.some(r => r.epost === epost)) return true; // allerede registrert
  const rad = { epost, navn: navn || '', kilde: kilde || '', tid: new Date().toISOString(),
    status: MC_NOKKEL && MC_LISTE ? 'sender' : 'fanget lokalt (sett MAILCHIMP_API_KEY og MAILCHIMP_AUDIENCE_ID i server/.env)' };
  db.nyhetsbrev.unshift(rad);
  loggfør(db, 'Nyhetsbrev-påmelding: ' + epost + ' (' + rad.kilde + ')');
  if (!MC_NOKKEL || !MC_LISTE || !MC_DC) return true;
  const settStatus = status => { const d2 = lesDb(); const r2 = (d2.nyhetsbrev || []).find(x => x.epost === epost); if (r2) { r2.status = status; skrivDb(d2); } };
  // PUT med md5(epost) = idempotent upsert. status_if_new 'pending' gir dobbel opt-in-epost fra Mailchimp;
  // eksisterende abonnenter nedgraderes ikke.
  const md5 = crypto.createHash('md5').update(epost).digest('hex');
  fetch('https://' + MC_DC + '.api.mailchimp.com/3.0/lists/' + MC_LISTE + '/members/' + md5, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: 'Basic ' + Buffer.from('kepler:' + MC_NOKKEL).toString('base64') },
    body: JSON.stringify({ email_address: epost, status_if_new: 'pending',
      merge_fields: navn ? { FNAME: String(navn).split(' ')[0], LNAME: String(navn).split(' ').slice(1).join(' ') } : {},
      tags: kilde ? [kilde] : [] })
  }).then(r => r.json())
    .then(svar => settStatus(svar.status && svar.status !== 400 ? 'mailchimp: ' + svar.status : 'feilet: ' + (svar.detail || svar.title || 'ukjent feil')))
    .catch(err => settStatus('feilet: ' + err.message));
  return true;
}
app.post('/api/newsletter', (req, res) => {
  const db = lesDb();
  const ok = meldPaaNyhetsbrev(db, (req.body || {}).email, (req.body || {}).name || '', 'nettsted-skjema');
  if (!ok) return res.status(400).json({ error: 'Oppgi en gyldig e-postadresse.' });
  skrivDb(db);
  res.status(201).json({ ok: true, melding: 'Takk! Sjekk innboksen din for å bekrefte påmeldingen.' });
});
app.get('/api/newsletter', (req, res) => { if (!krevAdminTidlig(req, res)) return; res.json(lesDb().nyhetsbrev || []); });
function krevAdminTidlig(req, res) { const b = sesjonFra(req); if (!b) { res.status(401).json({ error: 'Krever innlogging.' }); return null; } return b; }

// ---------- Statens vegvesen (kjøretøyoppslag) ----------
// Nøkkelen ligger KUN i server/.env (SVV_API_KEY). Enkeltoppslag-API-et har døgnkvote, så svar caches i minnet i 24 t.
const SVV_NOKKEL = process.env.SVV_API_KEY || '';
const svvCache = new Map(); // regnr -> { tid, data }
// "VOLVO" -> "Volvo", men "BMW" og "XC60" beholdes
const pent = s => String(s || '').split(' ').map(w => (/^[A-ZÆØÅ-]{4,}$/.test(w) ? w[0] + w.slice(1).toLowerCase() : w)).join(' ');
app.get('/api/kjoretoy/:regnr', (req, res) => {
  const regnr = String(req.params.regnr || '').replace(/\s/g, '').toUpperCase();
  if (!/^[A-ZÆØÅ]{2}\d{4,5}$/.test(regnr)) return res.status(400).json({ error: 'Ugyldig registreringsnummer.' });
  const c = svvCache.get(regnr);
  if (c && Date.now() - c.tid < 864e5) return res.json(c.data);
  if (!SVV_NOKKEL) return res.status(503).json({ error: 'SVV_API_KEY mangler i server/.env.' });
  fetch('https://akfell-datautlevering.atlas.vegvesen.no/enkeltoppslag/kjoretoydata?kjennemerke=' + encodeURIComponent(regnr), {
    headers: { 'SVV-Authorization': 'Apikey ' + SVV_NOKKEL }
  }).then(r => { if (!r.ok) throw new Error('SVV svarte ' + r.status); return r.json(); }).then(svar => {
    const k = (svar.kjoretoydataListe || [])[0];
    const tg = ((k || {}).godkjenning || {}).tekniskGodkjenning || {};
    const t = tg.tekniskeData || {};
    const merke = (((t.generelt || {}).merke || [])[0] || {}).merke || '';
    if (!merke) return res.status(404).json({ error: 'Fant ikke kjøretøyet.' });
    const farge = ((((t.karosseriOgLasteplan || {}).rFarge || [])[0] || {}).kodeNavn) || '';
    const klasseTekst = ((tg.kjoretoyklassifisering || {}).beskrivelse || '') + ' ' + (((tg.kjoretoyklassifisering || {}).tekniskKode || {}).kodeNavn || '');
    const data = {
      regnr,
      merke: pent(merke),
      modell: ((t.generelt || {}).handelsbetegnelse || [])[0] || '',
      aar: parseInt(String((k.forstegangsregistrering || {}).registrertForstegangNorgeDato || '').slice(0, 4), 10) || null,
      farge: pent(farge),
      moerk: /sort|svart|mørk|blå|grå|brun|grønn/i.test(farge) && !/lys/i.test(farge),
      drivstoff: pent((((((t.miljodata || {}).miljoOgdrivstoffGruppe || [])[0] || {}).drivstoffKodeMiljodata || {}).kodeNavn) || ''),
      lengde: (t.dimensjoner || {}).lengde || null, // mm
      klasse: /buss|M2|M3/i.test(klasseTekst) ? 'stor' : (/varebil|N1|N2|N3/i.test(klasseTekst) ? 'varebil' : 'personbil'),
      kilde: 'Statens vegvesen'
    };
    svvCache.set(regnr, { tid: Date.now(), data });
    res.json(data);
  }).catch(err => {
    const db = lesDb(); loggfør(db, 'SVV-oppslag feilet for ' + regnr + ': ' + err.message); skrivDb(db);
    res.status(502).json({ error: 'Klarte ikke hente kjøretøydata nå.' });
  });
});

// ---------- Ordre-API ----------
app.post('/api/orders', (req, res) => {
  const { customer, items, total } = req.body || {};
  if (!customer || !customer.name || (!customer.phone && !customer.email) || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ error: 'Ugyldig ordre. Oppgi kunde (navn og telefon eller e-post) og minst én vare.' });
  }
  const db = lesDb();
  db.teller += 1;
  const order = {
    id: crypto.randomUUID(), orderNumber: 'KB-' + db.teller, createdAt: new Date().toISOString(),
    status: 'new', paymentStatus: 'pending', paymentAttempts: [],
    customer, items, total: total || items.reduce((n, i) => n + (i.price || 0) * (i.quantity || 1), 0),
    source: req.body.source || ''
  };
  db.orders.unshift(order);
  loggfør(db, 'Ordre ' + order.orderNumber + ' opprettet for ' + customer.name);
  // E-post: i test fanges den; i produksjon kobles ekte utsending på her
  {
    const dataO = { ref: order.orderNumber, kunde: { navn: customer.name, tlf: customer.phone || '', epost: customer.email || '' },
      tjenester: items.map(function (i) { return (i.quantity > 1 ? i.quantity + ' x ' : '') + (i.name || i.productId); }).join(', '),
      total: 'kr ' + (order.total || 0).toLocaleString('nb-NO') + ',-', betaling: 'Ikke betalt', dato: new Date().toLocaleDateString('nb-NO') };
    const mK = lagEpost('order-confirmation', dataO);
    varsle(db, 'epost', customer.email, mK.emne, mK.tekst, mK.html);
    const mA = lagEpost('admin-new-order', dataO);
    varsle(db, 'epost', ADMIN_EPOST, mA.emne, mA.tekst, mA.html);
    if (customer.phone) varsle(db, 'sms', customer.phone, 'Ordrebekreftelse', fyllMal(db, 'smsOrdre', { navn: customer.name, ref: order.orderNumber }));
    if (ADMIN_SMS) varsle(db, 'sms', ADMIN_SMS, 'Ny ordre', fyllMal(db, 'smsAdminOrdre', { ref: order.orderNumber, navn: customer.name }));
    if (req.body.newsletter && customer.email) meldPaaNyhetsbrev(db, customer.email, customer.name, 'bestilling');
  }
  skrivDb(db);
  res.status(201).json(order);
});

app.get('/api/orders', (req, res) => res.json(lesDb().orders));

app.get('/api/orders/:id', (req, res) => {
  const order = lesDb().orders.find(o => o.id === req.params.id || o.orderNumber === req.params.id);
  if (!order) return res.status(404).json({ error: 'Fant ikke ordren.' });
  res.json(order);
});

// ---------- Booking-API ----------
app.post('/api/bookings', (req, res) => {
  const { customer, serviceId, date } = req.body || {};
  if (!customer || !customer.name || !serviceId || !date) {
    return res.status(400).json({ error: 'Ugyldig booking. Oppgi kunde, tjeneste og dato.' });
  }
  const db = lesDb();
  const booking = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: 'new', customer, serviceId, date, time: req.body.time || '', comment: req.body.comment || '', source: req.body.source || '' };
  db.bookings.unshift(booking);
  loggfør(db, 'Booking opprettet for ' + customer.name + ' (' + serviceId + ' ' + date + ')');
  {
    const dataB = { ref: booking.id.slice(0, 8).toUpperCase(), kunde: { navn: customer.name, tlf: customer.phone || '', epost: customer.email || '' }, tjeneste: serviceId, dato: date, tid: req.body.time || '', kommentar: req.body.comment || '' };
    const bK = lagEpost('booking-confirmation', dataB);
    varsle(db, 'epost', customer.email, bK.emne, bK.tekst, bK.html);
    const bA = lagEpost('admin-new-booking', dataB);
    varsle(db, 'epost', ADMIN_EPOST, bA.emne, bA.tekst, bA.html);
    if (customer.phone) varsle(db, 'sms', customer.phone, 'Bookingbekreftelse', fyllMal(db, 'smsBooking', { navn: customer.name, ref: dataB.ref, detaljer: serviceId + ' ' + date + (req.body.time ? ' kl. ' + req.body.time : '') }));
    if (ADMIN_SMS) varsle(db, 'sms', ADMIN_SMS, 'Ny booking', fyllMal(db, 'smsAdminBooking', { ref: dataB.ref, navn: customer.name, detaljer: serviceId + ' ' + date }));
    if (req.body.newsletter && customer.email) meldPaaNyhetsbrev(db, customer.email, customer.name, 'booking');
  }
  skrivDb(db);
  res.status(201).json(booking);
});

app.patch('/api/bookings/:id', (req, res) => {
  const db = lesDb();
  const booking = db.bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ error: 'Fant ikke bookingen.' });
  if (req.body.status) booking.status = req.body.status;
  if (req.body.date) booking.date = req.body.date;
  loggfør(db, 'Booking ' + booking.id.slice(0, 8) + ' oppdatert til ' + booking.status);
  const dataBE = { ref: booking.id.slice(0, 8).toUpperCase(), kunde: { navn: (booking.customer || {}).name || '' }, tjeneste: booking.serviceId, detaljer: booking.date + ' (' + booking.status + ')' };
  const beM = lagEpost(booking.status === 'cancelled' || booking.status === 'avbestilt' ? 'booking-cancelled' : 'booking-changed', { ...dataBE, dato: booking.date });
  varsle(db, 'epost', (booking.customer || {}).email, beM.emne, beM.tekst, beM.html);
  const felterBE = { navn: (booking.customer || {}).name || '', ref: dataBE.ref, detaljer: dataBE.detaljer };
  if ((booking.customer || {}).phone) varsle(db, 'sms', booking.customer.phone, 'Booking endret', fyllMal(db, booking.status === 'cancelled' || booking.status === 'avbestilt' ? 'smsAvbestilt' : 'smsEndret', felterBE));
  if ((booking.status === 'done' || booking.status === 'ferdig') && (booking.customer || {}).phone) varsle(db, 'sms', booking.customer.phone, 'Ferdigstilt', fyllMal(db, 'smsFerdig', felterBE));
  if ((booking.status === 'ready' || booking.status === 'klar') && (booking.customer || {}).phone) varsle(db, 'sms', booking.customer.phone, 'Klar til henting', fyllMal(db, 'smsHenting', felterBE));
  skrivDb(db);
  res.json(booking);
});

app.delete('/api/bookings/:id', (req, res) => {
  const db = lesDb();
  const i = db.bookings.findIndex(b => b.id === req.params.id);
  if (i < 0) return res.status(404).json({ error: 'Fant ikke bookingen.' });
  const slettet = db.bookings[i];
  db.bookings.splice(i, 1);
  loggfør(db, 'Booking slettet');
  const avM = lagEpost('booking-cancelled', { ref: slettet.id.slice(0, 8).toUpperCase(), kunde: { navn: (slettet.customer || {}).name || '' }, tjeneste: slettet.serviceId, dato: slettet.date });
  varsle(db, 'epost', (slettet.customer || {}).email, avM.emne, avM.tekst, avM.html);
  if ((slettet.customer || {}).phone) varsle(db, 'sms', slettet.customer.phone, 'Booking avbestilt', fyllMal(db, 'smsAvbestilt', { navn: (slettet.customer || {}).name || '', ref: slettet.id.slice(0, 8).toUpperCase(), detaljer: slettet.serviceId + ' ' + slettet.date }));
  skrivDb(db);
  res.json({ ok: true });
});

// ---------- Kontakt, ordrestatus, venteliste og varsling ----------
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body || {};
  if (!name || (!email && !phone)) return res.status(400).json({ error: 'Oppgi navn og e-post eller telefon.' });
  const db = lesDb();
  const ref = 'KH-' + (++db.teller);
  db.henvendelser = db.henvendelser || [];
  db.henvendelser.unshift({ id: ref, name, email, phone, message: message || '', tid: new Date().toISOString() });
  const dataK = { ref, kunde: { navn: name, tlf: phone || '', epost: email || '' }, melding: (message || '').slice(0, 400) };
  const kK = lagEpost('contact-confirmation', dataK);
  varsle(db, 'epost', email, kK.emne, kK.tekst, kK.html);
  const kA = lagEpost('admin-new-contact', dataK);
  varsle(db, 'epost', ADMIN_EPOST, kA.emne, kA.tekst, kA.html);
  skrivDb(db);
  res.status(201).json({ id: ref });
});

app.patch('/api/orders/:id', (req, res) => {
  const db = lesDb();
  const order = db.orders.find(o => o.id === req.params.id || o.orderNumber === req.params.id);
  if (!order) return res.status(404).json({ error: 'Fant ikke ordren.' });
  if (req.body.status) {
    order.status = req.body.status;
    const felter = { navn: (order.customer || {}).name || '', ref: order.orderNumber, detaljer: req.body.status };
    varsle(db, 'epost', (order.customer || {}).email, 'Ordrestatus endret', fyllMal(db, 'statusEndret', felter));
  }
  if (req.body.paymentStatus) order.paymentStatus = req.body.paymentStatus;
  loggfør(db, 'Ordre ' + order.orderNumber + ' oppdatert');
  skrivDb(db);
  res.json(order);
});

app.post('/api/waitlist', (req, res) => {
  const { name, email, phone, details } = req.body || {};
  if (!name || (!email && !phone)) return res.status(400).json({ error: 'Oppgi navn og kontaktinfo.' });
  const db = lesDb();
  const ref = 'VL-' + (++db.teller);
  db.venteliste = db.venteliste || [];
  db.venteliste.unshift({ id: ref, name, email, phone, details: details || '', tid: new Date().toISOString() });
  const dataV = { ref, kunde: { navn: name, tlf: phone || '', epost: email || '' }, detaljer: details || '' };
  const vK = lagEpost('waitlist-confirmation', dataV);
  varsle(db, 'epost', email, vK.emne, vK.tekst, vK.html);
  if (phone) varsle(db, 'sms', phone, 'Ventelistebekreftelse', fyllMal(db, 'smsVentelistePaameldt', { navn: name, detaljer: details || '' }));
  if (ADMIN_SMS) varsle(db, 'sms', ADMIN_SMS, 'Ny ventelistepåmelding', 'Kepler: ' + name + ' på venteliste (' + (details || '') + ').');
  varsle(db, 'epost', ADMIN_EPOST, 'Ny ventelistepåmelding ' + ref, name + ' — ' + (details || ''), null);
  skrivDb(db);
  res.status(201).json({ id: ref });
});

app.post('/api/waitlist/notify', (req, res) => {
  const { name, email, phone, details } = req.body || {};
  if (!name || (!email && !phone)) return res.status(400).json({ error: 'Oppgi navn og kontaktinfo.' });
  const db = lesDb();
  const felter = { navn: name, ref: 'VL-' + (++db.teller), detaljer: details || 'ledig time' };
  varsle(db, 'epost', email, 'Ledig plass', fyllMal(db, 'venteliste', felter));
  if (phone) varsle(db, 'sms', phone, 'Ledig plass', fyllMal(db, 'smsVenteliste', felter));
  skrivDb(db);
  res.json({ ok: true });
});

function krevAdmin(req, res) { const b = sesjonFra(req); if (!b) { res.status(401).json({ error: 'Krever innlogging.' }); return null; } return b; }
app.get('/api/notifications', (req, res) => { if (!krevAdmin(req, res)) return; res.json(lesDb().varsler || []); });
app.get('/api/settings/varsling', (req, res) => { if (!krevAdmin(req, res)) return; res.json(innstillinger(lesDb())); });
app.put('/api/settings/varsling', (req, res) => {
  if (!krevAdmin(req, res)) return;
  const db = lesDb(); const inn = innstillinger(db);
  if (typeof req.body.epostPaa === 'boolean') inn.epostPaa = req.body.epostPaa;
  if (typeof req.body.smsPaa === 'boolean') inn.smsPaa = req.body.smsPaa;
  if (req.body.maler && typeof req.body.maler === 'object') inn.maler = { ...inn.maler, ...req.body.maler };
  loggfør(db, 'Varslingsinnstillinger oppdatert'); skrivDb(db); res.json(inn);
});
app.post('/api/notifications/resend', (req, res) => {
  const bruker = krevAdmin(req, res); if (!bruker) return;
  const db = lesDb();
  const rad = (db.varsler || []).find(v => v.tid === (req.body || {}).tid);
  if (!rad) return res.status(404).json({ error: 'Fant ikke varselet.' });
  varsle(db, rad.kanal, rad.til, rad.type + ' (sendt på nytt)', rad.tekst);
  loggfør(db, 'Varsel sendt på nytt til ' + rad.til + ' av ' + bruker.navn);
  skrivDb(db); res.json({ ok: true });
});

app.post('/api/orders/:id/car-ready', (req, res) => {
  const bruker = krevAdmin(req, res); if (!bruker) return;
  const db = lesDb();
  const order = db.orders.find(o => o.id === req.params.id || o.orderNumber === req.params.id);
  if (!order) return res.status(404).json({ error: 'Fant ikke ordren.' });
  const tlf = (order.customer || {}).phone;
  if (!normaliserTlf(tlf)) return res.status(400).json({ error: 'Kunden mangler gyldig mobilnummer.' });
  varsle(db, 'sms', tlf, 'Klar til henting (' + order.orderNumber + ')', fyllMal(db, 'smsHenting', { navn: (order.customer || {}).name || '', ref: order.orderNumber }));
  loggfør(db, 'Bil-klar-SMS sendt for ' + order.orderNumber + ' av ' + bruker.navn);
  skrivDb(db); res.json({ ok: true });
});

app.post('/api/notify', (req, res) => {
  const bruker = krevAdmin(req, res); if (!bruker) return;
  const { kanal, til, tekst } = req.body || {};
  if (!kanal || !til || !tekst) return res.status(400).json({ error: 'Oppgi kanal, mottaker og tekst.' });
  const db = lesDb();
  varsle(db, kanal, til, 'Manuell melding fra ' + bruker.navn, tekst);
  skrivDb(db); res.json({ ok: true });
});

// Paaminnelse 24 timer foer avtale: sjekkes hver time
setInterval(() => {
  try {
    const db = lesDb();
    const iMorgen = new Date(Date.now() + 24 * 3600e3).toISOString().slice(0, 10);
    let endret = false;
    (db.bookings || []).forEach(b => {
      if (b.date === iMorgen && !b.paaminnet && (b.customer || {}).phone) {
        const felter = { navn: b.customer.name, ref: b.id.slice(0, 8).toUpperCase(), detaljer: b.serviceId + ' ' + b.date + (b.time ? ' kl. ' + b.time : '') };
        varsle(db, 'sms', b.customer.phone, 'Paaminnelse', fyllMal(db, 'smsPaaminnelse', felter));
        b.paaminnet = true; endret = true;
      }
    });
    if (endret) skrivDb(db);
  } catch (e) {}
}, 3600e3);

// ---------- Test-endepunkter (ALDRI i produksjon) ----------
if (ER_TEST) {
  app.post('/api/payments/test-success', (req, res) => {
    const db = lesDb();
    const order = db.orders.find(o => o.id === req.body.orderId);
    if (!order) return res.status(404).json({ error: 'Fant ikke ordren.' });
    if (order.paymentStatus === 'paid') return res.json(order); // idempotent: ingen dobbeltbetaling
    order.paymentStatus = 'paid';
    order.status = 'confirmed';
    order.paymentAttempts = [{ tid: new Date().toISOString(), resultat: 'paid' }];
    loggfør(db, 'Ordre ' + order.orderNumber + ' betalt');
    const pM = lagEpost('payment-confirmation', { ref: order.orderNumber, kunde: { navn: (order.customer || {}).name || '' }, total: 'kr ' + (order.total || 0).toLocaleString('nb-NO') + ',-' });
    varsle(db, 'epost', (order.customer || {}).email, pM.emne, pM.tekst, pM.html);
    if ((order.customer || {}).phone) varsle(db, 'sms', order.customer.phone, 'Betaling mottatt', fyllMal(db, 'smsBetaling', { ref: order.orderNumber }));
    skrivDb(db);
    res.json(order);
  });

  app.post('/api/payments/test-failed', (req, res) => {
    const db = lesDb();
    const order = db.orders.find(o => o.id === req.body.orderId);
    if (!order) return res.status(404).json({ error: 'Fant ikke ordren.' });
    if (order.paymentStatus !== 'paid') order.paymentStatus = 'failed';
    loggfør(db, 'Ordre ' + order.orderNumber + ' betaling feilet');
    const fM = lagEpost('payment-failed', { ref: order.orderNumber, kunde: { navn: (order.customer || {}).name || '' } });
    varsle(db, 'epost', (order.customer || {}).email, fM.emne, fM.tekst, fM.html);
    varsle(db, 'epost', ADMIN_EPOST, 'Betaling feilet for ' + order.orderNumber, 'Følg opp kunden: ' + ((order.customer || {}).name || ''), null);
    if (ADMIN_SMS) varsle(db, 'sms', ADMIN_SMS, 'Betaling feilet', 'Kepler: Betaling feilet for ' + order.orderNumber + '. Følg opp.');
    skrivDb(db);
    res.json(order);
  });

  app.get('/api/test/emails', (req, res) => {
    const emails = lesDb().emails;
    res.json(req.query.email ? emails.filter(e => e.til === req.query.email) : emails);
  });

  const testSend = type => (req, res) => {
    const db = lesDb();
    const m = lagEpost(type, { ref: 'TEST-1', kunde: { navn: 'Test Kunde', tlf: '900 00 000', epost: (req.body || {}).email || 'test@kepler-test.no' }, tjeneste: 'Testtjeneste', tjenester: 'Testtjeneste', total: 'kr 1,-', dato: new Date().toLocaleDateString('nb-NO'), detaljer: 'test', melding: 'test' });
    varsle(db, 'epost', (req.body || {}).email || 'test@kepler-test.no', m.emne, m.tekst, m.html);
    skrivDb(db); res.json({ ok: true, emne: m.emne });
  };
  app.post('/api/test/send-order-email', testSend('order-confirmation'));
  app.post('/api/test/send-booking-email', testSend('booking-confirmation'));
  app.post('/api/test/send-contact-email', testSend('contact-confirmation'));
  const testSms = mal => (req, res) => {
    const db = lesDb();
    varsle(db, 'sms', (req.body || {}).phone || '99999999', 'Test-SMS', fyllMal(db, mal, { navn: 'Test', ref: 'TEST-1', detaljer: 'Testtjeneste 01.09 kl. 10:00' }));
    skrivDb(db); res.json({ ok: true });
  };
  app.post('/api/test/send-booking-sms', testSms('smsBooking'));
  app.post('/api/test/send-reminder-sms', testSms('smsPaaminnelse'));
  app.post('/api/test/send-order-sms', testSms('smsOrdre'));
  app.post('/api/test/send-car-ready-sms', testSms('smsHenting'));
  app.get('/api/test/sms', (req, res) => {
    const varsler = (lesDb().varsler || []).filter(v => v.kanal === 'sms');
    res.json(req.query.phone ? varsler.filter(v => v.til.includes(String(req.query.phone).replace(/\D/g, '').slice(-8))) : varsler);
  });
  app.post('/api/test/sms-cleanup', (req, res) => {
    const db = lesDb();
    db.varsler = (db.varsler || []).filter(v => v.kanal !== 'sms' || !/9{8}|Test/.test(v.til + v.tekst));
    skrivDb(db); res.json({ ok: true });
  });

  app.post('/api/test/email-cleanup', (req, res) => {
    const db = lesDb();
    db.emails = db.emails.filter(e => !String(e.til || '').includes('kepler-test-') && !String(e.til || '').includes('kepler-test.no'));
    db.varsler = (db.varsler || []).filter(v => !String(v.til || '').includes('kepler-test'));
    skrivDb(db); res.json({ ok: true });
  });

  app.post('/api/test/cleanup', (req, res) => {
    const db = lesDb();
    const kilde = (req.body || {}).source || 'automated-backend-test';
    db.orders = db.orders.filter(o => o.source !== kilde);
    db.bookings = db.bookings.filter(b => b.source !== kilde);
    db.emails = db.emails.filter(e => !String(e.til || '').includes('kepler-test-'));
    skrivDb(db);
    res.json({ ok: true });
  });
}

// ---------- SEO: rene ruter, sitemap, robots, redirects ----------
const DOMENE = process.env.DOMENE || 'https://www.kepler.no';
const SIDE_FIL = path.join(ROT, 'Kepler nettsted design C.dc.html');
const RUTER = {
  '/': ['Kepler Bilservice | Bilpleie, rustbeskyttelse, coating og Smart Repair', 'Profesjonell bilpleie, rustbeskyttelse, coating og Smart Repair på Sem i Tønsberg. Prisgaranti og dokumenterte resultater.'],
  '/tjenester': ['Alle tjenester | Kepler Bilservice', 'Se alle tjenester: vask, polering, coating, antirust, Smart Repair og mer. Faste priser.'],
  '/kampanjer': ['Kampanjer | Kepler Bilservice', 'Aktuelle kampanjer hos Kepler Bilservice.'],
  '/aktuelt': ['Nyheter | Kepler Bilservice', 'Nyheter fra verkstedet på Sem.'],
  '/bestill': ['Bestill time | Kepler Bilservice', 'Bestill time hos Kepler Bilservice.'],
  '/bedrift': ['Bedrift | Kepler Bilservice', 'Bilpleie og vedlikehold for bedrifter og bilparker.'],
  '/bilforhandler': ['Bilforhandler | Kepler Bilservice', 'Klargjøring for bilforhandlere.'],
  '/bat': ['Båt | Kepler Bilservice', 'Polering, coating og vedlikehold for båt.'],
  '/bobil': ['Bobil | Kepler Bilservice', 'Vask, polering, coating og understellsbehandling for bobil og caravan.'],
  '/bilsalg': ['Bilsalg | Kepler Bilservice og Vestfold Bilsalg', 'Vi selger bilen din i oppdrag, eller kjøper den direkte. Gratis verdivurdering.'],
  '/min-side': ['Min side | Kepler Bilservice', 'Dine bestillinger og servicehistorikk.']
};
// 301-redirects: rediger server/redirects.json (gammel → ny)
let REDIRECTS = {};
try { REDIRECTS = JSON.parse(fs.readFileSync(path.join(__dirname, 'redirects.json'), 'utf8')); } catch (e) {}
app.use((req, res, next) => { if (REDIRECTS[req.path]) return res.redirect(301, REDIRECTS[req.path]); next(); });

app.get('/sitemap.xml', (req, res) => {
  const nå = new Date().toISOString().slice(0, 10);
  res.type('application/xml').send('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + Object.keys(RUTER).filter(p => p !== '/bestill' && p !== '/min-side').map(p => '  <url><loc>' + DOMENE + p + '</loc><lastmod>' + nå + '</lastmod></url>').join('\n')
    + '\n</urlset>');
});
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send('User-agent: *\nDisallow: /admin\nDisallow: /api\nDisallow: /bestill\nDisallow: /min-side\nSitemap: ' + DOMENE + '/sitemap.xml\n');
});
// Rene ruter serverer siden med riktig tittel, beskrivelse og canonical, og hopper til riktig visning
Object.keys(RUTER).forEach(rute => {
  if (rute === '/') return;
  app.get(rute, (req, res) => {
    let html = fs.readFileSync(SIDE_FIL, 'utf8');
    const [tittel, beskrivelse] = RUTER[rute];
    html = html.replace('</head>', '<title>' + tittel + '</title>\n<meta name="description" content="' + beskrivelse + '">\n<link rel="canonical" href="' + DOMENE + rute + '">\n<script>if(!location.hash)location.hash=' + JSON.stringify(rute) + ';</script>\n</head>');
    res.send(html);
  });
});

// ---------- Statiske filer (prototypen) ----------
// WebP: server .webp i stedet for .jpg/.png når den finnes og nettleseren støtter det
app.use((req, res, next) => {
  if (/\.(jpe?g|png)$/i.test(req.path) && (req.headers.accept || '').includes('image/webp')) {
    const webp = path.join(ROT, decodeURIComponent(req.path).replace(/\.(jpe?g|png)$/i, '.webp'));
    if (fs.existsSync(webp)) return res.sendFile(webp);
  }
  next();
});
app.use(express.static(ROT));
app.get('/', (req, res) => {
  let html = fs.readFileSync(SIDE_FIL, 'utf8');
  const [tittel, beskrivelse] = RUTER['/'];
  html = html.replace('</head>', '<title>' + tittel + '</title>\n<meta name="description" content="' + beskrivelse + '">\n<link rel="canonical" href="' + DOMENE + '/">\n</head>');
  res.send(html);
});

app.use((err, req, res, next) => {
  const db = lesDb(); loggfør(db, 'Serverfeil: ' + err.message); skrivDb(db);
  res.status(500).json({ error: 'Noe gikk galt hos oss. Prøv igjen, eller ring 33 33 44 00.' });
});

app.listen(PORT, () => console.log('Kepler-server på http://localhost:' + PORT + (ER_TEST ? ' (testmodus: test-endepunkter aktive)' : ' (produksjon: test-endepunkter AV)')));
