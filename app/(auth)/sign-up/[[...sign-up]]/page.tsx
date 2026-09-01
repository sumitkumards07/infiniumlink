import { SignUp } from "@clerk/nextjs";

import { AuthScreen, clerkAppearance } from "@/components/auth/AuthScreen";

export default function SignUpPage() {
  return (
    <AuthScreen
      mode="sign-up"
      title="Create your Infinium"
      helper="Claim your page, start from the redesigned builder, and turn your links into a more expressive profile in minutes."
      altHref="/sign-in"
      altLabel="Already have an account?"
      altCta="Log in"
    >
      <SignUp
        fallbackRedirectUrl="/onboarding"
        forceRedirectUrl="/onboarding"
        appearance={clerkAppearance}
      />
    </AuthScreen>
  );
}
