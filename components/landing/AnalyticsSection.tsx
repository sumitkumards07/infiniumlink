import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Globe2, Laptop } from "lucide-react";
import { landingContent } from "@/data/landing-content";

export function AnalyticsSection() {
  const { eyebrow, headlineLine1, headlineLine2, body, stats, cta } = landingContent.analytics;

  return (
    <section className="bg-primary text-primary-foreground py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Content */}
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary mb-6">
              {eyebrow}
            </p>
            <h2 className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-[48px] lg:text-[64px] text-primary-foreground mb-8">
              {headlineLine1} <br/>
              <span className="italic text-secondary">{headlineLine2}</span>
            </h2>
            <p className="text-[18px] text-primary-foreground/80 leading-[1.6] mb-12">
              {body}
            </p>
            
            <Link href="/sign-up">
              <Button size="lg" className="rounded-none bg-secondary px-10 py-7 text-[12px] font-bold uppercase tracking-[0.15em] text-primary shadow-lg transition-all hover:-translate-y-0.5 hover:bg-secondary/90">
                {cta}
              </Button>
            </Link>
          </div>

          {/* Premium Analytics Dashboard UI */}
          <div className="relative w-full h-[550px] bg-secondary p-8 shadow-2xl hidden lg:flex flex-col border border-primary-foreground/10">
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-primary/20">
              <div className="text-[13px] font-bold uppercase tracking-widest text-primary">Audience Insights</div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-primary/60">Last 30 Days</div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-10">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 mb-2">
                    {stat.label}
                  </div>
                  <div className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-4xl text-primary">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Fake Chart */}
            <div className="flex-1 mt-4 border border-primary/10 bg-background/50 p-6 flex flex-col justify-end">
              <div className="flex items-end justify-between h-32 w-full gap-2 opacity-80">
                {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
                  <div key={i} className="w-full bg-primary/20 hover:bg-primary transition-colors" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-between border-t border-primary/20 pt-6">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-primary/80">
                <Globe2 className="size-4" /> Top Source: Instagram
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-primary/80">
                <Laptop className="size-4" /> Desktop (34%)
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
