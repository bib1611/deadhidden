#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const files = [
  'src/data/products.ts',
  'src/components/BuyButton.tsx',
  'src/components/MobileProductCTA.tsx',
  'src/app/store/[slug]/page.tsx',
  'src/app/api/checkout/route.ts',
  'src/app/api/webhook/route.ts',
  'src/app/api/success/route.ts',
];

const errors = [];
const contents = new Map();
for (const file of files) {
  const text = readFileSync(join(root, file), 'utf8');
  contents.set(file, text);
  if (/buy\.stripe\.com/.test(text)) {
    errors.push(`${file}: hardcoded buy.stripe.com link found; paid store products must route through /api/checkout`);
  }
  if (/stripePaymentLink/.test(text)) {
    errors.push(`${file}: stripePaymentLink found; client-side checkout bypass is not allowed`);
  }
}

const buyButton = contents.get('src/components/BuyButton.tsx');
if (!buyButton.includes("fetch('/api/checkout'")) {
  errors.push('BuyButton.tsx: missing /api/checkout fetch');
}
if (/window\.location\.href\s*=\s*stripePaymentLink/.test(buyButton)) {
  errors.push('BuyButton.tsx: direct Stripe Payment Link redirect found');
}

const checkout = contents.get('src/app/api/checkout/route.ts');
for (const needle of [
  'metadata:',
  'productSlug',
  'productName',
  'success_url:',
  '/success?session_id={CHECKOUT_SESSION_ID}',
]) {
  if (!checkout.includes(needle)) {
    errors.push(`checkout route: missing required fulfillment field: ${needle}`);
  }
}

const webhook = contents.get('src/app/api/webhook/route.ts');
if (!webhook.includes('checkout.session.completed')) {
  errors.push('webhook route: missing checkout.session.completed handler');
}
if (!webhook.includes('session.metadata?.productSlug')) {
  errors.push('webhook route: missing productSlug metadata lookup');
}

const success = contents.get('src/app/api/success/route.ts');
if (!success.includes("session.payment_status !== 'paid'")) {
  errors.push('success route: missing paid-session verification');
}
if (!success.includes('session.metadata?.productSlug')) {
  errors.push('success route: missing productSlug metadata lookup');
}

const products = contents.get('src/data/products.ts');
const slugCount = [...products.matchAll(/slug:\s*"([^"]+)"/g)].length;
const freeCount = [...products.matchAll(/isFree:\s*true/g)].length;
const paidCount = [...products.matchAll(/isFree:\s*false/g)].length;

if (slugCount === 0 || paidCount === 0) {
  errors.push('products.ts: failed to parse products');
}

if (errors.length) {
  console.error('Store routing audit FAILED');
  for (const err of errors) console.error(`- ${err}`);
  process.exit(1);
}

console.log('Store routing audit passed');
console.log(JSON.stringify({ slugCount, paidCount, freeCount, checkoutPipe: '/api/checkout', webhookEvent: 'checkout.session.completed' }, null, 2));
