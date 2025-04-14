const mongoose = require("mongoose");
const notemodel = require("../models/note");

exports.getNotes = async (req, res) => {
  console.log("req.user.userid-", req.user.userid);

  const Notes = await notemodel.find({ user: req.user.userid });
  const formattednotes = Notes.map((note) => ({
    id: note._id,
    title: note.title,
    content: note.content,
    deletestatus: note.deletestatus,
  }));

  res.json({ formattednotes: formattednotes });
};

exports.addNote = async (req, res) => {
  try {
    console.log("addnote request recieved in server");

    const newnote = await notemodel.create({
      ...req.body,
      user: req.user.userid,
    });
    console.log("note added to DB successfully");

    // console.log("req.user.userid-", req.user.userid);

    res.status(201).json({
      id: newnote._id,
      title: newnote.title,
      content: newnote.content,
      deletestatus: newnote.deletestatus,
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({ error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const thatnote = await notemodel.findById(req.params.id);
    if (!thatnote) {
      return res.status(404).json({ error: "Note not found" });
    }
    await notemodel.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.softdeleteNote = async (req, res) => {
  try {
    const thatnote = await notemodel.findById(req.params.id);
    if (!thatnote) {
      return res.status(404).json({ error: "Note not found" });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid note ID" });
    }
    await notemodel.findByIdAndUpdate(req.params.id, { deletestatus: true });
    res.json({ message: "Note soft deleted in MDB !!" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.editNote = async (req, res) => {
  try {
    const noteid = req.params.id;
    const updatedata = req.body;
    const updatednote = await notemodel.findByIdAndUpdate(noteid, updatedata, {
      new: true,
    });
    if (!updatednote) {
      res.status(400).json({ error: "note not found" });
    } else {
      res.status(201).json({ message: "note updated" });
    }
  } catch (error) {
    res.status(401).json({ error: "object id incorrect" });
  }
};
