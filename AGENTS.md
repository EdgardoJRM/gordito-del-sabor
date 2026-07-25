# AGENTS.md

## Cursor Cloud specific instructions

Next.js 13.5.6 app (App Router) for "El Gordito del Sabor" — a Puerto Rican recipe site with a Stripe-based apron store ("delantal") and a "El Sabor de Papá" event flow. Single service: the Next.js dev server. Standard scripts are in `package.json` (`dev`, `build`, `start`, `lint`).

Dependencies are installed by the startup update script (`npm install`). Notes below are the non-obvious gotchas.

### Environment variables
- Dev needs `.env.local` (gitignored). Copy from `.env.example`. For local dev use dummy Stripe/Resend values; `STRIPE_SECRET_KEY` must be a real Stripe **test** key only if you need the checkout redirect to succeed (DB flows work without it).
- `MONGODB_URI` for local dev points at the local TLS MongoDB below: `mongodb://127.0.0.1:27017/gordito_dev`.

### Lint (non-obvious)
- `npm run lint` is currently broken: the repo has a flat `eslint.config.mjs` that requires ESLint 9, but `package.json` pins ESLint 8 alongside the legacy `.eslintrc.json`. Run lint with the legacy config instead:
  - `ESLINT_USE_FLAT_CONFIG=false npx eslint .`

### MongoDB (non-obvious — required for auth/cart/admin/orders/inventory)
- `lib/mongodb.ts` hardcodes `ssl: true, tls: true` with cert validation, so it expects a TLS-enabled MongoDB (production uses Atlas). A plain local `mongod` will NOT connect.
- A local TLS MongoDB is already provisioned in the VM snapshot: data at `~/mongo-data`, certs at `~/mongo-tls` (self-signed CA `ca.crt` with SAN `localhost,127.0.0.1`).
- Start it (allow clients without a client cert):
  ```
  mongod --dbpath ~/mongo-data --tlsMode requireTLS \
    --tlsCertificateKeyFile ~/mongo-tls/server.pem \
    --tlsCAFile ~/mongo-tls/ca.crt \
    --tlsAllowConnectionsWithoutCertificates \
    --bind_ip 127.0.0.1 --port 27017
  ```
- The Next dev server must trust the CA, so start it with `NODE_EXTRA_CA_CERTS`:
  ```
  NODE_EXTRA_CA_CERTS=$HOME/mongo-tls/ca.crt npm run dev
  ```
  Without `NODE_EXTRA_CA_CERTS`, DB-backed routes fail with a TLS/`connection closed` error.

### Stripe
- The apron store supports quantities: the legacy cart checkout (`app/api/checkout/route.ts` → `handleLegacyCart`) already passes `quantity: item.quantity` to Stripe line items, and `/carrito` has +/- quantity controls.
- The "El Sabor de Papá" bundles send `quantity: 1` with fixed `apronCount` per bundle. To let buyers change quantity there, either add `adjustable_quantity` to the Stripe line item or route them through the cart flow.
- A real Stripe **test** secret key is required for the checkout redirect to succeed; with a dummy key the checkout call returns `StripeAuthenticationError` and the redirect shows a blank spinner page.
