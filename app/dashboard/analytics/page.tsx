import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { profiles, pages, blockClicks } from "@/db/schema";
import { eq, and, count } from "drizzle-orm";
import { redirect } from "next/navigation";
export default async function AnalyticsPage() {
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

  const page = await db.query.pages.findFirst({
    where: and(eq(pages.profileId, profile.id), eq(pages.slug, "")),
  });

  if (!page) {
    return <div>No page found to analyze.</div>;
  }

  // Aggregate total clicks across all blocks on this page
  const totalClicksResult = await db
    .select({ count: count() })
    .from(blockClicks)
    .where(eq(blockClicks.pageId, page.id));

  const totalClicks = totalClicksResult[0].count;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#676b5f]">Analytics</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-[#1e2330]">Profile performance</h1>
        <p className="mt-3 text-sm leading-7 text-[#676b5f]">
          A cleaner reporting surface for the same data, styled to match the redesigned product.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.5rem] border border-[#ebe8df] bg-[#f7f6f2] p-6 shadow-[0_10px_24px_rgba(30,35,48,0.05)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#676b5f]">Total Views</p>
          <div className="mt-4 text-4xl font-black tracking-[-0.06em] text-[#1e2330]">0</div>
          <p className="mt-2 text-sm text-[#8b8f83]">Feature coming soon</p>
        </div>

        <div className="rounded-[1.5rem] border border-[#cddf31] bg-[#d2e823] p-6 shadow-[0_10px_24px_rgba(30,35,48,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#485000]">Total Clicks</p>
          <div className="mt-4 text-4xl font-black tracking-[-0.06em] text-[#1e2330]">{totalClicks}</div>
          <p className="mt-2 text-sm text-[#5c6506]">All-time block clicks</p>
        </div>

        <div className="rounded-[1.5rem] border border-[#d7c5d5] bg-[#e9c0e9] p-6 shadow-[0_10px_24px_rgba(30,35,48,0.06)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5b4e56]">Average CTR</p>
          <div className="mt-4 text-4xl font-black tracking-[-0.06em] text-[#1e2330]">0.0%</div>
          <p className="mt-2 text-sm text-[#6a5a67]">Click-through rate</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[1.75rem] border border-[#ebe8df] bg-white p-6 shadow-[0_14px_36px_rgba(30,35,48,0.05)]">
          <h2 className="text-xl font-black tracking-[-0.04em] text-[#1e2330]">Overview</h2>
          <div className="mt-5 flex h-[320px] w-full items-center justify-center rounded-[1.5rem] border border-dashed border-[#d8d6cf] bg-[#f7f6f2] text-sm font-medium text-[#8b8f83]">
            Chart implementation using Recharts
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[#ebe8df] bg-white p-6 shadow-[0_14px_36px_rgba(30,35,48,0.05)]">
          <h2 className="text-xl font-black tracking-[-0.04em] text-[#1e2330]">Top Performing Blocks</h2>
          <div className="mt-6 rounded-[1.5rem] bg-[#f7f6f2] p-5">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-[#1e2330]">No data yet</p>
              <p className="text-sm leading-6 text-[#676b5f]">
                Share your profile to start seeing analytics.
              </p>
            </div>
            <div className="mt-6 text-sm font-black uppercase tracking-[0.18em] text-[#8b8f83]">--</div>
          </div>
        </div>
      </div>
    </div>
  );
}
