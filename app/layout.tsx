import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import "./globals.css";
import "@clerk/ui/themes/shadcn.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Infinium - Everything you are. One link.",
  description: "Create your beautiful, customized link-in-bio page.",
  other: {
    "darkreader-lock": "true",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
        lang="en"
        className={`${inter.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col relative" suppressHydrationWarning>
          {/* Subtle global noise texture */}
          <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
          
          {/* @ts-ignore - baseTheme type differs in Next 15 strict mode */}
          <ClerkProvider appearance={{ baseTheme: shadcn as any }}>
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
