import { Loader } from 'lucide-react';
import React from 'react'

const SignUpPageLoader = () => {
    return (
        <div className="h-screen w-full flex justify-center items-center bg-black">
          <div className="w-[90%] max-w-md bg-zinc-900 flex flex-col items-center gap-4 py-6 rounded-lg">
            <Loader className="size-10 text-emerald-500 animate-spin" />
            <h3 className="text-zinc-400 text-2xl font-bold">Syncing you</h3>
            <p className="text-zinc-400 text-lg">Redirecting...</p>
          </div>
        </div>
      );
}

export default SignUpPageLoader