const HostGroup = require("../models/HostGroup");
const User = require("../models/User");

// Get all host groups
const getGroups = async (req, res) => {
  try {
    const groups = await HostGroup.find({owner: req.user.userId}).populate("devices owner");
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGroupNames = async (req, res) => {
  try {
    console.log("request for group names for user", req.user.userId)
    //const user = await User.findById(req.user.userId).populate({ path: 'groups', select: 'name' });
    const groups = await HostGroup.find({owner:req.user.userId})
    console.log("Groups",groups)
    return res.status(200).json(groups);
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
    const newGroup = new HostGroup({ ...req.body, owner: req.user.userId });
    const groupAdded = await newGroup.save();
    if (groupAdded) {
      const user = await User.findById(req.user.userId)
      user.groups.push(groupAdded._id)
      await user.save()
    }
    res.status(201).json(newGroup);
  } catch (error) {
    console.log("error", error)
    res.status(400).json({ message: error.dmessage });
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
  console.log(req.params.GroupId)
  try {
    const deletedGroup = await HostGroup.findByIdAndDelete(req.params.GroupId);
    if (!deletedGroup) return res.status(404).json({ message: "Group not found" });
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getGroups, getGroupNames, getOneGroup, addOneGroup, updateOneGroup, deleteOneGroup }
