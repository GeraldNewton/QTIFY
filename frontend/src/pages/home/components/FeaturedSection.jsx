import React from "react";
import PlayButton from "./PlayButton";
import FeaturedSectionSkeleton from "../skeletons/FeaturedSectionSkeleton";

const FeaturedSection = ({ songs }) => {

  return (
    <div className="my-8">
      <div className="text-2xl font-bold mb-5">Featured Songs</div>

      {songs.length==0 ? (
        <FeaturedSectionSkeleton />
      ) : (
        <div className="grid place-items-center grid-cols-3 gap-4">
          {songs.map((obj, i) => (
            <div
              key={i}
              className="group relative hover:bg-zinc-600 hover:cursor-pointer flex gap-3 items-center h-24 w-full bg-zinc-700 pr-3 rounded-lg overflow-hidden"
            >
              <img src={obj.image} alt={obj.song_name} className="h-full" />
              <div>
                <div className="text-lg">{obj.song_name}</div>
                <div className="text-zinc-400">{obj.artist}</div>
              </div>
              <PlayButton song={obj} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedSection;
