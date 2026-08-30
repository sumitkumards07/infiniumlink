import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import "./globals.css";
import "@clerk/ui/themes/shadcn.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkFlow - Everything you are. One link.",
  description: "Create your beautiful, customized link-in-bio page.",
  other: {
    "darkreader-lock": "true",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col" suppressHydrationWarning>
          <ClerkProvider appearance={{ baseTheme: shadcn }}>
            <PostHogProvider>
              <ThemeProvider
                attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </PostHogProvider>
          </ClerkProvider>
        </body>
      </html>
  );
}
