import Stripe from "stripe";

// Lazy initialization — only throws when actually used, not at build time
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY environment variable is not defined");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-18.acacia" as Stripe.LatestApiVersion,
    });
  }
  return _stripe;
}
