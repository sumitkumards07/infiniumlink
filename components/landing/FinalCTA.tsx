import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { landingContent } from "@/data/landing-content";

export function FinalCTA() {
  const { headlineLine1, headlineLine2, primaryCta, bottomText } = landingContent.finalCta;

  return (
    <section className="relative flex items-center justify-center overflow-hidden py-32 lg:py-48 bg-primary">
      {/* Background Image generated from user prompt */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/cta-background.jpg"
          alt="Mediterranean sunset coast"
          fill
          className="object-cover opacity-90"
        />
        {/* Deep blue overlay for contrast while keeping the warm texture visible */}
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="mx-auto max-w-3xl space-y-8">
          <h2 className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-[56px] lg:text-[84px] text-primary-foreground">
            {headlineLine1} <br/>
            <span className="italic text-secondary">{headlineLine2}</span>
          </h2>

          <div className="mt-12 flex flex-col items-center justify-center gap-6">
            <Link href="/dashboard">
              <Button size="lg" className="rounded-none bg-secondary px-12 py-7 text-[12px] font-bold uppercase tracking-[0.15em] text-primary shadow-xl transition-all hover:-translate-y-0.5 hover:bg-secondary/90">
                {primaryCta}
              </Button>
            </Link>
            <p className="text-[12px] font-bold text-primary-foreground/80">{bottomText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
