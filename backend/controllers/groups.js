const HostGroup = require("../models/HostGroup");

// Get all host groups
const getGroups = async (req, res) => {
  try {
    const groups = await HostGroup.find().populate("devices owner");
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single host group by ID
const getOneGroup = async (req, res) => {
  try {
    const group = await HostGroup.findById(req.params.GroupId).populate("devices owner");
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new host group
const addOneGroup = async (req, res) => {

  console.log(req.body)
  try {
    const newGroup = new HostGroup(req.body);
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    console.log("error", error)
    res.status(400).json({ message: error.message });
  }
};

// Update an existing host group by ID
const updateOneGroup = async (req, res) => {
  try {
    const updatedGroup = await HostGroup.findByIdAndUpdate(req.params.GroupId, req.body, { new: true, runValidators: true });
    if (!updatedGroup) return res.status(404).json({ message: "Group not found" });
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a host group by ID
const deleteOneGroup = async (req, res) => {
  try {
    const deletedGroup = await HostGroup.findByIdAndDelete(req.params.GroupId);
    if (!deletedGroup) return res.status(404).json({ message: "Group not found" });
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getGroups,getOneGroup,addOneGroup,updateOneGroup,deleteOneGroup}
