"use client";

import React from "react";
import { SidebarLeft } from "./SidebarLeft";
import { SidebarRight } from "./SidebarRight";
import { LiveCanvas } from "./LiveCanvas";
import { EditorHeader } from "./EditorHeader";

export function EditorLayout({ username }: { username: string }) {
  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden bg-transparent">
      <EditorHeader username={username} />
      <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden md:grid-cols-[280px_minmax(0,1fr)_320px] xl:grid-cols-[300px_minmax(0,1fr)_340px]">
        <div className="hidden md:block">
          <SidebarLeft />
        </div>

        <div className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#ebe8df] bg-[#f7f6f2]">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#f0ede4] bg-[#f7f6f2] px-5 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b8f83]">Preview</p>
              <p className="mt-1 text-sm font-semibold text-[#676b5f]">Desktop and mobile builder canvas</p>
            </div>
            <div className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#676b5f] shadow-[0_8px_20px_rgba(30,35,48,0.06)]">
              Live
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <LiveCanvas />
          </div>
        </div>

        <div className="hidden md:block">
          <SidebarRight />
        </div>
      </div>
    </div>
  );
}
