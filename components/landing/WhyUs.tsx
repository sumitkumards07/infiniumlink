import { landingContent } from "@/data/landing-content";

export function WhyUs() {
  const { eyebrow, headlineLine1, headlineLine2, features } = landingContent.whyUs;

  return (
    <section className="bg-background py-24 lg:py-32 border-b border-border/20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-6">
            {eyebrow}
          </p>
          <h2 className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-[42px] lg:text-[56px] text-foreground">
            {headlineLine1} <br/>
            <span className="italic text-primary">{headlineLine2}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-16">
          {features.map((feature, i) => (
            <div key={i} className="relative pt-12 border-t border-border/40">
              <div className="absolute -top-4 left-0 text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-background pr-4">
                {feature.number}
              </div>
              <h3 className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-3xl text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-[17px] text-foreground/70 leading-[1.6]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
