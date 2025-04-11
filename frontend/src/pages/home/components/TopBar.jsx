import React, { useEffect } from "react";
import { SignedOut, useAuth, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import SignInAuthButtons from "./SignInAuthButtons";

const TopBar = () => {
  const { isAdmin, checkAdmin } = useAuthStore();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  /**checks whether the user is admin or not whenever the user signs in*/
  useEffect(() => {
    if(isSignedIn)
    checkAdmin();
  }, [isSignedIn]);

  return (
    <div className="bg-zinc-900/75 p-3 flex justify-between">
      <div className="flex gap-2 items-center">
        <img src="/spotify.png" alt="Qtify_logo" className="h-8" />
        <div className="text-xl font-bold text-white">Qtify</div>
      </div>

      <div className="flex align-middle gap-3">
        <SignedOut>
          <SignInAuthButtons />
        </SignedOut>

        {isAdmin && (
          <Button
            onClick={() => navigate("/admin")}
            className="text-white transform transition duration-300 ease-in-out hover:scale-105 hover:bg-slate-700 "
          >
            <LayoutDashboard />
            Continue to DashBoard
          </Button>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
