"use client";

import React from "react";
import { useEditor } from "./EditorProvider";
import { updatePageAppearanceAction } from "@/app/dashboard/editor/actions";

type PageAppearance = {
  backgroundColor?: string;
  backgroundImage?: string;
};

export function GlobalAppearancePanel() {
  const { page, setPage } = useEditor();
  const appearance = (page.appearanceJson as PageAppearance | null) ?? {};

  const handleUpdate = async (updates: PageAppearance) => {
    const newAppearance = { ...appearance, ...updates };
    setPage({ ...page, appearanceJson: newAppearance });
    try {
      await updatePageAppearanceAction(page.id, newAppearance);
    } catch (e) {
      console.error(e);
      // Revert if error
    }
  };

  const bgOptions = [
    { label: "Warm Sand", value: "#efeeea" },
    { label: "Ink", value: "#1e2330" },
    { label: "Soft Stone", value: "#f7f6f2" },
    { label: "Lilac", value: "#e9c0e9" },
    { label: "Moss Glow", value: "#d2e823" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-black tracking-[-0.02em] text-[#1e2330]">Background color</h3>
        <div className="grid grid-cols-2 gap-2">
          {bgOptions.map((bg) => (
            <button
              key={bg.value}
              onClick={() => handleUpdate({ backgroundColor: bg.value, backgroundImage: "" })}
              className={`flex flex-col items-center justify-center rounded-[1.25rem] border p-3 transition-colors ${
                appearance.backgroundColor === bg.value
                  ? "border-[#1e2330] bg-[#f7f6f2]"
                  : "border-transparent bg-[#f7f6f2] hover:border-[#d8d6cf] hover:bg-white"
              }`}
            >
              <div className="mb-2 h-8 w-full rounded-xl border border-black/10 shadow-sm" style={{ backgroundColor: bg.value }} />
              <span className="text-xs font-semibold text-[#676b5f]">{bg.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-black tracking-[-0.02em] text-[#1e2330]">Custom background URL</h3>
        <input
          type="text"
          placeholder="https://images.unsplash.com/..."
          className="flex h-12 w-full rounded-2xl border border-[#dfddd5] bg-[#f7f6f2] px-4 py-2 text-sm text-[#1e2330] focus:outline-none focus:ring-1 focus:ring-[#1e2330]"
          value={appearance.backgroundImage || ""}
          onChange={(e) => handleUpdate({ backgroundImage: e.target.value })}
        />
        <p className="text-xs text-[#8b8f83]">Overrides the selected background color.</p>
      </div>

      <div className="space-y-3 border-t border-[#f0ede4] pt-6">
        <h3 className="text-sm font-black tracking-[-0.02em] text-[#676b5f]">Responsive mode</h3>
        <p className="text-xs text-[#8b8f83]">Per-device overrides can layer on top of this theme later.</p>
      </div>
    </div>
  );
}
