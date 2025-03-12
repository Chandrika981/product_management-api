const express = require("express");
 const morgan = require("morgan");
 const taskRoutes=require("./routes/taskRoutes");
 const productRoutes = require("./routes/productRoutes");
 const userRoutes = require("./routes/userRoutes");
 const authRoutes=require("./routes/authRoutes");
 const app = express();
 //built in middleware
 app.use(express.json());
 //logging - application level
 app.use(morgan("dev"));

 //mounting routes
 app.use("/products", productRoutes);
 app.use("/users", userRoutes);
 app.use("/tasks", taskRoutes);
 app.use("/auth",authRoutes);
 app.use((req, res, next) => {
 const error = new Error(
 "Sorry! The page you were looking for does not exist!"
 );
 error.status(404);
 next(error);
 });
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