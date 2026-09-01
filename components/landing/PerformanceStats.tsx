"use client";

import { landingContent } from "@/data/landing-content";

export function PerformanceStats() {
  const { eyebrow, items } = landingContent.stats;

  return (
    <section className="border-t border-border bg-background py-24">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <p className="mb-12 text-[11px] font-bold uppercase tracking-[0.2em] text-primary text-center">
          {eyebrow}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {items.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <p className="font-sans font-extrabold tracking-[-0.04em] leading-[1] text-4xl sm:text-5xl text-foreground mb-4">
                {stat.value}
              </p>
              <p className="text-[13px] font-medium text-muted-foreground leading-relaxed max-w-[150px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
