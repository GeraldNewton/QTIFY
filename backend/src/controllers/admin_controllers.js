const album_model = require("../models/album_model");
const song_model = require("../models/song_model");
const error_handler = require("../helpers/error_handler");
const uploadToCloudinary = require("../helpers/upload_To_cloudinary");
const cloudinary = require("../lib/cloudinary");

// ? creates song:-
// ? upload audio and image file to cloudinary
// ? create song document
// ? adds to album if albumId is provided
const createSong = error_handler(async (req, res) => {
  if (!req.files || !req.files.audio_file || !req.files.image_file)
    return res.status(400).send({ message: "send all files" });
  const audioFile = await uploadToCloudinary(
    req.files.audio_file.tempFilePath,
    "QTIFY/songs"
  );
  cloudinaryAudioPublicId = audioFile.public_id;
  audioURL = audioFile.secure_url;
  let imageFile = await uploadToCloudinary(
    req.files.image_file.tempFilePath,
    "QTIFY/cover_images/songs"
  );
  cloudinaryImagePublicId = imageFile.public_id;
  imageURL = imageFile.secure_url;
  const { song_name, artist, albumId, duration } = req.body;
  const song_doc = await song_model.create({
    song_name,
    artist,
    duration,
    audioURL,
    cloudinaryAudioPublicId,
    imageURL,
    cloudinaryImagePublicId,
    albumId: albumId || null,
  });
  if (albumId)
    await album_model.findOneAndUpdate(
      { _id: albumId },
      { $push: { songs: song_doc._id } }
    );
  res.send({message:"Song added Successfully"});
}, "createSong");

// ? deletes song:-
// ? delete audio and image file from cloudinary
// ? delete song document
// ? removes from album if albumId is provided
const deleteSong = error_handler(async (req, res) => {
  const { _id } = req.params;
  const song_doc = await song_model.findById(_id);
  const albumId = song_doc.albumId;
  await cloudinary.uploader.destroy(song_doc.cloudinaryAudioPublicId,{resource_type:"video"})
  await cloudinary.uploader.destroy(song_doc.cloudinaryImagePublicId)
  if (albumId)
    await album_model.updateOne({ _id: albumId }, { $pull: { songs: _id } });
  await song_model.findByIdAndDelete(_id);
  res.send({ message: "Song deleted Successfully" });
}, "deleteSong");

// ? creates album:-
// ? upload image file to cloudinary
// ? create album document
const createAlbum = error_handler(async (req, res) => {
  let imageFile = await uploadToCloudinary(
    req.files.image_file.tempFilePath,
    "QTIFY/cover_images/albums"
  );
  cloudinaryImagePublicId = imageFile.public_id;
  imageURL = imageFile.secure_url;
  const { album_name, artist, releaseYear } = req.body;
  const album_doc = await album_model.create({
    album_name,
    artist,
    releaseYear,
    imageURL,
    cloudinaryImagePublicId
  });
  res.send({message:"Album added Successfully"});
}, "createAlbum");

// ? deletes album:-
// ? delete image file from cloudinary
// ? create song document
const deleteAlbum = error_handler(async (req, res) => {
  const { _id } = req.params;
  const album_doc = await album_model.findById(_id);
  await cloudinary.uploader.destroy(album_doc.cloudinaryImagePublicId)
  const song_ids = album_doc.songs.map((obj) => obj._id);
  await song_model.updateMany(
    { _id: { $in: [...song_ids] } },
    { $set: { albumId: null } }
  );
  await album_model.findByIdAndDelete(_id);
  res.send({ message: "Album deleted Successfully" });
}, "deleteAlbum");

// ? checks admin:-
const checkAdmin = error_handler(async (req, res) => {
  res.send({ isAdmin: true });
}, "checkAdmin");

module.exports = {
  createSong,
  createAlbum,
  deleteSong,
  deleteAlbum,
  checkAdmin,
};
