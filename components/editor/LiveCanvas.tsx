"use client";

import React from "react";
import { useEditor } from "./EditorProvider";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableBlock } from "./SortableBlock";
import { updateBlockPositionsAction } from "@/app/dashboard/editor/actions";

type PageAppearance = {
  backgroundColor?: string;
  backgroundImage?: string;
};

export function LiveCanvas() {
  const { page, blocks, setBlocks, setSelectedBlockId } = useEditor();
  const appearance = (page.appearanceJson ?? {}) as PageAppearance;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        
        const newArray = arrayMove(items, oldIndex, newIndex);
        
        // Push update to server
        const orderedIds = newArray.map(b => b.id);
        updateBlockPositionsAction(orderedIds).catch(console.error);

        return newArray;
      });
    }
  };

  return (
    <div 
      className="relative mx-auto min-h-[700px] max-w-[420px] overflow-hidden rounded-[3rem] border-[14px] border-[#1e2330] bg-[#efeeea] shadow-[0_30px_80px_rgba(30,35,48,0.22)]"
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedBlockId(null);
      }}
    >
      <div className="absolute left-1/2 top-3 z-10 h-6 w-32 -translate-x-1/2 rounded-full bg-[#1e2330]" />
      <div 
        className="h-full w-full overflow-y-auto bg-[#efeeea] px-4 py-10"
        style={{
          backgroundColor: appearance.backgroundColor || "#efeeea",
          backgroundImage: appearance.backgroundImage ? `url(${appearance.backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
            <div
              className="flex min-h-[500px] flex-col gap-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedBlockId(null);
              }}
            >
              {blocks.map((block) => (
                <SortableBlock key={block.id} block={block} />
              ))}
              
              {blocks.length === 0 && (
                <div className="flex flex-1 items-center justify-center rounded-[1.75rem] border-2 border-dashed border-[#d8d6cf] bg-white/75 p-8 text-center text-[#8b8f83]">
                  <p>No blocks yet.<br/>Add a block from the left menu.</p>
                </div>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
