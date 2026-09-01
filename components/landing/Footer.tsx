import Link from "next/link";
import { Anchor } from "lucide-react";
import { landingContent } from "@/data/landing-content";

export function Footer() {
  const { brand, links } = landingContent.footer;

  return (
    <footer className="relative bg-[#0D304E] text-secondary overflow-hidden py-12">
      <div className="container relative z-10 mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between">
        
        <Link href="/" className="inline-flex items-center gap-3 mb-6 md:mb-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-[#0D304E]">
            <Anchor className="size-4" />
          </div>
          <div className="leading-none">
            <p className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-xl text-secondary">
              {brand}
            </p>
          </div>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {links.map((link, i) => (
            <Link key={i} href={link.url} className="text-[11px] font-bold uppercase tracking-widest text-secondary/80 hover:text-secondary transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
