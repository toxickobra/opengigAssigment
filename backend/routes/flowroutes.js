// routes/logs.js
const express = require('express');
const Log = require('../models/log');  // Importing the Log model
const LogGroup = require('../models/logGroup');  // Importing the LogGroup model

const router = express.Router();

// Route to fetch all individual logs
router.get('/logs', async (req, res) => {
  try {
    const logs = await Log.find();  // Fetching all logs from the Log collection
    res.json(logs);  // Sending the logs as a response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

// Route to fetch all log groups
router.get('/log-groups', async (req, res) => {
  try {
    const logGroups = await LogGroup.find();  // Fetching all log groups from the LogGroup collection
    res.json(logGroups);  // Sending the log groups as a response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch log groups' });
  }
});

// Route to save a new log group
router.post('/log-group', async (req, res) => {
  const { logs } = req.body;  // Extracting logs from the request body

  if (!logs || logs.length === 0) {
    return res.status(400).json({ message: 'No logs provided.' });  // If no logs are provided, send a bad request response
  }

  try {
    // Creating a new log group with the logs array
    const logGroup = new LogGroup({ logs });

    // Saving the log group to the database
    await logGroup.save();
    res.status(201).json({ message: 'Log group saved successfully', logGroup });  // Success response with the log group data
  } catch (error) {
    console.error('Error saving log group:', error);
    res.status(500).json({ message: 'Failed to save log group', error });  // Error response in case of failure
  }
});

module.exports = router;
