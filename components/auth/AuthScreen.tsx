"use client";

import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren, ReactNode } from "react";

const clerkAppearance = {
  elements: {
    rootBox: "w-full",
    cardBox: "w-full",
    card: "w-full border-0 bg-transparent p-0 shadow-none",
    header: "hidden",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
    socialButtonsBlockButton:
      "h-12 rounded-2xl border border-[#d8d6cf] bg-white text-[#1e2330] shadow-none hover:bg-[#f7f6f2]",
    socialButtonsBlockButtonText: "font-semibold text-sm text-[#1e2330]",
    dividerLine: "bg-[#dfddd5]",
    dividerText: "text-xs uppercase tracking-[0.22em] text-[#8b8f83]",
    formFieldLabel: "text-[0.82rem] font-semibold text-[#676b5f]",
    formFieldInput:
      "h-12 rounded-2xl border border-[#dfddd5] bg-[#eff0ec] px-4 text-[#1e2330] shadow-none placeholder:text-[#8b8f83] focus:border-[#1e2330] focus:ring-0",
    formFieldInputShowPasswordButton: "text-[#676b5f] hover:text-[#1e2330]",
    formButtonPrimary:
      "h-12 rounded-full bg-[#d2e823] text-sm font-black text-[#1e2330] shadow-none hover:bg-[#c5dc18]",
    footer: "hidden",
    footerAction: "hidden",
    identityPreviewText: "text-[#676b5f]",
    formResendCodeLink: "text-[#6a31a3] hover:text-[#502274]",
    otpCodeFieldInput:
      "h-12 rounded-2xl border border-[#dfddd5] bg-[#eff0ec] text-[#1e2330] shadow-none",
    alertText: "text-sm",
    formFieldSuccessText: "text-sm text-emerald-700",
    formFieldErrorText: "text-sm text-rose-600",
    formFieldWarningText: "text-sm text-amber-700",
    formFieldHintText: "text-xs text-[#8b8f83]",
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
    <div className="min-h-screen bg-[#f3f3f1] px-4 py-5 sm:px-6 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-7xl overflow-hidden rounded-[2rem] bg-white shadow-[0_28px_80px_rgba(30,35,48,0.18)]">
        <div className="flex w-full flex-col justify-between p-6 sm:p-8 lg:w-[min(58%,44rem)] lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e2330] text-sm font-black text-white">
                LF
              </div>
              <div className="leading-none">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#676b5f]">
                  LinkFlow
                </p>
                <p className="text-base font-black tracking-[-0.03em] text-[#1e2330]">Creator access</p>
              </div>
            </Link>
            <Link
              href={altHref}
              className="rounded-full border border-[#dfddd5] px-4 py-2 text-sm font-semibold text-[#676b5f] transition-colors hover:bg-[#f7f6f2] hover:text-[#1e2330]"
            >
              {altCta}
            </Link>
          </div>

          <div className="mx-auto flex w-full max-w-[28rem] flex-1 flex-col justify-center py-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#8b8f83]">
              {mode === "sign-in" ? "Welcome back" : "Create your page"}
            </p>
            <h1 className="max-w-md text-4xl font-black tracking-[-0.06em] text-[#1e2330] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-sm leading-7 text-[#676b5f]">{helper}</p>

            <div className="mt-8 rounded-[1.75rem] border border-[#ebe8df] bg-[#fcfcfa] p-5 shadow-[0_16px_40px_rgba(30,35,48,0.06)] sm:p-6">
              {children}
            </div>

            <p className="mt-8 text-center text-sm text-[#676b5f]">
              {altLabel}{" "}
              <Link href={altHref} className="font-semibold text-[#6a31a3] underline underline-offset-4">
                {altCta}
              </Link>
            </p>
          </div>

          <p className="text-center text-xs leading-5 text-[#8b8f83]">
            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service
            apply.
          </p>
        </div>

        <div className="relative hidden flex-1 overflow-hidden bg-[#d8b0da] lg:block">
          <div className="absolute inset-y-0 left-12 right-[-4rem] top-24 rotate-[-8deg] rounded-[2rem] bg-[#502274]" />
          <div className="absolute left-14 top-40 rounded-[1.4rem] bg-white p-4 shadow-[0_20px_60px_rgba(30,35,48,0.2)]">
            <div className="flex h-24 w-24 items-center justify-center rounded-[1rem] bg-[#f3f3f1] text-center text-xs font-bold text-[#1e2330]">
              Spotlight
            </div>
          </div>
          <div className="absolute right-14 top-12 rounded-full bg-white/90 px-4 py-2 text-sm font-black text-[#1e2330] shadow-[0_12px_30px_rgba(30,35,48,0.14)]">
            Live profile
          </div>
          <Image
            src="/figma-assets/auth-illustration.png"
            alt="Decorative creator collage"
            width={378}
            height={630}
            className="absolute bottom-0 right-0 h-full w-auto object-cover object-center"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export { clerkAppearance };
