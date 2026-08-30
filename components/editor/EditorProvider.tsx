"use client";

import React, { createContext, useContext, useState } from "react";
import { type pages } from "@/db/schema";
import { BlockConfig } from "@/lib/blocks/types";

type Page = typeof pages.$inferSelect;

interface EditorContextType {
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
  blocks: BlockConfig[];
  setBlocks: React.Dispatch<React.SetStateAction<BlockConfig[]>>;
  selectedBlockId: string | null;
  setSelectedBlockId: React.Dispatch<React.SetStateAction<string | null>>;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({
  children,
  initialPage,
  initialBlocks,
}: {
  children: React.ReactNode;
  initialPage: Page;
  initialBlocks: BlockConfig[];
}) {
  const [page, setPage] = useState<Page>(initialPage);
  const [blocks, setBlocks] = useState<BlockConfig[]>(initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  return (
    <EditorContext.Provider
      value={{ page, setPage, blocks, setBlocks, selectedBlockId, setSelectedBlockId }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
}
