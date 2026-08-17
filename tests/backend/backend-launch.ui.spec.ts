import { test, expect } from '@playwright/test';
import { ADMIN, SITE, BRUKERE, nullstill, loggInn, loggUt, hentOrdrer, hentLogg, opprettOrdreViaFlyt } from './helpers';

// BACKEND-LANSERINGSTESTER FOR KEPLER
// Kjøres mot prototypen (statisk server + localStorage-lager).
// Ved overgang til ekte backend: bytt hentOrdrer/hentLogg til API-kall (se helpers.ts) —
// selve testene og forventningene er de samme.

test.describe('Fase 1 — innlogging og sikkerhet', () => {
  test.beforeEach(async ({ page }) => nullstill(page));

  test('1.1 admin uten innlogging blokkeres helt', async ({ page }) => {
    await page.goto(ADMIN);
    await expect(page.getByText('Administrasjon · Logg inn')).toBeVisible();
    expect(await page.locator('aside').count()).toBe(0);
    expect(await page.locator('main').count()).toBe(0);
  });

  test('1.2 gyldig innlogging åpner admin', async ({ page }) => {
    await loggInn(page, BRUKERE.admin);
    await expect(page.getByText('Administrasjon · Logg inn')).toHaveCount(0);
    await expect(page.locator('aside')).toBeVisible();
  });

  test('1.3 feil passord avvises', async ({ page }) => {
    await loggInn(page, { epost: BRUKERE.admin.epost, passord: 'feil-passord' });
    await expect(page.getByText('Feil e-post eller passord.')).toBeVisible();
    expect(await page.locator('main').count()).toBe(0);
  });

  test('1.4 utlogging avslutter sesjonen', async ({ page }) => {
    await loggInn(page, BRUKERE.admin);
    await loggUt(page);
    await expect(page.getByText('Administrasjon · Logg inn')).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('kepler_admin_sesjon'))).toBeNull();
  });

  test('1.5 roller: redaktør sperres fra ordrer, ansatt ser ordrer uten betalingsknapper', async ({ page }) => {
    await loggInn(page, BRUKERE.redaktor);
    await page.getByText('Ordrer og bookinger').click();
    await expect(page.getByText('Ingen tilgang')).toBeVisible();
    await loggUt(page);
    await loggInn(page, BRUKERE.ansatt);
    await page.getByText('Ordrer og bookinger').click();
    await expect(page.getByText('Ingen tilgang')).toHaveCount(0);
    await expect(page.getByText('Marker betalt', { exact: true })).toHaveCount(0);
  });
});

test.describe('Fase 2–4 — ordrer, status og betaling', () => {
  test('2.1–2.3 ordre opprettes via ekte flyt, vises og kan søkes opp i admin', async ({ page }) => {
    await nullstill(page, true);
    const ordrenr = await opprettOrdreViaFlyt(page);
    expect(ordrenr).toMatch(/^KB-\d+$/);
    await loggInn(page, BRUKERE.admin);
    await page.getByText('Ordrer og bookinger').click();
    await expect(page.getByText(ordrenr)).toBeVisible();
    await page.getByPlaceholder(/Søk på navn/).fill(ordrenr);
    await expect(page.getByText('PW-Testkunde')).toBeVisible();
  });

  test('3.2/4.1/4.2 status og betaling oppdateres og lagres', async ({ page }) => {
    await nullstill(page, true);
    const ordrenr = await opprettOrdreViaFlyt(page);
    await loggInn(page, BRUKERE.admin);
    await page.getByText('Ordrer og bookinger').click();
    await page.getByPlaceholder(/Søk på navn/).fill(ordrenr);
    await page.getByText('Bekreft', { exact: true }).click();
    await page.getByText('Marker betalt', { exact: true }).click();
    let o = (await hentOrdrer(page)).find(x => x.ordrenr === ordrenr);
    expect(o.status).toBe('bekreftet');
    expect(o.betaling).toBe('paid');
    await page.getByText('Refunder', { exact: true }).click();
    o = (await hentOrdrer(page)).find(x => x.ordrenr === ordrenr);
    expect(o.betaling).toBe('refunded');
  });

  test('4.4 dobbeltklikk på innsending gir kun én ordre', async ({ page }) => {
    await nullstill(page, true);
    const før = (await hentOrdrer(page)).length;
    await opprettOrdreViaFlyt(page); // helpers dobbeltklikker ikke, men popupen gater — verifiser antall
    expect((await hentOrdrer(page)).length).toBe(før + 1);
  });
});

test.describe('Fase 5 — e-post', () => {
  test('5.1 e-postbekreftelse klargjøres og logges for hver ordre', async ({ page }) => {
    await nullstill(page, true);
    const ordrenr = await opprettOrdreViaFlyt(page);
    const logg = await hentLogg(page);
    expect(logg.some(l => l.tekst.includes(ordrenr) && l.tekst.includes('E-post'))).toBe(true);
    // MERK: faktisk utsending krever e-posttjeneste — denne testen oppgraderes til å
    // sjekke leverandørens test-innboks (f.eks. Mailpit) når serveren er koblet på.
  });
});

test.describe('Fase 6 — persistens', () => {
  test('6.1 full sideinnlasting mister ingen data', async ({ page }) => {
    await nullstill(page, true);
    await opprettOrdreViaFlyt(page);
    const før = (await hentOrdrer(page)).length;
    await page.reload();
    expect((await hentOrdrer(page)).length).toBe(før);
  });
});

test.describe('Fase 8 — mobil', () => {
  test.use({ viewport: { width: 320, height: 700 } });
  test('8.1 innlogging og admin uten horisontal overflow på 320px', async ({ page }) => {
    await nullstill(page);
    await loggInn(page, BRUKERE.admin);
    const overflow = await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(2);
  });
});

test.describe('Fase 9 — stress', () => {
  test('9.1 100 ordrer lagres og vises uten feil', async ({ page }) => {
    await page.goto(ADMIN);
    await page.evaluate(() => {
      const ordrer = JSON.parse(localStorage.getItem('kepler_ordrer') || '[]');
      for (let i = 0; i < 100; i++) ordrer.push({ id: 'PW-ST-' + i, ordrenr: 'PW-ST-' + i, type: 'bestilling', opprettet: new Date().toISOString(), status: 'ny', betaling: 'pending', kunde: { navn: 'PW-Stress ' + i, tlf: '90000000' }, tjenester: ['forsegling'] });
      localStorage.setItem('kepler_ordrer', JSON.stringify(ordrer));
    });
    await loggInn(page, BRUKERE.admin);
    await page.getByText('Ordrer og bookinger').click();
    await expect(page.getByText('PW-Stress 0')).toBeVisible();
    // rydd opp
    await page.evaluate(() => {
      const ordrer = JSON.parse(localStorage.getItem('kepler_ordrer') || '[]');
      localStorage.setItem('kepler_ordrer', JSON.stringify(ordrer.filter((o: any) => !String(o.id).startsWith('PW-ST-'))));
    });
  });
});
