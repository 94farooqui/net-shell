const mongoose = require('mongoose');

const HostGroupSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: String,
  location: String,
  project: String,
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