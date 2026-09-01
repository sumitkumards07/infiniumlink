import { db } from "@/db";
import { profiles } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { SettingsForm } from "./SettingsForm";

export default async function SettingsPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });

  if (!profile) {
    redirect("/onboarding");
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="font-sans text-3xl font-extrabold tracking-[-0.04em] leading-[0.95] text-foreground">
          Settings
        </h1>
        <p className="text-[13px] text-muted-foreground pt-2">
          Manage your account and workspace identifier.
        </p>
      </div>
      
      <div className="bg-card border border-border shadow-sm rounded-md p-6 max-w-xl">
        <h2 className="text-[14px] font-bold text-foreground mb-6 pb-4 border-b border-border/50">
          Public Profile
        </h2>
        <SettingsForm initialUsername={profile.username} />
      </div>
    </div>
  );
}
