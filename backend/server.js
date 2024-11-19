// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logsRouter = require('./routes/flowroutes');  // Importing the routes

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());  // To parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb+srv://sample:226016@opengig.bs2q4.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Use the logs router for the '/api' endpoint
app.use('/api', logsRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
