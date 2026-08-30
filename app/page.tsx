import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight, Code2, LayoutTemplate, Radio, Sparkles, Zap, Smartphone } from "lucide-react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const featureCards = [
  {
    title: "Creator layouts",
    body: "Build profile pages that feel designed, not assembled, with block layouts that stay flexible.",
    icon: LayoutTemplate,
  },
  {
    title: "AI-assisted setup",
    body: "Turn a short prompt into a polished first draft, then refine it inside the editor.",
    icon: Sparkles,
  },
  {
    title: "Live publishing",
    body: "Update links, offers, and campaigns in one place and publish changes instantly.",
    icon: Radio,
  },
  {
    title: "Built for speed",
    body: "Keep your page lightweight, readable, and conversion-focused across mobile and desktop.",
    icon: Zap,
  },
  {
    title: "Developer-ready",
    body: "Add your own integrations, custom blocks, and workflows without fighting the UI.",
    icon: Code2,
  },
  {
    title: "Smart links",
    body: "Send your audience straight into their favorite native apps instead of getting stuck in a mobile browser.",
    icon: Smartphone,
  },
];

export default async function LandingPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard/editor");
  }

  return (
    <div className="min-h-screen bg-[#f3f3f1] text-[#1e2330]">
      <header className="px-4 pt-5 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-black/8 bg-white/95 px-4 py-3 shadow-[0_1px_0_rgba(0,0,0,0.04),0_20px_45px_rgba(30,35,48,0.08)] backdrop-blur sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e2330] text-white">
              <LayoutTemplate className="size-5" />
            </div>
            <div className="leading-none">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#676b5f]">
                LinkFlow
              </p>
              <p className="text-base font-black tracking-[-0.03em]">Everything you are. One link.</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[#676b5f] md:flex">
            <Link href="#templates" className="transition-colors hover:text-[#1e2330]">
              Templates
            </Link>
            <Link href="#features" className="transition-colors hover:text-[#1e2330]">
              Features
            </Link>
            <Link href="#builder" className="transition-colors hover:text-[#1e2330]">
              Builder
            </Link>
            <Link href="#learn" className="transition-colors hover:text-[#1e2330]">
              Learn
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button
                variant="secondary"
                className="h-11 rounded-xl bg-[#eff0ec] px-4 text-[#1e2330] shadow-none hover:bg-[#e5e7e1]"
              >
                Log in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="h-11 rounded-full bg-[#1e2330] px-5 text-white hover:bg-[#151923]">
                Sign up free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="px-4 pb-16 pt-6 sm:px-6 lg:px-10 lg:pb-24">
          <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2rem] bg-[#1e2330] px-6 py-8 shadow-[0_24px_80px_rgba(30,35,48,0.18)] lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-10">
            <div className="relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-[#1e2330] px-2 py-6 sm:px-4 lg:min-h-[640px] lg:py-10">
              <Image
                src="/figma-assets/hero-blob-left.svg"
                alt=""
                width={528}
                height={1127}
                className="pointer-events-none absolute -left-28 top-16 h-auto w-[18rem] max-w-none opacity-90 sm:w-[24rem] lg:-left-20 lg:top-10 lg:w-[31rem]"
              />
              <Image
                src="/figma-assets/hero-blob-right.svg"
                alt=""
                width={527}
                height={429}
                className="pointer-events-none absolute -bottom-8 right-[-5.5rem] h-auto w-[14rem] max-w-none opacity-95 sm:w-[18rem] lg:bottom-2 lg:right-[-4rem] lg:w-[24rem]"
              />

              <div className="relative z-10 max-w-3xl space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a8ad9c]">
                  Link-in-bio, redesigned
                </p>
                <h1 className="max-w-4xl text-5xl font-black tracking-[-0.06em] text-[#e9c0e9] sm:text-6xl lg:text-7xl lg:leading-[0.98]">
                  Jumpstart your corner of the internet today
                </h1>
                <p className="max-w-xl text-base leading-7 text-[#d7dbcf] sm:text-lg">
                  Shape a Linktree-inspired page with richer branding, faster editing, and a cleaner
                  conversion path for every profile you publish.
                </p>
              </div>

              <div className="relative z-10 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex h-14 items-center rounded-2xl bg-white px-4 text-sm font-black tracking-[0.01em] text-[#676b5f] shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
                  <span className="mr-2 text-[#676b5f]">linkflow.me/</span>
                  <span className="text-[#94988b]">yourname</span>
                </div>
                <Link href="/sign-up">
                  <Button className="h-14 rounded-full bg-[#d2e823] px-7 text-sm font-black text-[#1e2330] hover:bg-[#c5dc18]">
                    Claim your LinkFlow
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-[1.75rem] bg-[#f3f3f1] p-4 sm:p-6">
              <div className="flex items-center justify-between rounded-[1.4rem] bg-white px-4 py-3 shadow-[0_12px_28px_rgba(30,35,48,0.08)]">
                <div>
                  <p className="text-sm font-semibold text-[#676b5f]">Preview</p>
                  <p className="text-xl font-black tracking-[-0.04em]">Your page, upgraded</p>
                </div>
                <div className="rounded-full bg-[#eff0ec] px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#676b5f]">
                  live
                </div>
              </div>

              <div className="rounded-[1.8rem] bg-[#c7c2b9] p-4 shadow-[0_20px_50px_rgba(30,35,48,0.14)]">
                <div className="mx-auto flex max-w-[23rem] flex-col gap-4 rounded-[2rem] border border-white/50 bg-[#efeeea] p-4">
                  <div className="rounded-[1.5rem] bg-[#1e2330] px-5 py-6 text-center text-white">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#d2e823] text-3xl font-black text-[#1e2330]">
                      L
                    </div>
                    <p className="text-2xl font-black tracking-[-0.04em]">LinkFlow</p>
                    <p className="mt-2 text-sm leading-6 text-white/72">
                      Designer, creator, builder. One profile for everything I launch.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {["Latest launch", "Book a collab", "Join my newsletter"].map((label) => (
                      <div
                        key={label}
                        className="rounded-full border border-[#d8d6cf] bg-white px-5 py-4 text-center text-sm font-bold text-[#1e2330] shadow-[0_12px_24px_rgba(30,35,48,0.06)]"
                      >
                        {label}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {["IG", "YT", "TT"].map((label) => (
                      <div
                        key={label}
                        className="rounded-2xl bg-white px-3 py-4 text-center text-xs font-black tracking-[0.18em] text-[#676b5f] shadow-[0_10px_18px_rgba(30,35,48,0.06)]"
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.4rem] bg-white p-4 shadow-[0_12px_28px_rgba(30,35,48,0.08)]">
                  <p className="text-sm font-semibold text-[#676b5f]">Publishing</p>
                  <p className="mt-2 text-3xl font-black tracking-[-0.06em]">Instant</p>
                </div>
                <div className="rounded-[1.4rem] bg-[#d2e823] p-4 text-[#1e2330] shadow-[0_12px_28px_rgba(30,35,48,0.08)]">
                  <p className="text-sm font-semibold text-[#485000]">Editor</p>
                  <p className="mt-2 text-3xl font-black tracking-[-0.06em]">Drag + drop</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-white px-6 py-8 shadow-[0_18px_50px_rgba(30,35,48,0.08)] sm:px-8 lg:px-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#676b5f]">
                Builder highlights
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#1e2330] sm:text-4xl">
                A warmer, more editorial direction for your product UI
              </h2>
              <p className="mt-4 text-base leading-7 text-[#676b5f]">
                The redesign borrows the Figma file’s rounded geometry, muted neutrals, bold
                typography, and high-contrast call-to-actions while keeping your own product story.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featureCards.map(({ title, body, icon: Icon }) => (
                <div
                  key={title}
                  className="rounded-[1.5rem] border border-[#ebe8df] bg-[#f7f6f2] p-5 shadow-[0_10px_24px_rgba(30,35,48,0.05)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#1e2330] shadow-[0_8px_20px_rgba(30,35,48,0.08)]">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-black tracking-[-0.04em] text-[#1e2330]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#676b5f]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="builder" className="px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] bg-[#b69faf] p-6 text-[#1e2330] shadow-[0_20px_50px_rgba(30,35,48,0.1)] lg:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#5b4e56]">
                For builders
              </p>
              <h2 className="mt-4 max-w-sm text-3xl font-black tracking-[-0.05em] sm:text-4xl">
                Join our developer program
              </h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-[#342d33]">
                We&apos;re expanding access to APIs, SDKs, and custom block workflows so teams can
                take the editor beyond a static link page.
              </p>
              <Link href="/sign-up">
                <Button className="mt-6 h-12 rounded-full bg-[#1e2330] px-6 text-white hover:bg-[#151923]">
                  Register now
                </Button>
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-[#1e2330] p-6 text-white shadow-[0_20px_50px_rgba(30,35,48,0.12)] lg:p-8">
              <Image
                src="/figma-assets/developer-shape.svg"
                alt=""
                width={368}
                height={230}
                className="pointer-events-none absolute right-0 top-0 h-full w-auto opacity-80"
              />
              <div className="relative z-10 max-w-lg">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#a8ad9c]">
                  Product direction
                </p>
                <h3 className="mt-4 text-3xl font-black tracking-[-0.05em] text-[#e9c0e9]">
                  Redesign the front door, then carry the system into the editor
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/76">
                  This first pass focuses on the public landing experience, using the Figma kit as the
                  visual north star. The same color system and rounded component language can flow into
                  the dashboard and live page renderer next.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
