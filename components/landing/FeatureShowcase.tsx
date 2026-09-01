import Link from "next/link";
import { Button } from "@/components/ui/button";
import { landingContent } from "@/data/landing-content";

export function FeatureShowcase() {
  const [feature01, feature02, feature03] = landingContent.featureShowcase;

  return (
    <div className="bg-background">
      {/* FEATURE 01: SHARE */}
      <section className="py-24 lg:py-40 border-b border-border/20">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            
            <div className="max-w-xl order-2 lg:order-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-6">
                {feature01.eyebrow}
              </p>
              <h2 className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-[42px] lg:text-[56px] text-foreground mb-8">
                {feature01.headlineLine1} <br/>
                <span className="italic text-primary">{feature01.headlineLine2}</span>
              </h2>
              <p className="text-[18px] text-foreground/80 leading-[1.6] mb-10">
                {feature01.body}
              </p>
              <Link href="/features">
                <Button variant="link" className="px-0 text-[12px] font-bold uppercase tracking-[0.15em] text-primary hover:no-underline hover:text-foreground transition-colors">
                  {feature01.cta}
                </Button>
              </Link>
            </div>

            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
              {/* Floating Mobile Profile Interface */}
              <div className="w-[320px] bg-card border border-border/40 shadow-2xl p-6 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-primary mb-4" />
                <div className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-2xl text-foreground mb-2">Elena Rossi</div>
                <div className="text-[13px] text-muted-foreground text-center mb-8">Designer & Art Director based in Milan. Creating visual stories.</div>
                
                <div className="w-full space-y-3">
                  <div className="w-full bg-background border border-border/50 py-4 px-6 text-[12px] uppercase tracking-widest font-bold text-center">Instagram</div>
                  <div className="w-full bg-background border border-border/50 py-4 px-6 text-[12px] uppercase tracking-widest font-bold text-center">Portfolio</div>
                  <div className="w-full bg-primary text-primary-foreground py-4 px-6 text-[12px] uppercase tracking-widest font-bold text-center">Latest Project</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE 02: MONETIZE */}
      <section className="py-24 lg:py-40 border-b border-border/20 bg-secondary/10">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            
            <div className="relative flex justify-center lg:justify-start">
               {/* Elegant commerce interface */}
               <div className="w-[360px] bg-background border border-border/30 shadow-2xl p-8">
                <div className="aspect-square bg-card mb-6 flex items-center justify-center">
                  <div className="w-32 h-40 bg-primary/20 border border-primary/30" />
                </div>
                <div className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-[28px] text-foreground mb-2">Preset Collection</div>
                <div className="text-primary font-medium mb-6">€ 49.00</div>
                <div className="w-full bg-foreground text-background py-4 px-6 text-[12px] uppercase tracking-widest font-bold text-center hover:bg-primary transition-colors cursor-pointer">
                  Buy Now
                </div>
                <div className="mt-4 w-full bg-transparent border border-border py-4 px-6 text-[12px] uppercase tracking-widest font-bold text-center text-foreground/50">
                  Book a Consultation
                </div>
              </div>
            </div>

            <div className="max-w-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-6">
                {feature02.eyebrow}
              </p>
              <h2 className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-[42px] lg:text-[56px] text-foreground mb-8">
                {feature02.headlineLine1} <br/>
                <span className="italic text-primary">{feature02.headlineLine2}</span>
              </h2>
              <p className="text-[18px] text-foreground/80 leading-[1.6] mb-10">
                {feature02.body}
              </p>
              <Link href="/features">
                <Button variant="link" className="px-0 text-[12px] font-bold uppercase tracking-[0.15em] text-primary hover:no-underline hover:text-foreground transition-colors">
                  {feature02.cta}
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE 03: GROW */}
      <section className="py-24 lg:py-40 border-b border-border/20">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            
            <div className="max-w-xl order-2 lg:order-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-6">
                {feature03.eyebrow}
              </p>
              <h2 className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-[42px] lg:text-[56px] text-foreground mb-8">
                {feature03.headlineLine1} <br/>
                <span className="italic text-primary">{feature03.headlineLine2}</span>
              </h2>
              <p className="text-[18px] text-foreground/80 leading-[1.6] mb-10">
                {feature03.body}
              </p>
              <Link href="/features">
                <Button variant="link" className="px-0 text-[12px] font-bold uppercase tracking-[0.15em] text-primary hover:no-underline hover:text-foreground transition-colors">
                  {feature03.cta}
                </Button>
              </Link>
            </div>

            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="w-[320px] bg-primary text-primary-foreground p-8 shadow-2xl">
                <div className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-6 border-b border-secondary/30 pb-4">Audience Growth</div>
                <div className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-6xl text-secondary mb-4">+128%</div>
                <div className="text-primary-foreground/80 text-[14px] leading-relaxed mb-8">
                  Your engagement is up significantly this week. Your audience is most active on Thursdays.
                </div>
                <div className="h-32 w-full flex items-end gap-1 opacity-90">
                   {[30, 45, 35, 60, 40, 80, 50].map((height, i) => (
                    <div key={i} className={`flex-1 ${i === 5 ? 'bg-secondary' : 'bg-secondary/30'}`} style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
