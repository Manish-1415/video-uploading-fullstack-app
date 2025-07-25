import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import path from "path";

const registerUser = asyncHandler(async (req, res) => {
  // Here now we are writitng for Controller function , what this function do , it runs by route we provide reference there

  // destructure fields from request body
  const { username, email, fullname, password } = req.body;

  // console.log("username :", username, "email :", email);
  console.log(req.body);

  const inpFromUser = [username, email, fullname, password];

  // Validate the fields , checking if they are available / they are not empty if yes throw error
  for (const field of inpFromUser) {
    if (!field || field.trim() === "")
      throw new ApiError(409, "All fields are required (this err from fields)");
  }

  // Check if user already exist
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(402, "Username | Email is already exist");
  }

  console.log("Files received", req.files);
  const avatarLocalPath = path.resolve(req.files.avatar[0].path);
  // const coverImageLocalPath = req.files.coverImage[0].path
  if (!avatarLocalPath) throw new ApiError(400, "Please Provide Avatar image");


  const uploadAvatarOnCloudinary = await uploadOnCloudinary(avatarLocalPath);


  if (!uploadAvatarOnCloudinary?.url)
    throw new ApiError(502, "Error occur while uploading avatar");

  const avatar = uploadAvatarOnCloudinary.url;

  if (!avatar) throw new ApiError(500, "Error Occured while uploading file!");


  let coverImageLocalPath;
  if(req.files && req.files.coverImage && req.files.coverImage[0].path) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  const coverImageUrl = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : console.log("You did not provide coverImage");;

  let coverImage;
  if(coverImageUrl) coverImage = coverImageUrl.url;



  const user = await User.create({
    fullname,
    avatar,
    username,
    email,
    password,
    coverImage: coverImage || "",
  });

  console.log("User created Successfully inside MongoDB :",user);

  const checkIfUserCreated = User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!checkIfUserCreated)
    throw new ApiError(500, "Error Happen on Server Side !");

  return res
    .status(201)
    .json(new ApiResponse(200, "User Created Successfully !", user));
    
});

export { registerUser };
