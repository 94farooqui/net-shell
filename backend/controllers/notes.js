const mongoose = require("mongoose");
const Note = require("../models/Note");

// Get all notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single note
const getOneNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.NoteId);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new note
const addOneNote = async (req, res) => {
  console.log("req.user",req.user)
  try {
    const newNote = new Note({ ...req.body, user: req.user.userId });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("Add note error", error)
    res.status(500).json({ message: "Server error" });
  }
};

// Update a note
const updateOneNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.NoteId, req.body, { new: true });
    if (!updatedNote) return res.status(404).json({ message: "Note not found" });
    return res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a note
const deleteOneNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.NoteId);
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getNotes, getOneNote, addOneNote, updateOneNote, deleteOneNote };
