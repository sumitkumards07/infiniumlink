"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlockConfig } from "@/lib/blocks/types";
import { BlockRenderer } from "@/lib/blocks/BlockRenderer";
import { GripVertical } from "lucide-react";
import { useEditor } from "./EditorProvider";

export function SortableBlock({ block }: { block: BlockConfig }) {
  const { selectedBlockId, setSelectedBlockId } = useEditor();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  const isSelected = selectedBlockId === block.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => setSelectedBlockId(block.id)}
      className={`group relative rounded-xl border-2 transition-all ${
        isSelected ? "border-primary ring-4 ring-primary/10" : "border-transparent hover:border-border"
      }`}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-10 top-1/2 -translate-y-1/2 p-2 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="bg-background w-full pointer-events-none">
        {/* We make pointer-events-none inside the editor shell so clicks select the block instead of triggering block links */}
        <BlockRenderer block={block} />
      </div>
    </div>
  );
}
