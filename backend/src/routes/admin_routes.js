const express=require("express");
const {protectRoute,requireAdmin} = require("../middlewares/auth_middleware");
const router=express.Router();
const {createSong,deleteSong,createAlbum,deleteAlbum} = require("../controllers/admin_controllers");
const admin_check = require("../middlewares/admin_middleware");

// router.use(protectRoute,requireAdmin)
router.post("/song",admin_check("createSong"),createSong) 
router.post("/song/:_id",admin_check("deleteSong"),deleteSong) 

router.post("/album",admin_check("createAlbum"),createAlbum) 
router.post("/album/:_id",admin_check("deleteAlbum"),deleteAlbum) 

module.exports=router