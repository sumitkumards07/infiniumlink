import React from "react";
import {
  AtSign,
  Briefcase,
  Camera,
  Code2,
  Globe,
  Mail,
  Music2,
  Play,
} from "lucide-react";
import { BlockConfig } from "../types";

type SocialPlatform =
  | "instagram"
  | "youtube"
  | "tiktok"
  | "x"
  | "linkedin"
  | "github"
  | "website"
  | "email";

type SocialLink = {
  id: string;
  platform: SocialPlatform;
  url: string;
};

export const SOCIAL_PLATFORMS: {
  id: SocialPlatform;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: "instagram", label: "Instagram", icon: Camera },
  { id: "youtube", label: "YouTube", icon: Play },
  { id: "tiktok", label: "TikTok", icon: Music2 },
  { id: "x", label: "X", icon: AtSign },
  { id: "linkedin", label: "LinkedIn", icon: Briefcase },
  { id: "github", label: "GitHub", icon: Code2 },
  { id: "website", label: "Website", icon: Globe },
  { id: "email", label: "Email", icon: Mail },
];

function hrefForLink(link: SocialLink) {
  if (!link.url) return undefined;
  if (link.platform === "email" && !link.url.startsWith("mailto:")) {
    return `mailto:${link.url}`;
  }
  return link.url;
}

export function SocialBlockRenderer({ block }: { block: BlockConfig }) {
  const links = ((block.contentJson.links as SocialLink[]) || []).filter((link) => link.url);
  const { color = "#1e2330", background = "#ffffff" } = block.styleJson;

  if (links.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-[#d8d6cf] bg-white/80 px-5 py-4 text-center text-sm text-[#8b8f83]">
        Add social links in the editor
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {links.map((link) => {
        const platform = SOCIAL_PLATFORMS.find((item) => item.id === link.platform);
        const Icon = platform?.icon || Globe;
        const href = hrefForLink(link);

        return (
          <a
            key={link.id}
            href={href}
            target={link.platform === "email" ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 rounded-2xl px-3 py-4 shadow-[0_10px_18px_rgba(30,35,48,0.06)] transition-transform duration-150 hover:scale-[1.03]"
            style={{ backgroundColor: background, color }}
          >
            <Icon className="size-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.18em]">
              {platform?.label || link.platform}
            </span>
          </a>
        );
      })}
    </div>
  );
}

export function SocialBlockEditor({
  block,
  updateBlock,
}: {
  block: BlockConfig;
  updateBlock: (updates: Partial<BlockConfig>) => void;
}) {
  const links = ((block.contentJson.links as SocialLink[]) || []);
  const { color = "#1e2330", background = "#ffffff" } = block.styleJson;

  const updateLinks = (next: SocialLink[]) => {
    updateBlock({ contentJson: { ...block.contentJson, links: next } });
  };

  const addLink = () => {
    updateLinks([
      ...links,
      { id: crypto.randomUUID(), platform: "instagram", url: "" },
    ]);
  };

  return (
    <div className="space-y-4">
      {links.map((link, index) => (
        <div key={link.id} className="space-y-2 rounded-xl border border-[#ebe8df] p-3">
          <div className="flex items-center justify-between gap-2">
            <select
              className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm"
              value={link.platform}
              onChange={(e) => {
                const next = [...links];
                next[index] = { ...link, platform: e.target.value as SocialPlatform };
                updateLinks(next);
              }}
            >
              {SOCIAL_PLATFORMS.map((platform) => (
                <option key={platform.id} value={platform.id}>
                  {platform.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="shrink-0 text-xs font-semibold text-destructive"
              onClick={() => updateLinks(links.filter((item) => item.id !== link.id))}
            >
              Remove
            </button>
          </div>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            value={link.url || ""}
            placeholder={link.platform === "email" ? "you@email.com" : "https://"}
            onChange={(e) => {
              const next = [...links];
              next[index] = { ...link, url: e.target.value };
              updateLinks(next);
            }}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addLink}
        className="w-full rounded-xl border border-dashed border-[#d8d6cf] px-4 py-3 text-sm font-semibold text-[#676b5f] hover:bg-[#f7f6f2]"
      >
        Add social link
      </button>

      <div className="space-y-4 border-t pt-4">
        <h4 className="text-sm font-medium">Style</h4>
        <div className="flex gap-4">
          <div className="w-full space-y-1">
            <label className="text-xs">Background</label>
            <input
              type="color"
              className="h-8 w-full cursor-pointer"
              value={background}
              onChange={(e) =>
                updateBlock({ styleJson: { ...block.styleJson, background: e.target.value } })
              }
            />
          </div>
          <div className="w-full space-y-1">
            <label className="text-xs">Icon</label>
            <input
              type="color"
              className="h-8 w-full cursor-pointer"
              value={color}
              onChange={(e) =>
                updateBlock({ styleJson: { ...block.styleJson, color: e.target.value } })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
