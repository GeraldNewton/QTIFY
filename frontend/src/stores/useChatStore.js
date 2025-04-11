import { axiosInstance } from "@/lib/axios";
import { io } from "socket.io-client";
import { create } from "zustand";

const baseUrl = "http://localhost:3000";
const socket = io(baseUrl, {
  autoConnect: false, // only connect if user is authenticated
  withCredentials: true,
});

const useChatStore = create((set, get) => ({
  socket: socket,
  isLoading: false,
  clerkID: null,
  isConnected: false,
  onlineUsers: new Set(),
  users: [],
  usersAndActivities: new Map(),
  activeChatUser: null,
  gotMessages: false,
  messages: [],
  getUsers: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get("/users");
      set({ users: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Cannot get users due to server error", {
        variant: "error",
      });
    }
  },
  getMessages: async () => {
    try {
      const response = await axiosInstance.get(
        `users/messages/${get().clerkID}/${get().activeChatUser.clerkID}`
      );
      set({ messages: response.data,gotMessages: true  });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Cannot access messages due to server error", {
        variant: "error",
      });
    }
  },
  updateActivity: (song) => {
    try {
      if (!get().isConnected) return;
      const clerkID = get().clerkID;
      get().socket.emit("update_activity", { clerkID, song });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Cannot update activity due to server error", {
        variant: "error",
      });
    }
  },
  setActiveChatUser: (user) => set({ activeChatUser: user }),
  initSocket: async (clerkID) => {
    try {
      if (get().isConnected) return;
      socket.connect();
      socket.emit("user_connected", clerkID);
      socket.on("user_connected", (usersAndActivities) => {
        //! Map is not serializable when sent over socket.io
        //! The issue is that JavaScript's Map is not JSON-serializable, meaning when you send it via socket.io, it gets converted to an empty object {}.
        //! Hence we convert map to object while sending from server side and convert object to map when we recieve it here
        const usersMap = new Map(Object.entries(usersAndActivities));
        const onlineUsers = new Set(usersMap.keys());
        set({
          usersAndActivities: usersMap,
          onlineUsers: onlineUsers,
          isConnected: true,
          clerkID: clerkID,
        });
      });
      socket.on("activity_updated", (usersAndActivities) => {
        const usersMap = new Map(Object.entries(usersAndActivities));
        set({ usersAndActivities: usersMap });
      });
      socket.on("user_disconnected", (usersAndActivities) => {
        //! Map is not serializable when sent over socket.io
        //! The issue is that JavaScript's Map is not JSON-serializable, meaning when you send it via socket.io, it gets converted to an empty object {}.
        //! Hence we convert map to object while sending from server side and convert object to map when we recieve it here
        const usersMap = new Map(Object.entries(usersAndActivities));
        const onlineUsers = new Set(usersMap.keys());
        set({ usersAndActivities: usersMap, onlineUsers: onlineUsers });
      });
      // ! message is an object continng {senderID,receiverID,chat}
      socket.on("recieve_message", (message) => {
        const { senderID } = message;
        if (senderID == get().activeChatUser?.clerkID)
          set((state) => ({ messages: [...state.messages, message] }));
      });
      // ! message is an object continng {senderID,receiverID,chat}
      socket.on("message_sent", (message) => {
        set((state) => ({ messages: [...state.messages, message] }));
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Cannot connect with others due to server error", {
        variant: "error",
      });
    }
  },
  sendMessage: (chat) => {
    try {
      if (!get().isConnected || !get().activeChatUser) return;
      get().socket.emit(
        "send_message",
        get().clerkID,
        get().activeChatUser.clerkID,
        chat
      );
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Cannot send message due to server error", {
        variant: "error",
      });
    }
  },
  disconnectSocket: () => {
    if (!get().isConnected) return;
    socket.disconnect();
    set({ isConnected: false, clerkID: null });
  },
}));
export default useChatStore;
