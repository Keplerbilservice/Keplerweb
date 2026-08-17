# Handoff: Kepler Bilservice — nettsted

## Oversikt

Nytt nettsted for Kepler Bilservice AS, Andebuveien 63, 3170 Sem. Erstatter dagens WordPress-side på kepler.no.

Kundegruppen er voksne privatkunder som ofte ikke kjenner fagbegrepene. Designet er derfor bygget rundt tre prinsipper:

1. **Stor og tydelig.** Minste tekst er 19 px, brødtekst 21–25 px, alle klikkflater minst 56 px høye.
2. **Oppgave før produkt.** Forsiden spør «Hva trenger bilen din?» og bygger et forslag, i stedet for å liste opp tjenester kunden må tolke selv.
3. **Mersalg i konteksten.** Tilleggstjenester foreslås der de gir mening, med begrunnelse, ikke som en generisk «andre kunder kjøpte også».

## Om designfilene

Filene i denne pakken er **designreferanser skrevet i HTML** — prototyper som viser tiltenkt utseende og oppførsel. De er ikke produksjonskode som skal kopieres rett inn.

Oppgaven er å **gjenskape designet i et egnet rammeverk** med et redigeringssystem bak. Se «Redigerbarhet» under — det er det viktigste kravet i hele prosjektet.

## Fidelitet

**Hi-fi.** Farger, typografi, avstander og interaksjoner er ferdig bestemt og hentet fra Kepler Bilservice Design System. Gjenskap pikselnært.

---

## KRAV 1: Redigerbarhet

Dette er prosjektets viktigste krav, formulert av kunden: *«jeg har ingen mulighet til å legge ut og administrere sidene selv, legge ut bilder, kampanjer etc. Jeg skal også legge ut flere undersider, og jeg trenger full frihet til dette.»*

Alt innhold under skal kunne redigeres av en ikke-teknisk bruker, uten utvikler. Bruk et hodeløst CMS (Sanity, Payload, Storyblok e.l.) eller tilsvarende.

### 1.1 Tjenestekatalog

Hver tjeneste er en post med feltene:

| Felt | Type | Beskrivelse |
|---|---|---|
| `id` | slug | Unik, brukes i relasjoner |
| `navn` | tekst | «Kepler lakkforsegling» |
| `kategori` | referanse | Vask og pleie / Beskytte lakken / Hindre rust / Fikse en skade |
| `kortTekst` | tekst | Én setning, vises i lister |
| `varighet` | tekst | «1 dag», «3–4 timer» |
| `pris` | tall | I kroner |
| `foerPris` | tall, valgfri | Satt = kampanje, viser overstreket førpris og rødt merke |
| `rekkefolge` | tall | Utførelsesrekkefølge i verkstedet, se 1.4 |
| `niva` | valg, valgfri | Bra / Bedre / Best, se 1.3 |
| `nivaSammendrag` | tekst | Én linje som forklarer forskjellen på nivået |
| `kunMed` | referanser | Kan kun bestilles sammen med disse, se 1.5 |
| `kunMedTekst` | tekst | Forklaring når tjenesten er låst |
| `mersalg` | referanser + begrunnelse | Foreslås på denne sidens detaljvisning, se 1.6 |
| `produkter` | referanser | Vedlikeholdsprodukter, se 1.7 |

Detaljinnhold (Les mer-siden):

| Felt | Type |
|---|---|
| `hva` | rik tekst, 2–3 setninger |
| `garanti` | tekst |
| `prosess` | liste av steg, hvert med tittel og forklaring |
| `forvent` | liste av punkter, inkludert det tjenesten *ikke* løser |
| `passerFor` | liste av punkter |
| `vurderHeller` | liste av (tjeneste, begrunnelse) |

### 1.2 Kategorier

Fire kategorier på forsiden, hver med navn, kort tekst og bilde. Rekkefølge og innhold redigerbart. Antall skal kunne endres.

### 1.3 Bra / bedre / best

Gjelder i dag kun **Beskytte lakken** og **Hindre rust**. Kunden skal selv kunne slå det på eller av per kategori, og velge hvilke tre tjenester som utgjør nivåene. Nivået «Bedre» får automatisk merket «Mest valgt».

