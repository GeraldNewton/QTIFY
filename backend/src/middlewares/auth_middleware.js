const { ADMIN_EMAIL } = require("../../config");
const { clerkClient}=require('@clerk/express');

/**
 * Checks if the user is logged in. If yes, calls the next middleware
 * else sends a JSON response with isLogin as false
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const protectRoute = (req, res, next) => {
    if (req.auth?.userId) {
        next();
    } else {
        res.json({ isLogin: false });
    }
};


/**
 * Checks if the user is an admin. If yes, calls the next middleware
 * else sends a JSON response with isAdmin as false
 * gets user doc from clerk using its id then checks whether its email is ADMIN_EMAIL
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const requireAdmin = async(req, res, next) => {
    let user = await clerkClient.users.getUser(req.auth.userId)
    const email=user.emailAddresses.find(e_obj=>e_obj.id===user.primaryEmailAddressId)?.emailAddress
    if(email===ADMIN_EMAIL)
    return next()
    res.json({ isAdmin: false });
};

module.exports = {protectRoute,requireAdmin};