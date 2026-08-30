import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  // Graceful fallback for local dev without Stripe setup
  console.warn("STRIPE_SECRET_KEY is missing. Stripe integrations will fail.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock", {
  apiVersion: "2024-06-20", // Use a recent stable API version
  typescript: true,
});

export const STRIPE_PLANS = {
  pro: process.env.STRIPE_PRO_PRICE_ID || "price_pro_mock",
  business: process.env.STRIPE_BUSINESS_PRICE_ID || "price_business_mock",
};