Fikse en skade har bevisst *ingen* nivådeling — PDR, Spot Paint, felg og lykt løser ulike problemer, ikke samme problem på tre nivåer.

### 1.4 Utførelsesrekkefølge

Hver tjeneste har et tall som bestemmer rekkefølgen i verkstedet. Bestillingen sorterer seg selv etter dette, uavhengig av klikkerekkefølge, og nummereres 1, 2, 3 i oppsummeringen.

Dagens verdier:

```
10–19  Skadereparasjon (PDR 10, Spot Paint 11, Felg 12, Lykt 13)
20–29  Rust (Rustsjekk 20, FF Express 21, FF Pluss 22, Premium 23)
30–39  Vask og interiør (Utvendig 30, Ute+inne 31, Innvendig rens 32, Skinn 33)
40–49  Lakkrens 40
50–59  Forsegling og coating (Forsegling 50, Pure Grade 51, Graphene 52)
60–69  Coating på glass, felg og film (Felg 60, Glass 61, Solfilm 62)
```

Prinsippet: skader rettes før lakkarbeid, understell før vask, lakkrens før forsegling.

### 1.5 Bindinger — «kan kun bestilles sammen med»

Lakkrens kan ikke bestilles alene. Den er bundet til `forsegling`, `coating`, `pure`, `felgcoat` og `glasscoat`.

Oppførsel:
- Vises ikke i tjenestelisten på forsiden
- I bestillingsskjemaet dukker den opp merket «Tillegg» når en av hovedtjenestene er valgt
- På Alle tjenester vises den med hengelås og «Kun som tillegg» i stedet for velgeknapp, og beskrivelsen byttes til `kunMedTekst`
- Fjernes hovedtjenesten, fjernes tillegget automatisk

Kunden skal kunne opprette flere slike bindinger selv.

### 1.6 Mersalg per tjeneste

Hver tjeneste har en liste over tjenester som foreslås på dens detaljside, hver med **egen begrunnelse** skrevet for den kombinasjonen. Begrunnelsen er poenget — generisk mersalg leses som støy.

Dagens regler:

**Lakktjenester** (forsegling, coating, pure, felgcoat, glasscoat, solfilm) foreslår:
- Lakkrens — «Forarbeidet som avgjør hvor bra resultatet blir. Anbefales før all coating.»
- Innvendig vask og rens — «Utsiden blir som ny — da merkes interiøret desto mer. Vi tar det på samme besøk.»
- Skinnbehandling — «Rens og næring til setene mens bilen først står hos oss.»

**Rusttjenester** (rustsjekk, ff-express, ff-pluss, premium) foreslår:
- Lakkrens — «Bilen står hos oss uansett. Polering samtidig sparer deg et helt besøk.»
- Innvendig vask og rens — «Grundig rens av interiøret mens understellet behandles.»
- Skinnbehandling — «Rens og næring til setene på samme besøk.»

### 1.7 Produkter

Egen innholdstype: navn, kategori (Bilsjampo, Felgrens, Interiør, Glass, Etterbehandling), beskrivelse, pris, bilde. Kobles til tjenester, og beskrivelsen forklarer hvorfor produktet passer til akkurat den behandlingen.

**Merk:** produktnavn og priser i prototypen er antakelser bygget på Evershine og Kepler Ceramic Wash. Må erstattes med det virkelige sortimentet.

### 1.8 Pakkeregler

Veiviseren bygger et forslag ut fra bilens alder, farge og kundens mål. Se KRAV 2.

Mitt råd: hold reglene i kode i første versjon. De endres kanskje to ganger i året, og et redigeringsgrensesnitt for regelmotorer blir fort uoversiktlig. Gjør heller pakkene redigerbare senere hvis behovet melder seg. Diskuter dette med kunden før dere bestemmer.

### 1.9 Øvrig innhold

- Alle overskrifter, ingresser, knappetekster og mikrotekster
- Alle bilder, med alt-tekst
- Kampanjebåndet på forsiden: tekst, hvilken kampanje, av/på
- Nyheter og blogginnlegg, med av/på for hele seksjonen
- Omtaler, se KRAV 3
- Kontaktinformasjon, åpningstider, bunntekst

Seksjonene nyheter, omtaler og kampanjebånd skal kunne slås helt av uten å etterlate tomrom.

