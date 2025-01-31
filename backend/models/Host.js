const mongoose = require('mongoose');

const HostSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  ipAddress: { 
    type: String, 
    required: true,
    unique: true 
  },
  type: { 
    type: String, 
    enum: ['router', 'switch', 'firewall', 'server', 'other'],
    required: true 
  },
  credentials: {
    username: { type: String },
    password: { type: String, select: false }, // Exclude from default queries
    sshKey: { type: String, select: false }
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeviceGroup'
  },
  connectionMethod: {
    type: String,
    enum: ['password', 'ssh-key', 'none'],
    default: 'none'
  },
  description: String,
  lastConnected: Date
}, { 
  timestamps: true,
  methods: {
    // Method to safely mask sensitive information
    toJSON() {
      const obj = this.toObject();
      delete obj.credentials;
      return obj;
    }
  }
});

module.exports = mongoose.model('Host', HostSchema);