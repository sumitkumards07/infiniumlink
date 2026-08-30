import React from "react";
import { BlockConfig } from "../types";

export function LinkBlockRenderer({ block }: { block: BlockConfig }) {
  const { title } = block.contentJson;
  const { buttonStyle = "pill", background = "#ffffff", color = "#1e2330" } = block.styleJson;

  const radius = buttonStyle === "pill" ? "9999px" : buttonStyle === "square" ? "0px" : "22px";

  return (
    <a
      href={`/go/${block.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full text-center transition-transform duration-150 hover:scale-[1.02]"
      style={{ 
        backgroundColor: background, 
        color: color,
        border: "1px solid #d8d6cf",
        borderRadius: radius,
        padding: "18px 20px",
        boxShadow: "0 14px 30px rgba(30, 35, 48, 0.08)",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <span style={{ fontSize: "15px", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.3px" }}>{title}</span>
    </a>
  );
}

export function LinkBlockEditor({ block, updateBlock }: { block: BlockConfig; updateBlock: (updates: Partial<BlockConfig>) => void }) {
  const { title, url } = block.contentJson;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          value={title || ""}
          onChange={(e) => updateBlock({ contentJson: { ...block.contentJson, title: e.target.value } })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">URL</label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          value={url || ""}
          onChange={(e) => updateBlock({ contentJson: { ...block.contentJson, url: e.target.value } })}
        />
      </div>
    </div>
  );
}
