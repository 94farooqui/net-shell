const Command = require("../models/Command");

// Get all commands
const getCommands = async (req, res) => {
  try {
    const commands = await Command.find({ owner: req.user.userId });
    res.status(200).json(commands);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single command
const getOneCommand = async (req, res) => {
  try {
    const command = await Command.findById(req.params.commandId);
    if (!command) return res.status(404).json({ message: "Command not found" });
    res.status(200).json(command);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new command
const addCommand = async (req, res) => {
  console.log(req.body, req.user)
  try {
    const newCommand = new Command({ ...req.body, owner: req.user.userId });
    const savedCommand = await newCommand.save();
    res.status(201).json(savedCommand);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a command
const updateOneCommand = async (req, res) => {
  try {
    const updatedCommand = await Command.findByIdAndUpdate(req.params.commandId, req.body, { new: true });
    if (!updatedCommand) return res.status(404).json({ message: "Command not found" });
    res.status(200).json(updatedCommand);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a command
const deleteOneCommand = async (req, res) => {
  try {
    const deletedCommand = await Command.findByIdAndDelete(req.params.commandId);
    if (!deletedCommand) return res.status(404).json({ message: "Command not found" });
    return res.status(200).json({ message: "Command deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCommands, getOneCommand, addCommand, updateOneCommand, deleteOneCommand };
