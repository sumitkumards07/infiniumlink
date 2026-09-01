"use client";

import { landingContent } from "@/data/landing-content";

export function SupportedApps() {
  const { eyebrow, apps } = landingContent.supportedApps;

  return (
    <section className="border-t border-border bg-background py-24">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <p className="mb-12 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {apps.map((app, i) => (
            <div key={i} className="rounded-sm border border-border bg-card px-6 py-3 text-[13px] font-bold tracking-widest uppercase text-foreground/80 shadow-md">
              {app}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
