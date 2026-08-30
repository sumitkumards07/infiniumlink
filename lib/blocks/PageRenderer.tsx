import React from "react";
import { BlockConfig } from "./types";
import { BlockRenderer } from "./BlockRenderer";

interface PageAppearance {
  theme?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  fontFamily?: string;
}

export function PageRenderer({
  blocks,
  appearance,
}: {
  blocks: BlockConfig[];
  appearance: PageAppearance;
}) {
  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        backgroundColor: appearance.backgroundColor || "#efeeea",
        backgroundImage: appearance.backgroundImage ? `url(${appearance.backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: appearance.fontFamily || 'var(--font-geist-sans)',
        color: "#1e2330"
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgba(233,192,233,0.45),transparent_55%)]" />
      <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-4 py-10 sm:px-6 sm:py-14">
        {blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </main>
    </div>
  );
}
