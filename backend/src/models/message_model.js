const { mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderID: {
    type: String,
    required: true,
  },
  receiverID: {    //! we do not really need artist for album because it contain songs array and each song in them already have an artist 
    type: String,
    required: true,
  },
  chat: {
    type: String,
    required: true,
  }
},{timestamps:true});

const message_model = mongoose.model("message", messageSchema);
module.exports = message_model;