---

## KRAV 2: Kjøretøyoppslag og pakkeforslag

### 2.1 Oppslag

Registreringsnummer slås opp mot **Statens vegvesens åpne kjøretøyopplysninger**. Trengs: merke, modell, årsmodell, farge.

I prototypen er dette erstattet av en demofunksjon (`slaaOppBil`) som genererer konsistente, oppdiktede biler ut fra skiltet. Den skal fjernes.

Personvern: ingenting lagres før kunden sender inn en forespørsel. Dette står i teksten under feltet og må holdes.

### 2.2 Pakkelogikk

Kunden velger ett av fire mål. Kombinert med alder og farge gir det en pakke:

**«Den skal se best mulig ut»** → *Full oppfriskning*
- Lakkrens. Begrunnelse varierer: mørk lakk gir «Mørk lakk viser hver eneste ripe», ellers «Retter opp svirvler og riper før forseglingen»
- Bil ≤ 3 år: Pure Grade. Eldre: Graphene coating
- Felg coating

**«Den skal holde fem år til»** → *Beholde bilen lenger*
- Bil ≥ 8 år: Kepler Premium antirust. Yngre: Fluid Film Pluss
- Kepler lakkforsegling
- Bil ≥ 8 år: Lyktefornyelse

**«Den skal være enkel å holde ren»** → *Mindre jobb med bilen*
- Graphene coating, Glass coating, Felg coating

**«Jeg skal selge den snart»** → *Klar for salg*
- Utvendig og innvendig vask
- Lakkrens
- Bil ≥ 8 år: Lyktefornyelse

Hver linje har sin egen begrunnelse. Kunden kan trykke på en linje for å ta den ut, og summen oppdateres.

**Disse reglene er mine antakelser.** Kepler må gå gjennom dem før lansering.

---

## KRAV 3: Google-omtaler

Hentes fra Google Places API, filtrert til 4 og 5 stjerner. Snittscore og antall vises øverst.

To ting:
- API-et returnerer maks fem omtaler per kall. Hent jevnlig og lagre lokalt, ellers får dere en tynn og ustabil visning.
- Vurder å la enkelte firestjerners med et lite ankepunkt stå. En vegg av bare femmere leses som kjøpt. I prototypen står én slik med vilje.

Omtalene i prototypen er eksempler jeg har skrevet, ikke ekte.

---

## KRAV 4: Bestilling

### 4.1 Skjema

Går **ikke** til Norbits. Sendes som e-post til kundeservice@kepler.no og lagres i en oversikt.

Felter: navn, telefon, e-post, registreringsnummer med oppslag, ønsket dato, valgte tjenester, fritekst («Noe mer vi bør vite?»), avkryssing for nyhetsbrev, avkryssing for personvernsamtykke.

**Ønsket dato må ha minimum 16 dager fram i tid** som tidligste valg, fordi skjemaet ikke snakker med Norbits-kalenderen. Første ledige dato står i klartekst under feltet.

### 4.1b Emnefelt i e-post

Emnelinjen skal settes sammen av variabler, redigerbare fra admin under Meldinger. Standardoppsett:

| Skjema | Emnefelt |
|---|---|
| Privat, bestilling | `Ny bestilling {regnr} — {navn}` |
| Bedrift, avtaleforespørsel | `Bedriftsavtale — {bedrift}` |
| Forhandler, oppdrag | `{bedrift} — oppdrag {regnr}` |
| Forhandler, hasteoppdrag | `HASTER: {bedrift} — oppdrag {regnr}` |
| Skadebeskrivelse | `Skade {regnr} — {navn}` |

Tilgjengelige variabler: `{regnr}` `{navn}` `{bedrift}` `{tjeneste}` `{dato}` `{telefon}`.

Begrunnelsen fra kunden: registreringsnummeret er det de søker etter i innboksen på privatsiden, og forhandlernavnet er det de sorterer på når oppdragene kommer fra bilforhandlere. Variabler som mangler verdi utelates uten å etterlate tomme skilletegn.

### 4.2 Skadebeskrivelse

På de fire skadetjenestene ligger et eget verktøy:

