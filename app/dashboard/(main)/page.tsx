"use client";

import React, { useState } from "react";
import { 
  BarChart3, 
  MousePointerClick, 
  Globe2, 
  Smartphone,
  ArrowUpRight,
  Monitor,
  Link2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Fake Data for the UI
const ANALYTICS_DATA = {
  views: "12,450",
  clicks: "3,200",
  ctr: "25.7%",
  viewsChange: "+14.5%",
  clicksChange: "+5.2%",
  ctrChange: "+2.1%",
};

const TOP_LINKS = [
  { name: "My Portfolio", url: "https://myportfolio.com", clicks: 1205 },
  { name: "Latest YouTube Video", url: "https://youtube.com", clicks: 843 },
  { name: "Twitter Profile", url: "https://twitter.com", clicks: 540 },
  { name: "Newsletter Signup", url: "https://substack.com", clicks: 230 },
];

const DEVICES = [
  { type: "Mobile", percentage: 65, icon: Smartphone },
  { type: "Desktop", percentage: 32, icon: Monitor },
  { type: "Tablet", percentage: 3, icon: Globe2 },
];

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-3xl font-extrabold tracking-[-0.04em] leading-[0.95] text-foreground">
            Overview
          </h1>
          <p className="text-[13px] text-muted-foreground pt-2">
            Measure your performance and audience engagement.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-secondary/50 rounded-sm p-1">
            {["7d", "30d", "90d"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest rounded-sm transition-colors ${
                  timeRange === range 
                    ? "bg-background shadow-sm text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <Link href="/dashboard/design">
            <Button size="sm" className="h-9 px-4 rounded-sm text-[11px] font-bold uppercase tracking-[0.15em]">
              Edit Page
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Total Views" 
          value={ANALYTICS_DATA.views} 
          change={ANALYTICS_DATA.viewsChange} 
          icon={BarChart3} 
        />
        <MetricCard 
          title="Total Clicks" 
          value={ANALYTICS_DATA.clicks} 
          change={ANALYTICS_DATA.clicksChange} 
          icon={MousePointerClick} 
        />
        <MetricCard 
          title="Click Through Rate" 
          value={ANALYTICS_DATA.ctr} 
          change={ANALYTICS_DATA.ctrChange} 
          icon={ArrowUpRight} 
        />
      </div>

      {/* Main Chart Area (Mocked with beautiful CSS) */}
      <div className="bg-card border border-border shadow-sm rounded-md p-6 h-[400px] flex flex-col relative overflow-hidden">
        <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-6">
          Views over time
        </div>
        
        {/* Mock Chart Grid */}
        <div className="absolute inset-x-6 top-20 bottom-12 border-b border-border flex flex-col justify-between opacity-30">
          <div className="border-t border-border w-full" />
          <div className="border-t border-border w-full" />
          <div className="border-t border-border w-full" />
          <div className="border-t border-border w-full" />
        </div>

        {/* Mock Chart Bars */}
        <div className="flex-1 flex items-end justify-between gap-1 md:gap-2 px-2 pb-8 z-10">
          {Array.from({ length: 30 }).map((_, i) => {
            const height = Math.floor(Math.random() * 60) + 20;
            return (
              <div 
                key={i} 
                className="w-full bg-primary/20 hover:bg-primary transition-colors rounded-t-sm" 
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
        
        <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest">
          <span>Aug 01</span>
          <span>Aug 15</span>
          <span>Aug 30</span>
        </div>
      </div>

      {/* Two Column Layout for Links and Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Top Links */}
        <div className="lg:col-span-2 bg-card border border-border shadow-sm rounded-md p-6">
          <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-6 pb-4 border-b border-border/50">
            Top Performing Links
          </div>
          <div className="space-y-4">
            {TOP_LINKS.map((link, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-md hover:bg-secondary/20 transition-colors group cursor-pointer border border-transparent hover:border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary rounded flex items-center justify-center text-muted-foreground">
                    <Link2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-foreground group-hover:text-primary transition-colors">
                      {link.name}
                    </div>
                    <div className="text-[12px] text-muted-foreground truncate max-w-[200px] md:max-w-sm">
                      {link.url}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] font-extrabold font-sans tracking-tight text-foreground">
                    {link.clicks.toLocaleString()}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Clicks
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Devices */}
        <div className="bg-card border border-border shadow-sm rounded-md p-6">
          <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-6 pb-4 border-b border-border/50">
            Devices
          </div>
          <div className="space-y-6">
            {DEVICES.map((device, i) => {
              const Icon = device.icon;
              return (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-[13px] font-bold text-foreground">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      {device.type}
                    </div>
                    <span>{device.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${device.percentage}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}

function MetricCard({ title, value, change, icon: Icon }: any) {
  return (
    <div className="bg-card border border-border shadow-sm rounded-md p-6 hover:border-primary/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {title}
        </div>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex items-end justify-between">
        <div className="font-sans text-4xl font-extrabold tracking-[-0.04em] leading-[0.95] text-foreground">
          {value}
        </div>
        <div className="text-[12px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
          {change}
        </div>
      </div>
    </div>
  );
}
