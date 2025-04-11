import { useMusicStore } from "@/stores/useMusicStore";
import React, { useState } from "react";
import { House, Library, MessageCircleMore } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import PlayListSkeleton from "../skeletons/PlayListSkeleton";

const LeftSideBar = () => {
  const { getAlbums, albums } = useMusicStore();

  useState(() => {
    getAlbums();
  }, []);

  return (
    <div className="h-full flex flex-col gap-3 pr-3">
      <div className="bg-zinc-800 gap-2 rounded-lg p-3 py-5 text-white font-bold tracking-wider">
        <Link to={"/"} className="block hover:bg-zinc-700 p-2 rounded-lg">
          <House className="inline-block mr-2" />
          <span>Home</span>
        </Link>
        <Link
          to={"/chat"}
          className="block mt-3 hover:bg-zinc-700 p-2 rounded-lg"
        >
          <MessageCircleMore className="inline-block mr-2" />
          <span>Chat</span>
        </Link>
      </div>
      <div className="bg-zinc-800  rounded-lg text-white p-5 flex-1">
        <div className="pl-2 mb-3">
          <Library className="inline-block mr-2" />
          <span>Playlists</span>
        </div>
        <ScrollArea className="h-[30rem] my-1">
          {/* checks if the albums is loaded or not */}
          {albums.length == 0 ? (
            <PlayListSkeleton />
          ) : (
            albums.map((obj, i) => (
              <Link
                key={i}
                to={`/album/${obj._id}`}
                className="block my-2 hover:bg-zinc-700 p-2 rounded-lg"
              >
                <div className="flex gap-2">
                  <div className="h-14 w-14 rounded-lg overflow-hidden">
                    <img
                      src={`${obj.imageURL}`}
                      alt=""
                      className=" h-full w-full"
                    />
                  </div>
                  <div>
                    <div className="text-lg">{obj.album_name}</div>
                    <div className="text-sm text-zinc-400">• {obj.artist}</div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSideBar;
