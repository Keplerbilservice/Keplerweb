// Detaljinnhold for bedriftstjenester. Utkast — må kvalitetssikres av Kepler.
export const bdDetaljer = {
  'Keramisk coating': {
    hva: 'Hardt, kjemisk bundet beskyttelseslag på lakken. På en ny firmabil forsegler vi bilen slik den kom fra fabrikken.',
    inngar: ['Nedvask, avfetting og clay', 'Lett polering', 'Coating lagt på panel for panel', 'Kontrollert herding', 'Dokumentasjon med bilder'],
    ikkeInkludert: ['Beskyttelse mot steinsprut — der trengs PPF', 'Coating på dekor og folie', 'Utbedring av eksisterende riper'],
    merk: 'Bilen bør inn så tidlig som mulig. Coating forsegler lakken slik den er den dagen vi legger den på.'
  },
  'Lakkforsegling': {
    hva: 'Enklere lakkbeskyttelse som fornyes årlig. Passer bilparker med høy utskifting, der flere års coating ikke rekker å lønne seg.',
    inngar: ['Nedvask og avfetting', 'Clay og lett polering', 'Forsegling i to lag', 'Herding og sluttkontroll'],
    ikkeInkludert: ['Full lakkorreksjon', 'Flerårig garanti'],
    merk: 'Bør fornyes årlig for å holde effekten.'
  },
  'Fluid Film': {
    hva: 'Lanolinbasert rustbeskyttelse. Tørker aldri helt, kryper inn i skjøter og lukker seg selv hvis laget skades.',
    inngar: ['Vask og tørking av understell', 'Behandling av understell og hulrom', 'Dører, terskler og bjelker innvendig'],
    ikkeInkludert: ['Demontering av innerskjermer, se komplett behandling', 'Fjerning av eksisterende rust'],
    merk: '100 % miljøvennlig, uten løsemidler. Middelet er mykt og kan dryppe de første dagene.'
  },
  'Premium voksbehandling': {
    hva: 'Tradisjonell voksbasert behandling. Vi bruker den der den er riktig løsning for kjøretøyet.',
    inngar: ['Vask og tørking av understell', 'Voksbehandling av understell og hulrom', 'Sluttkontroll'],
    ikkeInkludert: ['Fjerning av eksisterende rust', 'Demontering utover det nødvendige'],
    merk: 'Som en av få aktører i Norge tilbyr vi både voks og lanolin, og velger det som passer kjøretøyet.'
  },
  'Tekstilbeskyttelse': {
    hva: 'Behandling av seter og tekstiler på nye biler. Søl perler av i stedet for å trekke inn.',
    inngar: ['Rens av tekstiler', 'Påføring av beskyttelse', 'Tørketid før bilen tas i bruk'],
    ikkeInkludert: ['Skinnbehandling', 'Fjerning av eksisterende flekker som har satt seg'],
    merk: 'Størst effekt når den legges på nye seter, før første søl.'
  },
  'PPF på utsatte områder': {
    hva: 'Lakkfilm der varebiler tar mest juling. De fleste trenger ikke full innpakning.',
    inngar: ['Lastekant og dørterskler', 'Innstegsområder', 'Håndtakssoner', 'Tilpasset kutting etter modell'],
    ikkeInkludert: ['Panser og front', 'Hele bilen'],
    merk: 'Billigste vei til å unngå akkurat de skadene som gir trekk ved leasingretur.'
  },
  'Vaskeavtale': {
    hva: 'Fast rutine for vask av hele bilparken. Ukentlig, hver 14. dag eller månedlig.',
    inngar: ['Avtalt frekvens og faste tider', 'Fast pris per kjøretøy', 'Prioritert kapasitet', 'Fast kontaktperson', 'Samlefaktura'],
    ikkeInkludert: ['Henting og levering — vi tilbyr ikke dette til bedrifter', 'Innvendig dyprens, bestilles separat'],
    merk: 'Bilene kommer til oss på avtalt tid. Vi holder plassen i kalenderen så dere slipper å bestille hver gang.'
  },
  'Utvendig vask': {
    hva: 'Håndvask med to-bøttemetoden. Ingen børster som sliter på dekor og folie.',
    inngar: ['Forvask med skum', 'Felger og hjulbuer', 'Håndvask ovenfra og ned', 'Tørking med microfiber'],
    ikkeInkludert: ['Innvendig rengjøring', 'Innbrent skitt og flekker som krever lakkrens'],
    merk: 'Automatvask med børster sliter på dekoren. Vi bruker aldri børster.'
  },
  'Utvendig og innvendig vask': {
    hva: 'Full vask ute og inne. Det som gir mest igjen per krone på en servicebil.',
    inngar: ['Utvendig håndvask med felger', 'Støvsuging og avtørking innvendig', 'Glass innvendig og utvendig', 'Dørkarmer og lister'],
    ikkeInkludert: ['Dyprens av tekstiler', 'Rens av lasterom', 'Luktbehandling'],
    merk: 'Passer som standard i en fast avtale.'
  },
  'Innvendig rengjøring': {
    hva: 'Rengjøring av førermiljøet. For mange ansatte er dette arbeidsplassen de tilbringer mest tid i.',
    inngar: ['Støvsuging', 'Rengjøring av interiør', 'Rens av arbeidsområder', 'Oppfriskning av kupé'],
    ikkeInkludert: ['Ekstraksjon av tekstiler, se dyprens', 'Fjerning av innsatte flekker'],
    merk: 'Bestilles ofte fast sammen med utvendig vask.'
  },
  'Dyprens av førermiljø': {
    hva: 'Grundig rens der tekstiler ekstraheres og lukt behandles ved kilden.',
    inngar: ['Alt løst tas ut', 'Tekstiler og seter ekstraheres', 'Plast, lister og himling rengjøres', 'Kontrollert uttørking'],
    ikkeInkludert: ['Utbedring av slitasjeskader', 'Skinnbehandling, bestilles separat'],
    merk: 'Bilen må stå til tørk. Regn med at den ikke er klar samme kveld.'
  },
  'Rens av lasterom': {
    hva: 'Støv, sement og oljesøl fra varerommet. Påvirker inneklimaet i hele bilen.',
    inngar: ['Tømming og støvsuging', 'Vask av gulv og vegger', 'Rens av hyller og innredning'],
    ikkeInkludert: ['Demontering av fastmontert innredning', 'Fjerning av kjemikaliesøl som krever spesialhåndtering'],
    merk: 'Si fra på forhånd hvis det har vært søl av kjemikalier eller drivstoff.'
  },
  'Lakkrens og polering': {
    hva: 'Fjerner industrielt nedfall og retter opp vaskeriper og matthet. Bilen ser flere år yngre ut.',
    inngar: ['Nedvask og avfetting', 'Clay som trekker ut nedfall', 'Maskinpolering i to trinn', 'Kontroll i lyshall'],
    ikkeInkludert: ['Dype riper gjennom klarlakken', 'Beskyttelse — coating eller forsegling bestilles separat'],
    merk: 'Vi kan ikke garantere at alle riper forsvinner. Hvor mye som forbedres avhenger av lakkens tilstand.'
  },
  'Kepler Premium antirust': {
    hva: 'Vårt mest omfattende antirustprogram. Innerskjermer og deksler demonteres for full tilgang.',
    inngar: ['Full demontering av innerskjermer og deksler', 'Vask og tørking av understell', 'Behandling av alle flater og hulrom', 'Montering og dokumentasjon med bilder'],
    ikkeInkludert: ['Sveising og reparasjon av gjennomrustede partier', 'Lakkering'],
    merk: 'Inntil 16 års garanti ved årlig kontroll.'
  },
  'Retting og lakkering': {
    hva: 'Tradisjonell bilopprettingstjeneste for skader som ikke kan repareres med Smart Repair.',
    inngar: ['Vurdering og prisanslag etter befaring', 'Retting av panel', 'Lakkering og innblending', 'Sluttkontroll'],
    ikkeInkludert: ['Strukturelle skader og rammeretting', 'Deler som må bestilles, faktureres separat'],
    merk: 'Prises alltid etter befaring. Vi sier fra om Smart Repair er et rimeligere alternativ.'
  },
  'Vedlikehold av coating': {
    hva: 'Årlig oppfølging så beskyttelsen varer så lenge den skal.',
    inngar: ['Nedvask og kontroll av laget', 'Etterbehandling der det trengs', 'Dokumentasjon'],
    ikkeInkludert: ['Ny coating', 'Lakkrens'],
    merk: 'Kreves for at garantien på coatingen skal løpe.'
  },
  'PDR bulkoppretting': {
    hva: 'Bulken masseres ut fra baksiden uten å røre lakken. Originallakk er verdt penger ved innlevering.',
    inngar: ['Vurdering av om skaden kan tas med PDR', 'Demontering for tilgang', 'Oppretting i flere steg', 'Kontroll i stripelampe'],
    ikkeInkludert: ['Skader der lakken er sprukket', 'Bulker i skarpe brettkanter'],
    merk: 'Vi sier fra på forhånd hvis vi tror resultatet ikke blir helt perfekt.'
  },
  'Spot Paint': {
    hva: 'Lakkering av et avgrenset felt i stedet for hele panelet.',
    inngar: ['Fargemåling mot lakkkode', 'Sliping og oppbygging', 'Base og klarlakk', 'Innpolering mot original lakk'],
    ikkeInkludert: ['Skader over flere paneler', 'Skader i kanter og fals'],
    merk: 'Metallic og perlelakk kan vise minimalt avvik i sterkt sidelys.'
  },
  'Felgreparasjon': {
    hva: 'Kantkjørte felger er blant de vanligste trekkpostene ved leasingretur.',
    inngar: ['Demontering og avmontering av dekk ved behov', 'Sliping og oppbygging', 'Lakkering eller maskinering', 'Balansering og montering'],
    ikkeInkludert: ['Sprukne felger — det er et sikkerhetsspørsmål', 'Nye dekk'],
    merk: 'Diamantkuttede felger krever maskinering og koster mer.'
  },
  'Lyktefornyelse': {
    hva: 'Matte lykter slipes ned og får ny UV-beskyttelse. Bedre lys og et yngre uttrykk.',
    inngar: ['Maskering og vask', 'Sliping i flere trinn', 'Polering', 'Ny UV-forsegling'],
    ikkeInkludert: ['Sprukket plast', 'Kondens inni lykta'],
    merk: 'Uten ny UV-forsegling gulner de igjen i løpet av et år. Den er derfor inkludert.'
  },
  'Løpende skadegjennomgang': {
    hva: 'Vi ser over bilparken jevnlig og sier fra om hva som bør tas nå framfor senere.',
    inngar: ['Systematisk gjennomgang av hvert kjøretøy', 'Fotodokumentasjon av funn', 'Prioritert liste med anslag'],
    ikkeInkludert: ['Utbedring, bestilles ut fra rapporten', 'Teknisk kontroll'],
    merk: 'Passer bilparker på ti kjøretøy og oppover. Avtales som del av bedriftsavtalen.'
  },
  'Dekorfjerning': {
    hva: 'Trygg fjerning av folie, dekor og firmalogo før tilbakelevering eller videresalg.',
    inngar: ['Oppvarming og fjerning av folie', 'Fjerning av limrester', 'Kontroll av lakken under', 'Lett polering av området'],
    ikkeInkludert: ['Utbedring av lakkskader som avdekkes under folien', 'Ny folie og dekor'],
    merk: 'Lakk under gammel folie kan ha annen glans enn resten av bilen. Vi sier fra hvis polering ikke jevner det ut.'
  },
  'Klargjøring for leasingretur': {
    hva: 'Gjennomgang og utbedring før innlevering. Det som koster noen tusen hos oss, koster ofte mangedobbelt i trekk.',
    inngar: ['Gjennomgang mot leasingselskapets krav', 'Prioritert liste med anslag', 'Utbedring av det dere godkjenner', 'Full vask og klargjøring'],
    ikkeInkludert: ['Tekniske reparasjoner', 'Dekk og felger utover reparasjon', 'Garanti mot at leasingselskapet ikke gjør trekk'],
    merk: 'Bestill i god tid før innleveringsdato. Vi trenger tid til å gjøre jobben, ikke bare vurdere den.'
  },
  'Salgsklargjøring': {
    hva: 'Full klargjøring når bilen skal selges videre. Kjøpere bestemmer seg på førsteinntrykket.',
    inngar: ['Utvendig håndvask og lakkrens', 'Polering', 'Innvendig rens', 'Glass og lister', 'Kontroll i lyshall'],
    ikkeInkludert: ['Smart Repair av skader, bestilles separat', 'Fotografering og annonsering'],
    merk: 'Kombineres ofte med dekorfjerning og Smart Repair.'
  },
  'Vi kjøper bilen': {
    hva: 'Skal dere ikke selge selv, kjøper vi bilen direkte.',
    inngar: ['Uforpliktende vurdering', 'Tilbud på stedet', 'Oppgjør og omregistrering'],
    ikkeInkludert: ['Garanti om markedspris — vi kjøper til innbyttepris'],
    merk: 'Kom innom for en uforpliktende vurdering. Vi sier fra hvis dere får mer ved å selge selv.'
  },
  'Vi selger for dere': {
    hva: 'Vi tar hånd om klargjøring, annonsering og salg, så slipper dere jobben.',
    inngar: ['Klargjøring og fotografering', 'Annonsering', 'Visninger og kundekontakt', 'Kontrakt og oppgjør'],
    ikkeInkludert: ['Garanti om salgstid eller pris'],
    merk: 'Provisjon og vilkår avtales på forhånd.'
  }
};
