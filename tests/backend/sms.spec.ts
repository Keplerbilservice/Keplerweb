import { test, expect } from '@playwright/test';
import { createTestCustomer, createTestBookingPayload, createTestOrderPayload, getEnv } from './helpers.api';

const BASE_URL = getEnv('BASE_URL');
const smsFor = async (request: any, phone: string) =>
  JSON.stringify(await (await request.get(`${BASE_URL}/api/test/sms?phone=${encodeURIComponent(phone)}`)).json());

test.describe('SMS-system', () => {
  test('booking sender SMS til kunde (og admin-epost)', async ({ request }) => {
    const customer = createTestCustomer();
    customer.phone = '99988777';
    const res = await request.post(`${BASE_URL}/api/bookings`, { data: createTestBookingPayload(customer) });
    expect(res.ok()).toBeTruthy();
    expect(await smsFor(request, customer.phone)).toContain('Timen din er bekreftet');
  });

  test('ordre sender SMS med ordrenummer', async ({ request }) => {
    const customer = createTestCustomer();
    customer.phone = '99988666';
    const res = await request.post(`${BASE_URL}/api/orders`, { data: createTestOrderPayload(customer) });
    expect(res.ok()).toBeTruthy();
    const order = await res.json();
    expect(await smsFor(request, customer.phone)).toContain(order.orderNumber);
  });

  test('betaling sender SMS-bekreftelse', async ({ request }) => {
    const customer = createTestCustomer();
    customer.phone = '99988555';
    const order = await (await request.post(`${BASE_URL}/api/orders`, { data: createTestOrderPayload(customer) })).json();
    await request.post(`${BASE_URL}/api/payments/test-success`, { data: { orderId: order.id } });
    expect(await smsFor(request, customer.phone)).toContain('Betalingen for ordre');
  });

  test('ugyldig nummer avvises uten at bookingen feiler', async ({ request }) => {
    const customer = createTestCustomer();
    (customer as any).phone = '12345'; // ugyldig norsk mobilnummer
    const res = await request.post(`${BASE_URL}/api/bookings`, { data: createTestBookingPayload(customer) });
    expect(res.ok()).toBeTruthy(); // bookingen lagres uansett
    const logg = JSON.stringify(await (await request.get(`${BASE_URL}/api/test/sms`)).json());
    expect(logg).toContain('ugyldig');
  });

  test('manglende nummer krasjer ikke systemet', async ({ request }) => {
    const customer = createTestCustomer();
    delete (customer as any).phone;
    const res = await request.post(`${BASE_URL}/api/bookings`, { data: createTestBookingPayload(customer) });
    expect(res.ok()).toBeTruthy();
  });

  test('duplikatvern: samme SMS sendes ikke to ganger rett etter hverandre', async ({ request }) => {
    const phone = '99988444';
    await request.post(`${BASE_URL}/api/test/send-order-sms`, { data: { phone } });
    await request.post(`${BASE_URL}/api/test/send-order-sms`, { data: { phone } });
    const logg = await (await request.get(`${BASE_URL}/api/test/sms?phone=${phone}`)).json();
    const stoppet = logg.filter((v: any) => String(v.status).includes('stoppet'));
    expect(stoppet.length).toBeGreaterThanOrEqual(1);
  });

  test('bil klar til henting krever innlogget admin', async ({ request }) => {
    const customer = createTestCustomer();
    customer.phone = '99988333';
    const order = await (await request.post(`${BASE_URL}/api/orders`, { data: createTestOrderPayload(customer) })).json();
    const res = await request.post(`${BASE_URL}/api/orders/${order.id}/car-ready`);
    expect(res.status()).toBe(401);
  });

  test('venteliste-påmelding sender SMS', async ({ request }) => {
    const customer = createTestCustomer();
    customer.phone = '99988222';
    const res = await request.post(`${BASE_URL}/api/waitlist`, { data: { name: customer.name, email: customer.email, phone: customer.phone, details: 'Antirust' } });
    expect(res.ok()).toBeTruthy();
    expect(await smsFor(request, customer.phone)).toContain('venteliste');
  });
});
