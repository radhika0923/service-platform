const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API is running successfully");
});

module.exports = app;
