import { create } from "zustand";
import useChatStore from "./useChatStore";

export const useMusicPlayerStore = create((set, get) => ({
  queue: [],
  curr_song: null,
  isPlaying: false,
  curr_index: -1,
  volume: 45,
  tracker:0,
  curr_time:0,
  duration:0,
  initializeQueue: (...arr) => set({ queue: arr }),
  //!set current song
  setCurrentSong: (song) => {
    if(!song) return
    const index = get().queue.findIndex((obj) => obj?._id == song?._id);
    set({ curr_song: song, curr_index: index, isPlaying: index>=0?true:false });
    useChatStore.getState().updateActivity(song.song_name)
  },
  setTracker: (val) => set({ tracker: val }),
  setDuration: (val) => set({ duration: val }),
  setCurrTime: (val) => set({ curr_time: val }),
  togglePlay: () => set({ isPlaying: !get().isPlaying }),
  setVolume: (vol) => set({ volume: vol }),
  //!play next or previous song
  setSong: (x) => { 
    const ind=get().curr_index
    const que=get().queue
    if(ind+x<=que.length-1 && ind+x>=0){
      set({ curr_song: que[ind+x], curr_index: ind+x, isPlaying: true });
      useChatStore.getState().updateActivity(que[ind+x].song_name)
    }
  },
}));
