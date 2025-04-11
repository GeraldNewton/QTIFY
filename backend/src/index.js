const express = require("express");
const { createServer } = require("http");
const mongoose = require("mongoose");
const { clerkMiddleware } = require("@clerk/express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const cron = require("node-cron");
const fs = require("fs");

const authRoutes = require("./routes/auth_routes.js");
const userRoutes = require("./routes/user_routes.js");
const adminRoutes = require("./routes/admin_routes.js");
const songRoutes = require("./routes/song_routes.js");
const albumRoutes = require("./routes/album_routes.js");
const statRoutes = require("./routes/stats_routes.js");
const { PORT, LOCAL_URL,MONGODB_URL } = require("../config.js");
const initializeSocket = require("./lib/socket.js");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(clerkMiddleware());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, //10 MB max file size
    },
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);
app.use("/*", (req, res) => res.status(404).json({ error: "path not found" }));

// ? cron job to clear the temp folder at the beggining of every hour like 0:00 1:00 2:00 3:00 and so on
const tempdir = path.join(__dirname, "temp");
cron.schedule("0 * * * *", () => {
  if (!fs.existsSync(tempdir)) return
  fs.readdir(tempdir, (err, files) => {
    if (err) console.log("error in reading temp directory", err);
    files.forEach((file) => {
      fs.unlink(path.join(tempdir, file), (err) => {
        if (err) {
          console.log("error in deleting files from temp directory", err);
        }
      });
    });
  });
});

mongoose
  .connect(MONGODB_URL)
  .catch((err) => console.log("Error in mongooose.connect", err));
httpServer.listen(PORT, (e) => {
  if (e) console.log("Error in starting server", e);
  else console.log(`server is running on port ${PORT}`);
});
