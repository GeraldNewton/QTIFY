import SignUpPageLoader from "@/components/loaders/SignUpPageLoader";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import React from "react";

const SignUpPage = () => {
  return (
    <>
      <AuthenticateWithRedirectCallback
        signUpForceRedirectUrl={"/auth-callback"}
      />
      <SignUpPageLoader />
    </>
  );
};

export default SignUpPage;
