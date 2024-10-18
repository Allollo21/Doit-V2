// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const Task = require('./models/Task'); // Import the Task model

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Set EJS as the templating engine
app.set("view engine", "ejs");
// MongoDB connection using the URI from .env file
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
  });

// Serve the index.ejs template (assuming you have a frontend for this project)
app.get('/', (req, res) => {
  res.render('index'); // Renders the index.ejs template
});
