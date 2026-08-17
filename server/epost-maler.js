// E-postmaler for Kepler: HTML- og tekstversjon av hver hendelse.
// Brukes av server.js. Innhold kan overstyres per mal via adminens varslingsinnstillinger.

const KONTAKT = 'Kepler Bilservice AS · Semslinna 1, 3170 Sem · 33 33 44 00 · post@kepler.no';

function ramme(tittel, innholdHtml) {
  return `<!DOCTYPE html><html lang="nb"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#f2f2f2;font-family:Arial,Helvetica,sans-serif;color:#2c2e35">
<div style="max-width:560px;margin:0 auto;padding:24px 16px">
  <div style="background:#16171b;border-radius:10px 10px 0 0;padding:22px 28px">
    <div style="font-size:20px;font-weight:800;letter-spacing:.18em;color:#ffffff">KEPLER <span style="color:#cc0000">BILSERVICE</span></div>
  </div>
  <div style="background:#ffffff;border-radius:0 0 10px 10px;padding:28px">
    <h1 style="font-size:20px;margin:0 0 14px">${tittel}</h1>
    ${innholdHtml}
  </div>
  <div style="font-size:12px;color:#595b61;padding:16px 8px;line-height:1.6">${KONTAKT}<br>Gratis avbestilling inntil 24 timer før oppmøte.</div>
</div></body></html>`;
}

function rader(par) {
  return '<table style="width:100%;border-collapse:collapse;font-size:15px">' + par
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `<tr><td style="padding:7px 0;color:#595b61;width:42%;vertical-align:top">${k}</td><td style="padding:7px 0;font-weight:bold">${v}</td></tr>`)
    .join('') + '</table>';
}

function tekstAv(par, innledning, avslutning) {
  return innledning + '\n\n' + par.filter(([, v]) => v).map(([k, v]) => k + ': ' + v).join('\n') + '\n\n' + (avslutning || '') + '\n\n' + KONTAKT;
}

