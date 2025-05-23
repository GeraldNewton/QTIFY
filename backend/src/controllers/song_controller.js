const error_handler=require("../helpers/error_handler.js");
const Song=require("../models/song_model.js");

console.log()
// ? get all songs:-
const getAllSongs = error_handler(async (req, res) => {
  // -1 descending order
  // 1 ascending order
  const songs = await Song.find().sort({ createdAt: -1 });
  res.status(200).json(songs);
}, "getAllSongs");

// ? get featured songs:-
const getFeaturedSongs = error_handler(async (req, res) => {
  const songs = await Song.aggregate([
    {
      $sample: { size: 6 },
    },
    {
      $project: {
        _id: 1,
        song_name: 1,
        artist: 1,
        imageURL: 1,
        audioURL: 1,
      },
    },
  ]);
  res.status(200).json(songs);
}, "getFeaturedSongs");

// ? get made for you song:-
const getMadeForYouSongs = error_handler(async (req, res) => {
  const songs = await Song.aggregate([
    {
      $sample: { size: 4 },
    },
    {
      $project: {
        _id: 1,
        song_name: 1,
        artist: 1,
        imageURL: 1,
        audioURL: 1,
      },
    },
  ]);
  res.status(200).json(songs);
}, "getMadeForYouSongs");

// ? get trending songs:-
const getTrendingSongs = error_handler(async (req, res) => {
  const songs = await Song.aggregate([
    {
      $sample: { size: 4 },
    },
    {
      $project: {
        _id: 1,
        song_name: 1,
        artist: 1,
        imageURL: 1,
        audioURL: 1,
      },
    },
  ]);
  res.status(200).json(songs);
}, "getTrendingSongs");

module.exports = {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
};
