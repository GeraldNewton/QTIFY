const express=require("express");
const { getAllAlbums, getAlbumsById } = require("../controllers/album_controller");
const router=express.Router();

router.get("/",getAllAlbums)
router.get("/:albumId",getAlbumsById)

module.exports=router