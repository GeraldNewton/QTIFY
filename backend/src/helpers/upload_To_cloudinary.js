const cloudinary = require("../lib/cloudinary");
/**
 * Uploads a file to cloudinary and returns the result.
 * @param {string} file_path - local path to the file to be uploaded
 * @param {string} cloud_file_path - cloudinary file path where the file should be uploaded
 * @returns {object} - cloudinary response object
 * @throws {Error} - when error occurs during upload
 */
const uploadToCloudinary = async (file_path, cloud_file_path) => {
  try {
    const res = await cloudinary.uploader.upload(file_path, {
      resource_type: "auto",
      asset_folder:cloud_file_path,
      use_asset_folder_as_public_id_prefix:true
    });
    return res;
  } catch (error) {
    console.log("error in uploadToCloudinary", error);
  }
};

module.exports = uploadToCloudinary;