- Strektegning av bil sett ovenfra. Kunden trykker der skaden er, og får en nummerert markør med eget tekstfelt. Markørposisjonen lagres i prosent av bildeflaten, så den overlever skalering.
- Opplasting av nærbilde og oversiktsbilde, med forklaring på hvorfor begge trengs.
- Forbehold om pris i egen boks: *«Noen skader er vanskelige å prise eksakt på forhånd. Prisen er derfor et anslag, med forbehold til vi har sett bilen. Blir det dyrere, hører du fra oss før vi setter i gang.»*

E-posten til Kepler må inneholde markørene med posisjon og tekst, samt bildene som vedlegg.

**Biltegningen i prototypen er en grov skisse.** Be Kepler om tegningen fra skadeskjemaene deres og bytt den inn.

---

## Skjermer

### Forside

Sticky topplinje, 112 px høy (88 px under 1180 px, 76 px under 760 px): logo 200 px som lenker til forsiden, fire menypunkter, søkefelt, telefonnummer.

**Helt.** Mørk bakgrunn `--ink-900` med foto på 34 % opasitet og venstre-til-høyre gradient. Maks 1640 px bredde, 116 px luft over og under. To spalter, 1,15 mot 0,85.

Venstre: overskrift «Hva trenger bilen din?» 76 px, ingress 31 px, registreringsnummerfelt i IBM Plex Mono 32 px ved siden av rød «Slå opp bilen»-knapp, åpningstider under.

Høyre: kort i halvgjennomsiktig hvitt med `backdrop-filter: blur(8px)`, «Vet du hva du vil ha? / Bestill time direkte».

**Kampanjebånd.** Fullbredde rødt `--red-500`, ett kampanjetilbud, knapp til alle kampanjer.

**Fire områder.** Rutenett med fire kort (to under 1180 px, ett under 760 px). Bilde 260 px, navn 32 px, kort tekst. Valgt område får mørk bakgrunn og rød ramme. Klikk ruller ned til tjenestelisten.

**Tjenester.** For Beskytte lakken og Hindre rust: tre nivåkort side ved side med BRA / BEDRE / BEST i toppbånd, «Mest valgt» på midten. Øvrige tjenester under som brede rader. Andre kategorier: kun rader.

Hver rad: navn 40 px, beskrivelse, varighet, pris 45 px høyrestilt, «Les mer» og «Velg».

«Se alle tjenester»-knapp under listen.

**Tillegg.** «Legg til mens bilen først er inne» — fire kort med tilleggspris satt mot prisen alene.

**Nyheter.** Tre kort. Kan slås av.

**Omtaler.** Fire kort med stjerner, navn, tjeneste og dato. Kan slås av.

**Kontakt.** Mørk seksjon med adresse, åpningstider, e-post og betaling.

**Bunntekst.** Fire spalter: kontaktinfo, tjenester, annet, nyhetsbrev.

**Fast bestillingslinje** nederst på skjermen, vises kun når noe er valgt. Viser valgt tjeneste, antall tillegg, totalsum og «Bestill time».

### Målvalg

Egen skjerm etter oppslag. Bekreftelse av bilen øverst med «Endre», så fire store valg i to spalter.

### Pakkeforslag

Egen skjerm. Rød ramme, tittel, begrunnelse, linjer med hver sin forklaring. Trykk på en linje for å ta den ut. Sum oppdateres. «Gå videre med dette» fyller bestillingsskjemaet.

### Tjenestedetalj (Les mer)

Maks 1640 px, to spalter 1,3 mot 1.

Venstre: tilbakelenke, kampanjemerke, navn, ingress, to bokser med varighet og garanti, «Slik gjør vi det» som nummererte steg, «Hva du kan forvente», «Passer for deg som har», «Ta det på samme besøk» (mersalg), «Produkter til vedlikehold», «Vurder heller noe annet hvis».

Høyre: skadeverktøy på skadetjenester, deretter prisboks med pris, varighet, betaling og to knapper.

### Alle tjenester

Full katalog gruppert i fire kategorier med rød skillelinje. Ingen framheving. Låste tjenester vises med hengelås.

### Bestilling

To spalter. Venstre: stegindikator, seks felter i to kolonner, sammenslått tjenestevelger med fire kategorier, fritekstfelt, to avkryssinger, sendeknapp.

