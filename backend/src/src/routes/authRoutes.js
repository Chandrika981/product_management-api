const express=require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res,next) => {
  try {
    const { userName, password } = req.body;

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      const error = new Error("Username already exists");
      error.status = 400;
      next(error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ userName, password: hashedPassword });
    const savedUser = newUser.save();

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res,next) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    if (!user) {
      const error = new Error("User does not exist");
      error.status = 400;
      next(error);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid Credentials");
      error.status = 400;
      next(error);
    }

    const token = jwt.sign(
      { userId: user._id, userName },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;