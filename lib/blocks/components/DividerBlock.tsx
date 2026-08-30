import React from "react";
import { BlockConfig } from "../types";

export function DividerBlockRenderer({ block }: { block: BlockConfig }) {
  const {
    thickness = 1,
    color = "#d8d6cf",
    style = "solid",
    width = "full",
  } = block.styleJson;

  return (
    <div className="flex w-full items-center py-2">
      <hr
        className="mx-auto border-0"
        style={{
          height: `${thickness}px`,
          width: width === "narrow" ? "40%" : "100%",
          borderRadius: "999px",
          backgroundImage:
            style === "dashed"
              ? `repeating-linear-gradient(90deg, ${color} 0 10px, transparent 10px 18px)`
              : undefined,
          backgroundColor: style === "dashed" ? "transparent" : color,
        }}
      />
    </div>
  );
}

export function DividerBlockEditor({
  block,
  updateBlock,
}: {
  block: BlockConfig;
  updateBlock: (updates: Partial<BlockConfig>) => void;
}) {
  const {
    thickness = 1,
    color = "#d8d6cf",
    style = "solid",
    width = "full",
  } = block.styleJson;

  const setStyle = (patch: Record<string, unknown>) => {
    updateBlock({ styleJson: { ...block.styleJson, ...patch } });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Thickness</label>
        <input
          type="range"
          min={1}
          max={8}
          value={thickness}
          onChange={(e) => setStyle({ thickness: Number(e.target.value) })}
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Style</label>
        <select
          className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm"
          value={style}
          onChange={(e) => setStyle({ style: e.target.value })}
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Width</label>
        <select
          className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm"
          value={width}
          onChange={(e) => setStyle({ width: e.target.value })}
        >
          <option value="full">Full</option>
          <option value="narrow">Narrow</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Color</label>
        <input
          type="color"
          className="h-8 w-full cursor-pointer"
          value={color}
          onChange={(e) => setStyle({ color: e.target.value })}
        />
      </div>
    </div>
  );
}
