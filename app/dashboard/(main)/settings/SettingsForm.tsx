"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { updateUsername } from "./actions";

export function SettingsForm({ initialUsername }: { initialUsername: string }) {
  const [state, formAction] = useActionState(updateUsername, null as any);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-3">
        <label htmlFor="username" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Workspace Handle
        </label>
        <div className="flex items-center rounded-sm border border-border bg-background focus-within:border-primary transition-colors">
          <span className="pl-4 text-[13px] font-medium text-muted-foreground">
            infiniumlink.vercel.app/
          </span>
          <input
            type="text"
            name="username"
            id="username"
            defaultValue={initialUsername}
            className="flex h-10 w-full bg-transparent px-2 text-[14px] font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            placeholder="username"
            required
            minLength={3}
            maxLength={30}
          />
        </div>
        {state?.error && (
          <p className="text-[12px] font-medium text-destructive">{state.error}</p>
        )}
        {state?.success && (
          <p className="text-[12px] font-medium text-emerald-500">Handle updated successfully!</p>
        )}
        <p className="text-[12px] text-muted-foreground">
          This is your unique URL. Changing this will break existing links.
        </p>
      </div>
      <Button type="submit" className="h-10 rounded-sm bg-primary text-[12px] font-bold uppercase tracking-[0.15em] hover:bg-primary/90 transition-colors">
        Save Changes
      </Button>
    </form>
  );
}
