import React from "react";
const PlayListSkeleton = () => {
  const skeleton = new Array(7).fill(0);
  return (
    <div className="flex flex-col gap-2">
      {skeleton.map((_, i) => (
        <div key={i} className="flex items-center w-full gap-2  rounded-lg p-2">
          <div className="h-14 w-14 rounded-lg bg-zinc-700 animate-pulse" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-7 w-21 rounded-lg bg-zinc-700 animate-pulse" />
            <div className="h-4 w-14 rounded-lg bg-zinc-700 animate-pulse" />
            {/* hello          */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayListSkeleton;
