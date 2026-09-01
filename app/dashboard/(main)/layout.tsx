"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, LayoutTemplate, Settings, Link2, LogOut } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();

  const navigation = [
    { name: "Analytics", href: "/dashboard", icon: BarChart3 },
    { name: "Design", href: "/dashboard/design", icon: LayoutTemplate },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
              IN
            </div>
            <span className="font-sans font-extrabold tracking-[-0.04em] text-foreground text-lg">
              infiniumlink
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-[14px] font-medium ${
                  isActive 
                    ? "bg-secondary/50 text-foreground" 
                    : "text-muted-foreground hover:bg-secondary/30 hover:text-foreground"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/50 flex items-center gap-3">
          <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
          <div className="flex flex-col overflow-hidden">
            <span className="text-[13px] font-bold text-foreground truncate">
              {user?.firstName || "User"}
            </span>
            <span className="text-[11px] text-muted-foreground truncate">
              {user?.emailAddresses[0]?.emailAddress}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 md:hidden border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
          <div className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
            IN
          </div>
          <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
        </header>
        
        <div className="flex-1 overflow-y-auto bg-background">
          {children}
        </div>
      </main>
    </div>
  );
}
