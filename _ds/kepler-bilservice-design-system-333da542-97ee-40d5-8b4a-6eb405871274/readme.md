# Kepler Bilservice — Design System

Kepler Bilservice AS is a Norwegian car care workshop at Sem in Tønsberg (Vestfold), founded 2004. It does cosmetic reconditioning and paint protection at a level the company positions as best in Norway: paint sealing and ceramic/graphene coating, rust protection (antirust/underbody), Smart Repair (PDR, spot paint, wheel repair), interior cleaning and leather care, film and foil (sun film, XPEL PPF), sales preparation, leasing hand-in, and car sales. Kepler develops its own coating brand, **Evershine**, and is a member of Norges Bilbransjeforbund (NBF).

A defining physical detail of the business, given by the client: the customer reception has a **glass wall so customers can watch their cars being worked on**. Transparency of craft is the brand idea, and it should show up in the design — open sightlines, real photography of work in progress, before/after, documented results and guarantees.

Everything is in **Norwegian bokmål**. Prices are in NOK, written `fra kr. 3.990,-`.

## Sources this system was built from

| Source | What was taken from it |
| --- | --- |
| `uploads/brand_files-…pdf` ("Logo-20ar.pdf") — the 20-year anniversary logo, supplied by the client | The real logo vectors and every brand colour. Paths and gradient stops were extracted programmatically from the PDF into `assets/logo-kepler-20.svg`, `assets/logo-kepler-wordmark.svg`, `assets/kepler-k.svg`. |
| https://www.kepler.no/ (public site, WordPress) | Product and service inventory, real product copy, price format, navigation structure, footer content, icon system (Google Material Symbols), booking flow (Norbits `kundeweb.norbits.no`). |
| Client brief (chat) | Business positioning, the glass-wall reception detail, and the confirmed primary red **#cc0000**. |
| 10 print PDFs supplied by the client — business card (`bc-kepler-truls`), A5 customer brochure, employee guide (`Kepler-ansattveiledning`), certification course, order forms for Kepler and Bilia, appointment reminder, rubber stamp, floor mat, mug | The real neutral palette (see below), the print colour census, and the layout conventions of the printed brand. Text is outlined in most of these files, so the typeface could not be identified from them. |
| 20 photographs supplied by the client | The whole photography direction, and every image now used in the UI kits (`assets/photos/`). |

