# Kepler Bilservice — nettsted (testpakke)

Dette er en designprototype + demo-backend for kepler.no-redesignet. HTML-filene er designreferanser bygget i et prototypeverktøy — de viser tiltenkt utseende og oppførsel, og skal gjenskapes i produksjonsmiljøet, ikke shippes direkte.

## Innhold
- `Kepler nettsted design C.dc.html` — hovedfilen: hele nettstedet (forside, tjenestesider, bookingflyt, Min side, bedrift/forhandler, 404).
- `Kepler admin.dc.html` — adminpanel (roller: Admin/Ansatt/Redaktør).
- `Kepler mobil.dc.html`, `Kepler veiviser.dc.html`, `Kepler oppsett.dc.html` — mobilvisning, reg.nr-veiviser, tjenesteoppsett.
- `tjenestedata.js`, `bedriftdata.js`, `forhandlerdata.js`, `veiviserdata.js` — datagrunnlag.
- `server/` — demo-backend (Express): ordre, booking, betaling, e-post (nodemailer), SMS (Twilio-struktur), sesjoner.
- `tests/backend/` — Playwright-testsuite (20+ tester).
- `_ds/` — Kepler designsystem (tokens, komponenter, bundle). HTML-filene laster herfra.
- `design_handoff_kepler_nettsted/` — eldre overleveringsdokumentasjon (v2); design C er gjeldende.

## Kjøre lokalt
```bash
npm install
npx playwright install
npm run serve        # statisk server på :8080 — åpne "Kepler nettsted design C.dc.html"
npm run start:test   # demo-backend (NODE_ENV=test)
npm run test:backend # backend-testsuite
```

## Status / forbehold
- Backend er et demosystem med lokal lagring — ingen ekte database, SMTP, SMS eller betaling er koblet til. Nøkler settes i `.env` (se `.env.test.example` hvis den finnes, ellers `server/server.js`).
- Gjenstår før lansering: ekte DB, SMTP/SMS-nøkler, Vipps/Stripe, samt 5 hardkodede innholdspunkter (båt/bobil-herotekster, avbestillingstekst, «Vi anbefaler»-blokk, bilsalg-side).
- Responsivitet verifisert 320–3440 px, 0 overflow.

## Kontakt
Prosjektet er laget i Claude; spørsmål om designintensjon rettes til bestiller.
