import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { STRIPE_PLANS } from "./stripe";

export async function getUserSubscriptionPlan(userId: string) {
  const sub = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });

  if (!sub || sub.status !== "active") {
    return { plan: "free", isPro: false, isBusiness: false };
  }

  const isPro = sub.planId === STRIPE_PLANS.pro;
  const isBusiness = sub.planId === STRIPE_PLANS.business;

  return {
    plan: isBusiness ? "business" : isPro ? "pro" : "free",
    isPro: isPro || isBusiness,
    isBusiness,
    sub,
  };
}
