"use client";

import { landingContent } from "@/data/landing-content";
import { Button } from "@/components/ui/button";

export function TryItNow() {
  const { eyebrow, body, cta } = landingContent.tryItNow;

  return (
    <section className="border-t border-border bg-card py-24">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center max-w-3xl">
        <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
        <h2 className="font-sans font-extrabold tracking-[-0.04em] leading-[1.1] text-3xl sm:text-4xl text-foreground mb-10">
          {body}
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="https://youtube.com/watch?v=..."
            className="w-full h-14 bg-background border border-border rounded-sm px-6 text-[14px] font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <Button size="lg" className="w-full sm:w-auto h-14 rounded-sm bg-primary px-10 text-[12px] font-bold uppercase tracking-[0.15em] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90">
            {cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
