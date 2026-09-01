import { landingContent } from "@/data/landing-content";

export function Testimonials() {
  const { headlineLine1, headlineLine2, items } = landingContent.testimonials;

  return (
    <section className="bg-primary py-24 lg:py-32">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h2 className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-[42px] lg:text-[56px] text-primary-foreground">
            {headlineLine1} <br/>
            <span className="italic text-secondary">{headlineLine2}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="bg-[#0D304E] p-10 border border-primary-foreground/10 flex flex-col justify-between transition-transform hover:-translate-y-1">
              <p className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-2xl text-primary-foreground/90 mb-12">
                “{item.quote}”
              </p>
              <div>
                <div className="text-[14px] font-bold text-secondary mb-1">
                  — {item.author}
                </div>
                <div className="text-[12px] uppercase tracking-widest text-primary-foreground/50">
                  {item.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
