import { landingContent } from "@/data/landing-content";

export function Press() {
  const { eyebrow, headlineLine1, headlineLine2, publications } = landingContent.press;

  return (
    <section className="bg-card py-24 border-b border-border/20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-4">
            {eyebrow}
          </p>
          <h2 className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-[32px] lg:text-[42px] text-foreground">
            {headlineLine1} <span className="italic text-primary">{headlineLine2}</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-10 lg:gap-20 opacity-50 grayscale mix-blend-multiply">
          {publications.map((pub, i) => (
            <div key={i} className="text-xl md:text-2xl font-bold tracking-widest text-foreground font-sans">
              {pub}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
