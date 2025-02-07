const express=require("express");
const { getFeaturedSongs, getTrendingSongs, getMadeForYouSongs, getAllSongs } = require("../controllers/song_controller");
const { protectRoute } = require("../middlewares/auth_middleware");
const router=express.Router();

router.get("/",getAllSongs)//! add protectRoute  
router.get("/featured",getFeaturedSongs)
router.get("/made_for_you",getMadeForYouSongs)
router.get("/trending",getTrendingSongs)

module.exports=router