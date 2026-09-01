"use server";

import { db } from "@/db";
import { profiles } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, ne, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Reserved usernames
const RESERVED = new Set([
  "admin", "api", "login", "signup", "dashboard", "settings", 
  "pricing", "support", "help", "about", "terms", "privacy", "go", "onboarding"
]);

export async function updateUsername(prevState: any, formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const username = formData.get("username") as string;

  if (!username || username.length < 3 || username.length > 30) {
    return { error: "Username must be between 3 and 30 characters" };
  }

  const normalized = username.toLowerCase().trim();

  if (!/^[a-z0-9-]+$/.test(normalized)) {
    return { error: "Username can only contain lowercase letters, numbers, and hyphens" };
  }

  if (RESERVED.has(normalized)) {
    return { error: "This username is reserved" };
  }

  // Check if username is taken by someone else
  const existing = await db.query.profiles.findFirst({
    where: and(eq(profiles.username, normalized), ne(profiles.userId, userId)),
  });

  if (existing) {
    return { error: "Username is already taken" };
  }

  await db.update(profiles)
    .set({ username: normalized })
    .where(eq(profiles.userId, userId));

  revalidatePath("/dashboard/settings");
  
  return { success: true };
}
