"use server";

import { db } from "@/db";
import { profiles, users } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

// Reserved usernames
const RESERVED = new Set([
  "admin", "api", "login", "signup", "dashboard", "settings", 
  "pricing", "support", "help", "about", "terms", "privacy", "go", "onboarding"
]);

export async function claimUsername(prevState: any, formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const username = formData.get("username") as string;

  if (!username || username.length < 3 || username.length > 30) {
    return { error: "Username must be between 3 and 30 characters" };
  }

  const normalized = username.toLowerCase().trim();

  // Basic regex check: lowercase alphanumeric and dashes
  if (!/^[a-z0-9-]+$/.test(normalized)) {
    return { error: "Username can only contain lowercase letters, numbers, and hyphens" };
  }

  if (RESERVED.has(normalized)) {
    return { error: "This username is reserved" };
  }

  // Check if username exists
  const existing = await db.query.profiles.findFirst({
    where: eq(profiles.username, normalized),
  });

  if (existing) {
    return { error: "Username is already taken" };
  }

  // Ensure user exists in the DB (fallback if webhooks are delayed/not configured locally)
  const user = await currentUser();
  if (user) {
    await db.insert(users).values({
      id: userId,
      email: user.emailAddresses[0]?.emailAddress || "",
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.imageUrl,
    }).onConflictDoNothing();
  }

  // Create the profile
  await db.insert(profiles).values({
    userId,
    username: normalized,
  });

  redirect("/dashboard/editor");
}
