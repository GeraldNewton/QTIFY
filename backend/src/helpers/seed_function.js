const error_handler = require("./error_handler");
const uploadToCloudinary = require("./upload_To_cloudinary");
const path = require("path");

// ? intermediate cloudinary function:-
// ? @params:
// ? dir_path: directory path of the songs
// ? files: array of songs file paths inside the directory
// ? cloud_file_path: cloudinary file path
// ? arr: array of songs
// ? prop: poperty name(image or audio urls) for the link of the file generated

// ? for every (song or album)object of array:
// ? create absolute file path of respective file
// ? upload to cloudinary
// ? add secure url to object under the key prop
const seedFunction = async (dir_path, files, cloud_file_path, arr, prop) => {
  for (i = 0; i < files.length; i++) {
    let filePath = path.join(dir_path, files[i]);
    const cloud_obj = await uploadToCloudinary(filePath, cloud_file_path);
    // console.log(prop, cloud_obj);
    arr[i][prop] = cloud_obj.secure_url;
    if (prop == "imageURL")
      arr[i].cloudinaryImagePublicId = cloud_obj.public_id;
    else arr[i].cloudinaryAudioPublicId = cloud_obj.public_id;
    // return;
    // arr[i][prop] = cloud_obj.public_id;
  }
};
//   "seedFunction"
// );
module.exports = seedFunction;
