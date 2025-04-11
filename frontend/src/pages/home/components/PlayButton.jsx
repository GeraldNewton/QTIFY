import { Button } from "@/components/ui/button";
import { useMusicPlayerStore } from "@/stores/useMusicPlayerStore";
import { Pause, Play } from "lucide-react";
import React from "react";

const PlayButton = ({ song }) => {
  const { curr_song, setCurrentSong, isPlaying, togglePlay } =
    useMusicPlayerStore();
  const is_currSong = song._id == curr_song?._id;

/**
 * Toggles play state if the provided song is the current song;
 * otherwise, sets the provided song as the current song.
 */
  const handlePlay = () => {
    if (is_currSong) togglePlay();
    else setCurrentSong(song);
  };
  return (
    <Button
      size="icon"
      onClick={handlePlay}
      className={`scale-110 absolute bottom-4 right-4 bg-green-500 transition-all hover:bg-green-400 hover:scale-125  ${
        is_currSong
          ? "opacity-100 ring-2 ring-green-600 ring-offset-2 ring-offset-zinc-700 group-hover:ring-offset-zinc-600"
          : "opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
      }`}
    >
      {is_currSong && isPlaying ? <Pause /> : <Play />}
    </Button>
  );
};

export default PlayButton;
