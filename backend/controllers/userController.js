//registration and login handlers

// require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usermodel = require("../models/user");

const registeruser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existinguser = await usermodel.findOne({ email });

    if (existinguser) {
      return res.status(400).json({ error: "User already exists!" });
    } else {
      const newUser = await usermodel.create({ email, password });

      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          email: newUser.email,
          password: newUser.password,
        },
      });
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email,password taken fron fronend");
    console.log("now veryign if email exists");

    const user = await usermodel.findOne({ email });

    if (!user) {
      console.log("user not found");

      return res.status(400).json({ error: "User not found!" });
    }
    console.log("seeing if password matches,through unhashing");

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).json({ error: "Password incorrect!" });
    }
    console.log("verying email and password before signing a token");

    const token = jwt.sign(
      { userid: user._id },
      process.env.JWT_SECRET || "2n4j2j42uwf33",
      {
        expiresIn: "7d",
      }
    );
    console.log("token signed successfully");
    console.log("token", token);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = { registeruser, loginuser };
