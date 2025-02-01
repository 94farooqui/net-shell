const Host = require("../models/Host");
const HostGroup = require("../models/HostGroup");

const getHosts = async (req, res) => {
  try {
    const hosts = await Host.find().populate("group");
    res.status(200).json(hosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single host by ID
const getOneHost = async (req, res) => {
  try {
    const host = await Host.findById(req.params.HostId).populate("group");
    if (!host) return res.status(404).json({ message: "Host not found" });
    res.status(200).json(host);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new host
const addOneHost = async (req, res) => {
  try {
    console.log("Req Body", req.body)
    if (!req.body.group) {
      const defaultHostGroup = new HostGroup({ name: "Default" })
      const group = await defaultHostGroup.save()
      const newHost = new Host({...req.body, group:group});
      await newHost.save();
      res.status(201).json(newHost);
    }

  } catch (error) {
    console.log("Error", error)
    res.status(400).json({ message: error.message });
  }
};

// Update an existing host by ID
const updateOneHost = async (req, res) => {
  try {
    const updatedHost = await Host.findByIdAndUpdate(req.params.HostId, req.body, { new: true, runValidators: true });
    if (!updatedHost) return res.status(404).json({ message: "Host not found" });
    res.status(200).json(updatedHost);
  } catch (error) {
    console.log("Error", error)
    res.status(400).json({ message: error.message });
  }
};

// Delete a host by ID
const deleteOneHost = async (req, res) => {
  try {
    const deletedHost = await Host.findByIdAndDelete(req.params.HostId);
    if (!deletedHost) return res.status(404).json({ message: "Host not found" });
    res.status(200).json({ message: "Host deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHosts, getOneHost, addOneHost, updateOneHost, deleteOneHost }
