import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useMusicPlayerStore } from "@/stores/useMusicPlayerStore";
import {
  CircleOff,
  Pause,
  Play,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeOff,
} from "lucide-react";
import React, { useRef } from "react";

export const formatDuration = (val) =>
  Math.floor(val / 60) + ":" + String(Math.floor(val % 60)).padStart(2, "0");
const PlaybackControls = () => {
  const {
    isPlaying,
    togglePlay,
    curr_song,
    volume,
    setVolume,
    duration,
    tracker,
    setTracker,
    curr_time,
    setSong,
    setCurrTime,
    setCurrentSong,
  } = useMusicPlayerStore();
  const audioRef = useRef(null);
  audioRef.current = document.querySelector("audio");
  /**
   * Sets the current song to the first song in the queue, effectively simulating a shuffle.
   */
  const handleShuffle = () => {
    const song = useMusicPlayerStore.getState().queue[0];
    setCurrentSong(song);
  };

  /**
   * Updates the tracker's position and the current time of the audio
   * based on the provided value. The value represents the percentage
   * of the audio's duration to seek to.
   *
   * @param {number} val - The new tracker value as a percentage of the total duration.
   */
  const handleSeek = (val) => {
    setTracker(val);
    audioRef.current.currentTime = (val * audioRef.current.duration) / 100;
  };

  /**
   * Repeats the current song. Pauses the audio, resets the current time to 0, plays the audio,
   * resets the tracker to 0, and resets the current time to 0.
   */
  const handleRepeat = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setTracker(0);
    setCurrTime(0);
  };

  const handleVol = (val) => setVolume(val);
  return (
    <footer className="bg-zinc-800 pt-3 px-2 w-full mx-auto flex justify-between items-center h-[15%] border-t-4 border-zinc-500">
      {/* current Song */}
      <div className="h-fit w-48 p-1  flex items-center gap-1 ">
        {curr_song ? (
          <>
            <img
              src={curr_song.image}
              alt={curr_song.song_name}
              className="h-14 w-14 rounded-md"
            />
            <div className="flex-1 cursor-pointer truncate">
              <div className="text-lg text-white truncate">
                {curr_song.song_name}
              </div>
              <div className="text-sm text-slate-300 truncate">
                • {curr_song.artist}
              </div>
            </div>
          </>
        ) : (
          <>
            <CircleOff className="h-12 w-12 text-white animate-pulse" />
            <div className="flex-1 cursor-pointer animate-pulse">
              <div className="text-lg text-white">Not Selected</div>
              <div className="text-sm text-slate-300">Not Selected</div>
            </div>
          </>
        )}
      </div>

      {/* player controls */}
      <div className="w-[40%] space-y-3">
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-white hover:bg-zinc-800 text-zinc-400"
            disabled={!curr_song}
            onClick={() => handleShuffle()}
          >
            <Shuffle />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-white hover:bg-zinc-800 text-zinc-400"
            disabled={!curr_song}
            onClick={() => setSong(-1)}
          >
            <SkipBack />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white hover:bg-white/80 rounded-full text-black"
            disabled={!curr_song}
            onClick={togglePlay}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-white hover:bg-zinc-800 text-zinc-400"
            disabled={!curr_song}
            onClick={() => setSong(1)}
          >
            <SkipForward />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-white hover:bg-zinc-800 text-zinc-400"
            disabled={!curr_song}
            onClick={() => handleRepeat()}
          >
            <Repeat1 />
          </Button>
        </div>

        <Slider
          value={[tracker]}
          max={100}
          step={1}
          onValueChange={(arr) => handleSeek(arr[0])}
          className="hover:cursor-grab active:cursor-grabbing"
          disabled={!curr_song}
        />

        <div className="flex justify-between text-zinc-300">
          <div>{formatDuration(curr_time)}</div>
          <div>{formatDuration(duration)}</div>
        </div>
      </div>

      {/* volume controle */}
      <div className="w-1/6">
        <div className="flex justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-white hover:bg-zinc-800 text-zinc-400"
            onClick={() => handleVol(0)}
          >
            <VolumeOff />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-white hover:bg-zinc-800 text-zinc-400"
            onClick={() => handleVol(50)}
          >
            <Volume1 />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-white hover:bg-zinc-800 text-zinc-400"
            onClick={() => handleVol(100)}
          >
            <Volume2 />
          </Button>
        </div>
        <Slider
          value={[volume]}
          max={100}
          step={1}
          onValueChange={(arr) => setVolume(arr[0])}
          className="hover:cursor-grab active:cursor-grabbing"
        />
        <div className="flex justify-end text-zinc-300 w-full">
          <div>{volume}</div>
        </div>
      </div>
    </footer>
  );
};

export default PlaybackControls;
