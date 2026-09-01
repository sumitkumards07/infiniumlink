"use client";

import React from "react";
import { useDesignEditor, LayoutStyle, ButtonStyle, ButtonRadius } from "./DesignProvider";
import { Iphone } from "@/components/ui/iphone";
import { PublicProfilePreview } from "./PublicProfilePreview";
import { ArrowLeft, Undo2, Redo2, ZoomIn, ZoomOut, Link as LinkIcon, Camera, LayoutTemplate, Type, Palette, AlignLeft, AlertTriangle } from "lucide-react";
import { AvatarCropModal } from "./AvatarCropModal";
import { LayoutThumbnail } from "./LayoutThumbnail";
import { ThemePanel } from "./panels/ThemePanel";
import { SeoPanel } from "./panels/SeoPanel";
import { contrastRatio } from "@/lib/color";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const LAYOUTS: { id: LayoutStyle; label: string }[] = [
  { id: "Classic", label: "Classic" },
  { id: "Hero", label: "Hero" },
  { id: "Banner", label: "Banner" },
  { id: "Cutout", label: "Cutout" },
  { id: "Shape", label: "Shape" },
];

export function DesktopEditor() {
  const { state, updateState, undo, redo, canUndo, canRedo, saveStatus, publish } = useDesignEditor();
  const [activeTab, setActiveTab] = React.useState("Header");
  const [avatarOpen, setAvatarOpen] = React.useState(false);
  const [zoom, setZoom] = React.useState(1);
  const [copied, setCopied] = React.useState(false);

  const titleContrast = contrastRatio(state.titleColor, state.theme.background);
  const lowContrast = titleContrast !== null && titleContrast < 4.5;

  const zoomIn = () => setZoom((z) => Math.min(1.4, Math.round((z + 0.1) * 100) / 100));
  const zoomOut = () => setZoom((z) => Math.max(0.6, Math.round((z - 0.1) * 100) / 100));

  const copyPreviewLink = async () => {
    const slug =
      state.displayName.replace(/^@/, "").trim().toLowerCase().replace(/[^a-z0-9_]+/g, "") ||
      "username";
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/${slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — no-op.
    }
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-black">
      
      {/* Top Bar (64px) */}
      <header className="h-16 shrink-0 border-b border-border bg-black flex items-center justify-between px-6 shadow-sm z-20 relative">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="font-semibold text-sm">Design</span>
        </div>

        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <Button variant="ghost" size="icon" onClick={undo} disabled={!canUndo} className="w-8 h-8 rounded-full">
            <Undo2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={redo} disabled={!canRedo} className="w-8 h-8 rounded-full">
            <Redo2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <span className={`text-[11px] font-semibold tracking-wide ${saveStatus === "Unsaved changes" ? "text-amber-500" : "text-muted-foreground"}`}>
            {saveStatus}
          </span>
          <Button onClick={publish} className="rounded-full px-6 font-semibold" disabled={saveStatus === "All changes saved" || saveStatus === "Publishing..."}>
            {saveStatus === "Publishing..." ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </header>

      {/* Two Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Panel - Fixed 400px */}
        <aside className="w-[400px] shrink-0 border-r border-border bg-black flex flex-col h-full z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          
          {/* Tabs */}
          <div className="flex border-b border-border px-2 pt-2 shrink-0">
             {["Header", "Theme", "Buttons", "SEO"].map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`flex-1 pb-3 pt-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                   activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                 }`}
               >
                 {tab}
               </button>
             ))}
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 overflow-y-auto p-6 pb-24">
            
            {activeTab === "Header" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                
                {/* 1. Profile Image Block */}
                <section className="flex flex-col items-center">
                  <div
                    onClick={() => setAvatarOpen(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setAvatarOpen(true);
                    }}
                    className="group relative w-24 h-24 rounded-full bg-muted overflow-hidden border border-border shadow-sm cursor-pointer"
                  >
                    {state.avatarUrl ? (
                       <img src={state.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                       <div className="w-full h-full bg-gradient-to-tr from-muted-foreground/20 to-muted flex items-center justify-center">
                         <span className="text-2xl text-muted-foreground/30 font-bold">JD</span>
                       </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                      <Camera className="w-6 h-6 mb-1" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Edit</span>
                    </div>
                  </div>
                </section>

                {/* 2. Layout Style */}
                <section className="space-y-3">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-muted-foreground" />
                    Layout Style
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {LAYOUTS.map(layout => (
                      <button
                        key={layout.id}
                        onClick={() => updateState({ layoutStyle: layout.id })}
                        className={`group relative p-3 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                          state.layoutStyle === layout.id 
                            ? "border-primary ring-1 ring-primary bg-primary/5" 
                            : "border-border bg-background"
                        }`}
                      >
                        <div className="w-full aspect-[4/3] bg-muted/50 rounded-lg mb-2 overflow-hidden p-2">
                           <LayoutThumbnail id={layout.id} />
                        </div>
                        <span className="text-xs font-semibold">{layout.label}</span>
                        {state.layoutStyle === layout.id && (
                          <div className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-sm">
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </section>

                {/* 3. Title Style */}
                <section className="space-y-3 pt-4 border-t border-border">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <Type className="w-4 h-4 text-muted-foreground" />
                    Title Style
                  </h3>
                  
                  {/* Segmented Control */}
                  <div className="flex bg-muted p-1 rounded-xl">
                    <button 
                      onClick={() => updateState({ titleStyle: "Text" })}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${state.titleStyle === "Text" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      Text
                    </button>
                    <button 
                      onClick={() => updateState({ titleStyle: "Logo" })}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${state.titleStyle === "Logo" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      Logo
                    </button>
                  </div>

                  {state.titleStyle === "Text" && (
                    <div className="space-y-2">
                      <div className="flex gap-2 items-center">
                      <Input 
                        value={state.displayName}
                        onChange={(e) => updateState({ displayName: e.target.value })}
                        className="h-10 rounded-xl bg-background"
                      />
                      <div className="relative group">
                         {/* Color Swatch / Hover Popover simulation */}
                         <div 
                           className="w-10 h-10 rounded-xl border border-border shadow-sm cursor-pointer shrink-0 transition-transform active:scale-95"
                           style={{ backgroundColor: state.titleColor }}
                         />
                         {/* Hover Popover */}
                         <div className="absolute top-12 right-0 w-48 bg-card border border-border shadow-xl rounded-2xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Preset Colors</div>
                            <div className="flex gap-2 mb-3">
                              {["#0F1115", "#FFFFFF", "#C41E3A", "#F58220", "#3B82F6"].map(color => (
                                <button
                                  key={color}
                                  onClick={() => updateState({ titleColor: color })}
                                  className="w-6 h-6 rounded-full border border-border shadow-sm hover:scale-110 transition-transform"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <Input 
                              value={state.titleColor}
                              onChange={(e) => updateState({ titleColor: e.target.value })}
                              className="h-8 text-xs font-mono"
                            />
                         </div>
                      </div>
                      </div>
                      {lowContrast && (
                        <p className="flex items-center gap-1.5 text-[11px] font-medium text-amber-600 animate-in fade-in duration-200">
                          <AlertTriangle className="w-3 h-3 shrink-0" />
                          Low contrast — may be hard to read
                        </p>
                      )}
                    </div>
                  )}
                </section>

                {/* 4. Bio */}
                <section className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <AlignLeft className="w-4 h-4 text-muted-foreground" />
                      Bio
                    </h3>
                    <span className={`text-[10px] font-mono ${state.bio.length > 150 ? "text-destructive" : "text-muted-foreground"}`}>
                      {state.bio.length}/150
                    </span>
                  </div>
                  <Textarea 
                    value={state.bio}
                    onChange={(e) => updateState({ bio: e.target.value })}
                    className="resize-none h-24 rounded-xl bg-background"
                    maxLength={150}
                  />
                </section>

                {/* 5. Social Icons */}
                <section className="space-y-3 pt-4 border-t border-border">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-muted-foreground" />
                    Social Icons
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {state.socials.map(social => (
                      <button
                        key={social.id}
                        onClick={() => {
                          const newSocials = state.socials.map(s => 
                            s.id === social.id ? { ...s, enabled: !s.enabled } : s
                          );
                          updateState({ socials: newSocials });
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border flex items-center gap-1.5 ${
                          social.enabled 
                            ? "bg-primary text-primary-foreground border-primary shadow-sm hover:scale-105 active:scale-95" 
                            : "bg-background border-border text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {social.platform}
                      </button>
                    ))}
                  </div>
                  {/* Inline Link Inputs for enabled socials */}
                  <div className="space-y-2 mt-4">
                     {state.socials.filter(s => s.enabled).map(social => (
                       <div key={`input-${social.id}`} className="flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                         <div className="w-24 shrink-0 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
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
                           className="h-8 text-xs bg-background rounded-lg"
                           placeholder={`https://${social.platform.toLowerCase()}.com/username`}
                         />
                       </div>
                     ))}
                  </div>
                </section>

              </div>
            )}

            {activeTab === "Buttons" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <section className="space-y-3">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-muted-foreground" />
                    Button Style
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {(["Fill", "Outline", "Soft", "HardShadow"] as ButtonStyle[]).map(style => (
                      <button
                        key={style}
                        onClick={() => updateState({ buttonConfig: { ...state.buttonConfig, style } })}
                        className={`group relative p-3 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col items-center justify-center gap-2 ${
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
                </section>

                <section className="space-y-3">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-muted-foreground" />
                    Button Shape
                  </h3>
                  <div className="flex bg-muted p-1 rounded-xl">
                    {(["Sharp", "Rounded", "Pill"] as ButtonRadius[]).map(radius => (
                      <button 
                        key={radius}
                        onClick={() => updateState({ buttonConfig: { ...state.buttonConfig, radius } })}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${state.buttonConfig.radius === radius ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        {radius}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <Palette className="w-4 h-4 text-muted-foreground" />
                    Button Colors
                  </h3>
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
                </section>
              </div>
            )}

            {activeTab === "Theme" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <ThemePanel />
              </div>
            )}

            {activeTab === "SEO" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <SeoPanel />
              </div>
            )}

          </div>
        </aside>

        {/* Right Panel - Live Preview */}
        <main className="flex-1 relative flex items-center justify-center p-8 bg-[#F3F4F6]">
          {/* Subtle dot grid pattern on top of #F3F4F6 */}
          <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Phone Frame Mockup */}
            <div
              className="drop-shadow-2xl transition-transform duration-200 ease-out w-[390px]"
              style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
            >
              <Iphone>
                <PublicProfilePreview />
              </Iphone>
            </div>

            {/* Floating Controls */}
            <div className="absolute -bottom-16 bg-card border border-border shadow-lg rounded-full px-4 py-2 flex items-center gap-4 animate-in slide-in-from-bottom-4 fade-in duration-500 delay-300">
              <div className="flex items-center gap-2 border-r border-border pr-4">
                <button onClick={zoomOut} aria-label="Zoom out" className="text-muted-foreground hover:text-foreground p-1 transition-transform active:scale-90"><ZoomOut className="w-4 h-4" /></button>
                <span className="text-xs font-semibold w-10 text-center">{Math.round(zoom * 100)}%</span>
                <button onClick={zoomIn} aria-label="Zoom in" className="text-muted-foreground hover:text-foreground p-1 transition-transform active:scale-90"><ZoomIn className="w-4 h-4" /></button>
              </div>
              <button onClick={copyPreviewLink} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors">
                <LinkIcon className="w-3 h-3" />
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </main>

      </div>

      {/* Avatar Upload + Crop Modal */}
      <AvatarCropModal
        open={avatarOpen}
        onOpenChange={setAvatarOpen}
        onSave={(url) => updateState({ avatarUrl: url })}
      />
    </div>
  );
}
