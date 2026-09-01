import { SignIn } from "@clerk/nextjs";

import { AuthScreen, clerkAppearance } from "@/components/auth/AuthScreen";

export default function SignInPage() {
  return (
    <AuthScreen
      mode="sign-in"
      title="Log in to your Infinium"
      helper="Step back into your editor, refresh your links, and publish updates with the same visual system as the new landing experience."
      altHref="/sign-up"
      altLabel="Don't have an account?"
      altCta="Sign up"
    >
      <SignIn
        fallbackRedirectUrl="/dashboard/editor"
        forceRedirectUrl="/dashboard/editor"
        appearance={clerkAppearance}
      />
    </AuthScreen>
  );
}
