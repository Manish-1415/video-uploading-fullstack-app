import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import { app } from "./app.js";
import connectDB from "./db/db_connection.js";

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("Server Created SuccessFully!!!");

    const server = app.listen(port, () => {
      console.log(`Our server is running on port : ${port}`);
    });

    server.on("error", (err) => {
      console.log(err);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection err", err);
  });
