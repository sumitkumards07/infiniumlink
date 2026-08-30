import React from "react";

export type BlockType = "profile" | "link" | "text" | "social" | "video" | "divider" | "newsletter";

export interface BlockConfig {
  id: string;
  type: BlockType;
  position: number;
  contentJson: Record<string, any>;
  styleJson: Record<string, any>;
  layoutJson: Record<string, any>;
  animationJson: Record<string, any>;
  visibilityJson: Record<string, any>;
}

export interface BlockDef {
  type: BlockType;
  label: string;
  icon: React.ElementType; // Lucide icon
  defaultConfig: Partial<BlockConfig>;
  // Component rendered on the public page / live preview
  render: React.FC<{ block: BlockConfig }>;
  // Component rendered in the right sidebar when this block is selected
  editor: React.FC<{ block: BlockConfig; updateBlock: (updates: Partial<BlockConfig>) => void }>;
}
