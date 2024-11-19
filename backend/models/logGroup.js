// models/logGroup.js
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }, // Automatically sets the timestamp to current time
});

const logGroupSchema = new mongoose.Schema({
  logs: [logSchema], // An array of individual logs
  createdAt: { type: Date, default: Date.now }, // Timestamp when the log group is created
});

const LogGroup = mongoose.model('LogGroup', logGroupSchema);

module.exports = LogGroup;
