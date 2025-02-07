const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  clerkID: {
    type: String,
    required: true,
    unique: true,
  },
  imageURL: {
    type: String,
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
},{timestamps:true});

const user_model = mongoose.model("user", userSchema);
module.exports = user_model;
