import React from 'react'

const FriendActivitySkeleton = () => {
    const skeleton = new Array(7).fill(0);
    return (
      <div className="flex flex-col gap-2">
        {skeleton.map((_, i) => (
          <div key={i} className="flex items-center gap-2  rounded-lg p-2">
            <div className="h-10 w-10 rounded-full bg-zinc-700 animate-pulse" />
            <div className="h-7 max-w-52 w-[100%] rounded-lg bg-zinc-700 animate-pulse" />
          </div>
        ))}
      </div>
    );
}

export default FriendActivitySkeleton