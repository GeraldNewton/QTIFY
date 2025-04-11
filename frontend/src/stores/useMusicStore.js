import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const helper = async (data) => {
  data = await Promise.all(
    data.map(async (obj) => {
      if (obj.audioURL) {
        let audio = await axios.get(obj.audioURL, {
          responseType: "arraybuffer",
        });
        audio = audio.data;
        audio = new Blob([audio], { type: "audio/mp3" });
        obj.audio = window.URL.createObjectURL(audio);
      }

      if (obj.imageURL) {
        let image = await axios.get(obj.imageURL, {
          responseType: "arraybuffer",
        });
        image = image.data;
        image = new Blob([image], { type: "image/png" });
        obj.image = window.URL.createObjectURL(image);
      }
      return obj;
    })
  );
  return data;
};

export const useMusicStore = create((set, get) => ({
  albums: [],
  allSongs: [],
  madeForYouSongs: [],
  featuredSongs: [],
  trendingSongs: [],
  stats: null,
  isLoading: false,
  currentAlbum: null,

  getFeaturedSongs: async () => {
    try {
      set({ featuredSongs: [] });
      const response = await axiosInstance.get("/songs/featured");
      let data = response.data;
      data = await helper(data);
      set({ featuredSongs: data, isLoading: false });
    } catch (e) {
      console.log(e);
      enqueueSnackbar("Cannot access song due to server error", {
        variant: "error",
      });
    }
  },
  getTrendingSongs: async () => {
    try {
      set({ trendingSongs: [] });
      const response = await axiosInstance.get("/songs/trending");
      let data = response.data;
      data = await helper(data);
      set({ trendingSongs: data, isLoading: false });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Cannot access song due to server error", {
        variant: "error",
      });
    }
  },
  getMadeForYouSongs: async () => {
    try {
      set({ madeForYouSongs: [] });
      const response = await axiosInstance.get("/songs/made_for_you");
      let data = response.data;
      data = await helper(data);
      set({ madeForYouSongs: data, isLoading: false });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Cannot access song due to server error", {
        variant: "error",
      });
    }
  },
  getAllSongs: async () => {
    try {
      set({ allSongs: [] });
      const response = await axiosInstance.get("/songs");
      let data = response.data;
      data = await helper(data);
      set({ allSongs: data, isLoading: false });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Cannot access song due to server error", {
        variant: "error",
      });
    }
  },
  getAlbums: async () => {
    try {
      const response = await axiosInstance.get("/albums");
      let data = response.data;
      data = await helper(data);
      set({ albums: data, isLoading: false });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Cannot access albums due to server error", {
        variant: "error",
      });
    }
  },
  getCurrentAlbum: async (_id) => {
    try {
      set({ currentAlbum: null });
      const response = await axiosInstance.get(`/albums/${_id}`);
      let data = response.data;
      data = await helper([data]);
      data = data[0];
      data.songs = await helper(data.songs);
      set({ currentAlbum: data, isLoading: false });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Cannot access album due to server error", {
        variant: "error",
      });
    }
  },
  getStats: async () => {
    try {
      const response = await axiosInstance.get("/stats");
      set({ stats: response.data });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Cannot access stats due to server error", {
        variant: "error",
      });
    }
  },
  postSong: async (form) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post("/admin/song", form);
      enqueueSnackbar(response.data.message, { variant: "success" });
      await get().getAllSongs();
      await get().getStats();
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Cannot add song due to server error", {
        variant: "error",
      });
    }
  },
  deleteSong: async (_id) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post(`/admin/song/${_id}`);
      enqueueSnackbar(response.data.message, { variant: "success" });
      await get().getAllSongs();
      await get().getStats();
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Cannot delete song due to server error", {
        variant: "error",
      });
    }
  },
  postAlbum: async (form) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post("/admin/album", form);
      console.log(response)
      enqueueSnackbar(response?.data?.message, { variant: "success" });
      await get().getAlbums();
      await get().getStats();
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Cannot post album due to server error", {
        variant: "error",
      });
    }
  },
  deleteAlbum: async (_id) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post(`/admin/album/${_id}`);
      enqueueSnackbar(response.data.message, { variant: "success" });
      await get().getAlbums();
      await get().getStats();
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Cannot delete album due to server error", {
        variant: "error",
      });
    }
  },
}));
