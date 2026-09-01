"use client";

import React, { useState, useEffect } from "react";
import { DesignProvider } from "@/components/dashboard/design/DesignProvider";
import { DesktopEditor } from "@/components/dashboard/design/DesktopEditor";
import { MobileEditor } from "@/components/dashboard/design/MobileEditor";
import { Loader2 } from "lucide-react";

export default function DesignEditorPage() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkMobile();
    
    // Event listener for resize
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent hydration mismatch / render flash by waiting for mount
  if (isMobile === null) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <DesignProvider>
      {isMobile ? <MobileEditor /> : <DesktopEditor />}
    </DesignProvider>
  );
}
