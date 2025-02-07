const cloudinary = require("../lib/cloudinary");
const mongoose = require("mongoose");
const { LOCAL_URI } = require("../../config");
const album_model = require("../models/album_model");
const song_model = require("../models/song_model");
const path = require("path");
const fs = require("fs");
const seedFunction = require("../helpers/seed_function");

async function seed() {
  await mongoose.connect(LOCAL_URI);
  await mongoose.connection.dropDatabase();
  await cloudinary.api.delete_resources_by_prefix("QTIFY", {
    resource_type: "video",
  });
  await cloudinary.api.delete_resources_by_prefix("QTIFY/cover_images");

  const albums = [
    {
      _id: new mongoose.Types.ObjectId(),
      album_name: "Urban Nights",
      artist: "Various Artists",
      releaseYear: 2024,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      album_name: "Coastal Dreaming",
      artist: "Various Artists",
      releaseYear: 2024,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      album_name: "Midnight Sessions",
      artist: "Various Artists",
      releaseYear: 2024,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      album_name: "Eastern Dreams",
      artist: "Various Artists",
      releaseYear: 2024,
    },
  ];

  const songs = [
    {
      _id: new mongoose.Types.ObjectId(),
      song_name: "City Rain",
      artist: "Urban Echo",
      duration: 39, // 0:39
      albumId: albums[0]._id,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      song_name: "Neon Lights",
      artist: "Night Runners",
      duration: 36, // 0:36
      albumId: albums[0]._id,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      song_name: "Urban Jungle",
      artist: "City Lights",
      duration: 36, // 0:36
      albumId: albums[0]._id,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      song_name: "Neon Dreams",
      artist: "Cyber Pulse",
      duration: 39, // 0:39
      albumId: albums[1]._id,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      song_name: "Summer Daze",
      artist: "Coastal Kids",
      duration: 24, // 0:24
      albumId: albums[1]._id,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      song_name: "Ocean Waves",
      artist: "Coastal Drift",
      duration: 28, // 0:28
      albumId: albums[1]._id,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      song_name: "Crystal Rain",
      artist: "Echo Valley",
      duration: 39, // 0:39
      albumId: albums[2]._id,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      song_name: "Starlight",
      artist: "Luna Bay",
      duration: 30, // 0:30
      albumId: albums[2]._id,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      song_name: "Stay With Me",
      artist: "Sarah Mitchell",
      duration: 46, // 0:46
      albumId: albums[2]._id,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      song_name: "Midnight Drive",
      artist: "The Wanderers",
      duration: 41, // 0:41
      albumId: albums[3]._id,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      song_name: "Moonlight Dance",
      artist: "Silver Shadows",
      duration: 27, // 0:27
      albumId: albums[3]._id,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      song_name: "Lost in Tokyo",
      artist: "Electric Dreams",
      duration: 24, // 0:24
      albumId: albums[3]._id,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      song_name: "Neon Tokyo",
      artist: "Future Pulse",
      duration: 39, // 0:39
    },
    {
      _id: new mongoose.Types.ObjectId(),
      song_name: "Purple Sunset",
      artist: "Dream Valley",
      duration: 15, // 0:17
    },
    {
      _id: new mongoose.Types.ObjectId(),
      song_name: "versatile blue",
      artist: "Dream Valley",
      duration: 24, // 0:17
    },
    {
      _id: new mongoose.Types.ObjectId(),
      song_name: "Dream Big",
      artist: "Dream Valley",
      duration: 22, // 0:17
    },
  ];

  const songPath = path.resolve(__dirname, "../../public/songs");
  const songFiles = fs.readdirSync(songPath);
  let cloud_file_path = "QTIFY/songs";
  await seedFunction(songPath, songFiles, cloud_file_path, songs,"audioURL");

  const songCoverImagePath = path.resolve(
    __dirname,
    "../../public/cover_images/songs"
  );
  const songCoverFiles = fs.readdirSync(songCoverImagePath);
  cloud_file_path = "QTIFY/cover_images/songs";
  await seedFunction(
    songCoverImagePath,
    songCoverFiles,
    cloud_file_path,
    songs,
    "imageURL"
  );

  const albumCoverImagePath = path.resolve(
    __dirname,
    "../../public/cover_images/albums"
  );
  const albumCoverFiles = fs.readdirSync(albumCoverImagePath);
  cloud_file_path = "QTIFY/cover_images/albums";
  await seedFunction(
    albumCoverImagePath,
    albumCoverFiles,
    cloud_file_path,
    albums,
    "imageURL"
  );

  for (i = 0; i < albums.length; i++)
    albums[i].songs = songs.slice(i * 3, i * 3 + 3).map((obj) => obj._id);

  await album_model.insertMany(albums);
  await song_model.insertMany(songs);

  mongoose.connection.close();
}
seed();