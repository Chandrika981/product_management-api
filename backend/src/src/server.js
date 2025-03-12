const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const path = require("path");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = require("./app"); // Require app AFTER setting up static files

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../client")));

// Redirect root URL ("/") to index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

