import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { profiles, pages, blocks } from "@/db/schema";
import { eq, and, asc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { EditorProvider } from "@/components/editor/EditorProvider";
import { EditorLayout } from "@/components/editor/EditorLayout";
import { BlockConfig } from "@/lib/blocks/types";

export default async function EditorPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });

  if (!profile) {
    redirect("/onboarding");
  }

  // Get or create the root page for the profile
  let page = await db.query.pages.findFirst({
    where: and(eq(pages.profileId, profile.id), eq(pages.slug, "")),
  });

  if (!page) {
    const newPage = await db.insert(pages).values({
      profileId: profile.id,
      slug: "",
    }).returning();
    page = newPage[0];
  }

  const pageBlocks = await db.query.blocks.findMany({
    where: eq(blocks.pageId, page.id),
    orderBy: [asc(blocks.position)],
  });

  const blocksConfig: BlockConfig[] = pageBlocks.map(b => ({
    id: b.id,
    type: b.type as any,
    position: b.position,
    contentJson: b.contentJson as Record<string, any>,
    styleJson: b.styleJson as Record<string, any>,
    layoutJson: b.layoutJson as Record<string, any>,
    animationJson: b.animationJson as Record<string, any>,
    visibilityJson: b.visibilityJson as Record<string, any>,
  }));

  return (
    <div className="h-[calc(100vh-3.5rem)] -mx-4 md:-mx-6 lg:-mx-8 overflow-hidden">
      <EditorProvider initialPage={page} initialBlocks={blocksConfig}>
        <EditorLayout username={profile.username} />
      </EditorProvider>
    </div>
  );
}
