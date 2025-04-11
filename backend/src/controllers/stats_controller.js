const error_handler = require("../helpers/error_handler");
const album_model = require("../models/album_model");
const song_model = require("../models/song_model");
const user_model = require("../models/user_model");

// ? provides stats of users, albums, song:-
const getStats = error_handler(async (req, res) => {
  const [userCount, albumCount, songCount, distinctArtist] = await Promise.all([
    user_model.countDocuments({}),
    album_model.countDocuments({}),
    song_model.countDocuments({}),
    song_model.distinct("artist"),
  ]);
  const artistCount = distinctArtist.length;
  res.send({ userCount, albumCount, songCount, artistCount });
}, "getStats");

module.exports = {getStats};
