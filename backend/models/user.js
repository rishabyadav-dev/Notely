const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
User.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    console.log("trying hashing password");

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    console.log("password hashed successfully");

    next();
  } catch (error) {
    next(error);
  }
});

const usermodel = mongoose.model("Users", User);

module.exports = usermodel;
