"use client";

import React from "react";
import { useDesignEditor } from "../DesignProvider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";

export function SeoPanel() {
  const { state, updateState } = useDesignEditor();

  const slug =
    state.displayName.replace(/^@/, "").trim().toLowerCase().replace(/[^a-z0-9_]+/g, "") ||
    "username";

  return (
    <div className="space-y-6">
      {/* SEO title */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            SEO Title
          </h3>
          <span
            className={`text-[10px] font-mono ${
              state.seoTitle.length >= 60 ? "text-amber-600" : "text-muted-foreground"
            }`}
          >
            {state.seoTitle.length}/60
          </span>
        </div>
        <Input
          value={state.seoTitle}
          maxLength={60}
          onChange={(e) => updateState({ seoTitle: e.target.value })}
          placeholder={`${state.displayName || "@username"} — My Links`}
          className="h-10 rounded-xl bg-background"
        />
        <p className="text-[11px] text-muted-foreground">
          Shown as the clickable headline in search results. Keep it under 60 characters.
        </p>
      </section>

      {/* SEO description */}
      <section className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold">SEO Description</h3>
          <span
            className={`text-[10px] font-mono ${
              state.seoDescription.length >= 160 ? "text-amber-600" : "text-muted-foreground"
            }`}
          >
            {state.seoDescription.length}/160
          </span>
        </div>
        <Textarea
          value={state.seoDescription}
          maxLength={160}
          onChange={(e) => updateState({ seoDescription: e.target.value })}
          placeholder="A short summary of your page for search engines…"
          className="resize-none h-24 rounded-xl bg-background"
        />
      </section>

      {/* Search snippet preview */}
      <section className="space-y-3 pt-4 border-t border-border">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Search Preview
        </h3>
        <div className="rounded-2xl border border-border bg-background p-4">
          <p className="text-xs text-[#202124]">
            infinium.link <span className="text-[#5f6368]">› {slug}</span>
          </p>
          <p className="text-[15px] text-[#1a0dab] leading-snug mt-1 truncate">
            {state.seoTitle || `${state.displayName || "@username"} — My Links`}
          </p>
          <p className="text-xs text-[#4d5156] mt-1 line-clamp-2">
            {state.seoDescription ||
              "Add a description to control how your page appears in search engines."}
          </p>
        </div>
      </section>
    </div>
  );
}
