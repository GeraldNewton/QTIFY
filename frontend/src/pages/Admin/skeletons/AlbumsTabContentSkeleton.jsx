import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const AlbumsTabContentSkeleton = () => {
  const skeleton = new Array(9).fill(0);
  return (
    <ScrollArea className="h-80 my-1">
      {skeleton?.map((_, ind) => {
        return (
          <div
            key={ind}
            className="grid gap-2 grid-cols-[1.3fr_1fr_1fr_0.5fr_0.5fr] py-4 border-b-2 border-zinc-500 hover:cursor-pointer"
          >
            <div className="flex gap-2 items-center font-semibold">
              <div className="h-8 w-8 rounded-md bg-zinc-600 animate-pulse" />
              <div className="h-8 min-w-14 max-w-20 w-full rounded-md bg-zinc-600 animate-pulse" />
            </div>
            <div className="bg-zinc-600 h-8 min-w-14 max-w-20 w-full rounded-md animate-pulse" />
            <div className="bg-zinc-600 h-8 min-w-14 max-w-20 w-full rounded-md animate-pulse" />
            <div className="bg-zinc-600 h-8 min-w-14 max-w-20 w-full rounded-md animate-pulse" />
            <div className="bg-zinc-600 h-8 min-w-14 max-w-20 w-full rounded-md animate-pulse" />
          </div>
        );
      })}
    </ScrollArea>
  );
};
  

export default AlbumsTabContentSkeleton;
