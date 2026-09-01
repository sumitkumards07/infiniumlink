"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesignEditor } from "./DesignProvider";
import { Camera, Video, Hash } from "lucide-react"; // Using generic icons for mockup
import { withAlpha } from "@/lib/color";

// Map platform strings to icons
const getIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "instagram": return <Camera className="w-5 h-5" />;
    case "x": return <Hash className="w-5 h-5" />;
    case "youtube": return <Video className="w-5 h-5" />;
    case "tiktok": return <span className="font-bold text-lg">d</span>; // Placeholder if no TikTok icon
    default: return <div className="w-5 h-5 rounded-full bg-current" />;
  }
};

export function PublicProfilePreview() {
  const { state } = useDesignEditor();
  const { layoutStyle, titleStyle, displayName, fontFamily, titleColor, bio, socials, avatarUrl } = state;

  // Spring animation config
  const springConfig = {
    type: "spring",
    damping: 25,
    stiffness: 300,
    mass: 0.5
  } as const;

  // Define layout variations (className + theme-driven inline styles)
  const getLayout = (): { className: string; style?: React.CSSProperties } => {
    switch (layoutStyle) {
      case "Hero":
        return {
          className: "flex flex-col items-center pt-24 pb-12 px-6",
          style: { background: `linear-gradient(180deg, ${withAlpha(state.theme.accent, "1F")} 0%, transparent 70%)` },
        };
      case "Banner":
        return {
          className: "flex flex-col items-start pt-32 pb-12 px-8 shadow-lg mx-4 mt-8 rounded-[32px]",
          style: { backgroundColor: state.theme.card },
        };
      case "Cutout":
        return {
          className: "flex flex-col items-center pt-16 pb-12 px-6 border-4 rounded-t-full mt-12 shadow-sm",
          style: { borderColor: state.theme.card },
        };
      case "Shape":
        return {
          className: "flex flex-col items-center pt-12 pb-12 px-6 rotate-1 transform-gpu shadow-xl mx-4 mt-12 rounded-[24px]",
          style: { backgroundColor: state.theme.card },
        };
      case "Classic":
      default:
        return { className: "flex flex-col items-center pt-16 pb-12 px-6" };
    }
  };

  const getAvatar = (): { className: string; style?: React.CSSProperties } => {
    switch (layoutStyle) {
      case "Banner":
        return { className: "w-20 h-20 rounded-2xl shadow-md border-4 -mt-16 mb-4", style: { borderColor: state.theme.background, backgroundColor: state.theme.card } };
      case "Cutout":
        return { className: "w-28 h-28 rounded-full shadow-lg border-8 -mt-24 mb-6", style: { borderColor: state.theme.background, backgroundColor: state.theme.card } };
      case "Hero":
        return { className: "w-32 h-32 rounded-full shadow-2xl mb-8", style: { backgroundColor: state.theme.card } };
      case "Shape":
        return { className: "w-24 h-24 rounded-[32px] shadow-md mb-6", style: { backgroundColor: state.theme.card } };
      case "Classic":
      default:
        return { className: "w-24 h-24 rounded-full shadow-md mb-6", style: { backgroundColor: state.theme.card } };
    }
  };

  const layout = getLayout();
  const avatar = getAvatar();

  return (
    <motion.div 
      layout
      className="w-full h-full bg-background overflow-y-auto overflow-x-hidden relative"
      style={{ 
        backgroundColor: state.theme.background,
        backgroundImage: state.theme.backgroundImage ? `url(${state.theme.backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: state.theme.text,
        fontFamily 
      }}
    >
      <AnimatePresence mode="wait">
      <motion.div 
        key={layoutStyle}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={springConfig}
        className={layout.className}
        style={layout.style}
      >
        {/* Avatar */}
        <motion.div 
          layout="position"
          transition={springConfig}
          className={`${avatar.className} overflow-hidden flex items-center justify-center relative shrink-0`}
          style={avatar.style}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-muted-foreground/20 to-muted flex items-center justify-center">
              <span className="text-4xl text-muted-foreground/30 font-bold">JD</span>
            </div>
          )}
        </motion.div>

        {/* Title */}
        <motion.div layout="position" transition={springConfig} className="mb-3">
          {titleStyle === "Text" ? (
            <h1 
              className="text-xl md:text-2xl font-bold tracking-tight text-center transition-colors duration-200"
              style={{ color: titleColor }}
            >
              {displayName || "@username"}
            </h1>
          ) : (
            <div className="h-10 rounded-md w-32 animate-pulse" style={{ backgroundColor: withAlpha(state.theme.text, "33") }} />
          )}
        </motion.div>

        {/* Bio */}
        <motion.p 
          layout="position"
          transition={springConfig}
          className="text-sm md:text-base text-center opacity-80 max-w-[280px] leading-relaxed mb-8 whitespace-pre-wrap"
        >
          {bio}
        </motion.p>

        {/* Social Icons */}
        <motion.div 
          layout="position"
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <AnimatePresence>
            {socials.filter(s => s.enabled).map(social => (
              <motion.a
                key={social.id}
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={springConfig}
                href={social.url || "#"}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full shadow-sm flex items-center justify-center hover:scale-110 hover:shadow-md active:scale-95 transition-all"
                style={{ color: state.theme.accent, backgroundColor: state.theme.card, border: `1px solid ${withAlpha(state.theme.text, "1F")}` }}
              >
                {getIcon(social.platform)}
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Mockup Links */}
        <motion.div layout="position" className="w-full mt-12 space-y-4 max-w-[320px]">
           {["My Website", "Latest Video", "Store"].map((label, i) => {
             const { style, backgroundColor, textColor, radius } = state.buttonConfig || { style: "Fill", backgroundColor: "#000", textColor: "#fff", radius: "Pill" };
             
             let buttonStyle: React.CSSProperties = {};
             if (style === "Fill") {
               buttonStyle = { backgroundColor, color: textColor, border: "2px solid transparent" };
             } else if (style === "Outline") {
               buttonStyle = { backgroundColor: "transparent", color: backgroundColor, border: `2px solid ${backgroundColor}` };
             } else if (style === "Soft") {
               buttonStyle = { backgroundColor, color: textColor, border: "2px solid transparent", boxShadow: "0 8px 30px rgba(0,0,0,0.12)" };
             } else if (style === "HardShadow") {
               buttonStyle = { backgroundColor, color: textColor, border: `2px solid ${textColor}`, boxShadow: `4px 4px 0px 0px ${textColor}` };
             }

             const radiusClass = radius === "Sharp" ? "rounded-none" : radius === "Rounded" ? "rounded-2xl" : "rounded-full";

             return (
               <motion.a 
                 key={i} 
                 href="#"
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 className={`w-full h-14 flex items-center justify-center font-bold text-sm transition-shadow ${radiusClass}`}
                 style={buttonStyle}
               >
                 {label}
               </motion.a>
             );
           })}
        </motion.div>
        
      </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
