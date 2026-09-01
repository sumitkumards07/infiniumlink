"use client";

import { landingContent } from "@/data/landing-content";

export function FeatureGrid() {
  const { eyebrow, items } = landingContent.features;

  return (
    <section className="border-t border-border bg-card py-24">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            {eyebrow.split(' ')[0]}
          </p>
          <h2 className="font-sans font-extrabold tracking-[-0.04em] leading-[1.1] text-3xl sm:text-4xl text-foreground">
            {eyebrow.split(' ').slice(1).join(' ')}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((feature, i) => (
            <div key={i} className="rounded-sm border border-border bg-background p-6 shadow-xl relative group transition-transform hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-border opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-[14px] font-bold tracking-[-0.02em] text-foreground mb-3">{feature.title}</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
