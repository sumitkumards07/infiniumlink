"use client";

import React from "react";
import { useEditor } from "./EditorProvider";
import { blockRegistry } from "@/lib/blocks/registry";
import { BlockConfig, BlockType } from "@/lib/blocks/types";
import { addBlockAction } from "@/app/dashboard/editor/actions";

export function SidebarLeft() {
  const { page, blocks, setBlocks, setSelectedBlockId } = useEditor();

  const handleAddBlock = async (type: BlockType) => {
    const tempId = `temp-${crypto.randomUUID()}`;
    const def = blockRegistry[type];
    
    const newBlock: BlockConfig = {
      id: tempId,
      type,
      position: blocks.length,
      contentJson: def.defaultConfig.contentJson || {},
      styleJson: def.defaultConfig.styleJson || {},
      layoutJson: def.defaultConfig.layoutJson || {},
      animationJson: def.defaultConfig.animationJson || {},
      visibilityJson: def.defaultConfig.visibilityJson || {},
    };
    
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(tempId);
    
    try {
      const realId = await addBlockAction(page.id, type);
      // Wait for revalidation
      setSelectedBlockId(realId);
    } catch(e) {
      console.error(e);
      setBlocks(blocks.filter(b => b.id !== tempId));
    }
  };

  return (
    <div className="flex h-full flex-col rounded-[1.75rem] border border-[#ebe8df] bg-white">
      <div className="border-b border-[#f0ede4] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b8f83]">Blocks</p>
        <h2 className="mt-2 text-xl font-black tracking-[-0.04em] text-[#1e2330]">Add content</h2>
        <p className="mt-2 text-sm leading-6 text-[#676b5f]">Choose a block to add it to the live page.</p>
      </div>
      <div className="space-y-3 overflow-y-auto p-4">
        {(Object.keys(blockRegistry) as BlockType[]).map((type) => {
          const def = blockRegistry[type];
          const Icon = def.icon;
          return (
            <button
              key={type}
              onClick={() => handleAddBlock(type)}
              className="flex w-full items-center gap-3 rounded-[1.25rem] border border-[#ebe8df] bg-[#f7f6f2] p-4 text-left transition-all hover:-translate-y-0.5 hover:border-[#d8d6cf] hover:bg-white"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#1e2330] shadow-[0_8px_20px_rgba(30,35,48,0.06)]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-sm font-black tracking-[-0.02em] text-[#1e2330]">{def.label}</span>
                <span className="block text-xs text-[#8b8f83]">Add to page</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
