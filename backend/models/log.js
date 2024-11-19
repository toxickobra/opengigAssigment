// models/log.js
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }, // Automatically sets the timestamp to current time
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
