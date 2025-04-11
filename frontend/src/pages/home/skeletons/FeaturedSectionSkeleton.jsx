import React from "react";

const FeaturedSectionSkeleton = () => {
  const skeleton = new Array(6).fill(0);
  return (
    <div className="grid items-center grid-rows-2 grid-cols-3 gap-3">
      {skeleton.map((_, i) => (
        <div
          key={i}
          className="flex gap-3 items-center h-24 w-full bg-zinc-700 rounded-lg overflow-hidden animate-pulse"
        >
          <div className="h-full w-[30%] bg-zinc-800 animate-pulse" />
          <div className="flex-1 flex flex-col justify-center h-full gap-2">
            <div className="bg-zinc-800 h-[40%] w-[80%] rounded-lg animate-pulse" />
            <div className="bg-zinc-800 h-[30%] w-[60%] rounded-lg animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedSectionSkeleton;
