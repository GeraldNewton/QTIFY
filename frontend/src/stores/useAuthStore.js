import { axiosInstance } from "@/lib/axios";
import { enqueueSnackbar } from "notistack";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAdmin: false,
  checkAdmin: async () => {
    try {
      const response = await axiosInstance.get("/admin/check");
      if (response?.data?.isAdmin) set({ isAdmin: true });
      else set({ isAdmin: false });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Cannot check admin status due to server error", {
        variant: "error",
      });
    }
  },
  syncUser: async () => await axiosInstance.post("/auth/callback"),
}));
