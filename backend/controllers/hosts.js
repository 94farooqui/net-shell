const Host = require("../models/Host");
const HostGroup = require("../models/HostGroup");
const User = require("../models/User");

const getHosts = async (req, res) => {
  console.log("user ",req.user)
  try {
      console.log("request for group names for user", req.user.userId)
      //const user = await User.findById(req.user.userId).populate({ path: 'groups', select: 'name' });
      const groups = await HostGroup.find({owner:req.user.userId}).populate("devices");
      console.log("Groups",groups)
      return res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  // try {
  //   console.log("Request for hosts")
  //   const hosts = await Host.find({owner:req.user.userId}).populate("group");
  //   return res.status(200).json(hosts);
  // } catch (error) {
  //   console.log("Error", error)
  //   res.status(500).json({ message: error.message });
  // }


    // try {
    //   // Find the user and populate the groups they belong to
    //   const user = await User.findById(req.user.userId).populate('groups');
    //   if (!user) {
    //     return { success: false, message: "User not found" };
    //   }
  
    //   // Extract the group IDs from the user's groups
    //   const groupIds = user.groups.map(group => group._id);
  
    //   // Find all hosts that belong to the user's groups
    //   const hosts = await Host.find({ group: { $in: groupIds } });
    //   return res.status(200).json(hosts);
    //   //return { success: true, data: hosts };
    // } catch (error) {
    //   console.error("Error fetching hosts:", error);
    //   return { success: false, message: "Server error" };
    // }

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
      const newHost = new Host({...req.body, group:group, owner:req.user.userId});
      await newHost.save();
      return res.status(201).json(newHost);
    }
    const newHost = new Host({...req.body, owner:req.user.userId});
    const hostAdded = await newHost.save();
    if(hostAdded){
      const groupUpdate = await HostGroup.findById(hostAdded.group)
      groupUpdate.devices.push(hostAdded._id)
      await groupUpdate.save()
    }
    return res.status(201).json(newHost);

  } catch (error) {
    console.log("Error", error)
    res.status(400).json({ message: error.message });
  }
};

// Update an existing host by ID
const updateOneHost = async (req, res) => {
  console.log("Update request")
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
    return res.status(200).json({ message: "Host deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHosts, getOneHost, addOneHost, updateOneHost, deleteOneHost }
