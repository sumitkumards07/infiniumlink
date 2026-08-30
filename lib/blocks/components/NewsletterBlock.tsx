"use client";

import React, { useState } from "react";
import { BlockConfig } from "../types";
import { Button } from "@/components/ui/button";

export function NewsletterBlockRenderer({ block }: { block: BlockConfig }) {
  const { heading, description, placeholder, buttonText } = block.contentJson;
  const { background = "#f3f4f6", color = "#000000", radius = "12px" } = block.styleJson;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pageId: (block as any).pageId, blockId: block.id }),
      });
      
      if (!res.ok) throw new Error("Failed to subscribe");
      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div 
      className="w-full p-6 shadow-sm flex flex-col gap-4 text-center"
      style={{ backgroundColor: background, color: color, borderRadius: radius }}
    >
      <div>
        <h3 className="font-bold text-lg">{heading}</h3>
        {description && <p className="text-sm opacity-80 mt-1">{description}</p>}
      </div>

      {status === "success" ? (
        <div className="bg-green-100 text-green-800 p-3 rounded-md text-sm font-medium">
          Thanks for subscribing!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            required
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 rounded-md border px-3 text-sm text-foreground bg-background"
          />
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "..." : buttonText}
          </Button>
          {status === "error" && <p className="text-xs text-red-500 mt-1">Something went wrong.</p>}
        </form>
      )}
    </div>
  );
}

export function NewsletterBlockEditor({ block, updateBlock }: { block: BlockConfig; updateBlock: (updates: Partial<BlockConfig>) => void }) {
  const { heading, description, buttonText } = block.contentJson;
  const { background, color } = block.styleJson;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Heading</label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
          value={heading || ""}
          onChange={(e) => updateBlock({ contentJson: { ...block.contentJson, heading: e.target.value } })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
          value={description || ""}
          onChange={(e) => updateBlock({ contentJson: { ...block.contentJson, description: e.target.value } })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Button Text</label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
          value={buttonText || ""}
          onChange={(e) => updateBlock({ contentJson: { ...block.contentJson, buttonText: e.target.value } })}
        />
      </div>
      
      <div className="pt-4 border-t space-y-4">
        <h4 className="font-medium text-sm">Style</h4>
        <div className="flex gap-4">
          <div className="space-y-1 w-full">
            <label className="text-xs">Background</label>
            <input
              type="color"
              className="h-8 w-full cursor-pointer"
              value={background || "#f3f4f6"}
              onChange={(e) => updateBlock({ styleJson: { ...block.styleJson, background: e.target.value } })}
            />
          </div>
          <div className="space-y-1 w-full">
            <label className="text-xs">Text</label>
            <input
              type="color"
              className="h-8 w-full cursor-pointer"
              value={color || "#000000"}
              onChange={(e) => updateBlock({ styleJson: { ...block.styleJson, color: e.target.value } })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
