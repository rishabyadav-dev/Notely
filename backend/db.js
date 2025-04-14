require("dotenv").config();
const mongoose = require("mongoose");
// console.log("connection string:" + process.env.MONGODB_URL);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
