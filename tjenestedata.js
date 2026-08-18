// Utfyllende informasjon per tjeneste. Utkast — fakta må kvalitetssikres av Kepler.
export const detaljer = {
  'vask-innv-lett': {
    hva: 'En rask vedlikeholdsvask innvendig som gir bilen et renere og triveligere innemiljø — perfekt mellom de mer omfattende bilpleiebehandlingene. Dette er ikke en grundig innvendig rens.',
    varighet: '1 time', garanti: '',
    prosess: ['Lett støvsuging av gulv og seter', 'Støvtørk av dashbord og tilgjengelige flater', 'Vask av gulvmatter', 'Puss av innvendige vinduer'],
    forvent: ['En renere og triveligere kupé', 'Beregnet for normalt vedlikeholdte biler', 'Ikke dyprens av seter eller tepper, ingen flekkfjerning', 'Ikke fjerning av kraftig tilsmussing, hundehår eller sand i store mengder'],
    passer: ['Deg som ønsker en renere kupé uten kostnaden av en full innvendig behandling', 'Biler som holdes rimelig rene fra før'],
    heller: [['Innvendig vask og rens', 'hvis bilen er svært skitten innvendig eller trenger dyprens']]
  },
  'dashboard': {
    hva: 'Keramisk beskyttelse som danner en usynlig barriere på dashboard og interiørdetaljer. Bevarer utseendet og gjør overflatene enklere å holde rene. Dashboardet er en av bilens mest utsatte flater — UV-stråler, varme og daglig bruk kan over tid gi falming, uttørking og sprekker.',
    varighet: '2 timer', garanti: '',
    prosess: ['Grundig rengjøring av dashboard og interiørdetaljer', 'Fjerning av smuss, støv og fettstoffer', 'Påføring av keramisk beskyttelse', 'Kontroll og herding'],
    forvent: ['Effektiv UV-beskyttelse mot falming og misfarging', 'Redusert risiko for uttørking og sprekkdannelse', 'Smuss- og støvavvisende overflate som er enklere å holde ren', 'Et naturlig og fabrikknytt utseende'],
    passer: ['Nye biler som skal beskyttes fra første dag', 'Eldre biler der man vil bevare eksisterende overflater og bremse aldring'],
    heller: [['Skinnbehandling', 'hvis det er skinnseter som trenger rens og næring']]
  },
  'coatlight': {
    hva: 'En prisgunstig keramisk behandling som gir bilen økt glans, enklere vedlikehold og effektiv beskyttelse mot smuss, UV-stråling og daglig slitasje. Fordelene med keramisk lakkbeskyttelse uten å investere i en av våre mest omfattende coatingbehandlinger.',
    varighet: '1 dag', garanti: 'Opptil 1 års beskyttelse. Ingen krav til årlige kontrollvasker eller vedlikeholdsavtale.',
    prosess: ['Grundig utvendig vask og klargjøring', 'Fjerning av overflateforurensning', 'Påføring av keramisk coating', 'Kontroll og herding'],
    forvent: ['Økt glans og vannavvisende overflate', 'Enklere vedlikehold og vask', 'Du vedlikeholder bilen som normalt, uten kontrollvasker', 'På brukte biler kan lakkrens eller polering være nødvendig først — avtales på forhånd'],
    passer: ['Nye biler eller biler med lakk i god stand', 'Deg som vil ha en enkel og rimelig vei til keramisk lakkbeskyttelse'],
    heller: [['Zenith Graphene', 'hvis du vil ha flere års beskyttelse'], ['Zenith lakkforsegling', 'hvis du foretrekker årlig vedlikehold til lavere pris']]
  },
  'pdr': {
    lang: `PDR står for Paintless Dent Removal. Metoden går ut på å presse og massere bulken ut fra baksiden av panelet, i mange små steg, til metallet er tilbake i sin opprinnelige form. Ingen sliping, ingen sparkel, ingen lakk.

Hvorfor det er verdt noe. Originallakken fra fabrikken er bedre enn noe verksted kan legge på i ettertid, og den er verdt penger ved salg og ved leasinginnlevering. En bil med all originallakk i behold vurderes annerledes enn en som er lakkert om. PDR er den eneste metoden som fjerner en bulk uten å røre lakken.

Hvordan vi jobber. Vi tar av innerskjerm, list eller trekk for å komme til baksiden av panelet. Så jobber vi med spesialverktøy mens vi følger overflaten i en stripelampe — lysstripene viser hver eneste ujevnhet lenge før øyet ser den. Bulken presses ut litt om gangen, ofte over flere timer.

Når PDR ikke går. Er lakken sprukket eller ripet ned i bunn, må det lakkeres uansett — da er Spot Paint riktig. Sitter bulken i en skarp brettkant, eller er metallet strukket, får vi den sjelden helt plan. Vi sier fra på forhånd hvis vi tror resultatet ikke blir perfekt, og du bestemmer om du vil ta det.

Vanlige tilfeller. Parkeringsbulker i dører, hagl på panser og tak, og smeller fra handlevogner. Alle tre er typisk PDR-arbeid.`,
    produkter: [
      { navn: 'Kepler Ceramic Wash', kategori: 'Bilsjampo', tekst: 'pH-nøytral sjampo som ikke sliter på lakken rundt det reparerte området.', pris: 'kr. 349,-' }
    ],
    hva: 'PDR står for Paintless Dent Removal. Vi masserer bulken ut fra baksiden av panelet med spesialverktøy, uten å slipe, sparkle eller lakkere. Den originale lakken beholdes.',
    varighet: '1 dag', garanti: 'Vi retter opp igjen kostnadsfritt hvis bulken kommer tilbake innen 12 måneder.',
    prosess: ['Vi vurderer om bulken kan tas med PDR, og gir pris før vi starter', 'Panelet gjøres tilgjengelig innenfra, ofte ved å ta av innerskjerm eller list', 'Bulken masseres ut i mange små steg, kontrollert mot en stripelampe', 'Overflaten kontrolleres i lyshall til den er plan'],
    forvent: ['Bulken blir borte eller nesten borte, avhengig av hvor skarp den er', 'Ingen lakkforskjell, fordi lakken ikke røres', 'Vi sier fra på forhånd hvis vi tror resultatet ikke blir helt perfekt'],
    passer: ['Parkeringsbulker, hagl og dører som har fått en smell', 'Biler der originallakk har verdi, for eksempel ved salg eller leasing'],
    heller: [['Spot Paint', 'hvis lakken er sprukket eller ripet i bunn — da må det lakkeres'], ['Retting og lakkering', 'hvis panelet er strukket eller bulken sitter i en brettkant']]
  },
  'spot': {
    produkter: [
      { navn: 'Kepler Ceramic Wash', kategori: 'Bilsjampo', tekst: 'Skånsom vask den første måneden mens lakken herder ferdig.', pris: 'kr. 349,-' },
      { navn: 'Evershine Quick Detailer', kategori: 'Etterbehandling', tekst: 'Trygg oppfriskning mellom vaskene, uten løsemidler.', pris: 'kr. 299,-' }
    ],
    hva: 'Spot Paint er lakkering av et avgrenset område i stedet for hele panelet. Vi bygger opp skaden, lakkerer feltet og blender lakken ut mot resten av panelet.',
    varighet: '1 dag', garanti: '3 års garanti mot avflassing og fargeavvik.',
    prosess: ['Skaden vurderes og fargen måles mot bilens lakkkode', 'Området slipes ned og bygges opp med grunning', 'Basefarge legges og blendes ut i panelet', 'Klarlakk legges, herdes og poleres inn mot original lakk'],
    forvent: ['Skaden blir borte, og overgangen er ikke synlig på normal avstand', 'Klart rimeligere enn å lakkere hele panelet', 'Fargematch er svært god, men metallic og perlelakk kan vise minimalt avvik i sterkt sidelys'],
    passer: ['Steinsprut, riper og mindre skrammer på ett avgrenset felt', 'Skader som ikke er verdt en full panellakkering'],
    heller: [['PDR bulkoppretting', 'hvis lakken er hel og det bare er en bulk'], ['Retting og lakkering', 'hvis skaden går over flere paneler eller ligger i en kant']]
  },
  'felgrep': {
    produkter: [
      { navn: 'Evershine Felgrens', kategori: 'Felgrens', tekst: 'Syrefri felgrens som ikke angriper den nye lakken.', pris: 'kr. 329,-' }
    ],
    hva: 'Vi reparerer kantkjørte og skadde felger. Både lakkerte og maskinerte felger, med og uten diamantkutt.',
    varighet: '1–2 dager', garanti: '2 års garanti på lakk og feste.',
    prosess: ['Felgen demonteres og dekket tas av ved behov', 'Skaden slipes ned og bygges opp', 'Felgen lakkeres eller maskineres tilbake til original finish', 'Balansering og montering'],
    forvent: ['Felgen ser ut som ny på normal avstand', 'Diamantkuttede felger krever maskinering og koster mer', 'Sprekker i felgen repareres ikke — de er et sikkerhetsspørsmål'],
    passer: ['Kantkjøring mot fortauskant', 'Korrosjon og avflassing på eldre felger'],
    heller: [['Evershine Felg Coating', 'hvis felgen er hel og du bare vil beskytte den']]
  },
  'lykt': {
    produkter: [
      { navn: 'Evershine Quick Detailer', kategori: 'Etterbehandling', tekst: 'Holder UV-forseglingen ren uten å slite på den.', pris: 'kr. 299,-' }
    ],
    hva: 'Matte og gule lykter slipes ned og får ny UV-beskyttelse. Lysutbyttet blir merkbart bedre, og fronten ser yngre ut.',
    varighet: '3 timer', garanti: '2 år mot ny gulning.',
    prosess: ['Lyktene maskeres av og vaskes', 'Det oksiderte laget slipes ned i flere trinn', 'Overflaten poleres klar', 'Ny UV-forsegling legges på og herdes'],
    forvent: ['Lyktene blir klare igjen, og lysbildet blir tydelig sterkere', 'Uten ny UV-forsegling gulner de igjen i løpet av et år — den er derfor inkludert', 'Dype riper i plasten kan bli værende'],
    passer: ['Biler fra rundt åtte år og oppover', 'Salgsklargjøring, der matte lykter trekker mye ned'],
    heller: [['Bytte av lykt', 'hvis plasten er sprukket eller det er kondens inni']]
  },
  'rustsjekk': {
    produkter: [],
    hva: 'En uforpliktende visuell kontroll av understell og kjente problemområder for din bilmodell. Du får en vurdering av hva bilen trenger, og hva den ikke trenger.',
    varighet: '20 minutter', garanti: 'Ingen — dette er en vurdering, ikke en behandling.',
    prosess: ['Bilen settes på løftebukk', 'Vi går over understell, hjulbuer, terskler og kjente svake punkter', 'Du får se det vi ser, og en anbefaling', 'Skriftlig oppsummering med pris hvis noe bør gjøres'],
    forvent: ['Ærlig svar, også når svaret er at bilen ikke trenger noe', 'Ingen bindende bestilling', 'Vi kan ikke se rust inne i lukkede profiler uten å åpne dem'],
    passer: ['Alle biler over fem år', 'Før kjøp av bruktbil'],
    heller: []
  },
  'ff-express': {
    produkter: [
      { navn: 'Kepler Avfetting', kategori: 'Avfetting', tekst: 'Til understell og hjulbuer mellom behandlingene.', pris: 'kr. 379,-' }
    ],
    hva: 'Lanolinbasert rustbeskyttelse sprøytes på understell og inn i hulrom. Fluid Film kryper inn i skjøter og selvheler hvis laget skades.',
    varighet: '1 dag', garanti: 'Anbefalt etterbehandling hvert år. Ingen garantitid på Express.',
    prosess: ['Understellet vaskes og tørkes', 'Hulrom og understell sprøytes med Fluid Film', 'Dører, terskler og bjelker behandles innvendig gjennom eksisterende åpninger', 'Bilen står til middelet har satt seg'],
    forvent: ['Behandlingen stopper videre rustutvikling der den kommer til', 'Middelet er mykt og kan dryppe litt de første dagene', 'Innerskjermer og deksler demonteres ikke — enkelte områder nås derfor ikke'],
    passer: ['Biler fra fem år og oppover', 'Årlig vedlikehold av en bil som allerede er behandlet'],
    heller: [['Fluid Film Pluss', 'hvis bilen aldri har vært behandlet, eller du vil ha garanti'], ['Kepler Premium antirust', 'hvis du vil ha lengst mulig beskyttelse']]
  },
  'ff-pluss': {
    lang: `Fluid Film Pluss er behandlingen vi anbefaler til biler som ikke har vært rustbehandlet før, og til biler du planlegger å ha i mange år.

Om produktet. Fluid Film er lanolinbasert, altså laget av ullfett. Det tørker aldri helt, og det er hele poenget. Fordi laget forblir mykt, kryper det videre inn i skjøter og falser der fukt samler seg, og det lukker seg igjen selv hvis en stein river opp overflaten. En hard, lakkert understellsmasse gjør det motsatte: sprekker den, trekker fukt inn under og ruster i skjul.

Hva Pluss betyr. På Express-behandlingen sprøyter vi det vi kommer til. På Pluss demonterer vi innerskjermer, deksler og lister først. Det er der rust starter på de aller fleste biler: bak innerskjermen, i falsen mellom skjerm og terskel, i bunnen av dørene. Uten demontering kommer man ikke dit.

Hva vi gjør. Understellet vaskes og tørkes grundig — Fluid Film fester ikke på vått metall. Deretter behandles alle flater og alle hulrom, dører og terskler innvendig gjennom eksisterende åpninger. Alt monteres tilbake, og du får bilder av arbeidet.

Om garantien. Inntil 16 år, forutsatt årlig kontroll hos oss. Kontrollen tar en halvtime, og er der for at vi skal fange opp punkter som trenger etterfylling.

De første dagene. Middelet er mykt og kan dryppe litt. Det er normalt, og gir seg. Ikke parker på lys brostein den første uken.`,
    produkter: [
      { navn: 'Kepler Avfetting', kategori: 'Avfetting', tekst: 'Til understell og hjulbuer mellom behandlingene.', pris: 'kr. 379,-' }
    ],
    hva: 'Vår utvidede Fluid Film-behandling. Innerskjermer, deksler og lister demonteres, slik at vi kommer til overalt.',
    varighet: '2 dager', garanti: 'Inntil 16 års garanti ved årlig kontroll.',
    prosess: ['Innerskjermer, deksler og lister demonteres', 'Understell og hulrom vaskes og tørkes grundig', 'Fluid Film sprøytes på alle flater og inn i alle hulrom', 'Alt monteres tilbake, og behandlingen dokumenteres med bilder'],
    forvent: ['Vesentlig bedre dekning enn Express, særlig i hjulbuer og skjørt', 'Dokumentasjon med bilder du får utlevert', 'Krever årlig kontroll for at garantien skal løpe'],
    passer: ['Biler som ikke er behandlet før', 'Biler du planlegger å beholde lenge'],
    heller: [['Fluid Film Express', 'hvis bilen allerede er behandlet og bare skal vedlikeholdes']]
  },
  'premium': {
    produkter: [
      { navn: 'Kepler Avfetting', kategori: 'Avfetting', tekst: 'Til understell og hjulbuer mellom behandlingene.', pris: 'kr. 379,-' }
    ],
    hva: 'Vårt mest omfattende antirustprogram. Kombinerer grundig demontering, rustbehandling av eksisterende angrep og full hulromsbehandling.',
    varighet: '2 dager', garanti: 'Inntil 16 års garanti ved årlig kontroll.',
    prosess: ['Full demontering av innerskjermer, deksler og lister', 'Eksisterende rust børstes ned og behandles', 'Understell og hulrom behandles i flere lag', 'Dokumentasjon med bilder før, under og etter'],
    forvent: ['Den grundigste behandlingen vi tilbyr', 'Eksisterende rust stoppes, men arrene blir værende', 'Gjennomrustede partier må repareres separat — vi sier fra før vi starter'],
    passer: ['Biler med begynnende rust', 'Biler du skal ha i mange år til'],
    heller: [['Fluid Film Pluss', 'hvis bilen er ren for rust og du bare vil forebygge']]
  },
  'vask-ut': {
    produkter: [
      { navn: 'Kepler Ceramic Wash', kategori: 'Bilsjampo', tekst: 'Rik skumdannelse og glidende vask. Skånsom mot coating og voks.', pris: 'kr. 349,-' },
      { navn: 'Evershine Felgrens', kategori: 'Felgrens', tekst: 'Syrefri, løser bremsestøv uten børsting.', pris: 'kr. 329,-' }
    ],
    hva: 'Håndvask utvendig med to-bøttemetoden, inkludert felger og dekk. Ingen børster, ingen roterende maskiner.',
    varighet: '1 time', garanti: 'Ingen.',
    prosess: ['Forvask med skum som løser opp skitt', 'Felger og hjulbuer vaskes separat', 'Håndvask ovenfra og ned med to bøtter', 'Tørkes med microfiber'],
    forvent: ['Ren bil uten nye vaskeriper', 'Gammel innbrent skitt og flekker sitter igjen'],
    passer: ['Vanlig vedlikehold', 'Før visning eller fotografering'],
    heller: [['Utvendig og innvendig vask', 'hvis interiøret også trenger en runde'], ['Lakkrens', 'hvis lakken føles ru etter vask']]
  },
  'vask-ui': {
    produkter: [
      { navn: 'Kepler Ceramic Wash', kategori: 'Bilsjampo', tekst: 'Rik skumdannelse og glidende vask.', pris: 'kr. 349,-' },
      { navn: 'Evershine Interiørrens', kategori: 'Interiør', tekst: 'Til plast, lister og himling. Etterlater matt overflate.', pris: 'kr. 279,-' }
    ],
    hva: 'Full vask ute og inne. Bilen blir ren på alle flater, og innemiljøet blir merkbart friskere.',
    varighet: '3–4 timer', garanti: 'Ingen.',
    prosess: ['Utvendig håndvask med felger og hjulbuer', 'Interiøret støvsuges og tørkes av', 'Glass vaskes innvendig og utvendig', 'Dørkarmer og lister tørkes'],
    forvent: ['Ren bil ute og inne', 'Flekker i tekstiler og lukt krever innvendig rens'],
    passer: ['Vårrengjøring og høstvask', 'Bil som skal lånes bort eller vises fram'],
    heller: [['Innvendig vask og rens', 'hvis det er flekker, lukt eller tydelig slitasje inne']]
  },
  'rens-inn': {
    produkter: [
      { navn: 'Evershine Interiørrens', kategori: 'Interiør', tekst: 'Til plast, lister og himling mellom rensene.', pris: 'kr. 279,-' },
      { navn: 'Evershine Tekstilbeskytter', kategori: 'Interiør', tekst: 'Gjør at søl perler av tekstilene i stedet for å trekke inn.', pris: 'kr. 349,-' }
    ],
    hva: 'Grundig rens av interiøret. Tekstiler ekstraheres, plast og lister rengjøres, og lukt behandles ved kilden.',
    varighet: '1 dag', garanti: 'Ingen.',
    prosess: ['Alt løst tas ut, og bilen støvsuges i bunn', 'Tekstiler og seter behandles og ekstraheres', 'Plast, lister og himling rengjøres', 'Bilen tørkes ut kontrollert'],
    forvent: ['De fleste flekker går ut, og lukt reduseres kraftig eller forsvinner', 'Bilen må stå til tørk — regn med at den ikke er klar samme kveld', 'Gamle, innsatte flekker og brennmerker kan bli værende'],
    passer: ['Bil med barn, hund eller lang fartstid', 'Salgsklargjøring og leasinginnlevering'],
    heller: [['Skinnbehandling', 'hvis setene er skinn og bare trenger rens og næring']]
  },
  'skinn': {
    produkter: [
      { navn: 'Evershine Skinnrens', kategori: 'Interiør', tekst: 'Mild rens til narven, uten å tørke ut skinnet.', pris: 'kr. 329,-' },
      { navn: 'Evershine Skinnbalsam', kategori: 'Interiør', tekst: 'Næring som holder skinnet mykt mellom behandlingene.', pris: 'kr. 379,-' }
    ],
    hva: 'Rens og næring til skinnet. Vi tar ut skitt som ligger i narven, og legger tilbake fett så skinnet holder seg mykt.',
    varighet: '2 timer', garanti: 'Ingen.',
    prosess: ['Skinnet rengjøres med pH-tilpasset rens', 'Narven børstes forsiktig ren', 'Næring legges på og trekkes inn', 'Overflaten tørkes av og mattes ned'],
    forvent: ['Skinnet blir mykere og mindre blankt', 'Fargeslitasje og sprekker rettes ikke opp av dette — det er reparasjon'],
    passer: ['Skinnseter fra tre år og oppover', 'Lyse skinnseter som er blitt grå i sitteflaten'],
    heller: [['Innvendig vask og rens', 'hvis hele interiøret trenger en runde']]
  },
  'lakkrens': {
    produkter: [
      { navn: 'Kepler Ceramic Wash', kategori: 'Bilsjampo', tekst: 'Riktig sjampo etter lakkrens, uten voks som legger seg i veien.', pris: 'kr. 349,-' }
    ],
    hva: 'Lakkrens fjerner industrielt nedfall og retter opp riper og svirvler i lakken. Dette er forarbeidet som avgjør hvor bra en forsegling ser ut.',
    varighet: '1 dag', garanti: 'Ingen — resultatet vurderes sammen med deg før forsegling.',
    prosess: ['Bilen vaskes ned og avfettes', 'Clay trekker industrielt nedfall ut av lakken', 'Lakken slipes lett der det er riper', 'Maskinpolering i to trinn, kontrollert i lyshall'],
    forvent: ['Lakken blir merkbart dypere og glattere', 'De fleste svirvler forsvinner, dype riper reduseres', 'På mørk lakk er forskjellen størst — der ser man alt'],
    passer: ['Alle biler før forsegling eller coating', 'Mørke biler med matt, sliten lakk'],
    heller: []
  },
  'forsegling': {
    lang: `Kepler Lakkforsegling er programmet vi anbefaler til de fleste bruksbiler. Det er ikke det dyreste vi har, og det er med vilje: for en bil som kjøres daglig, står ute og møter norsk vinter, er årlig vedlikehold av en god forsegling en bedre investering enn en dyr coating som ikke følges opp.

Slik virker det. Lakken på bilen din er porøs på mikronivå. Veisalt, industrielt nedfall, fuglemøkk og asfaltstøv legger seg ikke bare oppå, de trekker inn. Over tid gjør det lakken matt og gjør at skitt fester seg lettere hver gang. En forsegling legger et offerlag over lakken. Skitten fester seg til forseglingen i stedet for til lakken, og vaskes bort med den.

Hva vi gjør i praksis. Bilen vaskes ned og avfettes, og felger og hjulhus tas separat. Deretter går vi over lakken med clay, en leiremasse som trekker ut partiklene som sitter fast i overflaten. Du kjenner forskjellen med håndflaten etterpå: lakken går fra ru som fint sandpapir til helt glatt. Så følger en lett polering som tar bort de groveste svirvlene, før forseglingen legges på i to lag og får herde.

Om resultatet. Bilen blir merkbart lettere å vaske, og glansen holder seg gjennom vinteren. Du får ikke den samme dybden som en full coating gir på en lakk som er korrigert først. Det er den ærlige forskjellen mellom dette og Pure Grade.

Vedlikehold. Vask med pH-nøytral sjampo. Automatvask med børster sliter på forseglingen og korter ned levetiden betydelig. Behandlingen bør fornyes årlig.`,
    produkter: [
      { navn: 'Kepler Ceramic Wash', kategori: 'Bilsjampo', tekst: 'Vedlikeholder forseglingen i stedet for å vaske den bort.', pris: 'kr. 349,-' },
      { navn: 'Evershine Quick Detailer', kategori: 'Etterbehandling', tekst: 'Frisker opp glansen mellom vaskene.', pris: 'kr. 299,-' }
    ],
    hva: 'Vårt prisgunstige alternativ. Lakken renses og forsegles, slik at den er beskyttet gjennom et helt år med salt, vær og nedfall.',
    varighet: '1 dag', garanti: '12 måneders garanti på beskyttelsen.',
    prosess: ['Nedvask og avfetting', 'Clay og lett polering', 'Forseglingen legges på i to lag', 'Herding og sluttkontroll i lyshall'],
    forvent: ['Bilen blir enklere å vaske, og skitt sitter dårligere fast', 'Tydelig glans, men ikke den dybden en full coating gir', 'Bør gjentas årlig'],
    passer: ['Bruksbil du vil ha beskyttet uten å bruke mye', 'Årlig vedlikehold'],
    heller: [['Zenith Graphene', 'hvis du vil ha flere års beskyttelse i én omgang'], ['Zenith Pure Grade', 'hvis du vil ha maksimal finish']]
  },
  'pure': {
    produkter: [
      { navn: 'Kepler Ceramic Wash', kategori: 'Bilsjampo', tekst: 'Anbefalt sjampo for å bevare coatingen.', pris: 'kr. 349,-' },
      { navn: 'Evershine Quick Detailer', kategori: 'Etterbehandling', tekst: 'Trygg mellom vaskene, uten voks som demper coatingen.', pris: 'kr. 299,-' },
      { navn: 'Evershine Felgrens', kategori: 'Felgrens', tekst: 'Syrefri, trygg på coatede felger.', pris: 'kr. 329,-' }
    ],
    hva: 'Vårt mest omfattende program for lakk. Full lakkrens og korreksjon, etterfulgt av coating i flere lag.',
    varighet: '2 dager', garanti: 'Inntil 5 års garanti ved årlig kontroll.',
    prosess: ['Full nedvask, avfetting og clay', 'Flertrinns lakkorreksjon i lyshall', 'Coating legges i flere lag', 'Kontrollert herding og dokumentasjon med bilder'],
    forvent: ['Det beste resultatet vi kan levere på lakk', 'Lakken blir dypere enn den var da bilen var ny', 'Krever årlig kontroll for at garantien skal løpe'],
    passer: ['Nye biler og biler med lakk i god stand', 'Eiere som vil ha maksimal finish'],
    heller: [['Zenith Graphene', 'hvis du vil ha beskyttelsen, men ikke full korreksjon']]
  },
  'coating': {
    lang: `Graphene Keramisk Coating er et hardt, kjemisk bundet lag som legger seg på lakken og blir der i flere år. Forskjellen fra en forsegling er at coatingen ikke ligger oppå som et offerlag, men binder seg til lakken.

Hva grafen tilfører. Grafen er et karbonmateriale som gjør laget mer fleksibelt og bedre til å fordele varme. I praksis betyr det færre vannflekker på varm lakk, som er den vanligste ulempen med tradisjonell keramisk coating på mørke biler.

Hva du merker. Vann perler av og tar med seg det meste av støvet. Bilen holder seg ren merkbart lenger mellom vaskene, og når du vasker, går skitten av med mindre mekanisk arbeid. Det siste er viktigere enn folk tror: de fleste riper i lakken kommer fra vask, ikke fra veien.

Hva coating ikke gjør. Den stopper ikke steinsprut. Et coatinglag er noen få mikron tykt, og en stein i 80 km/t bryr seg ikke om det. Skal du beskytte fronten mot steinsprut, er det lakkfilm du trenger. Coating hindrer heller ikke riper fra grener eller nøkler.

Forarbeidet avgjør alt. Coating forsegler lakken slik den er den dagen vi legger den på. Er lakken matt og full av svirvler, låser vi det inne i flere år. Derfor anbefaler vi lakkrens på alle biler som ikke er så godt som nye.

Vedlikehold. pH-nøytral sjampo, ingen voks oppå, og årlig kontroll hos oss for at garantien skal løpe.`,
    produkter: [
      { navn: 'Kepler Ceramic Wash', kategori: 'Bilsjampo', tekst: 'Anbefalt sjampo for å bevare coatingen.', pris: 'kr. 349,-' },
      { navn: 'Evershine Quick Detailer', kategori: 'Etterbehandling', tekst: 'Frisker opp vannavvisningen mellom vaskene.', pris: 'kr. 299,-' }
    ],
    hva: 'Keramisk coating med grafen. Høyt innhold av virkestoffer gir et hardt, kjemisk bundet lag som varer i flere år.',
    varighet: '2 dager', garanti: 'Inntil 3 års garanti ved årlig kontroll.',
    prosess: ['Nedvask, avfetting og clay', 'Lakkrens og polering', 'Coating legges på panel for panel', 'Herding under kontrollerte forhold'],
    forvent: ['Vann perler av, og bilen holder seg ren lenger', 'Vesentlig færre vaskeriper over tid', 'Coating hindrer ikke steinsprut — det gjør lakkfilm'],
    passer: ['Biler under to–tre år', 'Eiere som vasker bilen selv og vil ha det enkelt'],
    heller: [['Zenith lakkforsegling', 'hvis budsjettet er stramt eller bilen skal selges snart'], ['Zenith Pure Grade', 'hvis lakken trenger korreksjon først']]
  },
  'felgcoat': {
    produkter: [
      { navn: 'Evershine Felgrens', kategori: 'Felgrens', tekst: 'Syrefri, trygg på coatede felger.', pris: 'kr. 329,-' }
    ],
    hva: 'Coating på felgene. Bremsestøv og veiskitt fester seg dårligere, og felgene blir vesentlig enklere å holde rene.',
    varighet: '4 timer', garanti: 'Inntil 2 år.',
    prosess: ['Felgene vaskes grundig på bilen', 'Bremsestøv og flyverust løses ut', 'Coating legges på felgens synlige flater', 'Herding før bilen leveres ut'],
    forvent: ['Felgene vaskes rene med sjampo alene', 'Innbrent bremsestøv fra før går ikke bort av coatingen'],
    passer: ['Nye eller nylig rensede felger', 'Biler som bruker mye bremser i bytrafikk'],
    heller: [['Felgreparasjon', 'hvis felgene er kantkjørte eller flasser']]
  },
  'glasscoat': {
    produkter: [
      { navn: 'Evershine Glassrens', kategori: 'Glass', tekst: 'Fjerner film uten å slite på coatingen.', pris: 'kr. 279,-' }
    ],
    hva: 'Vannavvisende behandling på frontruten. Regn perler av i fart, og du bruker vindusviskerne mindre.',
    varighet: '2 timer', garanti: '6–12 måneder avhengig av kjørelengde.',
    prosess: ['Ruten renses for film og nedfall', 'Glasset avfettes', 'Coating legges på og herdes', 'Overskudd poleres av'],
    forvent: ['Merkbart bedre sikt i regn over 60 km/t', 'Effekten avtar gradvis og bør fornyes årlig', 'Viskerblad i dårlig stand sliter av behandlingen fortere'],
    passer: ['Alle som kjører mye i mørke og regn', 'Vinterkjøring'],
    heller: []
  },
  'solfilm': {
    produkter: [
      { navn: 'Evershine Glassrens', kategori: 'Glass', tekst: 'Ammoniakkfri — ammoniakk ødelegger solfilm.', pris: 'kr. 279,-' }
    ],
    hva: 'Solfilm på sideruter og bakrute. Reduserer varme og innsyn, og beskytter interiøret mot soling.',
    varighet: '4 timer', garanti: '10 år mot bobler, falming og løsning.',
    prosess: ['Rutene rengjøres og avfettes', 'Filmen skjæres til etter bilmodell', 'Filmen legges på innsiden og krympes til', 'Herdetid før rutene kan brukes'],
    forvent: ['Merkbart kjøligere kupé om sommeren', 'Rutene kan ikke rulles ned de første dagene', 'Frontruten kan ikke tildekkes — det er ikke lov'],
    passer: ['Biler med lyst interiør som bleknes', 'Familiebiler med barn i baksetet'],
    heller: []
  }
};
