const getUserDetails = async (req,res) => {
    console.log("Request for User token verify")
    if(!req.user){
     return res.status(404).json({error:"User not found"})
    }
    return res.status(200).json({user: req.user})
  }

  module.exports = {getUserDetails}