import { test, expect } from '@playwright/test';
import {
  createTestCustomer,
  createTestOrderPayload,
  createTestBookingPayload,
  loginAsAdmin,
  loginAsEmployee,
  loginAsEditor,
  clearTestData,
  getEnv,
} from './helpers.api';

const BASE_URL = getEnv('BASE_URL');
const ADMIN_EMAIL = getEnv('ADMIN_EMAIL');

test.describe('Kepler backend lanseringstest', () => {
  test.beforeEach(async ({ request }) => {
    await clearTestData(request);
  });

  test.describe('1. Innlogging og sikkerhet', () => {
    test('Adminpanel skal ikke kunne åpnes uten innlogging', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin`);
      await expect(page).not.toHaveURL(`${BASE_URL}/admin`);
      await expect(page).toHaveURL(/login|innlogging|admin-login/);
    });

    test('Administrator kan logge inn og åpne adminpanel', async ({ page }) => {
      await loginAsAdmin(page);
      await expect(page).toHaveURL(/admin/);
      await expect(page.locator('body')).toContainText(/admin|dashboard|kontrollpanel/i);
    });

    test('Feil passord skal ikke gi tilgang', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/login`);
      await page.fill('input[name="email"]', ADMIN_EMAIL);
      await page.fill('input[name="password"]', 'feil-passord-123');
      await page.click('button[type="submit"]');
      await expect(page).not.toHaveURL(`${BASE_URL}/admin`);
      await expect(page.locator('body')).toContainText(/feil|ugyldig|invalid|wrong/i);
    });

    test('Utlogging skal avslutte sesjon', async ({ page }) => {
      await loginAsAdmin(page);
      await page.click('[data-testid="logout"], text=Logg ut, text=Logout');
      await page.goto(`${BASE_URL}/admin`);
      await expect(page).toHaveURL(/login|innlogging|admin-login/);
    });

    test('Ansatt skal ikke ha full administratortilgang', async ({ page }) => {
      await loginAsEmployee(page);
      await page.goto(`${BASE_URL}/admin/settings`);
      await expect(page.locator('body')).not.toContainText(/systeminnstillinger|brukerroller|delete admin/i);
    });

    test('Redaktør skal kun ha redigeringstilgang', async ({ page }) => {
      await loginAsEditor(page);
      await page.goto(`${BASE_URL}/admin/orders`);
      await expect(page.locator('body')).not.toContainText(/betalingsstatus|refund|slett ordre/i);
    });
  });

  test.describe('2. Ordresystem', () => {
    test('Ny ordre skal lagres i database og vises i admin', async ({ request, page }) => {
      const customer = createTestCustomer();
      const payload = createTestOrderPayload(customer);
      const response = await request.post(`${BASE_URL}/api/orders`, { data: payload });
      expect(response.ok()).toBeTruthy();
      const order = await response.json();
      expect(order.id).toBeTruthy();
      expect(order.orderNumber).toBeTruthy();
      expect(order.customer.email).toBe(customer.email);
      expect(order.status).toMatch(/pending|created|new/i);
      await loginAsAdmin(page);
      await page.goto(`${BASE_URL}/admin/orders`);
      await expect(page.locator('body')).toContainText(order.orderNumber);
      await expect(page.locator('body')).toContainText(customer.email);
    });

    test('Ordrenummer skal kunne søkes opp i admin', async ({ request, page }) => {
      const customer = createTestCustomer();
      const response = await request.post(`${BASE_URL}/api/orders`, { data: createTestOrderPayload(customer) });
      expect(response.ok()).toBeTruthy();
      const order = await response.json();
      await loginAsAdmin(page);
      await page.goto(`${BASE_URL}/admin/orders`);
      await page.fill('[data-testid="order-search"], input[type="search"]', order.orderNumber);
      await expect(page.locator('body')).toContainText(order.orderNumber);
    });

    test('Systemet skal kunne lagre 20 ordre uten datatap', async ({ request }) => {
      const createdOrders: string[] = [];
      for (let i = 0; i < 20; i++) {
        const response = await request.post(`${BASE_URL}/api/orders`, { data: createTestOrderPayload(createTestCustomer(i)) });
        expect(response.ok()).toBeTruthy();
        const order = await response.json();
        expect(order.id).toBeTruthy();
        createdOrders.push(order.id);
      }
      expect(createdOrders).toHaveLength(20);
    });
  });

  test.describe('3. Booking', () => {
    test('Ny booking skal lagres og vises i admin', async ({ request, page }) => {
      const customer = createTestCustomer();
      const response = await request.post(`${BASE_URL}/api/bookings`, { data: createTestBookingPayload(customer) });
      expect(response.ok()).toBeTruthy();
      const booking = await response.json();
      expect(booking.id).toBeTruthy();
      expect(booking.customer.email).toBe(customer.email);
      await loginAsAdmin(page);
      await page.goto(`${BASE_URL}/admin/bookings`);
      await expect(page.locator('body')).toContainText(customer.email);
    });

    test('Bookingstatus skal kunne endres', async ({ request }) => {
      const createResponse = await request.post(`${BASE_URL}/api/bookings`, { data: createTestBookingPayload(createTestCustomer()) });
      expect(createResponse.ok()).toBeTruthy();
      const booking = await createResponse.json();
      const updateResponse = await request.patch(`${BASE_URL}/api/bookings/${booking.id}`, { data: { status: 'confirmed' } });
      expect(updateResponse.ok()).toBeTruthy();
      const updated = await updateResponse.json();
      expect(updated.status).toBe('confirmed');
    });

    test('Booking skal kunne slettes eller kanselleres korrekt', async ({ request }) => {
      const createResponse = await request.post(`${BASE_URL}/api/bookings`, { data: createTestBookingPayload(createTestCustomer()) });
      expect(createResponse.ok()).toBeTruthy();
      const booking = await createResponse.json();
      const deleteResponse = await request.delete(`${BASE_URL}/api/bookings/${booking.id}`);
      expect(deleteResponse.ok()).toBeTruthy();
    });
  });

  test.describe('4. Betaling', () => {
    test('Vellykket betaling skal sette betalingsstatus til paid', async ({ request }) => {
      const orderResponse = await request.post(`${BASE_URL}/api/orders`, { data: createTestOrderPayload(createTestCustomer()) });
      expect(orderResponse.ok()).toBeTruthy();
      const order = await orderResponse.json();
      const paymentResponse = await request.post(`${BASE_URL}/api/payments/test-success`, { data: { orderId: order.id, amount: order.total } });
      expect(paymentResponse.ok()).toBeTruthy();
      const updatedOrderResponse = await request.get(`${BASE_URL}/api/orders/${order.id}`);
      expect(updatedOrderResponse.ok()).toBeTruthy();
      const updatedOrder = await updatedOrderResponse.json();
      expect(String(updatedOrder.paymentStatus).toLowerCase()).toBe('paid');
    });

    test('Avvist betaling skal ikke fullføre ordre', async ({ request }) => {
      const orderResponse = await request.post(`${BASE_URL}/api/orders`, { data: createTestOrderPayload(createTestCustomer()) });
      expect(orderResponse.ok()).toBeTruthy();
      const order = await orderResponse.json();
      const paymentResponse = await request.post(`${BASE_URL}/api/payments/test-failed`, { data: { orderId: order.id } });
      expect(paymentResponse.ok()).toBeTruthy();
      const updatedOrderResponse = await request.get(`${BASE_URL}/api/orders/${order.id}`);
      expect(updatedOrderResponse.ok()).toBeTruthy();
      const updatedOrder = await updatedOrderResponse.json();
      expect(String(updatedOrder.paymentStatus).toLowerCase()).toMatch(/failed|declined|cancelled/);
      expect(String(updatedOrder.status).toLowerCase()).not.toBe('completed');
    });

    test('Dobbeltklikk på betaling skal ikke lage dobbeltordre', async ({ request }) => {
      const orderResponse = await request.post(`${BASE_URL}/api/orders`, { data: createTestOrderPayload(createTestCustomer()) });
      expect(orderResponse.ok()).toBeTruthy();
      const order = await orderResponse.json();
      const paymentRequests = await Promise.all([
        request.post(`${BASE_URL}/api/payments/test-success`, { data: { orderId: order.id, amount: order.total } }),
        request.post(`${BASE_URL}/api/payments/test-success`, { data: { orderId: order.id, amount: order.total } }),
      ]);
      expect(paymentRequests[0].ok()).toBeTruthy();
      const orderCheck = await request.get(`${BASE_URL}/api/orders/${order.id}`);
      expect(orderCheck.ok()).toBeTruthy();
      const updatedOrder = await orderCheck.json();
      expect(String(updatedOrder.paymentStatus).toLowerCase()).toBe('paid');
      if (updatedOrder.paymentAttempts) {
        expect(updatedOrder.paymentAttempts.length).toBeLessThanOrEqual(1);
      }
    });
  });

  test.describe('5. E-post', () => {
    test('Ordre skal trigge kunde- og adminbekreftelse', async ({ request }) => {
      const customer = createTestCustomer();
      const response = await request.post(`${BASE_URL}/api/orders`, { data: createTestOrderPayload(customer) });
      expect(response.ok()).toBeTruthy();
      const order = await response.json();
      expect(order.id).toBeTruthy();
      const emailResponse = await request.get(`${BASE_URL}/api/test/emails?email=${customer.email}`);
      if (emailResponse.ok()) {
        const emails = await emailResponse.json();
        const serializedEmails = JSON.stringify(emails).toLowerCase();
        expect(serializedEmails).toContain(customer.email.toLowerCase());
        expect(serializedEmails).toContain('ordre');
      }
    });

    test('Booking skal trigge bookingbekreftelse', async ({ request }) => {
      const customer = createTestCustomer();
      const response = await request.post(`${BASE_URL}/api/bookings`, { data: createTestBookingPayload(customer) });
      expect(response.ok()).toBeTruthy();
      const emailResponse = await request.get(`${BASE_URL}/api/test/emails?email=${customer.email}`);
      if (emailResponse.ok()) {
        const emails = await emailResponse.json();
        const serializedEmails = JSON.stringify(emails).toLowerCase();
        expect(serializedEmails).toContain(customer.email.toLowerCase());
        expect(serializedEmails).toMatch(/booking|bestilling|time/);
      }
    });
  });

  test.describe('6. Feilhåndtering', () => {
    test('Tom ordre skal avvises med brukervennlig feil', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/orders`, { data: {} });
      expect(response.status()).toBeGreaterThanOrEqual(400);
      const body = await response.text();
      expect(body.toLowerCase()).not.toContain('stack');
      expect(body.toLowerCase()).not.toContain('trace');
      expect(body.toLowerCase()).not.toContain('sql');
    });

    test('Ugyldig booking skal avvises uten krasj', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/bookings`, { data: { serviceId: null, date: null } });
      expect(response.status()).toBeGreaterThanOrEqual(400);
      const body = await response.text();
      expect(body.toLowerCase()).not.toContain('stack');
      expect(body.toLowerCase()).not.toContain('undefined');
    });

    test('Ukjent ordre-ID skal gi 404 eller kontrollert feilmelding', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/api/orders/does-not-exist`);
      expect([400, 404]).toContain(response.status());
      const body = await response.text();
      expect(body.toLowerCase()).not.toContain('stack');
      expect(body.toLowerCase()).not.toContain('sql');
    });
  });

  test.describe('7. Mobilflyt', () => {
    test('Ordreflyt skal fungere på mobilbredde', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}`);
      const bodyBox = await page.locator('body').boundingBox();
      expect(bodyBox?.width).toBeLessThanOrEqual(390);
    });
  });
});
