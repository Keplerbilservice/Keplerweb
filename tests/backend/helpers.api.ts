import { Page, APIRequestContext } from '@playwright/test';

export function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Mangler miljøvariabel: ${name}`);
  }

  return value;
}

export function createTestCustomer(index = Date.now()) {
  return {
    name: `Kepler Testkunde ${index}`,
    email: `kepler-test-${index}@example.com`,
    phone: `4000${String(index).slice(-4)}`,
  };
}

export function createTestOrderPayload(customer: ReturnType<typeof createTestCustomer>) {
  return {
    customer,
    items: [
      {
        productId: 'test-antirust-service',
        name: 'Test Antirustbehandling',
        quantity: 1,
        price: 4990,
        vatRate: 25,
      },
    ],
    total: 4990,
    source: 'automated-backend-test',
  };
}

export function createTestBookingPayload(customer: ReturnType<typeof createTestCustomer>) {
  return {
    customer,
    serviceId: 'test-antirust-service',
    date: '2026-09-01',
    time: '10:00',
    comment: 'Automatisk testbooking',
    source: 'automated-backend-test',
  };
}

export async function loginAsAdmin(page: Page) {
  await page.goto(`${getEnv('BASE_URL')}/admin/login`);

  await page.fill('input[name="email"]', getEnv('ADMIN_EMAIL'));
  await page.fill('input[name="password"]', getEnv('ADMIN_PASSWORD'));
  await page.click('button[type="submit"]');

  await page.waitForLoadState('networkidle');
}

export async function loginAsEmployee(page: Page) {
  await page.goto(`${getEnv('BASE_URL')}/admin/login`);

  await page.fill('input[name="email"]', getEnv('EMPLOYEE_EMAIL'));
  await page.fill('input[name="password"]', getEnv('EMPLOYEE_PASSWORD'));
  await page.click('button[type="submit"]');

  await page.waitForLoadState('networkidle');
}

export async function loginAsEditor(page: Page) {
  await page.goto(`${getEnv('BASE_URL')}/admin/login`);

  await page.fill('input[name="email"]', getEnv('EDITOR_EMAIL'));
  await page.fill('input[name="password"]', getEnv('EDITOR_PASSWORD'));
  await page.click('button[type="submit"]');

  await page.waitForLoadState('networkidle');
}

export async function clearTestData(request: APIRequestContext) {
  const baseUrl = getEnv('BASE_URL');

  const response = await request.post(`${baseUrl}/api/test/cleanup`, {
    data: {
      source: 'automated-backend-test',
    },
  });

  if (!response.ok()) {
    console.warn('Test cleanup feilet eller finnes ikke ennå. Fortsetter test.');
  }
}
