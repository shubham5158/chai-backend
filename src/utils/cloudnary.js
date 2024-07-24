import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadResult = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded successfully
    console.log("file uploaded on cloudinary : ", response.url);
    return response;
  } catch (error) {
    //locally saved temporary file as the upload opeartion got failed
    fs.unlinkSync(localFilePath);
    return null;
  }
};



export { uploadResult };