"use client";

import React, { useState } from "react";
import { useEditor } from "./EditorProvider";
import { publishPageAction } from "@/app/dashboard/editor/actions";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { ExternalLink, QrCode, UploadCloud, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AIPageBuilderModal } from "./AIPageBuilderModal";

export function EditorHeader({ username }: { username: string }) {
  const { page } = useEditor();
  const [isPublishing, setIsPublishing] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [published, setPublished] = useState(page.isPublished);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const publicPath = `/${username}`;
  const publicUrl = `${appUrl}${publicPath}`;

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await publishPageAction(page.id);
      setPublished(true);
      setTimeout(() => setPublished(false), 3000); // Reset success state after 3s
    } catch (e) {
      console.error("Publish failed", e);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="flex shrink-0 items-center justify-between rounded-[1.5rem] border border-[#ebe8df] bg-[#f7f6f2] px-4 py-3">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b8f83]">Editor</p>
          <h1 className="text-lg font-black tracking-[-0.04em] text-[#1e2330]">Build your page</h1>
        </div>
        <Link
          href={publicPath}
          target="_blank"
          className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#676b5f] shadow-[0_8px_20px_rgba(30,35,48,0.06)] transition-colors hover:text-[#1e2330] md:flex"
        >
          {publicUrl}
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAI(true)}
          className="hidden rounded-full border-[#d7c5d5] bg-[#f3e6f3] text-[#6a31a3] hover:bg-[#ecd7ec] md:flex"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          AI Builder
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowQR(true)}
          className="rounded-full border-[#d8d6cf] bg-white text-[#1e2330] hover:bg-[#f1f0ea]"
        >
          <QrCode className="h-4 w-4 mr-2" />
          QR Code
        </Button>
        <Button
          size="sm"
          onClick={handlePublish}
          disabled={isPublishing || published}
          className={
            published
              ? "rounded-full bg-emerald-600 hover:bg-emerald-700"
              : "rounded-full bg-[#d2e823] text-[#1e2330] hover:bg-[#c5dc18]"
          }
        >
          {published ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Published
            </>
          ) : (
            <>
              <UploadCloud className="h-4 w-4 mr-2" />
              {isPublishing ? "Publishing..." : "Publish"}
            </>
          )}
        </Button>
      </div>

      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="border-[#ebe8df] bg-[#fcfcfa] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black tracking-[-0.04em] text-[#1e2330]">Your QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6 gap-6">
            <div className="rounded-[1.5rem] bg-white p-4 shadow-[0_12px_28px_rgba(30,35,48,0.08)]">
              <QRCodeSVG value={publicUrl} size={256} level="H" includeMargin={true} />
            </div>
            <p className="text-center text-sm leading-6 text-[#676b5f]">
              Scan this code to visit your public profile.<br />
              Right-click the image to save it.
            </p>
          </div>
        </DialogContent>
      </Dialog>
      
      <AIPageBuilderModal open={showAI} onOpenChange={setShowAI} />
    </div>
  );
}
