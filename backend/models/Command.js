const mongoose = require('mongoose');

const CommandSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  command: { 
    type: String, 
    required: true 
  },
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Command', CommandSchema);