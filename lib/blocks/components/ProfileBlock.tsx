import React from "react";
import { BlockConfig } from "../types";
import Image from "next/image";

export function ProfileBlockRenderer({ block }: { block: BlockConfig }) {
  const { name, bio, avatarUrl } = block.contentJson;
  const { alignment = "center" } = block.styleJson;

  const alignClass = alignment === "left" ? "items-start text-left" : alignment === "right" ? "items-end text-right" : "items-center text-center";

  return (
    <div className={`flex w-full flex-col rounded-[2rem] bg-[#1e2330] px-6 py-8 text-white shadow-[0_18px_45px_rgba(30,35,48,0.18)] ${alignClass}`}>
      {avatarUrl ? (
        <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white/10">
          <Image src={avatarUrl} alt={name || "Avatar"} fill className="object-cover" />
        </div>
      ) : (
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#d2e823] text-2xl font-black text-[#1e2330]">
          {(name || "U").charAt(0).toUpperCase()}
        </div>
      )}
      {name && <h1 className="text-[1.7rem] font-black tracking-[-0.05em]">{name}</h1>}
      {bio && <p className="mt-3 max-w-md whitespace-pre-wrap text-sm leading-6 text-white/75">{bio}</p>}
    </div>
  );
}

export function ProfileBlockEditor({ block, updateBlock }: { block: BlockConfig; updateBlock: (updates: Partial<BlockConfig>) => void }) {
  const { name, bio } = block.contentJson;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Name</label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          value={name || ""}
          onChange={(e) => updateBlock({ contentJson: { ...block.contentJson, name: e.target.value } })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Bio</label>
        <textarea
          className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          value={bio || ""}
          onChange={(e) => updateBlock({ contentJson: { ...block.contentJson, bio: e.target.value } })}
        />
      </div>
    </div>
  );
}