**Not available:** no codebase, no Figma file, no brand guidelines document, no font files, and no site stylesheet (the site's CSS could not be downloaded into this project). Type, spacing, elevation and motion below are therefore a *system built to fit the logo, the print material and the site's content*, not a transcription of an existing spec. Flagged substitutions are listed under "Open questions" at the end.

**The wordmark is bespoke lettering, not a typeface.** The client confirms the KEPLER letterforms were drawn by hand, so no font file exists and none can be bought. Never set the brand name in a typeface — always place `assets/logo-kepler-wordmark.svg`.

---

## Content fundamentals

**Language.** Norwegian bokmål throughout, including diacritics (æ ø å) — every font in the system must carry them. English is used only for adopted product/technique names: *Smart Repair, Spot Paint, PDR, Graphene, Coating, Soft Wax, Hard Wax, Touch-up, Express, Pluss*.

**Person.** "Vi" for Kepler, "du/din" for the customer. The customer's car is always *"bilen din"* — the possessive is doing emotional work. Never "man", rarely "kunden".

> "Hos Kepler sørger vi for at bilen din holder seg i god stand, varer lenger og koster deg mindre over tid."
> "Uansett hvilken tjeneste du trenger, kan du være trygg på at bilen er i de beste hender."

**Tone.** Plain, practical, reassuring, lightly proud. It is a workshop that explains its craft, not a luxury brand. Sentences are short and declarative and usually make a promise that can be checked: *"Kompetanse gir trygghet."* / *"Prisgaranti og dokumenterte resultater."* / *"Inntil 16 års garanti!"* Claims are always paired with the evidence — years of experience (20+ / "over 60 års samlet erfaring"), guarantee lengths, certifications, price guarantee.

**Value framing.** Maintenance is framed as economics, not vanity: *"Vedlikehold lønner seg – unngå unødvendige kostnader!"*, *"unngå dyre reparasjoner senere"*. Lead with what it saves the customer, then with how it looks.

**Structure of a service.** Every service page follows: what it is → what we actually do (the steps, in order: nedvask → clay-sliping → polering → forsegling) → what you get → what it costs → guarantee footnote. Copy names the method, the product and the duration. This concreteness *is* the brand voice — do not smooth it into marketing abstraction.

**Casing.** Sentence case for headlines and body. UPPERCASE only for the wordmark, eyebrows/category labels (`KEPLER BILSERVICE AS`, `SMART REPAIR`, `LANOLINBASERT RUSTBESKYTTELSE`), and small nav/label caps. Never all-caps body copy.

**Punctuation.** Exclamation marks are used, sparingly and sincerely, at the end of an offer or a promise: *"Perfekt beskyttelse for deg som ønsker et godt og rimelig alternativ!"* Em dashes are rare; the site uses the short dash with spaces (*" – "*). Price lines end with `,-`.

**CTA vocabulary — use these exact strings.** `Bestill time` (primary, everywhere), `Les mer`, `Se våre tjenester`, `Gå direkte til`, `Online booking`, `Ring 33 33 44 00`, `Gratis rustsjekk`, `Kampanje pris!`, `Spar penger nå!`, `Vis alle tjenester`.

**Social proof.** Real customer reviews in the customer's own words, signed with first name + surname initial ("Egil Normann P."). Do not polish them.

**Emoji.** Never. Not in UI, not in marketing, not in email.

---

## Visual foundations

### The mark

The logo is a heavy, wide, squared industrial grotesque wordmark, **KEPLER**, in a left-to-right red gradient (`#e22614 → #b91d10`). The K's counter is cut as a hard chevron — that chevron, isolated, is the standalone **K mark** (`assets/kepler-k.svg`), used as favicon and app icon. The anniversary lockup sets a large **chrome "20"** behind the wordmark with `2004 - 2024` beneath in chrome. Chrome is a real, multi-stop metallic ramp (`--grad-chrome`), not a flat grey: it reads as polished paint and is the second brand material after red.

Clear space: at least the height of the K on all sides. Minimum wordmark width 120px. Place on white, on `--ink-800`/`--ink-900`, or on a darkened photograph — never on red, never on a busy mid-tone image without a scrim.

### Colour

**Primary red is `#cc0000`** (`--red-500`), confirmed by the client. The wordmark's own gradient runs brighter (`#e22614 → #b91d10`) and the print material uses `#e52c1a`; both are kept as `--grad-red` and `--red-450` for the mark itself, but UI red is `#cc0000`. The client notes the red is not locked, so treat `--red-500` as the one place to change it.

**The neutral ramp is sampled from the printed material, not invented.** `--ink-700` `#2c2e35` is by a wide margin the most-used colour across the brochure, business card and forms — it is Kepler's real dark, and it is a cool charcoal rather than black. `--ink-500` `#595b61`, `--ink-300` `#9fa0a3`, `--ink-100` `#e2e2e3` and `--ink-050` `#f2f2f2` come from the same census.

Red is the accent, not the field. It appears on primary buttons, price/campaign flags, the wordmark, active states and rules — never as a large background wash. Large surfaces are white, `--ink-050`, or the dark charcoals. The dark surfaces carry photography of cars and the workshop; white carries service listings, prices and forms. Two background colours per composition, maximum.

Chrome greys are decorative only (the "20", section numerals, dividers over dark). Semantic green/amber/blue exist for booking/job status in the app surfaces and appear nowhere in marketing.

### Type

`Archivo` for display and UI, `Barlow` for body, `IBM Plex Mono` for order numbers, registration plates and prices in tables. Headlines are set bold-to-black, tight (`--ls-display: -0.02em`), sentence case, and are allowed to run two lines. Eyebrows are 12px, `--fw-bold`, `letter-spacing: .14em`, uppercase, in `--text-muted` on light or `--red-500` when it labels a campaign. Body is 17px/1.65 with a 65-character measure. Prices use the display family at black weight — a price is a headline.

### Layout

1240px max container, 24px gutter, 12-column grid; 80px vertical section rhythm (112px for hero and closing sections). Service listings are a card grid, 3-up desktop / 2-up tablet / 1-up mobile. Full-bleed dark photographic bands separate light content sections. The header is sticky, 72px, white with a hairline bottom border, going to `--ink-900` when overlaying a hero image. A persistent `Bestill time` button sits at the top right on every surface.

### Cards

White, `--radius-lg` (10px), 1px `--border-subtle`, `--shadow-sm`. On hover the border goes `--border-default`, shadow to `--shadow-md`, and the card lifts 2px. Service cards put the image at the top with square corners on a `--radius-lg` clip, the campaign flag over the image top-left, the category eyebrow above the title, the price line at the bottom in display black. Dark cards invert: `--ink-700` fill, `--border-dark` border, no shadow.

### Photography

Kepler's own library (20 images, in `assets/photos/`) sets the direction, and it is **warm industrial, not cold and glossy**. Recurring elements, in order of how often they appear:

- **Red brick, white-painted KEPLER wall sign, natural daylight.** The workshop is a converted brick building; the brick is a brand surface in its own right.
- **Tan leather lounge chairs, terrazzo floor, pendant lights** in the customer reception — the space is a lounge, not a waiting room, and it sits behind the glass wall with cars visible through it.
- **Staff at work, faces included.** Dark navy Kepler polos with the wordmark on the back; technicians in white coveralls under lifts. The people are the proof, not the props.
- **Colour and light:** neutral to warm, natural, unfiltered. No grain, no teal-orange grade, no black-and-white. Blacks are the charcoal `#2c2e35`, not crushed.
- **Framing:** medium and wide, whole cars and whole rooms. Hands-on details (foam, polisher, spray gun) appear at medium distance rather than as macro shots.

Do not commission or select cold, blue-graded, "premium detailing" stock — it is the opposite of what this workshop looks like. Before/after pairs are the strongest asset the brand has: use a 50/50 split with a thin chrome divider. Images sit at `--radius-md`; hero images are full-bleed with no radius. Over any image carrying text, use `--protection-gradient` (bottom-up dark scrim), never a flat opacity overlay and never a blur.

### Borders, rules, shadows

Hairlines are 1px `--border-subtle`. Section dividers over dark are 1px `rgba(255,255,255,.12)`. A 3px red rule (`--rule-w`) under a section eyebrow is the one decorative flourish. Shadows are soft, neutral-black and low-spread; no coloured shadows except `--shadow-red` under a primary CTA on dark. No inner shadows except `--inset-chrome` on chrome-filled surfaces. Never a coloured left border on a card.

### Radii

4px for controls, 6px for images and inputs, 10px for cards, 16px for modals and sheets, pill for badges/tags/filter chips. Nothing is fully rounded except pills and the avatar in the app surfaces. Sharp 0px corners are used for full-bleed bands and for the campaign flag, which is a rectangle, deliberately.

### Transparency and blur

Used in exactly two places: the sticky header over a hero (`rgba(13,15,18,.72)` + `backdrop-filter: blur(12px)`), and modal scrims (`--overlay-scrim`). Nowhere else — no frosted cards, no glassmorphism.

### Motion

Fast and mechanical. `--dur-fast` (140ms) for hover and colour, `--dur-base` (220ms) for panels and accordions, `--dur-reveal` (600ms) for scroll-in. Easing is `--ease-standard` for state and `--ease-out` for entrances. Entrances are a 12px rise + fade; never a bounce, never a spring, never a slide from off-screen. Reduced motion removes the rise and keeps the fade.

### States

- **Hover** — buttons darken one step (`--red-500 → --red-600`); ghost/tertiary get a `--ink-050` fill; cards lift 2px and deepen the shadow; links get a 3px-offset underline. Never opacity-based hover.
- **Press** — darken a second step (`--red-800`) plus `scale(var(--press-scale))` (0.985). No shadow on press.
- **Focus** — 2px solid `--red-500` ring, 2px offset, on every interactive element. Focus is never removed.
- **Disabled** — `--ink-100` fill, `--ink-300` text, no border change, `cursor: not-allowed`. No opacity fade.
- **Loading** — inline 2px chrome-to-red spinner or a `--ink-100` skeleton block; never a full-page spinner.

---

## Iconography

**Kepler uses Google Material Symbols Outlined.** This is verifiable from the live site, whose icon files are named e.g. `chat_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg` and `percent_discount_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg` — Google's own export naming. The system therefore loads the Material Symbols Outlined variable font from the Google Fonts CDN at the site's own axis settings: **opsz 24, wght 400, FILL 0, GRAD 0**, `--ink-900` (`1F1F1F` on the site) or `currentColor`.

```html
<span class="material-symbols-outlined">chat</span>
```

- Nominal size 24px; 20px inside compact controls; 32–40px for the category tiles on the service overview. Stroke weight never changes with size — bump `wght` only for very small sizes.
- Icons are always paired with a label in navigation and service tiles. Icon-only buttons are limited to close, search, menu, back, and phone, and always carry an `aria-label`.
- Icons in service tiles sit above the label, `--ink-900` on light, red only when the tile is active.
- **The site also uses raster service icons** (`icon-bilpleie.png`, `icon-antirust.png`) and third-party brand marks (Fluid Film™, XPEL, Klarna, NBF). Those files could not be downloaded into this project — see "Open questions". Where a partner mark is required, this system renders the partner name in type and leaves a labelled slot rather than approximating the mark.
- **Emoji are never used as icons.** Unicode symbols are used only for the arrow in `Bilpleie >` and the price dash `,-`.
- **No hand-drawn SVG icons.** Anything not in Material Symbols is a gap to be filled with a real asset, not an approximation.

---

## Open questions / substitutions to confirm

1. **Fonts are substituted.** No Kepler font files were supplied. `Archivo` (display/UI) and `Barlow` (body) are Google Fonts chosen to sit close to the wide squared grotesque of the wordmark; `IBM Plex Mono` for numerics. Please send the real webfonts (or the names) and this can be swapped in one file, `tokens/fonts.css`.
2. **No photography, no partner logos, no service icons.** Nothing could be pulled off kepler.no into this project. Every image slot in the UI kits is a labelled placeholder. Send a photo library and the Fluid Film / XPEL / Evershine / Klarna / NBF marks.
3. **No Evershine sub-brand assets.** Evershine is treated here as a product name in Kepler type, not as its own identity.
4. **Neutrals, spacing, elevation and motion are proposed, not transcribed** — they were built to fit the logo and the site's content. Confirm or correct.


---

## Index

### Root
- `styles.css` — the single entry point consumers link. `@import` list only.
- `readme.md` — this file.
- `SKILL.md` — Agent Skills wrapper, for using this system in Claude Code.
- `thumbnail.html` — the design system's tile.
- `assets/` — `logo-kepler-wordmark.svg`, `kepler-k.svg`, `logo-kepler-20.svg` (all extracted from the client's own logo PDF), and `photos/` — 20 client photographs, named by subject.

### Tokens (`tokens/`)
`fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `radius.css` · `elevation.css` · `motion.css` · `base.css`

### Guidelines (`guidelines/`)
23 specimen cards covering Brand (incl. two photography cards) (wordmark, K mark, anniversary lockup, gradients, Material Symbols), Colors (red, chrome, ink, status, semantic aliases, protection gradient), Type (families, display scale, body scale, eyebrows, prices) and Spacing (scale, layout rhythm, radii, elevation, motion).

### Components

**`components/core/`** — **Button**, **IconButton**, **Icon**, **Logo**, **Card**, **Badge**, **Tag**
**`components/forms/`** — **Input**, **Select**, **Checkbox**, **Radio**, **Switch**
**`components/feedback/`** — **Dialog**, **Toast**, **Tooltip**
**`components/navigation/`** — **Tabs**
**`components/brand/`** — **SectionHeading**, **PriceTag**, **ServiceCard**

Each component ships `<Name>.jsx`, `<Name>.d.ts` (props contract) and `<Name>.prompt.md` (what & when, usage, variants). Each directory has one `@dsCard` HTML showing its states.

**Intentional additions.** No component library or Figma file was supplied, so the inventory above is the standard set sized to Kepler's needs. Four are brand-specific rather than generic: **Icon** (wrapper over Material Symbols, so the axis settings can't drift), **Logo** (so the real artwork is used instead of retyped text), **PriceTag** (the NOK "fra kr. 7.590,- 3.990,-" format is a fixed brand convention) and **ServiceCard** (the repeating unit of kepler.no).

### UI kits (`ui_kits/`)
- `website/` — the marketing site: home, services, service detail, booking. *Recreation.*
- `app/` — customer mobile app: login, live job status, booking flow. *Proposal.*
- `dashboard/` — internal workshop job board and job detail. *Proposal.*
- `docs/` — help-centre article layout. *Proposal.*

Each kit has its own `README.md` stating what is recreated versus proposed.

### Templates (`templates/`)
- `presentation/` — 16:9 deck: title, agenda, service grid, protection comparison, quote, closing.
- `service-report/` — printable customer treatment report with running header/footer.
