const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  place: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Place', placeSchema); 