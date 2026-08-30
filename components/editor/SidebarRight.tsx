"use client";

import React from "react";
import { useEditor } from "./EditorProvider";
import { blockRegistry } from "@/lib/blocks/registry";
import { updateBlockAction, deleteBlockAction } from "@/app/dashboard/editor/actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { GlobalAppearancePanel } from "./GlobalAppearancePanel";

export function SidebarRight() {
  const { blocks, setBlocks, selectedBlockId, setSelectedBlockId } = useEditor();

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  if (!selectedBlock) {
    return (
      <div className="flex h-full flex-col overflow-y-auto rounded-[1.75rem] border border-[#ebe8df] bg-white">
        <div className="sticky top-0 z-10 border-b border-[#f0ede4] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b8f83]">Page Settings</p>
          <h2 className="mt-2 text-xl font-black tracking-[-0.04em] text-[#1e2330]">Global appearance</h2>
        </div>
        <div className="p-5">
          <GlobalAppearancePanel />
        </div>
      </div>
    );
  }

  const def = blockRegistry[selectedBlock.type];
  const EditorComponent = def.editor;

  const updateBlock = async (updates: Partial<typeof selectedBlock>) => {
    // Optimistic
    setBlocks(blocks.map(b => b.id === selectedBlockId ? { ...b, ...updates } : b));
    
    // Server
    try {
      await updateBlockAction(selectedBlockId, updates);
    } catch(e) {
      console.error("Failed to update block", e);
    }
  };

  const handleDelete = async () => {
    setBlocks(blocks.filter(b => b.id !== selectedBlockId));
    setSelectedBlockId(null);
    try {
      await deleteBlockAction(selectedBlockId);
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-y-auto rounded-[1.75rem] border border-[#ebe8df] bg-white">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#f0ede4] bg-white p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b8f83]">Selected block</p>
          <h2 className="mt-2 text-xl font-black tracking-[-0.04em] text-[#1e2330] capitalize">
            {def.label} settings
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          className="rounded-full bg-[#fff2f2] text-destructive hover:bg-[#ffe4e4]"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-5">
        <EditorComponent block={selectedBlock} updateBlock={updateBlock} />
      </div>
    </div>
  );
}