function lagEpost(type, d) {
  const kunde = d.kunde || {};
  switch (type) {
    case 'order-confirmation': {
      const par = [['Ordrenummer', d.ref], ['Navn', kunde.navn], ['E-post', kunde.epost], ['Telefon', kunde.tlf], ['Tjenester', d.tjenester], ['Totalpris', d.total], ['Betalingsstatus', d.betaling], ['Dato', d.dato]];
      return { emne: 'Ordrebekreftelse ' + d.ref + ' | Kepler Bilservice',
        tekst: tekstAv(par, 'Takk, ' + kunde.navn + '! Vi har mottatt ordren din.', 'Hva skjer videre: vi ser over bestillingen og tar kontakt hvis noe er uklart. Du hører fra oss før timen.'),
        html: ramme('Takk, ' + kunde.navn + '! Vi har mottatt ordren din.', rader(par) + '<p style="font-size:15px;line-height:1.6;margin:16px 0 0"><b>Hva skjer videre:</b> vi ser over bestillingen og tar kontakt hvis noe er uklart. Du hører fra oss før timen.</p>') };
    }
    case 'booking-confirmation': {
      const par = [['Bookingnummer', d.ref], ['Navn', kunde.navn], ['E-post', kunde.epost], ['Telefon', kunde.tlf], ['Tjeneste', d.tjeneste], ['Dato', d.dato], ['Tidspunkt', d.tid], ['Kommentar', d.kommentar], ['Adresse', 'Semslinna 1, 3170 Sem']];
      return { emne: 'Bookingbekreftelse ' + d.ref + ' | Kepler Bilservice',
        tekst: tekstAv(par, 'Hei ' + kunde.navn + '! Timen din er registrert.', 'Avbestilling: gratis inntil 24 timer før oppmøte — ring 33 33 44 00.'),
        html: ramme('Timen din er registrert', rader(par) + '<p style="font-size:15px;line-height:1.6;margin:16px 0 0"><b>Avbestilling:</b> gratis inntil 24 timer før oppmøte — ring 33 33 44 00.</p>') };
    }
    case 'booking-cancelled': {
      const par = [['Bookingnummer', d.ref], ['Tjeneste', d.tjeneste], ['Dato', d.dato]];
      return { emne: 'Bookingen er avbestilt | Kepler Bilservice',
        tekst: tekstAv(par, 'Hei ' + kunde.navn + '! Bookingen din er avbestilt.', 'Vil du ha ny time? Ring 33 33 44 00 eller bestill på nettsiden.'),
        html: ramme('Bookingen er avbestilt', rader(par) + '<p style="font-size:15px;line-height:1.6;margin:16px 0 0">Vil du ha ny time? Ring 33 33 44 00 eller bestill på nettsiden.</p>') };
    }
    case 'booking-changed': {
      const par = [['Bookingnummer', d.ref], ['Tjeneste', d.tjeneste], ['Ny dato/status', d.detaljer]];
      return { emne: 'Bookingen er endret | Kepler Bilservice',
        tekst: tekstAv(par, 'Hei ' + kunde.navn + '! Bookingen din er endret.', 'Stemmer ikke dette? Ring 33 33 44 00.'),
        html: ramme('Bookingen er endret', rader(par) + '<p style="font-size:15px;margin:16px 0 0">Stemmer ikke dette? Ring 33 33 44 00.</p>') };
    }
    case 'contact-confirmation': {
      const par = [['Referanse', d.ref], ['Navn', kunde.navn], ['E-post', kunde.epost], ['Telefon', kunde.tlf], ['Melding', d.melding]];
      return { emne: 'Vi har mottatt henvendelsen din | Kepler Bilservice',
        tekst: tekstAv(par, 'Hei ' + kunde.navn + '! Takk for henvendelsen.', 'Vi tar kontakt så snart vi kan, normalt innen én arbeidsdag.'),
        html: ramme('Takk for henvendelsen', rader(par) + '<p style="font-size:15px;margin:16px 0 0">Vi tar kontakt så snart vi kan, normalt innen én arbeidsdag.</p>') };
    }
    case 'waitlist-confirmation': {
      const par = [['Referanse', d.ref], ['Gjelder', d.detaljer], ['Navn', kunde.navn], ['E-post', kunde.epost], ['Telefon', kunde.tlf]];
      return { emne: 'Du står på ventelisten | Kepler Bilservice',
        tekst: tekstAv(par, 'Hei ' + kunde.navn + '! Du står nå på ventelisten.', 'Blir det ledig plass, kontakter vi deg på telefon eller e-post med en gang.'),
        html: ramme('Du står på ventelisten', rader(par) + '<p style="font-size:15px;margin:16px 0 0">Blir det ledig plass, kontakter vi deg med en gang.</p>') };
    }
    case 'payment-confirmation': {
      const par = [['Ordrenummer', d.ref], ['Beløp', d.total], ['Status', 'Betalt']];
      return { emne: 'Betaling mottatt for ' + d.ref + ' | Kepler Bilservice',
        tekst: tekstAv(par, 'Hei ' + kunde.navn + '! Vi har mottatt betalingen.', 'Kvitteringen gjelder som betalingsbekreftelse.'),
        html: ramme('Betaling mottatt', rader(par)) };
    }
    case 'payment-failed': {
      const par = [['Ordrenummer', d.ref]];
      return { emne: 'Betalingen gikk ikke gjennom | Kepler Bilservice',
        tekst: tekstAv(par, 'Hei ' + kunde.navn + '! Betalingen gikk dessverre ikke gjennom.', 'Ordren din er trygt lagret. Prøv igjen, eller ring 33 33 44 00 så hjelper vi deg.'),
        html: ramme('Betalingen gikk ikke gjennom', rader(par) + '<p style="font-size:15px;margin:16px 0 0">Ordren din er trygt lagret. Prøv igjen, eller ring 33 33 44 00 så hjelper vi deg.</p>') };
    }
    case 'admin-new-order': {
      const par = [['Ordrenummer', d.ref], ['Kunde', kunde.navn], ['Telefon', kunde.tlf], ['E-post', kunde.epost], ['Tjenester', d.tjenester], ['Totalpris', d.total], ['Betalingsstatus', d.betaling]];
      return { emne: 'Ny ordre ' + d.ref, tekst: tekstAv(par, 'Ny ordre mottatt.'), html: ramme('Ny ordre', rader(par)) };
    }
    case 'admin-new-booking': {
      const par = [['Bookingnummer', d.ref], ['Kunde', kunde.navn], ['Telefon', kunde.tlf], ['Tjeneste', d.tjeneste], ['Dato', d.dato], ['Tidspunkt', d.tid], ['Kommentar', d.kommentar]];
      return { emne: 'Ny booking ' + d.ref, tekst: tekstAv(par, 'Ny booking mottatt.'), html: ramme('Ny booking', rader(par)) };
    }
    case 'admin-new-contact': {
      const par = [['Referanse', d.ref], ['Navn', kunde.navn], ['Telefon', kunde.tlf], ['E-post', kunde.epost], ['Melding', d.melding]];
      return { emne: 'Ny henvendelse ' + d.ref, tekst: tekstAv(par, 'Ny henvendelse mottatt.'), html: ramme('Ny henvendelse', rader(par)) };
    }
    case 'admin-email-error': {
      const par = [['Mottaker', d.til], ['Type', d.epostType], ['Feil', d.feil]];
      return { emne: 'E-postsending feilet', tekst: tekstAv(par, 'En e-post kunne ikke sendes. Ordren/bookingen er lagret.'), html: ramme('E-postsending feilet', rader(par) + '<p style="font-size:15px;margin:16px 0 0">Ordren/bookingen er lagret — følg opp kunden manuelt.</p>') };
    }
    default:
      return { emne: 'Kepler Bilservice', tekst: d.tekst || '', html: ramme('Kepler Bilservice', '<p>' + (d.tekst || '') + '</p>') };
  }
}

module.exports = { lagEpost };
