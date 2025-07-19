import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Here u can see what we are doing and why we are doing here , so we can use all app.use / app.listen / app.get after we import it first (i mean express , then create app variable and store express() in there then after that u can use apps/express functionality , an here also we use those after we successfully implement app/express in our Backend.... 😃👍)

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(urlencoded({ extended: true }));
app.use(express.json()); // it allows to the request to send data in objects
app.use(express.static("public")); // it allows to store temporary files like , images,pdf, etc.
app.use(cookieParser()); // it allow to perform CRUD operations in users Browser..





import userRouter from "./routes/user.route.js";

app.use("/api/v1/users", userRouter);






export { app };

// SO this app is simply naming convention to use express features in our server
// Everyone use app it just naming convention normally.
