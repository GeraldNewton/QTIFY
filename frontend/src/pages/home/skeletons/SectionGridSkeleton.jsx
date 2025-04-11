import React from "react";

const SectionGridSkeleton = () => {
  const skeleton = new Array(4).fill(0);
  return (
    <div className="grid grid-cols-4 gap-5 place-items-center">
      {skeleton.map((_, i) => (
        <div key={i} className="w-full h-72 p-3 rounded-lg bg-zinc-700 animate-pulse">
          <div className="w-full h-3/4 rounded-lg mb-3 bg-zinc-800 animate-pulse" />
          <div className="bg-zinc-800 h-6 w-1/2 rounded-lg mb-1 animate-pulse" />
          <div className="bg-zinc-800 h-5 w-2/3 rounded-lg animate-pulse" />
        </div>
      ))}
    </div>
  );
};

export default SectionGridSkeleton;
