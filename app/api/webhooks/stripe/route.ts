import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || "whsec_mock"
    );
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = (await stripe.subscriptions.retrieve(
      session.subscription as string
    )) as any;

    if (!session?.metadata?.userId) {
      return new Response("No user id present in metadata", { status: 400 });
    }

    // Insert or update subscription
    await db.insert(subscriptions).values({
      userId: session.metadata.userId,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      planId: subscription.items.data[0].price.id,
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    }).onConflictDoUpdate({
      target: subscriptions.userId,
      set: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        planId: subscription.items.data[0].price.id,
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        updatedAt: new Date(),
      }
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = (await stripe.subscriptions.retrieve(
      session.subscription as string
    )) as any;

    // Find existing by stripe_subscription_id
    const existing = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.stripeSubscriptionId, subscription.id)
    });

    if (existing) {
      await db.update(subscriptions)
        .set({
          planId: subscription.items.data[0].price.id,
          status: subscription.status,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          updatedAt: new Date()
        })
        .where(eq(subscriptions.stripeSubscriptionId, subscription.id));
    }
  }

  return new Response(null, { status: 200 });
}
