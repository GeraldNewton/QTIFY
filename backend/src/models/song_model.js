const { mongoose } = require("mongoose");

const songSchema = new mongoose.Schema({
  song_name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  audioURL: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  albumId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"album"
  }
},{timestamps:true});

const song_model = mongoose.model("song", songSchema);
module.exports = song_model;
