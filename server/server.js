import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import sellerRoute from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config(); // Load environment variables from .env file
await connectDB();
await connectCloudinary();

//Middleware configuration
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Enable CORS for the frontend app

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/user", userRoute);
app.use("/api/seller", sellerRoute)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
