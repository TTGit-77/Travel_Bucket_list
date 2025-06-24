const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify JWT
function auth(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}

// Get user's bucket list
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.bucketList);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to bucket list
router.post('/', auth, async (req, res) => {
  const { place, photo, description, plannedDate } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.bucketList.push({ place, photo, description, plannedDate });
    await user.save();
    res.status(201).json(user.bucketList);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update status (completed/pending)
router.patch('/:itemId', auth, async (req, res) => {
  const { status } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const item = user.bucketList.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.status = status;
    await user.save();
    res.json(user.bucketList);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 