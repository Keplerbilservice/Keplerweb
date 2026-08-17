// Detaljinnhold for bilforhandlertjenester. Utkast — må kvalitetssikres av Kepler.
export const fhDetaljer = {
  'Nybilklargjøring': {
    hva: 'Klargjøring av nye biler før levering til kunde. Vi tar bilen fra transporttilstand til utleveringsklar.',
    varighet: '1 dag',
    inngar: ['Utvendig håndvask, felger og hjulbuer', 'Fjerning av transportfolie og limrester', 'Innvendig rengjøring og støvsuging', 'Glass innvendig og utvendig', 'Visuell kvalitetskontroll i lyshall', 'Dokumentasjon med bilder'],
    ikkeInkludert: ['Mottakskontroll med skaderapport, bestilles separat', 'Rustbeskyttelse og coating, bestilles separat', 'Registreringsarbeid og skilting'],
    merk: 'Bilen leveres tilbake klar for utlevering. Sier fra hvis vi finner avvik som bør dokumenteres.'
  },
  'Bruktbilklargjøring': {
    hva: 'Full klargjøring av innbyttebiler og bruktbiler før salg. Målet er høyest mulig opplevd verdi på salgsplassen.',
    varighet: '1–2 dager',
    inngar: ['Utvendig håndvask med to-bøttemetoden', 'Avfetting og clay', 'Lakkrens og maskinpolering', 'Innvendig rens av tekstiler og overflater', 'Behandling av plast og lister', 'Glass innvendig og utvendig', 'Kontroll i lyshall'],
    ikkeInkludert: ['Smart Repair av bulker og lakkskader, bestilles separat', 'Coating og forsegling, bestilles separat', 'Utbedring av slitasjeskader i interiøret'],
    merk: 'Vi kan ikke garantere at alle riper forsvinner. Hvor mye som kan forbedres avhenger av lakkens tilstand.'
  },
  'Fotoklargjøring': {
    hva: 'Rask klargjøring rettet mot annonsering. Bilen skal se best mulig ut på bildene, ikke nødvendigvis på nært hold.',
    varighet: '1 dag',
    inngar: ['Utvendig håndvask', 'Dekk- og felgbehandling', 'Rask innvendig rengjøring', 'Glass utvendig', 'Fjerning av synlige merker på lakk'],
    ikkeInkludert: ['Full lakkrens og polering', 'Dyprens av interiør', 'Reparasjon av skader'],
    merk: 'Bestilles ofte sammen med lakkrens når bilen skal stå ute på plassen over tid.'
  },
  'Mottakskontroll': {
    hva: 'Kontroll av nye biler ved ankomst. Vi dokumenterer avvik før bilen går videre til kunde.',
    varighet: '2 timer',
    inngar: ['Systematisk gjennomgang av lakk, glass og felger', 'Kontroll av interiør', 'Fotodokumentasjon av alle avvik', 'Skriftlig rapport'],
    ikkeInkludert: ['Utbedring av funn, bestilles separat', 'Teknisk kontroll og PDI', 'Rapportering til importør'],
    merk: 'Rapporten er ment som dokumentasjon overfor transportør og importør.'
  },
  'Smart Repair': {
    hva: 'Kostnadseffektive reparasjoner av mindre kosmetiske skader, uten full lakkering.',
    varighet: '1–2 dager',
    inngar: ['Vurdering av hva som kan repareres', 'PDR bulkoppretting', 'Spot Paint på avgrensede lakkskader', 'Felgreparasjon', 'Lyktefornyelse'],
    ikkeInkludert: ['Skader som krever full panellakkering', 'Strukturelle skader', 'Sprukne felger'],
    merk: 'Vi vurderer hver skade individuelt og sier fra på forhånd hvis resultatet ikke blir helt perfekt.'
  },
  'Dekorfjerning': {
    hva: 'Trygg fjerning av folie, dekor og firmalogo. Aktuelt ved leasingretur, videresalg og ny profilering.',
    varighet: '4 timer',
    inngar: ['Oppvarming og fjerning av folie', 'Fjerning av limrester', 'Kontroll av lakken under', 'Lett polering av området'],
    ikkeInkludert: ['Utbedring av lakkskader som avdekkes under folien', 'Ny folie og dekor'],
    merk: 'Lakk under gammel folie kan ha annen glans enn resten av bilen. Vi sier fra hvis polering ikke jevner det ut.'
  },
  'Keramisk coating': {
    hva: 'Hardt, kjemisk bundet beskyttelseslag på lakken. Selges videre til sluttkunde eller legges inn i leveransen.',
    varighet: '2 dager',
    inngar: ['Nedvask, avfetting og clay', 'Lakkrens og polering', 'Coating lagt på panel for panel', 'Kontrollert herding', 'Garantibevis til sluttkunde', 'Dokumentasjon med bilder'],
    ikkeInkludert: ['Beskyttelse mot steinsprut — der trengs PPF', 'Utbedring av dype riper', 'Coating på glass og felger, bestilles separat'],
    merk: 'Coating forsegler lakken slik den er. Er lakken sliten, må den renses først.'
  },
  'Prisgunstig lakkforsegling': {
    hva: 'Enklere lakkbeskyttelse som lett integreres i salgsprosessen. Lavere pris enn coating, kortere levetid.',
    varighet: '1 dag',
    inngar: ['Nedvask og avfetting', 'Clay og lett polering', 'Forsegling i to lag', 'Herding og sluttkontroll'],
    ikkeInkludert: ['Full lakkorreksjon', 'Flerårig garanti'],
    merk: 'Bør fornyes årlig. Passer godt som inngangsprodukt til sluttkunden.'
  },
  'PPF-folie, utsatte områder': {
    hva: 'Lakkfilm på de områdene som tar mest juling. De fleste biler trenger ikke full innpakning.',
    varighet: '1 dag',
    inngar: ['Lastekant og dørterskler', 'Innstegsområder', 'Håndtakssoner', 'Tilpasset kutting etter bilmodell'],
    ikkeInkludert: ['Panser, front og speil, se frontpakke', 'Hele bilen, se full innpakning'],
    merk: 'Rimeligste vei til å hindre de skadene som oftest trekker ned ved innbytte.'
  },
  'PPF-folie, frontpakke': {
    hva: 'Beskyttelse av fronten mot steinsprut. Det coating ikke klarer.',
    varighet: '1–2 dager',
    inngar: ['Panser', 'Front og støtfanger', 'Speilhus', 'Frontlykter'],
    ikkeInkludert: ['Sider, tak og bakparti', 'Coating oppå folien, bestilles separat'],
    merk: 'Selges ofte sammen med coating på resten av bilen.'
  },
  'PPF-folie, full innpakning': {
    hva: 'Lakkfilm på hele bilen. Aktuelt på premiumbiler og biler med lakk som er dyr å reparere.',
    varighet: '3–4 dager',
    inngar: ['Alle lakkerte flater', 'Tilpasset kutting etter bilmodell', 'Kontroll og etterjustering'],
    ikkeInkludert: ['Glass og felger', 'Utbedring av eksisterende lakkskader'],
    merk: 'Vi sier fra når det ikke lønner seg. Utsatte områder alene dekker de fleste behov.'
  },
  'Lakkrens og polering': {
    hva: 'Fjerner industrielt nedfall og retter opp vaskeriper og svirvler. Forarbeidet som avgjør resultatet på alt annet lakkarbeid.',
    varighet: '1 dag',
    inngar: ['Nedvask og avfetting', 'Clay som trekker ut nedfall', 'Lett sliping der det er riper', 'Maskinpolering i to trinn', 'Kontroll i lyshall'],
    ikkeInkludert: ['Dype riper som går gjennom klarlakken', 'Lakkering', 'Beskyttelse — forsegling eller coating bestilles separat'],
    merk: 'Våre lakkrensbehandlinger er satt sammen for mest mulig verdi for pengene. Ønskes ytterligere korrigering, bruker vi mer tid og prisen øker.'
  },
  'Produkter med egen logo': {
    hva: 'Utvalgte bilpleieprodukter med forhandlerens logo, som følger bilen ved utlevering.',
    varighet: 'Etter avtale',
    inngar: ['Valg av produkter fra sortimentet', 'Etiketter med deres logo', 'Levering i avtalt antall'],
    ikkeInkludert: ['Design av logo og etikett', 'Egen produktutvikling'],
    merk: 'Minsteantall og leveringstid avtales. Ta kontakt for pris på volumet deres.'
  },
  'Importbehandling': {
    hva: 'Rustbeskyttelse av nye biler, integrert i leveringsprosessen. Bilen leveres ferdig behandlet til kunden.',
    varighet: '1 dag',
    inngar: ['Behandling av hulrom og understell', 'Dokumentasjon med bilder', 'Garantibevis til sluttkunde'],
    ikkeInkludert: ['Demontering av innerskjermer, se komplett understellsbehandling', 'Del 2-behandling, utføres senere'],
    merk: 'Vi tilbyr både voksbaserte og lanolinbaserte systemer, og anbefaler det som passer kjøretøyet.'
  },
  'Del 2-behandling': {
    hva: 'Oppfølgingsbehandlingen etter importbehandling. Vi utfører den på alle typer importbehandlede biler, uansett hvem som gjorde del 1.',
    varighet: '1 dag',
    inngar: ['Kontroll av eksisterende behandling', 'Etterfylling av hulrom og understell', 'Ny garanti utstedt til bileier', 'Dokumentasjon med bilder'],
    ikkeInkludert: ['Utbedring av rust som allerede har startet', 'Demontering utover det som er nødvendig'],
    merk: 'Vi er ikke låst til ett system, og kan derfor følge opp behandlinger utført av andre.'
  },
  'Komplett understellsbehandling': {
    hva: 'Vår mest omfattende rustbeskyttelse. Innerskjermer og deksler demonteres for full tilgang.',
    varighet: '1–2 dager',
    inngar: ['Demontering av innerskjermer, deksler og lister', 'Vask og tørking av understell', 'Behandling av alle flater og hulrom', 'Montering og sluttkontroll', 'Dokumentasjon med bilder'],
    ikkeInkludert: ['Sveising og reparasjon av gjennomrustede partier', 'Lakkering'],
    merk: 'Utføres på personbiler, varebiler, lastebiler, traktorer og andre nyttekjøretøy.'
  },
  'Fluid Film': {
    hva: 'Lanolinbasert rustbeskyttelse. Tørker aldri helt, kryper inn i skjøter og lukker seg selv hvis laget skades.',
    varighet: '1–2 dager',
    inngar: ['Vask og tørking av understell', 'Behandling av understell og hulrom', 'Dører, terskler og bjelker innvendig'],
    ikkeInkludert: ['Demontering, med mindre komplett behandling er bestilt', 'Fjerning av eksisterende rust'],
    merk: '100 % miljøvennlig, uten løsemidler. Middelet er mykt og kan dryppe de første dagene.'
  },
  'Premium voksbehandling': {
    hva: 'Tradisjonell voksbasert behandling. Vi bruker den der den er riktig løsning for kjøretøyet.',
    varighet: '1–2 dager',
    inngar: ['Vask og tørking av understell', 'Voksbehandling av understell og hulrom', 'Sluttkontroll'],
    ikkeInkludert: ['Fjerning av eksisterende rust', 'Demontering utover det nødvendige'],
    merk: 'Som en av få aktører i Norge tilbyr vi både voks og lanolin, og velger det som passer bilen.'
  },
  'Henting etter avtale': {
    hva: 'Vi henter bilen hos dere når det passer.',
    varighet: 'Etter avtale',
    inngar: ['Henting på avtalt adresse', 'Kvittering ved overtakelse', 'Forsikring under transport'],
    ikkeInkludert: ['Levering tilbake, bestilles separat'],
    merk: 'Henting og levering er en tilleggstjeneste som faktureres separat.'
  },
  'Levering etter avtale': {
    hva: 'Bilen leveres tilbake til ønsket tidspunkt.',
    varighet: 'Etter avtale',
    inngar: ['Levering på avtalt adresse', 'Kvittering ved overlevering'],
    ikkeInkludert: ['Henting, bestilles separat'],
    merk: 'Registrer ønsket tilbakeleveringstidspunkt ved bestilling, så planlegger vi arbeidet deretter.'
  },
  'Tidlig morgenlevering': {
    hva: 'Bilen står klar hos dere før dere åpner.',
    varighet: 'Etter avtale',
    inngar: ['Levering før åpningstid', 'Nøkkelhåndtering etter avtale'],
    ikkeInkludert: ['Henting, bestilles separat'],
    merk: 'Avtales på forhånd, og forutsetter at vi har nøkkelrutine på plass med dere.'
  }
};
