"use client";

import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren, ReactNode } from "react";
import { Anchor } from "lucide-react";

const clerkAppearance = {
  elements: {
    rootBox: "w-full",
    cardBox: "w-full",
    card: "w-full border-0 bg-transparent p-0 shadow-none",
    header: "hidden",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
    socialButtonsBlockButton:
      "h-12 rounded-sm border border-border bg-card text-foreground shadow-none hover:bg-muted transition-colors",
    socialButtonsBlockButtonText: "font-semibold text-sm text-foreground",
    dividerLine: "bg-border",
    dividerText: "text-xs uppercase tracking-widest font-bold text-muted-foreground",
    formFieldLabel: "text-[13px] font-bold uppercase tracking-widest text-muted-foreground",
    formFieldInput:
      "h-12 rounded-sm border border-border bg-background px-4 text-foreground shadow-none placeholder:text-muted-foreground/50 focus:border-primary focus:ring-0 transition-colors",
    formFieldInputShowPasswordButton: "text-muted-foreground hover:text-foreground transition-colors",
    formButtonPrimary:
      "h-12 rounded-sm bg-primary text-[12px] font-bold uppercase tracking-[0.15em] text-primary-foreground shadow-none hover:bg-primary/90 transition-colors",
    footer: "hidden",
    footerAction: "hidden",
    identityPreviewText: "text-muted-foreground",
    formResendCodeLink: "text-primary hover:text-primary/80",
    otpCodeFieldInput:
      "h-12 rounded-sm border border-border bg-background text-foreground shadow-none",
    alertText: "text-sm",
    formFieldSuccessText: "text-sm text-emerald-500",
    formFieldErrorText: "text-sm text-destructive",
    formFieldWarningText: "text-sm text-amber-500",
    formFieldHintText: "text-xs text-muted-foreground",
  },
} as const;

export function AuthScreen({
  mode,
  title,
  helper,
  altHref,
  altLabel,
  altCta,
  children,
}: PropsWithChildren<{
  mode: "sign-in" | "sign-up";
  title: string;
  helper: ReactNode;
  altHref: string;
  altLabel: string;
  altCta: string;
}>) {
  return (
    <div className="min-h-screen bg-background px-4 py-5 sm:px-6 lg:px-10 flex flex-col justify-center">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-7xl overflow-hidden rounded-sm border border-border bg-card shadow-2xl">
        <div className="flex w-full flex-col justify-between p-6 sm:p-8 lg:w-[min(58%,44rem)] lg:p-12 relative z-10">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
                <Anchor className="size-5" />
              </div>
              <div className="leading-none">
                <p className="font-sans text-2xl font-extrabold tracking-[-0.04em] text-foreground">
                  Infinium
                </p>
              </div>
            </Link>
            <Link
              href={altHref}
              className="rounded-sm border border-border bg-background px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {altCta}
            </Link>
          </div>

          <div className="mx-auto flex w-full max-w-[28rem] flex-1 flex-col justify-center py-12">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              {mode === "sign-in" ? "Welcome back" : "Create your workspace"}
            </p>
            <h1 className="max-w-md font-sans text-4xl sm:text-5xl font-extrabold tracking-[-0.04em] leading-[0.95] text-foreground">
              {title}
            </h1>
            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">{helper}</p>

            <div className="mt-10 rounded-sm border border-border bg-background p-6 shadow-xl sm:p-8 relative">
              {/* Decorative Tech Accents */}
              <div className="absolute -top-px -left-px w-2 h-2 border-t-2 border-l-2 border-primary" />
              <div className="absolute -top-px -right-px w-2 h-2 border-t-2 border-r-2 border-primary" />
              <div className="absolute -bottom-px -left-px w-2 h-2 border-b-2 border-l-2 border-primary" />
              <div className="absolute -bottom-px -right-px w-2 h-2 border-b-2 border-r-2 border-primary" />
              
              {children}
            </div>

            <p className="mt-8 text-center text-[13px] font-medium text-muted-foreground">
              {altLabel}{" "}
              <Link href={altHref} className="font-bold text-primary hover:text-primary/80 transition-colors underline underline-offset-4">
                {altCta}
              </Link>
            </p>
          </div>

          <p className="text-center text-[11px] uppercase tracking-widest text-muted-foreground/50">
            Protected by reCAPTCHA. Privacy & Terms apply.
          </p>
        </div>

        {/* Right side artistic block */}
        <div className="relative hidden flex-1 overflow-hidden bg-background border-l border-border lg:flex items-center justify-center p-12">
           <div className="absolute inset-0 bg-primary/5 opacity-50" />
           <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
           
           <div className="relative w-full max-w-sm aspect-[9/16] border border-border bg-card shadow-2xl rounded-sm p-4 overflow-hidden flex flex-col items-center pt-16">
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-border" />
                <div className="w-2 h-2 rounded-full bg-border" />
                <div className="w-2 h-2 rounded-full bg-border" />
              </div>
              <div className="w-24 h-24 rounded-full bg-primary/20 border border-primary/50 mb-6 flex items-center justify-center">
                <Anchor className="size-8 text-primary opacity-50" />
              </div>
              <div className="h-6 w-3/4 bg-primary/20 mb-3" />
              <div className="h-4 w-1/2 bg-border/50 mb-12" />
              
              <div className="w-full space-y-4 px-4">
                <div className="h-16 bg-background border border-border/50 w-full" />
                <div className="h-16 bg-background border border-border/50 w-full" />
                <div className="h-16 bg-background border border-border/50 w-full" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export { clerkAppearance };
