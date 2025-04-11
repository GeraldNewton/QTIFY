const express=require("express");
const { protectRoute } = require("../middlewares/auth_middleware");
const { getAllUsers, getMessages } = require("../controllers/user_controller");
const router=express.Router();
router.use(protectRoute)
router.get("/",getAllUsers)
router.get("/messages/:senderID/:receiverID",getMessages)

module.exports=router