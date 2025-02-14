const Host = require("../models/Host");
const HostGroup = require("../models/HostGroup");
const User = require("../models/User");

const getHosts = async (req, res) => {
  console.log("user ", req.user)
  try {
    console.log("request for group names for user", req.user.userId)
    //const user = await User.findById(req.user.userId).populate({ path: 'groups', select: 'name' });
    //const groups = await HostGroup.find({owner:req.user.userId, $expr: {$gt : [{$size: "$devices"}, 0]}}).populate("devices");


    const groups = await HostGroup.find({ owner: req.user.userId }).sort({name:1}).populate({path:"devices", populate:{path:"credentials",select:"type name"}});
    console.log("Groups", groups)
    groups.forEach(group=> console.log(group))


    return res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

// Get a single host by ID
const getOneHost = async (req, res) => {
  try {
    const host = await Host.findById(req.params.HostId).populate("group").populate("credentials","type name");
    if (!host) return res.status(404).json({ message: "Host not found" });
    console.log("Host details", host)
    return res.status(200).json(host);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new host
const addOneHost = async (req, res) => {
  console.log("Add host")
  // Re-Write all the logic to add a host

  try{
    const newHost = await Host({...req.body, owner: req.user.userId})
    await newHost.save()
    console.log(newHost)

    if(!newHost){
      return res.status(500).json({error:"Something went wrong"})
    }

    const hostGroup = await HostGroup.findById(req.body.group)
    hostGroup.devices.push(newHost._id)
    await hostGroup.save()
    const user = await User.findById(req.user.userId)
    user.devices.push(newHost._id)
    await user.save()
    return res.status(201).json(newHost)
  }
  catch(error){
    console.log("Error",error)
  }



  // let newHost;
  // let hostAdded;
  // try {
  //   console.log("Req Body", req.body)
  //   if (!req.body.group) { 
      
  //     const existingDefaultGroup = await HostGroup.findOne({owner: req.user.userId, name:"Default"})//if there is no group in req body
  //     if(existingDefaultGroup){
  //       newHost = new Host({ ...req.body, group: existingDefaultGroup._id, owner: req.user.userId });
  //       hostAdded = await newHost.save();
  //     }
  //     const defaultHostGroup = new HostGroup({ name: "Default" })     //create default group
  //     const groupAdded = await defaultHostGroup.save()                //save the default group

  //     newHost = new Host({ ...req.body, group: groupAdded._id, owner: req.user.userId });
  //     hostAdded = await newHost.save();

  //     if (hostAdded) {
  //       const groupUpdate = await HostGroup.findById(hostAdded.group)
  //       groupUpdate.devices.push(hostAdded._id)
  //       await groupUpdate.save()
  //     }
  //     return res.status(201).json(newHost);
  //   }
    
  //   const newHost = new Host({ ...req.body, owner: req.user.userId });
  //   const hostAdded = await newHost.save();
  //   if (hostAdded) {
  //     const groupUpdate = await HostGroup.findById(hostAdded.group)
  //     groupUpdate.devices.push(hostAdded._id)
  //     await groupUpdate.save()
  //   }
  //   return res.status(201).json(newHost);

  // } catch (error) {
  //   console.log("Error", error)
  //   res.status(400).json({ message: error.message });
  // }
};

// Update an existing host by ID
const updateOneHost = async (req, res) => {
  console.log("Update request", req.body)
  try {
    // const updatedHost = await Host.findByIdAndUpdate(req.params.HostId, req.body, { new: true, runValidators: true });
    // if (!updatedHost) return res.status(404).json({ message: "Host not found" });
    const newHostData = req.body
    const oldHostData = await Host.findById(req.body._id)

    console.log("Old host data" , oldHostData)
    console.log("New host data" , newHostData)

    //updating corresponding host group
    if (oldHostData.group !== newHostData.group) {
      await HostGroup.findByIdAndUpdate(oldHostData.group, { $pull: { devices: oldHostData._id } })
      await HostGroup.findByIdAndUpdate(newHostData.group, { $addToSet: { devices: newHostData._id } })
    }

    const updatedHost = await Host.findByIdAndUpdate(req.params.HostId, newHostData, { new: true, runValidators: true });

    return res.status(200).json(updatedHost);
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
