import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { landingContent } from "@/data/landing-content";

export function Hero() {
  const { eyebrow, headlineLine1, headlineLine2, subtitle, body, primaryCta, bottomText } = landingContent.hero;

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pb-16 pt-32 lg:pb-24">
      {/* Background Artwork */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-image-dark.png"
          alt="Abstract landing background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Subtle gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent lg:w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
      </div>

      <div className="container relative z-10 mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-center max-w-2xl h-full py-20">
          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
          
          <h1 className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-[clamp(48px,6vw,96px)] text-foreground">
            {headlineLine1} <br />
            <span className="italic text-primary">{headlineLine2}</span>
          </h1>
          
          <h2 className="mt-6 text-[22px] font-bold tracking-tight text-foreground/90">
            {subtitle}
          </h2>

          <p className="mt-4 max-w-lg text-[16px] leading-[1.6] text-foreground/70">
            {body}
          </p>

          <div className="mt-12 flex flex-col items-start gap-6">
            <Link href="/dashboard">
              <Button size="lg" className="rounded-none bg-primary px-10 py-7 text-[12px] font-bold uppercase tracking-[0.15em] shadow-xl transition-all hover:-translate-y-0.5 hover:bg-primary/90">
                {primaryCta}
              </Button>
            </Link>
            <p className="text-[11px] font-medium text-muted-foreground">{bottomText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
