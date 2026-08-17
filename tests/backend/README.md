# Kepler backend-tester

To test-suiter:

## 1. Prototype (kjørbar i dag)
`npm run test:backend:proto` — kjører mot den statiske prototypen (localStorage-lager).
Beviser innloggingsvegg, roller, ordrelagring via ekte bestillingsflyt, status/betaling, persistens, mobil og stress.

## 2. Ekte backend (kjøres når API-et finnes)
`npm run test:backend:api` — backend-launch.spec.ts, skrevet mot API-endepunktene:

- POST /api/orders · GET /api/orders/:id
- POST /api/bookings · PATCH/DELETE /api/bookings/:id
- POST /api/payments/test-success · POST /api/payments/test-failed
- GET /api/test/emails (test-innboks, f.eks. Mailpit)
- POST /api/test/cleanup (kun testmiljø)
- /admin/login med input[name="email"] / input[name="password"]

Backend regnes ikke som ferdig før API-suiten passerer mot ekte testdatabase og e-posttjeneste.

Oppsett: kopier `.env.test.example` til `.env.test` og fyll inn. Kjør: `npm install && npm run test:backend`
