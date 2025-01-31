const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'UserProfile'
  },
  devices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device'
  }]
}, { 
  timestamps: true,
  methods: {
    // Method to check password
    async comparePassword(candidatePassword) {
      return bcrypt.compare(candidatePassword, this.password);
    }
  }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);