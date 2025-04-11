import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Library, Loader2, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import AlbumsTabContentSkeleton from "../skeletons/AlbumsTabContentSkeleton";
import AddAlbumDialogBox from "./AddAlbumDialogBox";
import { useMusicStore } from "@/stores/useMusicStore";

const AlbumsTabContent = ({ albums }) => {
  const { deleteAlbum, isLoading } = useMusicStore();
  const [delAlbum, setDelAlbum] = useState(null);

  /**
   * Handle the deletion of an album
   * @param {object} song - The album to be deleted
   * @returns {Promise<void>}
   */
  const handleDelete = async (song) => {
    setDelAlbum(song);
    await deleteAlbum(song._id);
  }; 
  
  
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="">
          <div className="flex items-center gap-2">
            <Library className="size-7 text-violet-500" />
            <div className="text-zinc-300 text-lg">Albums Library</div>
          </div>
          <div className="text-zinc-400 text-sm">Manage your albums tracks</div>
        </div>
        <AddAlbumDialogBox/>
      </div>

      {/* Album Area */}
      <div className="mt-9 text-white ">
        {/* headings */}
        <div className="grid grid-cols-[1.3fr_1fr_1fr_0.5fr_0.5fr] pb-5 border-b-2 border-zinc-500 font-bold text-zinc-300">
          <div>Title</div>
          <div>Artist</div>
          <div>Released Date</div>
          <div>Songs</div>
          <div className="">Actions</div>
        </div>
        {/* Scroll Area */}
        {(albums?.length != 0) ? (
          <ScrollArea className="h-80 my-1">
            {albums?.map((obj, ind) => {
              return (
                <div
                  key={ind}
                  className="grid grid-cols-[1.3fr_1fr_1fr_0.5fr_0.5fr] py-4 place-content-center relative group border-b-2 border-zinc-500 hover:cursor-pointer"
                >
                  <div className="flex gap-2 items-center font-semibold">
                    <div className="h-8 w-8 rounded-md overflow-hidden">
                      <img src={obj.image} alt="" />
                    </div>
                    {obj.album_name}
                  </div>
                  <div className="text-zinc-300">{obj.artist}</div>
                  <div className="text-zinc-300">
                    {obj.createdAt.split("T")[0]}
                  </div>
                  <div className="text-zinc-300 pl-4">{obj.songs.length}</div>
                  <div className="">
                  <Button
                      disabled={isLoading}
                      variant={"ghost"}
                      size={"sm"}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      onClick={() => handleDelete(obj)}
                    >
                      {delAlbum?._id == obj._id && isLoading ? (
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
          <AlbumsTabContentSkeleton />
        )}
      </div>
    </>
  );
};

export default AlbumsTabContent;
