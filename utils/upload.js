const cloudinary = require('../config/cloudinaryConfig');

const uploadVideoStream = async (videoBuffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'video' },
        (error, result) => {
          if (error) {
            reject(error);  // Reject the promise if there is an error
          } else {
            resolve(result.url);  // Resolve with the Cloudinary URL
          }
        }
      );
      stream.end(videoBuffer);  // Pass the videoBuffer to the stream
    });
  };
  

module.exports = { uploadVideoStream };
