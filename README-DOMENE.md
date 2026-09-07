# Kepler på domene.no — oppsett

Alt kjører på domene.no-webhotellet: nettside, bestillinger, e-post og database. Ingen andre tjenester trengs.

## Filer som skal opp på webhotellet (i rotmappen, f.eks. `public_html/`)

Fra denne mappen (php-backend/):
- `index.php`
- `api.php`
- `epost-maler.php`
- `.htaccess`
- `config.php` (lages av deg — se steg 2)

Fra prosjektet ellers:
- `Kepler nettsted design C.dc.html`
- `support.js`
- `tjenestedata.js`, `bedriftdata.js`, `veiviserdata.js`, `forhandlerdata.js` (og andre .js-filer nettsiden bruker)
- `assets/`-mappen (bilder)

## Steg 1 — Opprett MySQL-database
1. Logg inn på domene.no-kontrollpanelet
2. Finn **MySQL / Databaser** → opprett ny database
3. Noter: databasenavn, brukernavn, passord (host er som regel `localhost`)

## Steg 2 — Lag config.php
1. Åpne `config.eksempel.php`
2. Fyll inn databaseopplysningene fra steg 1
3. Bytt admin-passordene (står `BYTT-MEG`)
4. Lagre som `config.php` og last opp
5. **Ikke** legg config.php i GitHub

Tabellene i databasen lages automatisk ved første besøk — ingen SQL å kjøre manuelt.

## Steg 3 — Last opp filene
Via GitHub-koblingen i domene.no, eller filbehandleren/FTP i kontrollpanelet.

## Steg 4 — Test
1. Åpne nettsiden → forsiden skal vise Evershine-logoen
2. Gjør en testbestilling → du skal få ordrebekreftelse på e-post (fra post@kepler.no)
3. Sjekk at admin-e-posten (verksted@kepler.no) fikk «Ny ordre»

## E-post
Sendes med PHP `mail()` via domene.no sine servere — avsender post@kepler.no, svar-til kundeservice@kepler.no. Ingen SMTP-passord trengs så lenge siden ligger på domene.no-webhotellet og domenet er kepler.no.

## Hva som IKKE er med (kan legges til senere)
- SMS (Twilio): legg inn nøkler i config.php, så virker det
- Nyhetsbrev (Mailchimp): samme — nøkler i config.php
- Regnr-oppslag (Statens vegvesen): nøkkel i config.php
- Ekte betaling (Vipps): testknappene styres av `test_modus` i config.php
