"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type LayoutStyle = "Classic" | "Hero" | "Banner" | "Cutout" | "Shape";
export type TitleStyle = "Text" | "Logo";
export type ButtonStyle = "Fill" | "Outline" | "Soft" | "HardShadow";
export type ButtonRadius = "Sharp" | "Rounded" | "Pill";

export interface SocialLink {
  id: string;
  platform: string;
  enabled: boolean;
  url: string;
}

export interface DesignState {
  avatarUrl: string;
  layoutStyle: LayoutStyle;
  titleStyle: TitleStyle;
  displayName: string;
  fontFamily: string;
  titleColor: string;
  bio: string;
  socials: SocialLink[];
  theme: {
    background: string;
    backgroundImage?: string;
    card: string;
    text: string;
    accent: string;
  };
  buttonConfig: {
    style: ButtonStyle;
    radius: ButtonRadius;
    backgroundColor: string;
    textColor: string;
  };
  seoTitle: string;
  seoDescription: string;
}

interface DesignContextType {
  state: DesignState;
  updateState: (updates: Partial<DesignState>) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  saveStatus: "Draft saved" | "Unsaved changes" | "All changes saved" | "Publishing...";
  publish: () => void;
}

const DEFAULT_STATE: DesignState = {
  avatarUrl: "",
  layoutStyle: "Classic",
  titleStyle: "Text",
  displayName: "@username",
  fontFamily: "Inter, sans-serif",
  titleColor: "#0F1115",
  bio: "Welcome to my link-in-bio! Check out my latest work below.",
  socials: [
    { id: "1", platform: "Instagram", enabled: true, url: "https://instagram.com" },
    { id: "2", platform: "X", enabled: false, url: "" },
    { id: "3", platform: "YouTube", enabled: true, url: "https://youtube.com" },
    { id: "4", platform: "TikTok", enabled: false, url: "" },
  ],
  theme: {
    background: "#F3F4F6", // dot grid backdrop
    backgroundImage: "",
    card: "#FFFFFF",
    text: "#0F1115",
    accent: "#C41E3A"
  },
  buttonConfig: {
    style: "Fill",
    radius: "Pill",
    backgroundColor: "#0F1115",
    textColor: "#FFFFFF",
  },
  seoTitle: "",
  seoDescription: ""
};

const DesignContext = createContext<DesignContextType | undefined>(undefined);

const DRAFT_STORAGE_KEY = "infiniumlink-design-draft";

/** Load the autosaved draft from localStorage (falls back to defaults). */
function loadDraft(): DesignState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<DesignState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      socials: Array.isArray(parsed.socials) ? parsed.socials : DEFAULT_STATE.socials,
      theme: { ...DEFAULT_STATE.theme, ...(parsed.theme ?? {}) },
      buttonConfig: { ...DEFAULT_STATE.buttonConfig, ...(parsed.buttonConfig ?? {}) },
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function DesignProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<DesignState[]>(() => [loadDraft()]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [saveStatus, setSaveStatus] = useState<DesignContextType["saveStatus"]>("All changes saved");

  const state = history[currentIndex];

  // Autosave the draft to localStorage whenever state settles (debounced ~1s).
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(state));
      } catch {
        // Ignore storage errors (private mode, quota, etc.)
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [state]);

  // Debounced autosave status: "Unsaved changes" -> "Draft saved" after a pause.
  useEffect(() => {
    if (saveStatus === "Unsaved changes") {
      const timer = setTimeout(() => {
        setSaveStatus("Draft saved");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  const updateState = (updates: Partial<DesignState>) => {
    const newState = { ...state, ...updates };
    const newHistory = history.slice(0, currentIndex + 1);
    setHistory([...newHistory, newState]);
    setCurrentIndex(newHistory.length);
    setSaveStatus("Unsaved changes");
  };

  const undo = useCallback(() => {
    if (currentIndex <= 0) return;
    setCurrentIndex(currentIndex - 1);
    setSaveStatus("Unsaved changes");
  }, [currentIndex]);

  const redo = useCallback(() => {
    if (currentIndex >= history.length - 1) return;
    setCurrentIndex(currentIndex + 1);
    setSaveStatus("Unsaved changes");
  }, [currentIndex, history.length]);

  const publish = useCallback(() => {
    // Publish is the only action that "commits" — persist immediately.
    try {
      window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors.
    }
    setSaveStatus("Publishing...");
    setTimeout(() => {
      setSaveStatus("All changes saved");
    }, 1000);
  }, [state]);

  // Keyboard shortcuts: Cmd/Ctrl+Z undo, Cmd/Ctrl+Shift+Z redo, Cmd/Ctrl+S publish.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const key = e.key.toLowerCase();
      if (key === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      } else if (key === "s") {
        e.preventDefault();
        publish();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [undo, redo, publish]);

  return (
    <DesignContext.Provider
      value={{
        state,
        updateState,
        undo,
        redo,
        canUndo: currentIndex > 0,
        canRedo: currentIndex < history.length - 1,
        saveStatus,
        publish
      }}
    >
      {children}
    </DesignContext.Provider>
  );
}

export function useDesignEditor() {
  const context = useContext(DesignContext);
  if (!context) throw new Error("useDesignEditor must be used within DesignProvider");
  return context;
}
