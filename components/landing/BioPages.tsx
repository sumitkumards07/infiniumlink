"use client";

import { landingContent } from "@/data/landing-content";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function BioPages() {
  const { eyebrow, body, cta } = landingContent.bioPages;

  return (
    <section className="border-t border-border bg-card py-24 overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center max-w-3xl">
        <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
        <h2 className="font-sans font-extrabold tracking-[-0.04em] leading-[1.6] text-[18px] text-foreground/80 mb-10">
          {body}
        </h2>

        {/* Mock representation of templates */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {["Basic", "Product Cards", "Leaderboard", "Carousel", "Bento", "Boutique"].map((name, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-full aspect-[9/16] bg-background border border-border rounded-sm shadow-xl flex items-center justify-center p-4 group relative overflow-hidden transition-transform hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-border opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-[12px] font-bold text-muted-foreground">{name}</p>
              </div>
            </div>
          ))}
        </div>

        <Link href="/sign-up">
          <Button size="lg" className="h-14 rounded-sm bg-primary px-10 text-[12px] font-bold uppercase tracking-[0.15em] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90">
            {cta}
          </Button>
        </Link>
      </div>
    </section>
  );
}
