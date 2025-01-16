import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import adminRoute from "./routes/admin.route.js";
import postRoute from "./routes/user.route.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URI, // Allow your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allow credentials (cookies, etc.)
  })
);

// Test Route
app.get("/", (req, res) => {
  return res.status(201).json({
    message: "I am from server",
    success: true,
  });
});

// Routes
app.use("/admin", adminRoute);
app.use("/user", postRoute);

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});
