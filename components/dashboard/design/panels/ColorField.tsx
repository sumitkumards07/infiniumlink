"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  presets: string[];
  /** Optional non-blocking warning rendered below the row (e.g. low contrast). */
  warning?: string;
}

/** Label + preset swatches + hex input. Used by Theme and Buttons panels. */
export function ColorField({ label, value, onChange, presets, warning }: ColorFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-3">
        <span className="w-20 shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <div className="flex items-center gap-1 flex-1 flex-wrap">
          {presets.map((color) => {
            const selected = value.toUpperCase() === color.toUpperCase();
            return (
              <button
                key={color}
                onClick={() => onChange(color)}
                aria-label={`${label}: ${color}`}
                className={`w-9 h-9 p-1 rounded-full transition-transform hover:scale-110 active:scale-95 ${
                  selected ? "ring-2 ring-primary ring-offset-1 ring-offset-card" : ""
                }`}
              >
                <span
                  className="block w-full h-full rounded-full border border-border shadow-sm"
                  style={{ backgroundColor: color }}
                />
              </button>
            );
          })}
        </div>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-24 shrink-0 text-xs font-mono rounded-lg bg-background"
          spellCheck={false}
        />
      </div>
      {warning && (
        <p className="flex items-center gap-1.5 text-[11px] font-medium text-amber-600 animate-in fade-in duration-200">
          <AlertTriangle className="w-3 h-3 shrink-0" />
          {warning}
        </p>
      )}
    </div>
  );
}
