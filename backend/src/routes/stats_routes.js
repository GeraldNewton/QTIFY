const express=require("express")
const router=express.Router();
const {protectRoute}=require("../middlewares/auth_middleware");
const { getStats } = require("../controllers/stats_controller");

router.get("/",protectRoute,getStats);//! put protectRoute as a middleware
module.exports=router;