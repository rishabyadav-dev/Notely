//Defines API endpoints for notes.

const express = require("express");
const router = express.Router();
const {
  getNotes,
  addNote,
  deleteNote,
  editNote,
  softdeleteNote,
} = require("../controllers/noteController");
const protect = require("../middleware/authMiddleware");

router.get("/", protect, getNotes);
router.post("/", protect, addNote);
router.delete("/:id", protect, deleteNote);
router.delete("/soft/:id", protect, softdeleteNote);
router.put("/:id", protect, editNote);

module.exports = router;
