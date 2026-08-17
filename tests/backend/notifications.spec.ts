import { test, expect } from '@playwright/test';
import { createTestCustomer, createTestBookingPayload, createTestOrderPayload, getEnv } from './helpers.api';

const BASE_URL = getEnv('BASE_URL');

test.describe('Varsling — e-post og SMS', () => {
  test('booking gir kundebekreftelse i sendeloggen', async ({ request }) => {
    const customer = createTestCustomer();
    const res = await request.post(`${BASE_URL}/api/bookings`, { data: createTestBookingPayload(customer) });
    expect(res.ok()).toBeTruthy();
    const emails = await (await request.get(`${BASE_URL}/api/test/emails?email=${customer.email}`)).json();
    expect(JSON.stringify(emails)).toContain('Bookingbekreftelse');
  });

  test('ordre lagres selv om varsling mangler mottaker', async ({ request }) => {
    const customer = createTestCustomer();
    delete (customer as any).email;
    const res = await request.post(`${BASE_URL}/api/orders`, { data: createTestOrderPayload(customer) });
    expect(res.ok()).toBeTruthy();
    const order = await res.json();
    const sjekk = await request.get(`${BASE_URL}/api/orders/${order.id}`);
    expect(sjekk.ok()).toBeTruthy();
  });

  test('venteliste-varsel sendes på e-post', async ({ request }) => {
    const customer = createTestCustomer();
    const res = await request.post(`${BASE_URL}/api/waitlist/notify`, { data: { name: customer.name, email: customer.email, phone: customer.phone, details: 'Antirust torsdag 10:00' } });
    expect(res.ok()).toBeTruthy();
    const emails = await (await request.get(`${BASE_URL}/api/test/emails?email=${customer.email}`)).json();
    expect(JSON.stringify(emails)).toContain('Ledig plass');
  });

  test('endring av ordrestatus varsler kunden', async ({ request }) => {
    const customer = createTestCustomer();
    const opprettet = await request.post(`${BASE_URL}/api/orders`, { data: createTestOrderPayload(customer) });
    const order = await opprettet.json();
    const oppdatert = await request.patch(`${BASE_URL}/api/orders/${order.id}`, { data: { status: 'confirmed' } });
    expect(oppdatert.ok()).toBeTruthy();
    const emails = await (await request.get(`${BASE_URL}/api/test/emails?email=${customer.email}`)).json();
    expect(JSON.stringify(emails)).toContain('Ordrestatus');
  });

  test('ordre sender e-post til baade kunde og admin', async ({ request }) => {
    const customer = createTestCustomer();
    await request.post(`${BASE_URL}/api/orders`, { data: createTestOrderPayload(customer) });
    const kunde = await (await request.get(`${BASE_URL}/api/test/emails?email=${customer.email}`)).json();
    expect(JSON.stringify(kunde)).toContain('Ordrebekreftelse');
    const alle = await (await request.get(`${BASE_URL}/api/test/emails`)).json();
    expect(JSON.stringify(alle)).toContain('Ny ordre');
  });

  test('kontaktskjema sender e-post til kunde og admin', async ({ request }) => {
    const customer = createTestCustomer();
    const res = await request.post(`${BASE_URL}/api/contact`, { data: { name: customer.name, email: customer.email, phone: customer.phone, message: 'Testmelding' } });
    expect(res.ok()).toBeTruthy();
    const kunde = await (await request.get(`${BASE_URL}/api/test/emails?email=${customer.email}`)).json();
    expect(JSON.stringify(kunde)).toContain('mottatt henvendelsen');
    const alle = await (await request.get(`${BASE_URL}/api/test/emails`)).json();
    expect(JSON.stringify(alle)).toContain('Ny henvendelse');
  });

  test('ventelistepaamelding bekreftes til kunden', async ({ request }) => {
    const customer = createTestCustomer();
    const res = await request.post(`${BASE_URL}/api/waitlist`, { data: { name: customer.name, email: customer.email, details: 'Antirust' } });
    expect(res.ok()).toBeTruthy();
    const kunde = await (await request.get(`${BASE_URL}/api/test/emails?email=${customer.email}`)).json();
    expect(JSON.stringify(kunde)).toContain('ventelisten');
  });

  test('betaling sender bekreftelse, feilet betaling varsler kunde og admin', async ({ request }) => {
    const customer = createTestCustomer();
    const o1 = await (await request.post(`${BASE_URL}/api/orders`, { data: createTestOrderPayload(customer) })).json();
    await request.post(`${BASE_URL}/api/payments/test-success`, { data: { orderId: o1.id } });
    let kunde = await (await request.get(`${BASE_URL}/api/test/emails?email=${customer.email}`)).json();
    expect(JSON.stringify(kunde)).toContain('Betaling mottatt');
    const c2 = createTestCustomer();
    const o2 = await (await request.post(`${BASE_URL}/api/orders`, { data: createTestOrderPayload(c2) })).json();
    await request.post(`${BASE_URL}/api/payments/test-failed`, { data: { orderId: o2.id } });
    kunde = await (await request.get(`${BASE_URL}/api/test/emails?email=${c2.email}`)).json();
    expect(JSON.stringify(kunde)).toContain('gikk ikke gjennom');
    const sjekk = await (await request.get(`${BASE_URL}/api/orders/${o2.id}`)).json();
    expect(sjekk.paymentStatus).toBe('failed');
  });

  test('sendelogg og innstillinger krever innlogging', async ({ request }) => {
    expect((await request.get(`${BASE_URL}/api/notifications`)).status()).toBe(401);
    expect((await request.put(`${BASE_URL}/api/settings/varsling`, { data: { smsPaa: false } })).status()).toBe(401);
  });
});
