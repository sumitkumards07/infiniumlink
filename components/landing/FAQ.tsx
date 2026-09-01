"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { landingContent } from "@/data/landing-content";

export function FAQ() {
  const { eyebrow, headlineLine1, headlineLine2, items } = landingContent.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-card py-24 lg:py-32 border-b border-border/20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-6">
              {eyebrow}
            </p>
            <h2 className="font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-[42px] lg:text-[56px] text-foreground sticky top-32">
              {headlineLine1} <br/>
              <span className="italic text-primary">{headlineLine2}</span>
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-border/40 border-t border-border/40">
              {items.map((item, i) => (
                <div key={i} className="py-6 overflow-hidden">
                  <button
                    onClick={() => toggle(i)}
                    className="w-full text-left flex items-center justify-between focus:outline-none group"
                  >
                    <span className="text-[18px] lg:text-[20px] font-sans font-extrabold tracking-[-0.04em] leading-[0.95] text-foreground group-hover:text-primary transition-colors pr-8">
                      {item.question}
                    </span>
                    <span className="text-primary flex-shrink-0">
                      {openIndex === i ? <Minus className="size-5" /> : <Plus className="size-5" />}
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openIndex === i ? "max-h-[300px] opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-[16px] text-foreground/70 leading-[1.6]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
