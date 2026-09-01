import { auth } from "@clerk/nextjs/server";
import { stripe, STRIPE_PLANS } from "@/lib/stripe";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { plan } = body; // 'pro' or 'business'

    const priceId = plan === "business" ? STRIPE_PLANS.business : STRIPE_PLANS.pro;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://infiniumlink.vercel.app";

    const userSubscription = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.userId, userId),
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      // Redirect to Stripe billing portal if already subscribed
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: `${baseUrl}/dashboard/billing`,
      });

      return NextResponse.json({ url: stripeSession.url });
    }

    // Create a new checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${baseUrl}/dashboard/billing?success=true`,
      cancel_url: `${baseUrl}/dashboard/billing?canceled=true`,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: undefined, // Could grab from Clerk
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
