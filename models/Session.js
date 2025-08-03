const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  focusType: { type: String, enum: ['deep', 'light', 'creative'] },
  distractions: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);
