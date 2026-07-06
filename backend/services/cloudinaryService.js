const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "meter-readings",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result.secure_url);
        }
      )
      .end(buffer);
  });
};

module.exports = {
  uploadImage,
};