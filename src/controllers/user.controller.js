import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { use } from "react";

const registerUser = asyncHandler(async (req, res) => {
  // Here now we are writitng for Controller function , what this function do , it runs by route we provide reference there

  // destructure fields from request body
  const { username, email, fullname, password } = req.body;

  console.log("username :",username, "email :",email);
  console.log(req.body);

  const inpFromUser = [username , email , fullname , password];

  // Validate the fields , checking if they are available / they are not empty if yes throw error
  for (const field of inpFromUser) {
    if(!field || field.trim() !== "" ) throw new ApiError(409 , "All fiedls are required");
  }

  // Check if user already exist
  const existedUser = User.findOne({
    $or : [{username} , {email } ]
  })

  if(existedUser) {
    throw new ApiError(402 , "Username | Email is already exist");
  }


  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.coverImage[0]?.path


  if(!avatarLocalPath) throw new ApiError(400 , "Please Provide Avatar image");


  const uploadAvatarOnCloudinary = await uploadOnCloudinary(avatarLocalPath);

  const avatarUrl = uploadAvatarOnCloudinary.url;


  const uploadCoverImageOnCloudinary = await uploadOnCloudinary(coverImageLocalPath);

  const coverImageUrl = uploadCoverImageOnCloudinary.url;


  if(!avatarUrl) throw new ApiError(500 , "Error Occured while uploading file!");



  const user = await User.create({
    fullname,
    avatarUrl,
    username,
    email,
    password,
    coverImage : coverImageUrl?.path || ""
  })


  const checkIfUserCreated = User.findById(user._id).select( "-password -refreshToken" );

  if(checkIfUserCreated) throw new ApiError(500 , "Error Happen on Server Side !")


    return res.status(201).json(new ApiResponse(200 , "User Created Successfully !", user)) 

});

export { registerUser };
