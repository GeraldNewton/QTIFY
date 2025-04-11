import React from "react";
import { Loader } from "lucide-react";

const AlbumPageLoader = () => {
  return (
    // <div className="h-full w-full grid place-items-center bg-zinc-800 text-white">
    <div className="h-full mx-3 rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-900 grid place-items-center overflow-hidden">
      <div className="w-[400px] h-[180px] bg-zinc-900 border-4 border-zinc-600 rounded-lg flex flex-col items-center justify-center gap-3">
        {/* <div className="text-zinc-400 text-2xl font-bold">Loading...</div>
        <div className="animate-spin">
          <Loader size={50} color="#5ff28b" />
        </div> */}
        <Loader className="size-50 text-emerald-500 animate-spin" />
        <h3 className="text-zinc-400 text-2xl font-bold">Loading</h3>
        <p className="text-zinc-400 text-lg">Fetching your albums...</p>
      </div>
    </div>
  );
};

export default AlbumPageLoader;
