const express = require('express');
const {authContoller}=require("../controllers/auth_controller");
const {protectRoute} = require('../middlewares/auth_middleware');

const router = express.Router();

router.post("/callback",protectRoute,authContoller)

module.exports=router