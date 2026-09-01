import React from "react";
import type { LayoutStyle } from "./DesignProvider";

/**
 * Distinct mini illustration for each layout style, used by both the
 * desktop grid cards and the mobile swipeable carousel.
 */
export function LayoutThumbnail({ id }: { id: LayoutStyle }) {
  switch (id) {
    case "Classic":
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-border" />
          <div className="w-12 h-1.5 bg-border rounded-full" />
          <div className="w-9 h-1 bg-border/50 rounded-full" />
          <div className="w-14 h-2.5 bg-border/40 rounded-full mt-1" />
          <div className="w-14 h-2.5 bg-border/40 rounded-full" />
        </div>
      );
    case "Hero":
      return (
        <div className="w-full h-full flex flex-col items-center">
          <div className="w-full h-1/2 rounded-md bg-gradient-to-b from-primary/25 to-transparent flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-border ring-2 ring-background" />
          </div>
          <div className="w-14 h-1.5 bg-border rounded-full mt-1.5" />
          <div className="w-10 h-1 bg-border/50 rounded-full mt-1" />
        </div>
      );
    case "Banner":
      return (
        <div className="w-full h-full flex flex-col items-center justify-center px-2">
          <div className="w-full h-8 rounded-md bg-border/40 relative flex items-center pl-7">
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-border ring-2 ring-background" />
            <div className="flex flex-col gap-1">
              <div className="w-10 h-1.5 bg-border rounded-full" />
              <div className="w-7 h-1 bg-border/50 rounded-full" />
            </div>
          </div>
          <div className="w-full h-2.5 bg-border/40 rounded-full mt-2" />
        </div>
      );
    case "Cutout":
      return (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-border -mb-3 z-10 ring-2 ring-background" />
          <div className="w-16 h-10 rounded-t-xl rounded-b-md bg-border/40 flex flex-col items-center pt-4 gap-1">
            <div className="w-9 h-1.5 bg-border rounded-full" />
            <div className="w-6 h-1 bg-border/50 rounded-full" />
          </div>
        </div>
      );
    case "Shape":
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-16 h-11 bg-border/40 rotate-3 rounded-[10px_3px_10px_3px] flex flex-col items-center justify-center gap-1">
            <div className="w-5 h-5 rounded-full bg-border" />
            <div className="w-9 h-1.5 bg-border rounded-full" />
          </div>
        </div>
      );
  }
}
