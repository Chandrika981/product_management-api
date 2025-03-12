const express = require("express");
 const Task = require("../models/Task");
 const router = express.Router();
 router.use((req, res, next) => {
 console.log("task Route Accessed");
 next();
 });
 //Get all
 router.get("/", async (req, res) => {
 try {
 const tasks = await Task.find();
 res.json(tasks);
 } catch (error) {
 next(error);
 }
 });
 
 //Get by id
 router.get("/:id", async (req, res) => {
 try {
 const task = await Task.findById(req.params.id);
 if (!task) {
 throw new Error("task Not Found");
 }
 res.json(task);
 } catch (error) {
 error.status = 404;
    next(error);
  }
 });
 //Post
 router.post("/", async (req, res) => {
  try {
    const { taskName, description, status } = req.body;
    if (!taskName || !description) {
      throw new Error("taskName or description cannot be empty!");
    }
    const newTask = new Task({ taskName, description, status});
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
 });
 //Put an id
 router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
 req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      throw new Error("task Not Found");
    }
    res.json(updatedTask);
  } catch (error) {
    error.status = 404;
    next(error);
  }
 });
 //Delete an id
 router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      throw new Error("Product Not Found");
}
 res.json(deletedProduct);
 } catch (error) {
 error.status = 404;
 next(error);
 }
 });
 module.exports = router;