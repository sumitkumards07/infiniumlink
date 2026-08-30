import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { BarChart3, LayoutTemplate, Sparkles } from "lucide-react";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <div className="min-h-screen bg-[#f3f3f1] text-[#1e2330]">
      <header className="sticky top-0 z-40 px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-black/8 bg-white/95 px-5 py-3 shadow-[0_12px_30px_rgba(30,35,48,0.08)] backdrop-blur">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e2330] text-white">
              <LayoutTemplate className="size-5" />
            </div>
            <div className="leading-none">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#676b5f]">
                LinkFlow
              </p>
              <p className="text-base font-black tracking-[-0.03em]">Dashboard</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-full bg-[#eff0ec] px-4 py-2 text-sm font-semibold text-[#676b5f] md:block">
              {profile.username}
            </div>
            <UserButton />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-1 flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-10">
        <div className="md:grid md:grid-cols-[260px_minmax(0,1fr)] md:gap-6">
          <aside className="hidden md:block">
            <div className="sticky top-28 rounded-[2rem] border border-[#ebe8df] bg-white p-4 shadow-[0_18px_45px_rgba(30,35,48,0.06)]">
              <div className="rounded-[1.5rem] bg-[#1e2330] px-5 py-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a8ad9c]">
                  Workspace
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-[-0.05em]">{profile.username}</h2>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  Manage your page, test new layouts, and publish with the updated LinkFlow style.
                </p>
              </div>

              <nav className="mt-4 flex flex-col gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-[#676b5f] transition-colors hover:bg-[#f7f6f2] hover:text-[#1e2330]"
                >
                  <Sparkles className="size-4" />
                  Overview
                </Link>
                <Link
                  href="/dashboard/editor"
                  className="flex items-center gap-3 rounded-2xl bg-[#eff0ec] px-4 py-3 text-sm font-semibold text-[#1e2330]"
                >
                  <LayoutTemplate className="size-4" />
                  My Page
                </Link>
                <Link
                  href="/dashboard/analytics"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-[#676b5f] transition-colors hover:bg-[#f7f6f2] hover:text-[#1e2330]"
                >
                  <BarChart3 className="size-4" />
                  Analytics
                </Link>
              </nav>
            </div>
          </aside>

          <main className="flex w-full flex-col overflow-hidden">
            <div className="rounded-[2rem] border border-[#ebe8df] bg-white p-4 shadow-[0_18px_45px_rgba(30,35,48,0.06)] sm:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
