const User = require("./../models/User")

const getUserDetails = async (req,res) => {
    console.log("Request for User token verify")
    if(!req.user){
     return res.status(404).json({error:"User not found"})
    }

    const userFound = await User.findById(req.user.userId)

    return res.status(200).json({user: userFound})
  }

  module.exports = {getUserDetails}