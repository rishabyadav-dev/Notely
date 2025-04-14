const mongoose = require("mongoose");

const note = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  deletestatus: { type: Boolean, default: false },
});

const notemodel = mongoose.model("notes", note);

module.exports = notemodel;
