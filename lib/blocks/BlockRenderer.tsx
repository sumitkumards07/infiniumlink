import React from "react";
import { BlockConfig } from "./types";
import { blockRegistry } from "./registry";

export function BlockRenderer({ block }: { block: BlockConfig }) {
  const def = blockRegistry[block.type];

  if (!def) {
    return <div className="p-4 bg-red-100 text-red-700">Unknown block type: {block.type}</div>;
  }

  // Merge default config with saved config
  const mergedBlock: BlockConfig = {
    ...block,
    contentJson: { ...def.defaultConfig.contentJson, ...block.contentJson },
    styleJson: { ...def.defaultConfig.styleJson, ...block.styleJson },
    layoutJson: { ...def.defaultConfig.layoutJson, ...block.layoutJson },
    animationJson: { ...def.defaultConfig.animationJson, ...block.animationJson },
    visibilityJson: { ...def.defaultConfig.visibilityJson, ...block.visibilityJson },
  };

  const Renderer = def.render;

  // We can inject global layout wrappers here if needed (e.g. margin/padding from layoutJson)
  
  return (
    <div className="w-full relative group">
      <Renderer block={mergedBlock} />
    </div>
  );
}
