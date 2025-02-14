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
    enum: ['Router', 'Switch', 'Firewall', 'Server', 'Other'],
    required: true 
  },
  credentials: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Credential',
    default: null
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HostGroup',
    default: null
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