Høyre: ordreoppsummering i anbefalt rekkefølge, nummerert, med kryss for å fjerne. Totalsum.

---

## Responsiv oppførsel

Brekkpunktene er implementert i JavaScript, ikke i media queries, fordi prototypen bruker inline-stiler. **I produksjon skal dette være vanlige media queries.**

| | < 760 px | 760–1180 px | > 1180 px |
|---|---|---|---|
| Fire kort | 1 | 2 | 4 |
| Tre nivåkort | 1 | 1 | 3 |
| Todelte seksjoner | 1 | 1 | 2 |
| Søkefelt i topp | skjult | skjult | synlig |
| Menypunkter | skjult | skjult | synlig |
| Overskrift | 46 px | 60 px | 76 px |
| Ingress | 23 px | 31 px | 31 px |
| Brødtekst | 20 px | 25 px | 25 px |
| Sideluft | 20 px | 32 px | 32 px |

**Mangler:** hamburgermeny under 1180 px. Menypunktene er bare skjult i prototypen. Må bygges.

---

## Designsystem

Bruk Kepler Bilservice Design System. Sentrale verdier:

**Farger.** Primærrød `#cc0000` (`--red-500`). Mørk `--ink-900`, tekst `--ink-700`, sekundær `--ink-500`, hårlinjer `--ink-100`, lys flate `--ink-050`. Logoens egen gradient `#e22614 → #b91d10` brukes kun på merket.

**Typografi.** Archivo for display og UI, Barlow for brødtekst, IBM Plex Mono for registreringsnummer, artikkelnummer og datoer. Overskrifter `letter-spacing: -0.02em` til `-0.03em`, setningsstil.

**Radier.** 8 px kontroller, 10 px bilder, 12 px kort, pill på merker. Kampanjemerket er bevisst firkantet.

**Ikoner.** Google Material Symbols Outlined, opsz 24, wght 400, FILL 0, GRAD 0.

**Bevegelse.** 140 ms hover, 220 ms paneler. Ingen fjæring.

---

## Tilstand

```
steg            forside | maal | pakke | detalj | alle | bestilling
omraade         valgt kategori på forsiden
valgte          array av tjeneste-id, sortert etter rekkefolge ved visning
tillegg         array av tillegg-id
bil             { merke, modell, aar, farge, moerk } eller null
regNr           tekst
maal            best | vare | enkelt | selge
fjernet         array av id fjernet fra pakkeforslaget
aapen           array av åpne kategorier i bestillingsskjemaet
merker          array av { x, y, tekst } — skademarkører i prosent
filer           { naer, oversikt } — antall opplastede bilder
sendt           bekreftelse vist
bredde          vindusbredde, kun for prototypens brekkpunkter
```

Logoklikk nullstiller `bil`, `maal`, `regNr` og `fjernet`. Tilbakeknapper inne i flyten beholder bilen.

---

## Assets

- `assets/logo-kepler-wordmark.svg` — fra kundens logo-PDF. Ordmerket er håndtegnet, ikke en skrifttype. Sett aldri navnet i typografi.
- `assets/photos/` — fire kundefoto. Disse går igjen flere steder og det synes. **Be om et større bildebibliotek før lansering.**

---

## Filer i pakken

- `Kepler nettsted v2.dc.html` — hele designet
- `tjenestedata.js` — detaljinnhold og produkter per tjeneste
- `Kepler nettsted.dc.html` — første versjon, gjenskapning av dagens side. Referanse for innhold.

---

## Må avklares med Kepler før lansering

1. Alle garantitider, varigheter og prosessbeskrivelser i `tjenestedata.js` er utkast og må kvalitetssikres
2. Produktnavn og priser i produktseksjonen er antakelser
3. Pakkereglene for alder og farge er mine antakelser
4. Utførelsesrekkefølgen er utledet av hvordan tjenestene henger sammen, ikke av verkstedets praksis
5. Biltegningen for skademerking bør erstattes med Keplers egen
6. Omtalene er eksempler
7. Organisasjonsnummeret i bunnteksten er en plassholder
8. Adressen står som Andebuveien 63 i topp og bunn, men Semsbyveien 108 forekom i tidligere materiale — bekreft hvilken som er riktig
