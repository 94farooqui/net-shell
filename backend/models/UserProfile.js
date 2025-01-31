import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    role: {
      type: String,
      enum: ['admin', 'user', 'viewer'],
      default: 'user'
    }
})

module.exports = mongoose.model("UserProfile", UserProfileSchema)