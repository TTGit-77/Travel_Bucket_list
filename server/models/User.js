const mongoose = require('mongoose');

const bucketListSchema = new mongoose.Schema({
  place: { type: String, required: true },
  photo: { type: String },
  description: { type: String },
  plannedDate: { type: String },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bucketList: [bucketListSchema]
});

module.exports = mongoose.model('User', userSchema); 