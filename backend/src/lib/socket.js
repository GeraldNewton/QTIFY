const { Server } = require("socket.io");
const message_model = require("../models/message_model");

/**
 * Initializes the socket.io server and sets up the event listeners for user connection,
 * disconnection, sending and recieving messages, and updating activity.
 *
 * @param {http.Server} server
 * @returns {void}
 */
const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
  const usersAndActivities = new Map();
  io.on("connection", (socket) => {
    socket.on("user_connected", (clerkID) => {
      usersAndActivities.set(clerkID, {
        socketID: socket.id,
        activity: "-1",
      });
      //! Map is not serializable when sent over socket.io
      //! The issue is that JavaScript's Map is not JSON-serializable, meaning when you send it via socket.io, it gets converted to an empty object {}.
      //! Hence we convert map to object
      io.emit("user_connected", Object.fromEntries(usersAndActivities));
    });
    socket.on("update_activity", ({ clerkID, song }) => {
      usersAndActivities.set(clerkID, {
        socketID: socket.id,
        activity: song,
      });
      //! Map is not serializable when sent over socket.io
      //! The issue is that JavaScript's Map is not JSON-serializable, meaning when you send it via socket.io, it gets converted to an empty object {}.
      //! Hence we convert map to object
      io.emit("activity_updated", Object.fromEntries(usersAndActivities));
    });
    socket.on("send_message", async (senderID, receiverID, chat) => {
      const message = await message_model.create({
        senderID,
        receiverID,
        chat,
      });
      if (usersAndActivities.has(receiverID))
        io.to(usersAndActivities.get(receiverID).socketID).emit(
          "recieve_message",
          message
        );

      socket.emit("message_sent", message);
    });
    socket.on("disconnect", () => {
      for (const [key, obj] of usersAndActivities.entries()) {
        if (obj.socketID === socket.id) {
          usersAndActivities.delete(key);
          io.emit("user_disconnected", Object.fromEntries(usersAndActivities));
          break;
        }
      }
      io.emit("user_disconnected", Object.fromEntries(usersAndActivities));
    });
  });
};
module.exports = initializeSocket;
