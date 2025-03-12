const express = require("express");
const Product = require("../models/Product");
const authenticateJWT=require("../middlewares/authMiddleware");
const productSchema = require("../validators/productValidator");
const router = express.Router();
router.use((req, res, next) => {
  console.log("Product Route Accessed");
  next();
});
//Get all
router.get("/", async (req, res,next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});
//Get by id
router.get("/:id", async (req, res,next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new Error("Product Not Found");
    }
    res.json(product);
  } catch (error) {
    error.status = 404;
    next(error);
  }
});
//Post
router.post("/",authenticateJWT,async (req, res,next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      error: error.details.map((err) => err.message),
    });
  }
  try {
    const { productName, category, subCategory } = req.body;

    const newProduct = new Product({ productName, category, subCategory });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error); 
  }
});
//Put an id
router.put("/:id",authenticateJWT, async (req, res,next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      throw new Error("Product Not Found");
    }
    res.json(updatedProduct);
  } catch (error) {
    error.status = 404;
    next(error);
  }
});
//Delete an id
router.delete("/:id",authenticateJWT, async (req, res,next) => {
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

