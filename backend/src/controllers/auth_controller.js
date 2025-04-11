const { clerkClient } = require("@clerk/express");
const user_model = require("../models/user_model");
const error_handler = require("../helpers/error_handler");

// ? checks or create user:-
// ? get user id from clerk
// ? check if user id present in db
// ? creates user if user id absent
const authContoller = error_handler(async (req, res) => {
  let user = await clerkClient.users.getUser(req.auth.userId);
  let user_doc = await user_model.findOne({ clerkID: user.id });
  try {
    if (!user_doc) {
      user_doc = new user_model({
        fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        clerkID: user.id,
      });
      if (user.hasImage) user_doc.imageURL = user.imageUrl;
      const email = user.emailAddresses.find(
        (e_obj) => e_obj.id === user.primaryEmailAddressId
      )?.emailAddress;
      if (email) user_doc.email = email;
      else
        return res
          .status(400)
          .json({ error: "You do not have any email address" });

      await user_doc.save();
    }
    res.send({ user_doc });
  } catch (error) {
    console.error(error)
    res.send(error);
  }
}, "authContoller");

module.exports = { authContoller };
