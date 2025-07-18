// Now this utility , we need sometimes , like if we want user to upload files, imgs , pdfs etc.
import {v2 as cloudinary} from "cloudinary"   // In simple i just make asume v2 as cloudinary
import fs from "fs"
// This fs means File System , we can handle files any kind of , it is operating system related , here main thing is u cannot delete the file , you just unlink it , what does that mean ? it means file will not deleted but neither it is in use

    cloudinary.config({ 
        // We store this data in env variables , because api keys and all info we are using here 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });


    // Here we have 2 ways , like we can directly take file from user and upload on Cloudinary , and we are using 2nd apporach where we taking file from user then upload on Cloudinary and then ulink that file . Boh Ways are good to go , but we are using 2nd approach because , in production grade application we directly not upload that specific file , instead we take it on server temporary and then unlink it from server itself.


const uploadOnCloudinary = async (loaclFilePath) => {
    try {

        if(!loaclFilePath) return null;

        const response = await cloudinary.uploader.upload(loaclFilePath , { resource_type: "auto" });

        console.log("File Uploaded Successfully ", response.url);

        return response;

    } catch (error) {
        fs.unlinkSync(loaclFilePath);
        // fs means file System and unlinkSync means , it is simply making that file no usable from the OS itself.
        return null;
    }
}


export {uploadOnCloudinary}