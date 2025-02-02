
const HostGroup =  require("../models/HostGroup")
const User =  require("../models/User")

const defaultHostGroup = {
  name: "Default",
  description: "Default Group",
  location: "",
  project: "",
  devices: [],
  owner:""
}

const newUserDefaultActions = async (user) => {
    const defaultGroup = new HostGroup({...defaultHostGroup, owner:user._id})
    const defaultGroupCreated = await defaultGroup.save()
    const foundUser = await User.findById(user._id)
    foundUser.groups.push(defaultGroupCreated._id)
    await foundUser.save()
}

module.exports = {newUserDefaultActions}