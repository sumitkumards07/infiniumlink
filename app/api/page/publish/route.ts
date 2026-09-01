import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { profiles, pages, pageVersions } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const state = await req.json();

    // 1. Get the user's profile
    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, userId),
    });

    if (!profile) {
      return new NextResponse("Profile not found", { status: 404 });
    }

    // 2. Find or create the default page (slug = "")
    let page = await db.query.pages.findFirst({
      where: and(eq(pages.profileId, profile.id), eq(pages.slug, "")),
    });

    if (!page) {
      const [newPage] = await db.insert(pages).values({
        profileId: profile.id,
        slug: "",
        title: "My Page",
        isPublished: true,
        appearanceJson: state,
      }).returning();
      page = newPage;
    } else {
      const [updatedPage] = await db.update(pages).set({
        isPublished: true,
        appearanceJson: state,
        updatedAt: new Date(),
      }).where(eq(pages.id, page.id)).returning();
      page = updatedPage;
    }

    // 3. Clear older published versions (optional, or just set them to false)
    await db.update(pageVersions)
      .set({ isPublishedVersion: false })
      .where(eq(pageVersions.pageId, page.id));

    // 4. Create a new published version
    await db.insert(pageVersions).values({
      pageId: page.id,
      name: `Published ${new Date().toISOString()}`,
      isPublishedVersion: true,
      pageDataJson: { state }, // We wrap it so we know where it is
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[PUBLISH_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
