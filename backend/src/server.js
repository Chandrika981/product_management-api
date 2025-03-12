const app = require("./app"); // Import updated app.js
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const path = require("path");

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 3000; // Ensure this matches your expected port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});