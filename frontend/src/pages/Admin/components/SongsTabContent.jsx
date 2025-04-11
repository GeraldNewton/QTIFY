import { Button } from "@/components/ui/button";
import { Loader2, Music, Plus, Trash2 } from "lucide-react";
import React, { useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SongsTabContentSkeleton from "../skeletons/SongsTabContentSkeleton";
import AddSongDialogBox from "./AddSongDialogBox";
import { useMusicStore } from "@/stores/useMusicStore";

const SongsTabContent = ({ songs }) => {
  const { deleteSong, isLoading } = useMusicStore();
  const [delSong, setDelSong] = useState(null);


/**
 * Handles the deletion of a song.
 * It sets the song to be deleted and calls the deleteSong function with the song's id.
 * @param {object} song - The song to be deleted
 * @returns {Promise<void>}
 */
  const handleDelete = async (song) => {
    setDelSong(song);
    await deleteSong(song._id);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="">
          <div className="flex items-center gap-2">
            <Music className="size-7 text-emerald-500" />
            <div className="text-zinc-300 text-lg">Songs Library</div>
          </div>
          <div className="text-zinc-400 text-sm">Manage your music tracks</div>
        </div>
        <AddSongDialogBox />
      </div>

      {/* Song Area */}
      <div className="mt-9 text-white ">
        {/* headings */}
        <div className="grid grid-cols-[2fr_2fr_1fr_0.5fr] pb-5 border-b-2 border-zinc-500 font-bold text-zinc-300">
          <div>Title</div>
          <div>Artist</div>
          <div>Released Date</div>
          <div className="text-center">Actions</div>
        </div>
        {/* Scroll Area */}
        {songs?.length != 0 ? (
          <ScrollArea className="h-80 my-1">
            {songs?.map((obj, ind) => {
              return (
                <div
                  key={ind}
                  className="grid grid-cols-[2fr_2fr_1fr_0.5fr] py-4 place-content-center relative group border-b-2 border-zinc-500 hover:cursor-pointer"
                >
                  <div className="flex gap-2 items-center font-semibold">
                    <div className="h-8 w-8 rounded-md overflow-hidden">
                      <img src={obj.image} alt="" className="h-full w-full"/>
                    </div>
                    {obj.song_name}
                  </div>
                  <div className="text-zinc-300">{obj.artist}</div>
                  <div className="text-zinc-300">
                    {obj.createdAt.split("T")[0]}
                  </div>
                  <div className="text-center">
                    <Button
                      disabled={isLoading}
                      variant={"ghost"}
                      size={"sm"}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      onClick={() => handleDelete(obj)}
                    >
                      {delSong?._id == obj._id && isLoading ? (
                        <Loader2 className="size-10 animate-spin" />
                      ) : (
                        <Trash2 className="size-10" />
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        ) : (
          <SongsTabContentSkeleton />
        )}
      </div>
    </>
  );
};

export default SongsTabContent;
