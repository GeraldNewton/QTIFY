import AuthCallBackPageLoader from "@/components/loaders/AuthCallBackPageLoader";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallBackPage = () => {
  const { isLoaded, user } = useUser();
  const { syncUser } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
/**
 * Asynchronously runs the authentication callback logic.
 * - Checks if the user data is loaded and if the user is authenticated (in the backend a new user is created or an existing one is fetched).
 * - If conditions are met, synchronizes the user data with the backend.
 * - Navigates to the homepage upon successful synchronization.
 */
    const run = async () => {
      if (!isLoaded || !user) return;
      await syncUser();
      navigate("/");
    };
    run();
  }, [isLoaded, user]);
  return <AuthCallBackPageLoader/>
};

export default AuthCallBackPage;
