const error_handler = require("../helpers/error_handler");
const message_model = require("../models/message_model");
const user_model = require("../models/user_model");

// ? get all users:-
const getAllUsers = error_handler(async (req, res) => {
  const currID = req.auth.userId;
  const users = await user_model.find({clerkID:{$ne:currID}});
  res.send(users);
}, "getAllUsers");

// ? get all messages for senderID and receiverID:-
const getMessages = error_handler(async (req, res) => {
  const { senderID, receiverID } = req.params;
  const messages = await message_model.find({
    $or: [
      { senderID, receiverID },
      { senderID: receiverID, receiverID: senderID },
    ],
  });
  res.send(messages);
}, "getMessages");

module.exports = { getAllUsers, getMessages };
