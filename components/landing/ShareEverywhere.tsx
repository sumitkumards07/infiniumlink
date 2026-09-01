import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QrCode, Share2 } from "lucide-react";
import { landingContent } from "@/data/landing-content";

export function ShareEverywhere() {
  const { eyebrow, headlineLine1, headlineLine2, body, features, cta } = landingContent.shareEverywhere;

  return (
    <section className="bg-background py-24 lg:py-32 overflow-hidden border-t border-border/20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Editorial Product Composition */}
          <div className="order-2 lg:order-1 relative w-full h-[600px] flex items-center justify-center">
            {/* Abstract Background Shapes */}
            <div className="absolute inset-0 bg-secondary/40 rounded-full blur-[100px] transform -translate-y-12" />
            
            <div className="relative w-full max-w-md h-full">
              {/* Premium Smartphone Mockup */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[580px] bg-card border border-border shadow-2xl rounded-sm p-4 z-20">
                <div className="w-full h-full border border-border/50 bg-background relative flex flex-col items-center pt-12 px-6">
                  <div className="w-24 h-24 rounded-full bg-primary mb-6" />
                  <div className="h-6 w-3/4 bg-primary/20 mb-3" />
                  <div className="h-4 w-1/2 bg-border/60 mb-10" />
                  
                  <div className="w-full space-y-4">
                    <div className="h-14 bg-card border border-border w-full" />
                    <div className="h-14 bg-card border border-border w-full" />
                    <div className="h-14 bg-card border border-border w-full" />
                  </div>
                </div>
              </div>

              {/* QR Code Card */}
              <div className="absolute top-[15%] -left-8 w-40 h-40 bg-card border border-border shadow-xl z-30 p-4 flex flex-col justify-between">
                <div className="w-full h-full bg-background border border-border/50 flex items-center justify-center">
                  <QrCode className="size-16 text-primary" strokeWidth={1} />
                </div>
              </div>

              {/* URL Card */}
              <div className="absolute bottom-[20%] -right-12 bg-primary text-primary-foreground py-4 px-6 shadow-xl z-30 flex items-center gap-4">
                <Share2 className="size-5" />
                <span className="font-sans text-[13px] font-bold tracking-widest uppercase">linkflow.me/you</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 max-w-xl lg:pl-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-6">
              {eyebrow}
            </p>
            <h2 className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-[48px] lg:text-[64px] text-foreground mb-8">
              {headlineLine1} <br/>
              <span className="italic text-primary">{headlineLine2}</span>
            </h2>
            <p className="text-[18px] text-foreground/80 leading-[1.6] mb-10">
              {body}
            </p>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-12">
              {features.map((feature, i) => (
                <div key={i} className="text-[13px] font-bold uppercase tracking-widest text-foreground/70">
                  {feature}
                </div>
              ))}
            </div>

            <Link href="/sign-up">
              <Button size="lg" className="rounded-none bg-primary px-10 py-7 text-[12px] font-bold uppercase tracking-[0.15em] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90">
                {cta}
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
