require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  console.log("protect middleware: requesting token from header");

  const token = req.headers["token"];
  console.log("token received from headers:", token ? "Found" : "Not found");

  if (!token) {
    console.log("Error: token is missing");
    return res
      .status(401)
      .json({ valid: false, error: "Authentication token is missing" });
  }

  try {
    console.log("Verifying token...");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified, user ID:", decoded.userid);

    // Optional: Verify that the user still exists in the database
    const userExists = await User.findById(decoded.userid);

    if (!userExists) {
      console.log("User not found in database");
      return res.status(401).json({ valid: false, error: "User not found" });
    }

    console.log("protect middleware: setting req.user with decoded data");
    req.user = decoded;
    next();
    console.log("Forwarding request to routes for processing");
  } catch (error) {
    console.error("Token verification error:", error.message);

    // Provide more specific error messages based on the JWT error
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        valid: false,
        error: "Token has expired. Please log in again.",
      });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ valid: false, error: "Invalid token. Please log in again." });
    }

    res
      .status(401)
      .json({ valid: false, error: "Authentication failed: " + error.message });
  }
};

module.exports = protect;
