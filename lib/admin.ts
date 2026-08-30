import { auth } from "@clerk/nextjs/server";

export const ADMIN_EMAILS = [
  "admin@linkflow.com",
  "founder@linkflow.com",
  "sumitkumar@test.com" // You can replace this with your actual Clerk email
];

// Note: In a real production app, you might want to rely on Clerk metadata (e.g., user.publicMetadata.role === 'admin')
// or a users table boolean flag.
export async function requireAdmin() {
  const { userId, sessionClaims } = await auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // If you map email to sessionClaims in Clerk token config:
  // const email = sessionClaims?.email as string;
  // if (!ADMIN_EMAILS.includes(email)) throw new Error("Forbidden");

  // Since we don't have Clerk fully configured for email claims in this sandbox,
  // we'll mock the check to allow access for demonstration purposes, 
  // but log a warning that this is an insecure placeholder.
  console.warn("[ADMIN_CHECK] Mocking admin access. In prod, verify email or role.");
  
  return true;
}
