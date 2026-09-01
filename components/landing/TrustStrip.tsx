import { landingContent } from "@/data/landing-content";

export function TrustStrip() {
  const { eyebrow, headlineLine1, headlineLine2, body, categories } = landingContent.trustStrip;

  return (
    <section className="bg-background py-16 lg:py-24 border-b border-border/20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-6">
            {eyebrow}
          </p>
          <h2 className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-[42px] lg:text-[56px] text-foreground mb-6">
            {headlineLine1} <span className="italic text-primary">{headlineLine2}</span>
          </h2>
          <p className="text-[17px] text-foreground/70 max-w-md mx-auto">
            {body}
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative flex overflow-x-hidden border-y border-border/30 bg-secondary/20 py-5">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {categories.map((category, i) => (
            <div key={`cat-1-${i}`} className="flex items-center">
              <span className="mx-8 text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
                {category}
              </span>
              <span className="h-4 w-px bg-border/50" />
            </div>
          ))}
          {categories.map((category, i) => (
            <div key={`cat-2-${i}`} className="flex items-center">
              <span className="mx-8 text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
                {category}
              </span>
              <span className="h-4 w-px bg-border/50" />
            </div>
          ))}
          {categories.map((category, i) => (
            <div key={`cat-3-${i}`} className="flex items-center">
              <span className="mx-8 text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
                {category}
              </span>
              <span className="h-4 w-px bg-border/50" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
