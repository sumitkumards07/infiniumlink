import { notFound } from "next/navigation";
import { db } from "@/db";
import { profiles, pages, blocks } from "@/db/schema";
import { eq, and, asc } from "drizzle-orm";
import { Metadata } from "next";
import { PublicProfilePreview } from "@/components/dashboard/design/PublicProfilePreview";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.username, username),
  });

  if (!profile) return { title: "Not Found" };

  const page = await db.query.pages.findFirst({
    where: and(eq(pages.profileId, profile.id), eq(pages.slug, "")),
  });

  if (!page) return { title: "Not Found" };

  return {
    title: page.seoTitle || `${username} | Infinium`,
    description: page.seoDescription || `Check out ${username}'s page.`,
    openGraph: {
      title: page.seoTitle || `${username} | Infinium`,
      description: page.seoDescription || `Check out ${username}'s page.`,
      images: page.ogImage ? [page.ogImage] : [],
    },
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  if (["go", "api", "admin", "onboarding", "dashboard", "sign-in", "sign-up", "demo"].includes(username)) {
    notFound();
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.username, username),
  });

  if (!profile) notFound();

  // Find the default page for this profile (empty slug)
  const page = await db.query.pages.findFirst({
    where: and(eq(pages.profileId, profile.id), eq(pages.slug, "")),
  });

  if (!page || !page.isPublished) {
    notFound();
  }

  // Fetch the LATEST PUBLISHED snapshot
  const { pageVersions } = await import("@/db/schema");
  const latestVersion = await db.query.pageVersions.findFirst({
    where: and(eq(pageVersions.pageId, page.id), eq(pageVersions.isPublishedVersion, true)),
    orderBy: (versions, { desc }) => [desc(versions.createdAt)],
  });

  if (!latestVersion) {
    notFound();
  }

  const pageData = latestVersion.pageDataJson as any;
  const state = pageData.state || page.appearanceJson;

  return (
    <div className="w-full h-screen">
      <PublicProfilePreview initialState={state} />
    </div>
  );
}
