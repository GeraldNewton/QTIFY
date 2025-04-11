import React from "react";
import { Button } from '@/components/ui/button';
import { useSignIn } from '@clerk/clerk-react';
import { LogIn } from "lucide-react";

const SignInAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) return null;

  /**
   * Sign in with Google
   * @function
   * @returns {Promise} A promise that resolves if the sign in is successful, and rejects if there is an error
   * @example
   * signInWithGoogle()
   */
  const signInWithGoogle = () =>
    signIn
      .authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/auth-callback",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.errors);
        console.error(err, null, 2);
      });

  return (
    <Button
      onClick={() => signInWithGoogle()}
      className="text-white transform transition duration-300 ease-in-out hover:scale-105 hover:bg-slate-700 "
    >
      <LogIn />
      Continue with Google
    </Button>
  );
};

export default SignInAuthButtons;
