// const router = require('express')().Router();
const express = require('express');
const {authContoller}=require("../controllers/auth_controller");
const {protectRoute} = require('../middlewares/auth_middleware');

const router = express.Router();

router.get("/callback",protectRoute,authContoller)

module.exports=router