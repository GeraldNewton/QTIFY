import React from "react";
const MessageSkeleton = () => {
  const skeleton = new Array(20).fill(0);
  return (
    <div className="flex flex-col gap-2 h-full">
      {skeleton.map((_, i) => {
        const bool = i % 2;
        return (
          <div
            key={i}
            className={`flex gap-2  h-fit    ${
              !bool ? "justify-end" : "justify-start"
            }`}
          >
            <div className="h-10 w-10 rounded-full bg-zinc-700 animate-pulse" />
            <div className=" w-60 h-10 bg-zinc-700 rounded-lg animate-pulse" />
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;
