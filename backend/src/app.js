const express = require("express");
const morgan = require("morgan");
const path = require("path");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Built-in middleware
app.use(express.json());

// Logging middleware
app.use(morgan("dev"));

// Serve static frontend files
const frontendPath = path.join(__dirname, "../../frontend");
app.use(express.static(frontendPath));
console.log("Serving frontend from ", frontendPath);

// Mounting routes
app.use("/products", productRoutes);
app.use("/auth", authRoutes);

// Serve index.html for "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath,"index.html"));
});

// Move 404 middleware **after** static files
app.use((req, res, next) => {
  const error = new Error(
    "Sorry! The page you were looking for does not exist!"
  );
  error.status = 404;
  next(error);
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      success: false,
      message: err.message || "Sorry! Something Went Wrong",
      status: err.status || 500,
    },
  });
});

module.exports = app;
