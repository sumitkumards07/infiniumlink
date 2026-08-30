"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function BillingPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const onSubscribe = async (plan: string) => {
    setIsLoading(plan);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="flex flex-col gap-8 px-4 md:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Plans</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing details.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl">
        {/* Free Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>Perfect to get started.</CardDescription>
            <div className="mt-4 text-3xl font-bold">$0<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> 1 Page</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> 10 Blocks limit</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Basic themes</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> LinkFlow branding</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" disabled>Current Plan</Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="border-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">Popular</div>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>For serious creators.</CardDescription>
            <div className="mt-4 text-3xl font-bold">$9<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Unlimited pages & blocks</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Custom domains</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Premium blocks (Video, Mail)</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Remove branding</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => onSubscribe("pro")} disabled={isLoading !== null}>
              {isLoading === "pro" ? "Loading..." : "Upgrade to Pro"}
            </Button>
          </CardFooter>
        </Card>

        {/* Business Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Business</CardTitle>
            <CardDescription>For brands and teams.</CardDescription>
            <div className="mt-4 text-3xl font-bold">$29<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Everything in Pro</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> White label</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> AI Builder access</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Priority support</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => onSubscribe("business")} disabled={isLoading !== null}>
              {isLoading === "business" ? "Loading..." : "Upgrade to Business"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
