const dotenv=require("dotenv");
dotenv.config();


module.exports={
    PORT:process.env.PORT,
    LOCAL_URL:process.env.LOCAL_URL,
    MONGODB_URL:process.env.MONGODB_URL,
    CLERK_PUBLISHABLE_KEY:process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY:process.env.CLERK_SECRET_KEY,
    ADMIN_EMAIL:process.env.ADMIN_EMAIL,
    CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
}