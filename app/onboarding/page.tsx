"use client";

import { useActionState } from "react";
import { claimUsername } from "./actions";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  const [state, formAction] = useActionState(claimUsername, null as any);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/30">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Claim your link</h1>
          <p className="text-muted-foreground">
            Choose a unique username for your public profile.
          </p>
        </div>
        
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center rounded-md border border-input bg-transparent pl-3 focus-within:ring-1 focus-within:ring-ring">
              <span className="text-muted-foreground sm:text-sm">linkflow.com/</span>
              <input
                type="text"
                name="username"
                id="username"
                className="flex h-10 w-full rounded-md bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none"
                placeholder="username"
                required
                minLength={3}
                maxLength={30}
              />
            </div>
            {state?.error && (
              <p className="text-sm text-destructive">{state.error}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
