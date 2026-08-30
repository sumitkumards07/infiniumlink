import React from "react";
import { BlockConfig } from "../types";

function getEmbedSrc(url: string) {
  if (!url) return null;

  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      const shorts = parsed.pathname.match(/^\/shorts\/([^/]+)/);
      if (shorts?.[1]) return `https://www.youtube.com/embed/${shorts[1]}`;
      const embed = parsed.pathname.match(/^\/embed\/([^/]+)/);
      if (embed?.[1]) return `https://www.youtube.com/embed/${embed[1]}`;
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }

  return null;
}

export function VideoBlockRenderer({ block }: { block: BlockConfig }) {
  const { url, caption } = block.contentJson;
  const { radius = "24px" } = block.styleJson;
  const embedSrc = getEmbedSrc(url || "");

  if (!url) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-[#d8d6cf] bg-white px-5 py-10 text-center text-sm text-[#8b8f83]">
        Paste a YouTube or Vimeo URL
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden bg-white shadow-[0_12px_28px_rgba(30,35,48,0.08)]" style={{ borderRadius: radius }}>
      {embedSrc ? (
        <div className="relative aspect-video w-full bg-[#1e2330]">
          <iframe
            src={embedSrc}
            title={caption || "Video"}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex aspect-video items-center justify-center bg-[#1e2330] px-6 text-center text-sm font-semibold text-white"
        >
          Open video
        </a>
      )}
      {caption && (
        <p className="px-4 py-3 text-center text-sm font-medium text-[#676b5f]">{caption}</p>
      )}
    </div>
  );
}

export function VideoBlockEditor({
  block,
  updateBlock,
}: {
  block: BlockConfig;
  updateBlock: (updates: Partial<BlockConfig>) => void;
}) {
  const { url, caption } = block.contentJson;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Video URL</label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          value={url || ""}
          placeholder="https://youtube.com/watch?v=..."
          onChange={(e) =>
            updateBlock({ contentJson: { ...block.contentJson, url: e.target.value } })
          }
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Caption</label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          value={caption || ""}
          onChange={(e) =>
            updateBlock({ contentJson: { ...block.contentJson, caption: e.target.value } })
          }
        />
      </div>
    </div>
  );
}
