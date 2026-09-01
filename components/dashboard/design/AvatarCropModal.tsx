"use client";

import React, { useCallback, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";

const CROP_SIZE = 256;
const OUTPUT_SIZE = 512;

interface AvatarCropModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Optional pre-loaded image; when omitted the modal opens on the upload step. */
  initialImage?: string | null;
  onSave: (dataUrl: string) => void;
}

export function AvatarCropModal({
  open,
  onOpenChange,
  initialImage = null,
  onSave,
}: AvatarCropModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {/* Keyed body remounts fresh on every open / new image (no reset effect needed) */}
        {open && (
          <AvatarCropBody
            key={initialImage ?? "upload"}
            initialImage={initialImage}
            onOpenChange={onOpenChange}
            onSave={onSave}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function AvatarCropBody({
  initialImage,
  onOpenChange,
  onSave,
}: {
  initialImage: string | null;
  onOpenChange: (open: boolean) => void;
  onSave: (dataUrl: string) => void;
}) {
  const [image, setImage] = useState<string | null>(initialImage);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadFile = useCallback((file: File | undefined | null) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setZoom(1);
      setPos({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!image) return;
    e.preventDefault();
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, posX: pos.x, posY: pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setPos({
      x: dragStart.current.posX + (e.clientX - dragStart.current.x),
      y: dragStart.current.posY + (e.clientY - dragStart.current.y),
    });
  };

  const endDrag = () => setDragging(false);

  const saveCrop = useCallback(() => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = OUTPUT_SIZE;
      canvas.height = OUTPUT_SIZE;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      // Mirror the on-screen CSS: object-cover fit at zoom 1, scaled around the
      // center by `zoom`, then translated by `pos` in stage pixels.
      const baseScale = Math.max(CROP_SIZE / img.width, CROP_SIZE / img.height);
      const w = img.width * baseScale * zoom;
      const h = img.height * baseScale * zoom;
      const k = OUTPUT_SIZE / CROP_SIZE;
      const drawX = (CROP_SIZE / 2 + pos.x - w / 2) * k;
      const drawY = (CROP_SIZE / 2 + pos.y - h / 2) * k;
      ctx.drawImage(img, drawX, drawY, w * k, h * k);
      onSave(canvas.toDataURL("image/png"));
      onOpenChange(false);
    };
    img.src = image;
  }, [image, zoom, pos, onSave, onOpenChange]);

  return (
    <>
      <DialogHeader>
          <DialogTitle>{image ? "Crop Profile Image" : "Upload Profile Image"}</DialogTitle>
          <DialogDescription>
            {image
              ? "Zoom and drag to position your image inside the circle, then save."
              : "Drag and drop an image here, or click to browse your files."}
          </DialogDescription>
        </DialogHeader>

        {!image ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              loadFile(e.dataTransfer.files?.[0]);
            }}
            className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-colors ${
              dragOver
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/40 hover:bg-muted/40"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <ImagePlus className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold">Drop your image here</p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG or JPG — at least 400×400 recommended
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                loadFile(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5">
            {/* Circular crop stage */}
            <div
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className={`relative overflow-hidden rounded-full bg-muted select-none touch-none ${
                dragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{ width: CROP_SIZE, height: CROP_SIZE }}
            >
              <img
                src={image}
                alt="Avatar crop preview"
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom})` }}
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10 pointer-events-none" />
            </div>

            {/* Zoom slider */}
            <div className="w-full flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground w-10 shrink-0">
                Zoom
              </span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
                aria-label="Zoom"
              />
            </div>

            <div className="flex w-full items-center justify-between">
              <Button
                variant="ghost"
                className="rounded-full text-xs text-muted-foreground"
                onClick={() => {
                  setImage(null);
                  setZoom(1);
                  setPos({ x: 0, y: 0 });
                }}
              >
                Change Image
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-full px-6" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button className="rounded-full px-6" onClick={saveCrop}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
