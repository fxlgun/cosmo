// 

const mongoose = require('mongoose');
const express = require('express');
const { User, Post, Comment } = require('./models');
require('dotenv').config();
const app = express();

// ... Initialize middleware ...

// Set up Mongoose connection
mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// ... Define your routes and app logic ...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
