import Link from "next/link";
import { Button } from "@/components/ui/button";
import { landingContent } from "@/data/landing-content";

export function CreateYourPage() {
  const { eyebrow, headlineLine1, headlineLine2, body, features, cta } = landingContent.createPage;

  return (
    <section id="features" className="bg-card py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Content */}
          <div className="max-w-xl">
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
            
            <ul className="space-y-4 mb-12">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center text-[15px] font-medium text-foreground/90">
                  <span className="mr-4 text-primary text-[10px]">●</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link href="/sign-up">
              <Button size="lg" className="rounded-none bg-primary px-10 py-7 text-[12px] font-bold uppercase tracking-[0.15em] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90">
                {cta}
              </Button>
            </Link>
          </div>

          {/* Realistic SaaS Product Mockup */}
          <div className="relative w-full h-[600px] border border-border/30 bg-background shadow-2xl p-4 sm:p-6 flex hidden lg:flex">
            {/* Editor Sidebar */}
            <div className="w-48 border-r border-border/30 pr-6 space-y-6">
              <div className="h-8 w-8 bg-primary rounded-full mb-10" />
              {['Profile', 'Links', 'Appearance', 'Social', 'Analytics'].map((item, i) => (
                <div key={i} className={`text-[13px] uppercase tracking-wider font-bold ${i === 2 ? 'text-primary' : 'text-foreground/40'}`}>
                  {item}
                </div>
              ))}
            </div>

            {/* Mobile Preview Area */}
            <div className="flex-1 flex justify-center items-center bg-secondary/30 border-x border-border/20 relative overflow-hidden">
              {/* Fake Mobile Device */}
              <div className="w-[280px] h-[540px] bg-background border border-border/50 shadow-xl relative p-6 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-card mb-6" />
                <div className="h-4 w-32 bg-primary/20 mb-2 rounded" />
                <div className="h-3 w-48 bg-border/40 mb-8 rounded" />
                
                <div className="w-full space-y-4">
                  <div className="w-full h-12 bg-card border border-border/40 rounded flex items-center justify-center text-[10px] uppercase tracking-widest font-bold text-primary">My Portfolio</div>
                  <div className="w-full h-12 bg-card border border-border/40 rounded flex items-center justify-center text-[10px] uppercase tracking-widest font-bold text-primary">Latest Video</div>
                  <div className="w-full h-12 bg-primary flex items-center justify-center text-[10px] uppercase tracking-widest font-bold text-primary-foreground">Book a Call</div>
                </div>
              </div>
            </div>

            {/* Customization Panel */}
            <div className="w-64 pl-6 space-y-8">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground mb-6 pb-4 border-b border-border/30">
                Design System
              </div>
              
              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">Background</div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-background border border-border/50 rounded-full ring-2 ring-primary ring-offset-2" />
                  <div className="w-8 h-8 bg-primary rounded-full" />
                  <div className="w-8 h-8 bg-[#0D304E] rounded-full" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">Typography</div>
                <div className="h-10 border border-border/50 rounded bg-card flex items-center px-4 font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-sm">
                  Cormorant Garamond
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">Button Style</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-8 border border-border/50 bg-background" />
                  <div className="h-8 border border-primary bg-background rounded-full" />
                </div>
              </div>
            </div>

            {/* Subtle cursor mockup */}
            <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-primary/20 animate-ping" />
            <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
