"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { generateAIPageAction } from "@/app/dashboard/editor/actions";
import { useEditor } from "./EditorProvider";

export function AIPageBuilderModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const { page } = useEditor();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError("");

    try {
      await generateAIPageAction(page.id, prompt);
      onOpenChange(false); // Close on success
      // The page will automatically reload/refresh blocks since server action revalidates path
      // In a real app we might want to refresh the EditorContext blocks manually, 
      // but revalidatePath will trigger a server-side remount of EditorPage.
      window.location.reload(); 
    } catch (e: any) {
      setError(e.message || "Failed to generate page.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            Build my page with AI
          </DialogTitle>
          <DialogDescription>
            Describe who you are and what you do. The AI will generate a complete page layout for you. (Requires Pro/Business)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Textarea 
            placeholder="e.g. I'm a freelance video editor. I post editing tutorials on YouTube and sell Premiere Pro presets."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px]"
            disabled={isGenerating}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={isGenerating}>Cancel</Button>
          <Button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className="bg-indigo-600 hover:bg-indigo-700">
            {isGenerating ? "Generating Layout..." : "Generate Magic"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
