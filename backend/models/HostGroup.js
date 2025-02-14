const mongoose = require('mongoose');

const HostGroupSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: {
    type: String,
    default: "Default"
  },
  location: {
    type: String,
    default: "Default location"
  },
  project: {
    type: String,
    default: "Default Project"
  },
  devices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Host'
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('HostGroup', HostGroupSchema);