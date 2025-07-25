import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // console.log("Connecting to:", `${process.env.MONGODB_URL}/${DB_NAME}`);

    // mongoose returns an object and we can store it inside a variable ,  a response coming and we can hold it inside a variable
    // SO what is comming in our connectionInstance , an object is stored inside connectionInstance after
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );

    // console.log("Checking our mongoDB URL :", process.env.MONGODB_URL);

    console.log(
      `\nMongoDB Database Connected!!  DB Host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection Error :", error);
    process.exit(1); // this process.exit(1) simply means whenever we face errors then u should have to stop the server.
  }
};

export default connectDB;
