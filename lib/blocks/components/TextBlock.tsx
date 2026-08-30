import React from "react";
import type { CSSProperties } from "react";
import { BlockConfig } from "../types";

export function TextBlockRenderer({ block }: { block: BlockConfig }) {
  const { html } = block.contentJson;
  const { color = "#000000", alignment = "left" } = block.styleJson;

  return (
    <div 
      className="prose prose-sm w-full rounded-[1.75rem] bg-white px-5 py-4 text-[#1e2330] shadow-[0_12px_28px_rgba(30,35,48,0.06)]"
      style={{ color, textAlign: alignment as CSSProperties["textAlign"] }}
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  );
}

export function TextBlockEditor({ block, updateBlock }: { block: BlockConfig; updateBlock: (updates: Partial<BlockConfig>) => void }) {
  const { html } = block.contentJson;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Content</label>
        <textarea
          className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          value={html || ""}
          onChange={(e) => updateBlock({ contentJson: { ...block.contentJson, html: e.target.value } })}
          placeholder="Use HTML tags..."
        />
      </div>
    </div>
  );
}
