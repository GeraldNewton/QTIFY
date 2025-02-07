const { ADMIN_EMAIL } = require("../../config");
const user_model = require("../models/user_model");
const { clerkClient}=require('@clerk/express');

const protectRoute = (req, res, next) => {
    if (req.auth.userId) {
        next();
    } else {
        res.status(401).json({ error: "You are not logged in" });
    }
};
const requireAdmin = async(req, res, next) => {
    let user = await clerkClient.users.getUser(req.auth.userId)
    let user_doc=await user_model.findOne({clerkID:user.id})
    const email=user_doc.emailAddresses.find(e_obj=>e_obj.id===user.primaryEmailAddressId)?.emailAddress
    if(email===ADMIN_EMAIL)
    next()
    res.status(401).json({ error: "You are not an Admin" });
};

module.exports = {protectRoute,requireAdmin};