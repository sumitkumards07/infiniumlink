import { db } from "@/db";
import { leads, pages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, pageId, blockId } = await req.json();

    if (!email || !pageId) {
      return new NextResponse("Missing data", { status: 400 });
    }

    // Resolve which user owns the page so we know who to give the lead to
    const page = await db.query.pages.findFirst({
      where: eq(pages.id, pageId),
      with: { profile: true },
    });

    if (!page) {
      return new NextResponse("Page not found", { status: 404 });
    }

    await db.insert(leads).values({
      userId: page.profile.userId,
      email,
      pageId,
      blockId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[LEAD_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
