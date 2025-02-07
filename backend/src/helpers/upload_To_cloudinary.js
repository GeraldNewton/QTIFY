const cloudinary = require("../lib/cloudinary");
const uploadToCloudinary = async (file_path, cloud_file_path) => {
  try {
    const res = await cloudinary.uploader.upload(file_path, {
      resource_type: "auto",
      cloud_file_path,
    });
    return res;
  } catch (error) {
    console.log("error in uploadToCloudinary", error);
  }
};

module.exports = uploadToCloudinary;
