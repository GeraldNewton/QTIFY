const error_handler = require("./error_handler");
const uploadToCloudinary = require("./upload_To_cloudinary");
const path = require("path");

const seedFunction = error_handler(
  async (dir_path, files, cloud_file_path, arr, prop) => {
    for (i = 0; i < files.length; i++) {
      let filePath = path.join(dir_path, files[i]);
      const cloud_obj = await uploadToCloudinary(filePath, cloud_file_path);
      arr[i][prop] = cloud_obj.secure_url;
    }
  },
  "seedFunction"
);
module.exports = seedFunction;
