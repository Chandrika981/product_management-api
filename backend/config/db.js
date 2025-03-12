const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected sucessfully");
  } catch (e) {
    console.log("MongoDB connection Failed:" + e);
    process.exit(1);
  }
};
module.exports = connectDB;