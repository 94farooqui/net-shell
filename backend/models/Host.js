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
    validate: {
      validator: function (value) {
        // Validating if it's a valid ObjectId or null
        return mongoose.Types.ObjectId.isValid(value) || value === null;
      },
      message: 'credentials must be either a valid ObjectId or null.'
    },
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
    validate: {
      validator: function (value) {
        // Validating if it's a valid ObjectId or null
        return mongoose.Types.ObjectId.isValid(value) || value === null;
      },
      message: 'group must be either a valid ObjectId or null.'
    },
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

  }
});

module.exports = mongoose.model('Host', HostSchema);