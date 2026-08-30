import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes
// E.g., landing page, public profiles, go links, login/signup, api routes
const isPublicRoute = createRouteMatcher([
  '/', 
  '/sign-in(.*)', 
  '/sign-up(.*)',
  '/api(.*)',
  '/go/(.*)',
  '/:username' // The dynamic username route is tricky, usually we handle it by not protecting it and checking user in dashboard.
]);

const isDashboardRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/admin(.*)',
  '/onboarding(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  // If it's a dashboard route, require authentication
  if (isDashboardRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    '/__clerk/:path*',
  ],
};
