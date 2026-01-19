import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Load .env
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing JSON bodies

// Routes
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import workerRoutes from "./routes/workerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/worker", workerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

export default app;
