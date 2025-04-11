import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMusicStore } from "@/stores/useMusicStore";
import { Clock, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlaybackControls, {
  formatDuration,
} from "@/layout/components/PlaybackControls";
import { useMusicPlayerStore } from "@/stores/useMusicPlayerStore";
import AlbumPageLoader from "@/components/loaders/AlbumPageLoader";

const AlbumPage = () => {
  const { _id } = useParams();
  const { getCurrentAlbum, currentAlbum } = useMusicStore();
  const { curr_song, isPlaying, setCurrentSong, togglePlay, initializeQueue } =
    useMusicPlayerStore();

  /**get the current album and current song from the store also if the audio is playing, then pauses it */
  useEffect(() => {
    getCurrentAlbum(_id);
    setCurrentSong(null);
    if (isPlaying) {
      togglePlay();
    }
  }, [_id]);


    /**sets the song queue from the current album received*/
  useEffect(() => {
    if (currentAlbum?.songs.length > 0) initializeQueue(...currentAlbum.songs);
  }, [currentAlbum]);


/**
 * Plays the first song of the current album if no song is currently playing,
 * otherwise toggles the play state of the current song.
 */
  const handlePlayAlbum = () => {
    if (!curr_song) setCurrentSong(currentAlbum?.songs[0]);
    else togglePlay();
  };


/**
 * Plays the given song if it is not the current song; otherwise, toggles
 * the play state of the current song.
 * @param {Object} song - The song object to play or toggle.
 */
  const handlePlay = (song) => {
    if (curr_song?._id == song._id) togglePlay();
    else setCurrentSong(song);
  };

  return !currentAlbum ? (
    <AlbumPageLoader />
  ) : (
    <>
      <div className="h-full mx-3 rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-900 overflow-hidden">
        <div className="h-[85%]">
          {/* hero image */}
          <div className="h-1/2 grid w-full bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 relative">
            <div className="place-self-center min-h-20 max-h-72 h-full max-w-[650px] w-full text-white flex gap-3 p-3">
              <div className="h-[inherit] w-1/2">
                <img
                  src={currentAlbum?.image}
                  alt=""
                  className="h-[inherit] w-full object-cover object-center rounded-lg overflow-hidden"
                />
              </div>
              <div className="h-[inherit] w-4/5 flex flex-col justify-center gap-5">
                <div className="text-xl">Album</div>
                <div className="text-4xl font-bold">
                  {currentAlbum?.album_name}
                </div>
                <div className="text-zinc-300 text-2xl">
                  {currentAlbum?.artist} • {currentAlbum?.releaseYear} •{" "}
                  {currentAlbum?.songs.length} songs
                </div>
              </div>
            </div>
            <Button
              onClick={handlePlayAlbum}
              size="icon"
              className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all absolute right-4 bottom-6"
            >
              {isPlaying ? (
                <Pause className="h-7 w-7 text-black" />
              ) : (
                <Play className="h-7 w-7 text-black" />
              )}
            </Button>
          </div>

          {/* song Area */}
          <div className="m-3 text-white ">
            {/* headings */}
            <div className="grid grid-cols-[0.5fr_4fr_2fr_1fr] pb-5 border-b-2 border-zinc-500">
              <div>#</div>
              <div>Title</div>
              <div>Released Date</div>
              <div>
                <Clock />
              </div>
            </div>
            {/* Scroll Area */}
            <ScrollArea className="h-64  my-1">
              {currentAlbum?.songs?.map((obj, ind) => {
                const isCurrSong = curr_song?._id == obj._id;
                return (
                  <div
                    key={ind}
                    className="grid grid-cols-[0.5fr_4fr_2fr_1fr] py-4 place-content-center relative group border-b-2 border-zinc-500 hover:cursor-pointer"
                  >
                    <div className="absolute right-4 top-3 hidden group-hover:block">
                      <Button
                        onClick={() => handlePlay(obj)}
                        variant="ghost"
                        className="p-2 scale-110 hover:bg-transparent hover:scale-150 transition-all"
                      >
                        {isCurrSong && isPlaying ? (
                          <Pause className="h-11 w-11 text-green-500" />
                        ) : (
                          <Play className="h-11 w-11 text-green-500" />
                        )}
                        {/* <Play className="h-11 w-11 text-green-500" /> */}
                      </Button>
                    </div>
                    <div>
                      {isCurrSong ? (
                        <div className="text-green-500">♫</div>
                      ) : (
                        ind + 1
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-11 w-11">
                        <img
                          src={obj.image}
                          className="rounded-lg h-full w-full"
                          alt={obj?.song_name}
                        />
                      </div>
                      <div>
                        <div className="text-lg">{obj?.song_name}</div>
                        <div className="text-sm text-zinc-300">
                          • {obj?.artist}
                        </div>
                      </div>
                    </div>
                    <div>{obj?.createdAt.split("T")[0]}</div>
                    <div>{formatDuration(obj?.duration)}</div>
                  </div>
                );
              })}
            </ScrollArea>
          </div>
        </div>
        <PlaybackControls />
      </div>
    </>
  );
};

export default AlbumPage;
