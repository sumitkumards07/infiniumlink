import { landingContent } from "@/data/landing-content";

export function SocialProof() {
  const { eyebrow, headlineLine1, headlineLine2, profiles } = landingContent.socialProof;

  return (
    <section className="bg-card py-24 lg:py-32 border-b border-border/20">
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

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {profiles.map((profile, i) => (
            <div key={i} className="break-inside-avoid bg-background border border-border/30 p-8 shadow-sm transition-transform hover:-translate-y-1">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8 pb-4 border-b border-border/40">
                {profile.type}
              </div>
              <p className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-[28px] text-foreground whitespace-pre-line">
                "{profile.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
