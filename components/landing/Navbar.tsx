"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Anchor } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/90 backdrop-blur-md border-b border-border/30 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* LEFT */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <Anchor className="size-5" />
          </div>
          <div className="leading-none">
            <p className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-2xl text-foreground">
              inApp
            </p>
          </div>
        </Link>

        {/* CENTER / RIGHT */}
        <nav className="hidden items-center gap-10 text-[12px] font-bold uppercase tracking-[0.15em] text-foreground/80 md:flex">
          <Link href="/pricing" className="transition-colors hover:text-primary">
            Pricing
          </Link>
          <Link href="/dashboard" className="transition-colors hover:text-primary">
            Dashboard
          </Link>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard">
            <Button className="rounded-none bg-primary px-8 py-5 text-[12px] font-bold uppercase tracking-[0.15em] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl">
              Go to Dashboard →
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
