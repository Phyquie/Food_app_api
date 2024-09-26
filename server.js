import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./connectMongoDb.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import restaurantRoutes from "./routes/restaurant.routes.js";
import {v2 as cloudinary} from "cloudinary";
import rateLimit from "express-rate-limit";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, 
  message: "Too many requests from this IP, please try again in an hour!",
});



const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth/signup", limiter);



app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
  connectMongoDB();
});