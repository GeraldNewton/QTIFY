import React from "react";
import PlayButton from "./PlayButton";
import SectionGridSkeleton from "../skeletons/SectionGridSkeleton";

const SectionGrid = ({ tittle, songs }) => {
  return (
    <div className="mt-10">
      <div className="text-2xl font-bold mb-5">{tittle}</div>
      {songs.length == 0 ? (
        <SectionGridSkeleton />
      ) : (
        <div className="grid grid-cols-4 gap-5 place-items-start h-80 ">
          {songs.map((obj, i) => (
            <div
              key={i}
              className="h-[inherit] group relative w-full p-3 rounded-lg bg-zinc-700 hover:cursor-pointer hover:bg-zinc-600 overflow-hidden"
            >
              <img
                src={obj.image}
                alt={obj.song_name}
                className="w-full h-56 rounded-lg mb-3"
              />
              <div className="text-xl mt-2">{obj.song_name}</div>
              <div className="text-lg text-zinc-400">{obj.artist}</div>
              <PlayButton song={obj} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionGrid;
