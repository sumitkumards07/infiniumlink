"use client";

import { useActionState } from "react";
import { claimUsername } from "./actions";
import { Button } from "@/components/ui/button";
import { Anchor } from "lucide-react";

export default function OnboardingPage() {
  const [state, formAction] = useActionState(claimUsername, null as any);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary text-primary-foreground shadow-sm mb-8">
        <Anchor className="size-6" />
      </div>

      <div className="w-full max-w-md rounded-sm border border-border bg-card p-8 shadow-2xl relative">
        {/* Decorative Tech Accents */}
        <div className="absolute -top-px -left-px w-2 h-2 border-t-2 border-l-2 border-primary" />
        <div className="absolute -top-px -right-px w-2 h-2 border-t-2 border-r-2 border-primary" />
        <div className="absolute -bottom-px -left-px w-2 h-2 border-b-2 border-l-2 border-primary" />
        <div className="absolute -bottom-px -right-px w-2 h-2 border-b-2 border-r-2 border-primary" />

        <div className="space-y-3 text-center mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            Step 1 of 1
          </p>
          <h1 className="font-sans text-3xl font-extrabold tracking-[-0.04em] leading-[0.95] text-foreground">
            Claim your link
          </h1>
          <p className="text-[13px] text-muted-foreground pt-2">
            Choose a unique workspace identifier for your profile.
          </p>
        </div>
        
        <form action={formAction} className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="username" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Username
            </label>
            <div className="flex items-center rounded-sm border border-border bg-background focus-within:border-primary transition-colors">
              <span className="pl-4 text-[13px] font-medium text-muted-foreground">infinium.com/</span>
              <input
                type="text"
                name="username"
                id="username"
                className="flex h-12 w-full bg-transparent px-3 text-[14px] font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                placeholder="username"
                required
                minLength={3}
                maxLength={30}
              />
            </div>
            {state?.error && (
              <p className="text-[12px] font-medium text-destructive">{state.error}</p>
            )}
          </div>
          <Button type="submit" className="w-full h-12 rounded-sm bg-primary text-[12px] font-bold uppercase tracking-[0.15em] hover:bg-primary/90 transition-colors">
            Create Workspace →
          </Button>
        </form>
      </div>
    </div>
  );
}
