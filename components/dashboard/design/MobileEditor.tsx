"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDesignEditor, LayoutStyle, ButtonStyle, ButtonRadius } from "./DesignProvider";
import { PublicProfilePreview } from "./PublicProfilePreview";
import { ArrowLeft, MoreHorizontal, Camera, Undo2, Redo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AnimatePresence, motion } from "framer-motion";
import { AvatarCropModal } from "./AvatarCropModal";
import { LayoutThumbnail } from "./LayoutThumbnail";
import { ThemePanel } from "./panels/ThemePanel";
import { SeoPanel } from "./panels/SeoPanel";

const LAYOUTS: { id: LayoutStyle; label: string }[] = [
  { id: "Classic", label: "Classic" },
  { id: "Hero", label: "Hero" },
  { id: "Banner", label: "Banner" },
  { id: "Cutout", label: "Cutout" },
  { id: "Shape", label: "Shape" },
];

export function MobileEditor() {
  const { state, updateState, undo, redo, canUndo, canRedo, saveStatus, publish } = useDesignEditor();
  const [mode, setMode] = useState<"Edit" | "Preview">("Edit");

  // Avatar sheet + crop flow
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  const [cropOpen, setCropOpen] = useState(false);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const libraryInputRef = useRef<HTMLInputElement>(null);

  // "Draft saved" toast (shows after a pause in editing, not per keystroke)
  const [toast, setToast] = useState(false);
  useEffect(() => {
    if (saveStatus !== "Draft saved") return;
    const showTimer = setTimeout(() => setToast(true), 100);
    return () => clearTimeout(showTimer);
  }, [saveStatus]);

  useEffect(() => {
    if (!toast) return;
    const hideTimer = setTimeout(() => setToast(false), 2100);
    return () => clearTimeout(hideTimer);
  }, [toast]);

  const handleFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPendingImage(reader.result as string);
      setActionSheetOpen(false);
      setCropOpen(true);
    };
    reader.readAsDataURL(file);
  };
  
  // Swipe handling states
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      if (mode === "Preview") setMode("Edit");
    }
    if (touchStart - touchEnd < -100) {
      // Swipe right
      if (mode === "Edit") setMode("Preview");
    }
  };

  return (
    <div 
      className="flex flex-col h-[100dvh] w-full overflow-hidden bg-black relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* Top Bar (56px) - Safe Area Aware */}
      <header className="h-14 shrink-0 border-b border-border bg-black flex items-center justify-between px-4 z-20 pt-[env(safe-area-inset-top)] relative">
        <Link href="/dashboard" className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* Pill-shaped Segmented Control */}
        <div className="flex bg-muted p-1 rounded-full w-[160px] absolute left-1/2 -translate-x-1/2">
          <button 
            onClick={() => setMode("Edit")}
            className={`flex-1 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all ${mode === "Edit" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
          >
            Edit
          </button>
          <button 
            onClick={() => setMode("Preview")}
            className={`flex-1 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all ${mode === "Preview" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
          >
            Preview
          </button>
        </div>

        {/* Overflow Menu (Undo/Redo live here to save space) */}
        <Sheet>
          <SheetTrigger render={<button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground w-8 h-8 rounded-full" />}>
            <MoreHorizontal className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-[24px]">
            <SheetHeader>
              <SheetTitle>Editor Actions</SheetTitle>
            </SheetHeader>
            <div className="py-6 flex flex-col gap-4">
               <Button variant="outline" className="w-full justify-start h-14 rounded-2xl" onClick={undo} disabled={!canUndo}>
                 <Undo2 className="w-5 h-5 mr-3" /> Undo Last Change
               </Button>
               <Button variant="outline" className="w-full justify-start h-14 rounded-2xl" onClick={redo} disabled={!canRedo}>
                 <Redo2 className="w-5 h-5 mr-3" /> Redo
               </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden bg-black">
        <AnimatePresence initial={false}>
          {mode === "Edit" ? (
            <motion.div 
              key="edit"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute inset-0 overflow-y-auto pb-24"
            >
              <Accordion defaultValue={["header"]} className="w-full">
                
                {/* 1. HEADER ACCORDION */}
                <AccordionItem value="header" className="border-b border-border bg-black">
                  <AccordionTrigger className="px-6 hover:no-underline font-bold">
                    Header
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-8 space-y-8">
                    
                    {/* Profile Image (Bottom Sheet Trigger) */}
                    <Sheet open={actionSheetOpen} onOpenChange={setActionSheetOpen}>
                      <SheetTrigger render={<button className="flex flex-col items-center cursor-pointer appearance-none bg-transparent border-none p-0 outline-none w-full" />}>
                        <div className="relative w-[88px] h-[88px] rounded-full bg-muted border border-border shadow-sm mx-auto">
                            {state.avatarUrl ? (
                               <img src={state.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                            ) : (
                               <div className="w-full h-full bg-gradient-to-tr from-muted-foreground/20 to-muted flex items-center justify-center rounded-full">
                                 <span className="text-2xl text-muted-foreground/30 font-bold">JD</span>
                               </div>
                            )}
                            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-card rounded-full shadow-md border border-border flex items-center justify-center text-primary active:scale-95 transition-transform">
                              <Camera className="w-4 h-4" />
                            </div>
                          </div>
                      </SheetTrigger>
                      <SheetContent side="bottom" className="rounded-t-[24px]">
                        <SheetHeader><SheetTitle>Update Avatar</SheetTitle></SheetHeader>
                        <div className="py-6 space-y-3">
                          <Button className="w-full h-14 rounded-2xl text-base" onClick={() => cameraInputRef.current?.click()}>Take Photo</Button>
                          <Button variant="secondary" className="w-full h-14 rounded-2xl text-base" onClick={() => libraryInputRef.current?.click()}>Choose from Library</Button>
                          <Button
                            variant="destructive"
                            className="w-full h-14 rounded-2xl text-base"
                            disabled={!state.avatarUrl}
                            onClick={() => {
                              updateState({ avatarUrl: "" });
                              setActionSheetOpen(false);
                            }}
                          >
                            Remove Avatar
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>

                    {/* Hidden file inputs feeding the crop step */}
                    <input ref={cameraInputRef} type="file" accept="image/*" capture="user" className="hidden" onChange={handleFilePicked} />
                    <input ref={libraryInputRef} type="file" accept="image/*" className="hidden" onChange={handleFilePicked} />

                    {/* Avatar crop step (shared with desktop) */}
                    <AvatarCropModal
                      open={cropOpen}
                      onOpenChange={setCropOpen}
                      initialImage={pendingImage}
                      onSave={(url) => updateState({ avatarUrl: url })}
                    />

                    {/* Layout Carousel */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Layout</h3>
                      <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar -mx-6 px-6">
                        {LAYOUTS.map(layout => (
                          <button
                            key={layout.id}
                            onClick={() => updateState({ layoutStyle: layout.id })}
                            className={`snap-center shrink-0 w-[200px] p-4 rounded-3xl border transition-all duration-300 ${
                              state.layoutStyle === layout.id 
                                ? "border-primary ring-2 ring-primary bg-primary/5 scale-105" 
                                : "border-border bg-background scale-100"
                            }`}
                          >
                            <div className="w-full aspect-[4/3] bg-muted/50 rounded-xl mb-3 overflow-hidden p-2">
                               <LayoutThumbnail id={layout.id} />
                            </div>
                            <span className="text-sm font-bold block text-center">{layout.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Title Style */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Title</h3>
                      <Input 
                        value={state.displayName}
                        onChange={(e) => updateState({ displayName: e.target.value })}
                        className="h-14 rounded-2xl bg-muted/50 text-base px-4"
                      />
                      
                      <Sheet>
                        <SheetTrigger render={<button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-full h-14 rounded-2xl justify-between px-4" />}>
                          <span className="text-muted-foreground">Color</span>
                          <div className="w-8 h-8 rounded-full border border-border shadow-sm" style={{ backgroundColor: state.titleColor }} />
                        </SheetTrigger>
                        <SheetContent side="bottom" className="rounded-t-[24px]">
                          <SheetHeader><SheetTitle>Title Color</SheetTitle></SheetHeader>
                          <div className="py-6 grid grid-cols-5 gap-4">
                            {["#0F1115", "#FFFFFF", "#C41E3A", "#F58220", "#3B82F6", "#10B981", "#8B5CF6", "#EC4899", "#64748B", "#FCD34D"].map(color => (
                              <button
                                key={color}
                                onClick={() => updateState({ titleColor: color })}
                                className="w-full aspect-square rounded-full border-2 border-border shadow-sm active:scale-95 transition-transform"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>

                    {/* Bio */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Bio</h3>
                        <span className={`text-[10px] font-mono ${state.bio.length > 150 ? "text-destructive" : "text-muted-foreground"}`}>
                          {state.bio.length}/150
                        </span>
                      </div>
                      <Textarea 
                        value={state.bio}
                        onChange={(e) => updateState({ bio: e.target.value })}
                        className="min-h-[100px] rounded-2xl bg-muted/50 text-base p-4"
                        maxLength={150}
                      />
                    </div>

                    {/* Socials */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Social Icons</h3>
                      <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar -mx-6 px-6">
                        {state.socials.map(social => (
                          <button
                            key={social.id}
                            onClick={() => {
                              const newSocials = state.socials.map(s => 
                                s.id === social.id ? { ...s, enabled: !s.enabled } : s
                              );
                              updateState({ socials: newSocials });
                            }}
                            className={`shrink-0 h-12 px-6 rounded-full font-bold transition-all ${
                              social.enabled 
                                ? "bg-primary text-primary-foreground shadow-md scale-105" 
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {social.platform}
                          </button>
                        ))}
                      </div>
                      
                      <div className="space-y-3 pt-2">
                        <AnimatePresence>
                          {state.socials.filter(s => s.enabled).map(social => (
                             <motion.div 
                               key={`input-${social.id}`}
                               initial={{ height: 0, opacity: 0 }}
                               animate={{ height: "auto", opacity: 1 }}
                               exit={{ height: 0, opacity: 0 }}
                               className="overflow-hidden"
                             >
                               <div className="relative">
                                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                   {social.platform}
                                 </div>
                                 <Input 
                                   value={social.url}
                                   onChange={(e) => {
                                     const newSocials = state.socials.map(s => 
                                       s.id === social.id ? { ...s, url: e.target.value } : s
                                     );
                                     updateState({ socials: newSocials });
                                   }}
                                   className="h-14 rounded-2xl bg-muted/30 pl-24 text-sm"
                                 />
                               </div>
                             </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>

                  </AccordionContent>
                </AccordionItem>

                {/* 2. BUTTONS ACCORDION */}
                <AccordionItem value="buttons" className="border-b border-border bg-black">
                  <AccordionTrigger className="px-6 hover:no-underline font-bold">
                    Buttons
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-8 space-y-8">
                    
                    {/* Button Style */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Style</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {(["Fill", "Outline", "Soft", "HardShadow"] as ButtonStyle[]).map(style => (
                          <button
                            key={style}
                            onClick={() => updateState({ buttonConfig: { ...state.buttonConfig, style } })}
                            className={`group relative p-3 rounded-2xl border transition-all duration-200 hover:shadow-md flex flex-col items-center justify-center gap-2 ${
                              state.buttonConfig.style === style 
                                ? "border-primary ring-1 ring-primary bg-primary/5" 
                                : "border-border bg-background"
                            }`}
                          >
                            <span className="text-xs font-semibold">{style}</span>
                            {state.buttonConfig.style === style && (
                              <div className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-sm">
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Button Shape */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Shape</h3>
                      <div className="flex bg-muted p-1 rounded-xl">
                        {(["Sharp", "Rounded", "Pill"] as ButtonRadius[]).map(radius => (
                          <button 
                            key={radius}
                            onClick={() => updateState({ buttonConfig: { ...state.buttonConfig, radius } })}
                            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${state.buttonConfig.radius === radius ? "bg-background shadow-sm" : "text-muted-foreground"}`}
                          >
                            {radius}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Button Colors */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Colors</h3>
                      <div className="space-y-2">
                        <div className="flex gap-2 items-center justify-between bg-background border border-border p-3 rounded-xl shadow-sm">
                          <span className="text-xs font-semibold">Background</span>
                          <div className="flex items-center gap-2">
                            <Input 
                              value={state.buttonConfig.backgroundColor}
                              onChange={(e) => updateState({ buttonConfig: { ...state.buttonConfig, backgroundColor: e.target.value } })}
                              className="h-8 w-24 text-xs font-mono"
                            />
                            <div className="w-8 h-8 rounded-md border border-border shadow-sm shrink-0 cursor-pointer" style={{ backgroundColor: state.buttonConfig.backgroundColor }} />
                          </div>
                        </div>
                        <div className="flex gap-2 items-center justify-between bg-background border border-border p-3 rounded-xl shadow-sm">
                          <span className="text-xs font-semibold">Text</span>
                          <div className="flex items-center gap-2">
                            <Input 
                              value={state.buttonConfig.textColor}
                              onChange={(e) => updateState({ buttonConfig: { ...state.buttonConfig, textColor: e.target.value } })}
                              className="h-8 w-24 text-xs font-mono"
                            />
                            <div className="w-8 h-8 rounded-md border border-border shadow-sm shrink-0 cursor-pointer" style={{ backgroundColor: state.buttonConfig.textColor }} />
                          </div>
                        </div>
                      </div>
                    </div>

                  </AccordionContent>
                </AccordionItem>

                {/* Theme Accordion */}
                <AccordionItem value="theme" className="border-b border-border bg-black">
                  <AccordionTrigger className="px-6 hover:no-underline font-bold text-muted-foreground">Theme</AccordionTrigger>
                  <AccordionContent className="px-6 pb-8">
                    <ThemePanel />
                  </AccordionContent>
                </AccordionItem>

                {/* SEO Accordion */}
                <AccordionItem value="seo" className="border-b-0 border-border bg-black pb-24">
                  <AccordionTrigger className="px-6 hover:no-underline font-bold text-muted-foreground">SEO</AccordionTrigger>
                  <AccordionContent className="px-6 pb-8">
                    <SeoPanel />
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
            </motion.div>
          ) : (
            <motion.div 
              key="preview"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute inset-0 z-10"
            >
              <PublicProfilePreview />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Draft saved toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              key="draft-toast"
              initial={{ opacity: 0, y: 16, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 16, x: "-50%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-24 left-1/2 z-40 pointer-events-none bg-foreground text-background text-xs font-semibold px-4 py-2 rounded-full shadow-lg"
            >
              Draft saved
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Sticky Bar - Safe Area Aware */}
      {mode === "Edit" && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.05)] pb-[calc(1rem+env(safe-area-inset-bottom))] z-30">
          <Button 
            className="w-full h-14 rounded-full text-base font-bold shadow-lg shadow-primary/20"
            onClick={publish}
            disabled={saveStatus === "All changes saved" || saveStatus === "Publishing..."}
          >
            {saveStatus === "Publishing..." ? "Publishing..." : "Publish Changes"}
          </Button>
        </div>
      )}

      {/* Add hide-scrollbar utility locally */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
