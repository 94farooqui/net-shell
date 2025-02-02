const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const User = require('../models/User');
const { newUserDefaultActions } = require('../lib/newUserDefaults');
const router = express.Router();

// Register a new user
router.post('/signup', async (req, res) => {
  const { name, password, email } = req.body;
  // const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({name, password, email})
    await user.save()
    newUserDefaultActions(user)
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({email: email});

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
      res.status(201).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;