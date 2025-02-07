const { mongoose } = require("mongoose");

const albumSchema = new mongoose.Schema({
  album_name: {
    type: String,
    required: true,
  },
  artist: {    //! we do not really need artist for album because it contain songs array and each song in them already have an artist 
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "song",
    },
  ],
},{timestamps:true});

const album_model = mongoose.model("album", albumSchema);
module.exports = album_model;