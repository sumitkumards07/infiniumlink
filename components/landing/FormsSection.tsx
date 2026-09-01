"use client";

import { landingContent } from "@/data/landing-content";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export function FormsSection() {
  const { eyebrow, body, features, cta } = landingContent.forms;

  return (
    <section className="border-t border-border bg-background py-24">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-xl">
          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
          <p className="font-sans font-medium leading-[1.6] text-[18px] text-foreground/80 mb-8">
            {body}
          </p>

          <ul className="space-y-4 mb-10">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center text-[14px] font-bold text-foreground">
                <Check className="mr-3 h-5 w-5 text-primary" />
                {feature}
              </li>
            ))}
          </ul>

          <Link href="/sign-up">
            <Button size="lg" className="h-14 rounded-sm bg-primary px-10 text-[12px] font-bold uppercase tracking-[0.15em] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90">
              {cta}
            </Button>
          </Link>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
          <div className="relative border border-border bg-card rounded-sm shadow-2xl p-8 max-w-md mx-auto">
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
            <h3 className="text-xl font-extrabold tracking-[-0.04em] mb-6">Feedback Form</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Your name</label>
                <div className="h-12 w-full border border-border bg-background rounded-sm" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Rating</label>
                <div className="text-2xl text-primary tracking-widest">★★★★☆</div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Feedback</label>
                <div className="h-24 w-full border border-border bg-background rounded-sm" />
              </div>
              <Button className="w-full h-12 rounded-sm bg-primary font-bold uppercase tracking-widest text-[11px]">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
