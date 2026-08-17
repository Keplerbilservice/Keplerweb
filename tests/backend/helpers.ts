import { Page, expect } from '@playwright/test';

export const BASE = process.env.BASE_URL || 'http://localhost:8080';
export const SITE = `${BASE}/Kepler%20nettsted%20design%20C.dc.html`;
export const ADMIN = `${BASE}/Kepler%20admin.dc.html`;

export const BRUKERE = {
  admin: { epost: process.env.ADMIN_EPOST || 'truls@kepler.no', passord: process.env.ADMIN_PASSORD || 'kepler2026', rolle: 'Administrator' },
  ansatt: { epost: process.env.ANSATT_EPOST || 'ansatt@kepler.no', passord: process.env.ANSATT_PASSORD || 'verksted2026', rolle: 'Ansatt' },
  redaktor: { epost: process.env.REDAKTOR_EPOST || 'redaktor@kepler.no', passord: process.env.REDAKTOR_PASSORD || 'innhold2026', rolle: 'Redaktør' }
};

/** Nullstill sesjon og (valgfritt) test-ordrer før en test. Rører aldri andre nøkler. */
export async function nullstill(page: Page, alt = false): Promise<void> {
  await page.goto(ADMIN);
  await page.evaluate((slettAlt) => {
    localStorage.removeItem('kepler_admin_sesjon');
    if (slettAlt) {
      const ordrer = JSON.parse(localStorage.getItem('kepler_ordrer') || '[]');
      localStorage.setItem('kepler_ordrer', JSON.stringify(ordrer.filter((o: any) => !String(o.kunde?.navn || '').startsWith('PW-'))));
    }
  }, alt);
}

export async function loggInn(page: Page, bruker: { epost: string; passord: string }): Promise<void> {
  await page.goto(ADMIN);
  await page.getByPlaceholder('navn@kepler.no').fill(bruker.epost);
  await page.getByPlaceholder('••••••••').fill(bruker.passord);
  await page.getByText('Logg inn', { exact: true }).click();
}

export async function loggUt(page: Page): Promise<void> {
  await page.getByText('logout', { exact: true }).click();
}

/** Leser ordrelageret. Bytt til GET /api/orders når serveren er koblet på. */
export async function hentOrdrer(page: Page): Promise<any[]> {
  return page.evaluate(() => JSON.parse(localStorage.getItem('kepler_ordrer') || '[]'));
}

export async function hentLogg(page: Page): Promise<any[]> {
  return page.evaluate(() => JSON.parse(localStorage.getItem('kepler_logg') || '[]'));
}

/** Gjennomfører en komplett bestilling på nettsiden som en ekte kunde. */
export async function opprettOrdreViaFlyt(page: Page, kunde = { navn: 'PW-Testkunde', tlf: '900 11 222', regnr: 'PW12345' }): Promise<string> {
  await page.goto(`${SITE}#/tjenester`);
  await page.getByText('Velg', { exact: true }).first().click();
  await page.goto(`${SITE}#/bestill`);
  await page.getByText(/^Videre til tillegg/).last().click();
  await page.getByText(/^Videre til dato/).last().click();
  await page.getByText('Først ledig').first().click();
  await page.getByText(/^Videre til kontaktinfo/).last().click();
  await page.getByPlaceholder('Ola Nordmann').fill(kunde.navn);
  await page.getByPlaceholder('900 00 000').fill(kunde.tlf);
  await page.getByPlaceholder('AB 12345').fill(kunde.regnr);
  await page.getByText(/^Videre til siste steg/).last().click();
  await page.getByText(/samtykker til at opplysningene/).click();
  await page.getByText(/^Bestill time$/).last().click();
  // Kampanjepopupen gater innsendingen — takk nei for å fullføre
  await page.getByText('Nei takk', { exact: false }).click();
  await expect(page.getByText(/Takk, /)).toBeVisible();
  const ordrer = await hentOrdrer(page);
  return ordrer[0]?.ordrenr as string;
}
