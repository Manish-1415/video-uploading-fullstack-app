// // Now this utility , we need sometimes , like if we want user to upload files, imgs , pdfs etc.
// import {v2 as cloudinary} from "cloudinary"   // In simple i just make asume v2 as cloudinary
// import fs from "fs"
// // This fs means File System , we can handle files any kind of , it is operating system related , here main thing is u cannot delete the file , you just unlink it , what does that mean ? it means file will not deleted but neither it is in use

//     cloudinary.config({
//         // We store this data in env variables , because api keys and all info we are using here
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET
//     });

//     // Here we have 2 ways , like we can directly take file from user and upload on Cloudinary , and we are using 2nd apporach where we taking file from user then upload on Cloudinary and then ulink that file . Boh Ways are good to go , but we are using 2nd approach because , in production grade application we directly not upload that specific file , instead we take it on server temporary and then unlink it from server itself.

// const uploadOnCloudinary = async (loaclFilePath) => {
//     try {

//         console.log("Uploading file from local path", loaclFilePath);

//         if(!loaclFilePath) return null;

//         const response = await cloudinary.uploader.upload(loaclFilePath , { resource_type: "auto" });

//         console.log("File Uploaded Successfully ", response.url);

//         return response;

//     } catch (error) {
//         fs.unlinkSync(loaclFilePath);
//         // fs means file System and unlinkSync means , it is simply making that file no usable from the OS itself.
//         return null;
//     }
// }

// export {uploadOnCloudinary}

import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { unlink } from "fs/promises";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log({
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET_SET: process.env.CLOUDINARY_API_SECRET,
  // ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("No file path provided");
    }

    console.log("Uploading file from local path:", localFilePath);

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // supports images, videos, PDFs, etc.
    });

    console.log("Cloudinary upload response:", response);

    // Delete temp file after successful upload
    // try {
    //   await unlink(localFilePath);
    //   console.log("Deleted local file:", localFilePath);
    // } catch (delErr) {                                                        // So here we are not using nested try catch because we have 
    //   console.error("Failed to delete local file:", delErr);                     solution for this , we can use finally no matter if code succes
    // }                                                                            or error happen , finally will always work //


    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Try deleting temp file even on failure
    // try {
    //   await unlink(localFilePath);
    //   console.log("Deleted local file after error:", localFilePath);
    // } catch (delErr) {
    //   console.error("Failed to delete file after error:", delErr);
    // }

    // Rethrow or return null so calling code knows upload failed
    throw error;
    // OR: return null;
  }

  finally {
    try {
      if(localFilePath) {
        await unlink(localFilePath);
        console.log("File Successfully deleted from the server", localFilePath);
      }
    } catch (error) {
      console.log("Error occured while deleting the file", error);
    }
  }
};

export { uploadOnCloudinary };
