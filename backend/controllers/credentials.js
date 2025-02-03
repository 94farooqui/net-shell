const Credential = require("../models/Credential");

// Get all credentials
const getCreds = async (req, res) => {
  try {
    const creds = await Credential.find();
    res.status(200).json(creds);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single credential
const getOneCred = async (req, res) => {
  try {
    const cred = await Credential.findById(req.params.credId);
    if (!cred) return res.status(404).json({ message: "Credential not found" });
    res.status(200).json(cred);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new credential
const addCred = async (req, res) => {
  console.log("Rquest for add Cred")
  try {
    const newCred = new Credential(req.body);
    const savedCred = await newCred.save();
    res.status(201).json(savedCred);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
};

// Update a credential
const updateOneCred = async (req, res) => {
  try {
    const updatedCred = await Credential.findByIdAndUpdate(req.params.credId, req.body, { new: true });
    if (!updatedCred) return res.status(404).json({ message: "Credential not found" });
    res.status(200).json(updatedCred);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a credential
const deleteOneCred = async (req, res) => {
  try {
    const deletedCred = await Credential.findByIdAndDelete(req.params.credId);
    if (!deletedCred) return res.status(404).json({ message: "Credential not found" });
    res.status(200).json({ message: "Credential deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCreds, getOneCred, updateOneCred, addCred, deleteOneCred };
