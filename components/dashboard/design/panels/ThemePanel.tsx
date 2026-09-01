"use client";

import React from "react";
import { useDesignEditor, DesignState } from "../DesignProvider";
import { ColorField } from "./ColorField";
import { contrastRatio } from "@/lib/color";
import { Palette, Check, Image as ImageIcon, Trash2 } from "lucide-react";

type Theme = DesignState["theme"];

const THEME_PRESETS: { name: string; theme: Theme, buttonConfig?: Partial<DesignState["buttonConfig"]> }[] = [
  { 
    name: "Porcelain", 
    theme: { background: "#F7F8FA", card: "#FFFFFF", text: "#0F1115", accent: "#C41E3A" },
    buttonConfig: { backgroundColor: "#0F1115", textColor: "#FFFFFF" }
  },
  { 
    name: "Midnight", 
    theme: { background: "#0F1115", card: "#1C1F26", text: "#F5F6F8", accent: "#7C5CFC" },
    buttonConfig: { backgroundColor: "#FFFFFF", textColor: "#0F1115" }
  },
  { 
    name: "Ocean", 
    theme: { background: "#EFF6FF", card: "#FFFFFF", text: "#0B1220", accent: "#2563EB" },
    buttonConfig: { backgroundColor: "#2563EB", textColor: "#FFFFFF" }
  },
  { 
    name: "Forest", 
    theme: { background: "#F0FDF4", card: "#FFFFFF", text: "#14201A", accent: "#16A34A" },
    buttonConfig: { backgroundColor: "#16A34A", textColor: "#FFFFFF" }
  },
  { 
    name: "Sunset", 
    theme: { background: "#FFF7ED", card: "#FFFDFB", text: "#27150A", accent: "#EA580C" },
    buttonConfig: { backgroundColor: "#EA580C", textColor: "#FFFFFF" }
  },
  { 
    name: "Rose", 
    theme: { background: "#FDF2F8", card: "#FFFFFF", text: "#23101A", accent: "#DB2777" },
    buttonConfig: { backgroundColor: "#DB2777", textColor: "#FFFFFF" }
  },
];

const SWATCHES = {
  background: ["#F7F8FA", "#FFFFFF", "#0F1115", "#EFF6FF", "#F0FDF4", "#FFF7ED"],
  card: ["#FFFFFF", "#F7F8FA", "#1C1F26", "#FFFBEB"],
  text: ["#0F1115", "#374151", "#F5F6F8", "#0B1220"],
  accent: ["#C41E3A", "#2563EB", "#16A34A", "#EA580C", "#7C5CFC", "#DB2777"],
};

export function ThemePanel() {
  const { state, updateState } = useDesignEditor();
  const t = state.theme;

  const textContrast = contrastRatio(t.text, t.background);
  const lowContrast = textContrast !== null && textContrast < 4.5;

  const setTheme = (patch: Partial<Theme>) => updateState({ theme: { ...t, ...patch } });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setTheme({ backgroundImage: reader.result as string });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-6">
      {/* Preset themes */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <Palette className="w-4 h-4 text-muted-foreground" />
          Theme Presets
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {THEME_PRESETS.map((preset) => {
            const selected = JSON.stringify(preset.theme) === JSON.stringify(t);
            return (
              <button
                key={preset.name}
                onClick={() => updateState({ 
                  theme: { ...preset.theme },
                  ...(preset.buttonConfig ? { buttonConfig: { ...state.buttonConfig, ...preset.buttonConfig } } : {})
                })}
                className={`relative p-3 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  selected
                    ? "border-primary ring-1 ring-primary bg-primary/5"
                    : "border-border bg-background"
                }`}
              >
                <div
                  className="w-full h-12 rounded-lg mb-2 flex items-center justify-center gap-1.5 border border-border/50"
                  style={{ backgroundColor: preset.theme.background }}
                >
                  <span className="w-5 h-5 rounded-full" style={{ backgroundColor: preset.theme.accent }} />
                  <span
                    className="w-10 h-6 rounded-md shadow-sm"
                    style={{ backgroundColor: preset.theme.card }}
                  />
                </div>
                <span className="text-xs font-semibold">{preset.name}</span>
                {selected && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-sm">
                    <Check className="w-2.5 h-2.5" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Individual color controls */}
      <section className="space-y-4 pt-4 border-t border-border">
        <div className="space-y-2">
          <ColorField
            label="Background Color"
            value={t.background}
            presets={SWATCHES.background}
            onChange={(v) => setTheme({ background: v })}
          />
          <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
            <span className="text-xs font-semibold flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-muted-foreground" />
              Background Image
            </span>
            {t.backgroundImage ? (
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-md border border-border bg-cover bg-center shadow-sm"
                  style={{ backgroundImage: `url(${t.backgroundImage})` }}
                />
                <button 
                  onClick={() => setTheme({ backgroundImage: "" })}
                  className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <div className="px-3 py-1.5 text-xs font-semibold bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                  Upload
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            )}
          </div>
        </div>
        <ColorField
          label="Card"
          value={t.card}
          presets={SWATCHES.card}
          onChange={(v) => setTheme({ card: v })}
        />
        <ColorField
          label="Text"
          value={t.text}
          presets={SWATCHES.text}
          onChange={(v) => setTheme({ text: v })}
          warning={lowContrast ? "Low contrast against the background — may be hard to read" : undefined}
        />
        <ColorField
          label="Accent"
          value={t.accent}
          presets={SWATCHES.accent}
          onChange={(v) => setTheme({ accent: v })}
        />
      </section>
    </div>
  );
}
