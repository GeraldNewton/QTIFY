const album_model = require("../models/album_model");
const song_model = require("../models/song_model");
const error_handler = require('../helpers/error_handler');
const uploadToCloudinary = require("../helpers/upload_To_cloudinary");

// const uploadToCloudinary = async (file_path,folder) => {
//   try {
//     const res = await cloudinary.uploader.upload(file_path, {
//       resource_type: "auto",
//       folder
//     });
//     return res.secure_url;
//   } catch (error) {
//     console.log("error in uploadToCloudinary",error);
//   }
// };

const createSong = error_handler(async (req, res) => {
  if (!req.files || !req.files.audio_file || !req.files.image_file)
    return res.status(400).send({ message: "send all files" });
  let audioURL = await uploadToCloudinary(req.files.audio_file.tempFilePath,"QTIFY/songs");
  audioURL=audioURL.secure_url
  let imageURL = await uploadToCloudinary(req.files.image_file.tempFilePath,"QTIFY/cover_images/songs");
  imageURL=imageURL.secure_url
  const { song_name, artist, duration, albumId } = req.body;
  const song_doc = await song_model.create({
    song_name,
    artist,
    imageURL,
    audioURL,
    duration,
    albumId: albumId || null,
  });
  if (albumId)
    await album_model.findOneAndUpdate(
      { _id: albumId },
      { $push: { songs: song_doc._id } }
    );
  res.send(song_doc);
},"createSong");

const deleteSong = error_handler(async (req, res) => {
  const { _id } = req.params;
  const song_doc = await song_model.findById(_id);
  const albumId = song_doc.albumId;
  if (albumId){
    await album_model.updateOne(
      { _id: albumId },
      { $pull: {songs:_id} }
    );
    console.log("i run")
  }
  await song_model.findByIdAndDelete(_id);
  res.send({ message: "song deleted" });
},"deleteSong");

const createAlbum = error_handler(async (req, res) => {
  let imageURL = await uploadToCloudinary(req.files.image_file.tempFilePath,"QTIFY/cover_images/albums");
  imageURL=imageURL.secure_url
  const { album_name, artist, releaseYear } = req.body;
  const album_doc = await album_model.create({
    album_name,
    artist,
    imageURL,
    releaseYear,
  });
  res.send(album_doc);
},"createAlbum");

const deleteAlbum = error_handler(async (req, res) => {
  const { _id } = req.params;
  const album_doc = await album_model.findById(_id);
  const song_ids = album_doc.songs.map((obj) => obj._id);
  await song_model.updateMany(
    { _id: { $in: [...song_ids] } },
    { $set: { albumId: null } }
  );
  await album_model.findByIdAndDelete(_id);
  res.send({ message: "album deleted" });
},"deleteAlbum");

module.exports = { createSong, createAlbum, deleteSong, deleteAlbum };