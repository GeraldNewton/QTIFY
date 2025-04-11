import { useMusicPlayerStore } from "@/stores/useMusicPlayerStore";
import React, { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const {
    curr_song,
    isPlaying,
    volume,
    setDuration,
    setTracker,
    setCurrTime,
    setSong,
    togglePlay,
    curr_index,
    queue,
  } = useMusicPlayerStore();

  /**
   * Called when the audio's metadata has loaded, sets the total duration in
   * the store and starts playing the audio.
   */
  const handleMetaData = () => {
    setDuration(audioRef.current.duration);
    audioRef.current.play();
  };

  /**
   * Updates the tracker and current time in the store when the audio's current
   * time changes.
   */
  const handleTimeUpdate = () => {
    setTracker(
      Math.floor(
        (audioRef.current.currentTime * 100) / audioRef.current.duration
      )
    );
    setCurrTime(audioRef.current.currentTime);
  };

  /**
   * Called when the audio finishes playing, if the current song is the last
   * song in the queue, pause the audio, otherwise play the next song in the
   * queue.
   */
  const handleEnded = () => {
    if (curr_index < queue.length - 1) setSong(1);
    else togglePlay();
  };

  /** sets the current audio source to the curent song if present*/
  useEffect(() => {
    if (!curr_song) return;
    audioRef.current.src = curr_song.audio;
  }, [curr_song]);

  /** play/pause song*/
  useEffect(() => {
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying]);

  /** adjust volume*/
  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);
  return (
    <audio
      ref={audioRef}
      onLoadedMetadata={handleMetaData}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
    />
  );
};

export default AudioPlayer;
