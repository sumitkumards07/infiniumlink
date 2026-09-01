"use client";

import { landingContent } from "@/data/landing-content";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export function PricingSection() {
  const { eyebrow, tiers, footerCta } = landingContent.pricing;

  return (
    <section className="border-t border-border bg-card py-24" id="pricing">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <p className="mb-16 text-[11px] font-bold uppercase tracking-[0.2em] text-primary text-center">
          {eyebrow}
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {tiers.map((tier, i) => (
            <div key={i} className={`relative flex flex-col rounded-sm border ${tier.badge ? 'border-primary bg-primary/5' : 'border-border bg-background'} p-8 shadow-xl transition-transform hover:-translate-y-1`}>
              {tier.badge && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                  {tier.badge}
                </div>
              )}
              {tier.badge && (
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
              )}
              
              <h3 className={`text-2xl font-extrabold tracking-[-0.04em] ${tier.badge ? 'text-primary' : 'text-foreground'}`}>{tier.name}</h3>
              
              <div className="mt-6 mb-8">
                {tier.oldPrice && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[14px] font-medium text-muted-foreground line-through">{tier.oldPrice}</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary">{tier.discount}</span>
                  </div>
                )}
                <div className="text-4xl font-extrabold tracking-[-0.04em] text-foreground">
                  {tier.price.split('/')[0]}
                  {tier.price.includes('/') && <span className="text-[14px] font-medium text-muted-foreground">/{tier.price.split('/')[1]}</span>}
                </div>
              </div>

              <ul className="space-y-4 text-[13px] font-medium text-foreground mb-10 flex-1">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-center">
                    <Check className="mr-3 h-4 w-4 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href={tier.url}>
                <Button className={`w-full h-14 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-colors ${tier.badge ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-background border border-border text-foreground hover:bg-muted'}`} variant={tier.badge ? "default" : "outline"}>
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/pricing" className="text-[12px] font-bold uppercase tracking-widest text-primary hover:underline">
            {footerCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
