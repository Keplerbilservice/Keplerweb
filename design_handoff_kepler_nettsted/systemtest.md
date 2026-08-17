# Systemtest — Kepler Bilservice

Testet 10. august 2026. Gjennomgangen dekker `Kepler nettsted v2.dc.html` og `Kepler admin.dc.html`.

## Viktig forbehold, les dette først

Det som er bygget er en **designprototype**, ikke et driftsklart system. Det finnes ingen database, ingen e-postutsending, ingen betalingsløsning og ingen kobling mot Norbits eller Statens vegvesen. Alt innhold ligger i filene.

Flere av punktene du ba om å få testet kan derfor ikke testes, fordi de ikke er bygget ennå:

- At e-poster faktisk sendes
- At variabler fylles ut i utsendte e-poster
- At tidspunkt for automatiske utsendelser trigges riktig
- At ingen e-poster sendes dobbelt eller uteblir
- Betalingsbekreftelser
- At endringer i admin faktisk oppdaterer nettsiden

Adminpanelet viser **hvordan** dette skal administreres. Endringene lagres ikke og påvirker ikke nettsiden. Det er utviklerens jobb å koble de to sammen, og det er den største gjenstående oppgaven.

---

## Fungerer som forventet

### Privatkundens flyt
- Forsiden laster uten feil
- Registreringsnummer slås opp og sender kunden til målvalg
- Målvalg gir riktig pakkeforslag, tilpasset bilens alder og farge
- «Gå videre med dette» fyller bestillingsskjemaet
- Tomt skjema stoppes av validering med tydelige feilmeldinger
- Utfylt skjema gir kvitteringsside
- Logoen nullstiller all tilstand og går til forsiden

### Tjenester
- Alle fem områdekort bytter tjenestelisten
- «Les mer» åpner riktig tjeneste
- Skadetjenester viser skadeverktøyet med biltegning, markører og bildeopplasting
- Garantiboksen vises kun på tjenester som har garanti, og åpner utfyllende vilkår
- «Alternativer» er klikkbare kort som går til den tjenesten
- Produkter kan legges til fra tjenestesiden og havner i bestillingen med riktig sum
- Leiebil og nøkkelboks kan krysses av direkte i ordrekortet

### Bedrift og forhandler
- Begge sidene laster og har egen fargeprofil
- Kampanjebånd med foto og pris på begge
- Forhandlersiden viser ikke priser, kun varighet og volumavtale
- Bestill oppdrag og bedriftsavtale åpner riktige skjemaer med validering

### Bunntekst og navigasjon
- Alle tolv lenkene i bunnteksten er koblet opp
- Hamburgermenyen fungerer under 1180 px
- Ingen horisontal scroll ved 924 px

### Adminpanelet
- Alle 25 menypunktene laster med innhold
- Redigeringsskjema åpner fra rad, blyant og «Ny»-knapp i alle listemoduler
- Feltene husker det du skriver mens du er i panelet
- «Ulagrede endringer» vises ved endring, forsvinner ved publisering
- Lagre gir bekreftelse
- Dashbordet er klikkbart i sin helhet
- Størrelsesvalget skalerer hele panelet
- Ingen uoppløste maler i grensesnittet

---

## Feil funnet og rettet under testen

**Menypunktet «Roller og sikkerhet» manglet.** Det lå i innholdet, men var ikke lagt inn i menyen, så siden var utilgjengelig. Rettet.

---

## Krever forbedring

### Ingenting lagres
Endringer i adminpanelet forsvinner ved omlasting. Dette er forventet i en prototype, men det er den første tingen utvikleren må løse.

### Knapper uten mål
Disse gjør ingenting fordi målet ikke er bygget:
- «Forhåndsvis» i toppen av adminpanelet
- «Dupliser» på listeradene
- «Velg fra mediebank» på bildefelter
- «Last opp» i mediebanken
- «Ny seksjon» på kundegruppesidene
- Drag-håndtakene viser at rekkefølge kan endres, men gjør det ikke

### Betaling mangler helt
Bestillingsflyten går fra utfylt skjema rett til kvittering. Det er ikke noe betalingssteg. Klarna, kort og faktura er nevnt som tekst, men ingen av dem er koblet opp. Avklar om betaling skal skje ved bestilling eller ved henting.

### Bildebiblioteket er for lite
Fire bilder brukes på tvers av tre sider, kampanjebånd, nyheter og tjenester. Det synes. Dette er det enkleste enkelttiltaket for å heve inntrykket.

---

## Kan skape problemer senere

### Anbefalinger kan settes opp to steder
En tjeneste kan foreslå tillegg direkte fra sitt eget skjema, og en anbefalingsregel kan foreslå det samme. Det er fleksibelt, men to steder som kan motsi hverandre. Vurder å la reglene være eneste sted, eller å vise et varsel i admin når begge treffer.

### Innholdet ligger tre steder
`tjenestedata.js` for privat, `forhandlerdata.js` for forhandler, `bedriftdata.js` for bedrift. Flere tjenester går igjen i to eller tre av dem — keramisk coating, Fluid Film, Smart Repair, dekorfjerning. Endres en beskrivelse ett sted, henger de andre etter. I den ferdige løsningen må dette være **én** tjenestekatalog der hver tjeneste merkes med hvilke kundegrupper den gjelder for. Adminpanelet er allerede bygget slik. Prototypen er det ikke.

### Priser er antakelser
Samtlige priser, meterpriser for bobil, bedriftspriser eksklusive mva og artikkelnumre er mine forslag. Ingen av dem er bekreftet av dere.

### Innhold som må kvalitetssikres
- Garantitider og hva garantien dekker og ikke dekker
- Varigheter på alle tjenester
- Prosessbeskrivelser
- Utførelsesrekkefølgen i verkstedet
- Produktnavn og priser
- Referansekunder, som krever samtykke før publisering
- Omtaler, som i dag er eksempler jeg har skrevet
- Organisasjonsnummeret i bunnteksten er en plassholder
- Adressen står som Andebuveien 63, men Semsbyveien 108 har forekommet i tidligere materiale

### Kjøretøyoppslaget er simulert
`slaaOppBil` genererer oppdiktede biler ut fra skiltet. Den må erstattes med et reelt oppslag mot Statens vegvesen. Merk at kjøretøygruppe og egenvekt er det som avgjør prisklassen, og det må hentes derfra.

### Responsiviteten er i JavaScript
Brekkpunktene er regnet ut i kode fordi prototypen bruker innebygde stiler. I produksjon skal dette være vanlige media queries.

---

## Anbefalt rekkefølge før lansering

1. Én tjenestekatalog i et hodeløst CMS, med kundegruppe som felt
2. Lagring i adminpanelet, koblet til den katalogen
3. Kjøretøyoppslag mot Statens vegvesen
4. E-postutsending med malene som allerede er definert
5. Betalingsløsning, eller en bevisst beslutning om at betaling skjer ved henting
6. Kvalitetssikring av alt innhold i listen over
7. Fotografering
