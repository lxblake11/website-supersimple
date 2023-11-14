// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Enable All CORS Requests for simplicity in development
// app.use(cors());

// app.use(express.json()); // Middleware for parsing JSON bodies

// app.post('/subscribe', (req, res) => {
//     console.log('Received email:', req.body.email);
//     res.status(200).send('Email received successfully!');
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace 'your_mongodb_connection_string' with your actual MongoDB connection string

const mongoConnectionString = 'mongodb+srv://chingutest2:wncf7guLWm7oS3Uf@cluster0.qty8vqm.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema for the subscriber
const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // Ensures the email addresses are unique in the collection
  }
});

// Create a model based on the schema
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// Enable All CORS Requests for simplicity in development
app.use(cors());

// Middleware for parsing JSON bodies
app.use(express.json());

// POST endpoint for form submission
app.post('/subscribe', (req, res) => {
  // Create a new subscriber using the email from the request body
  const newSubscriber = new Subscriber({ email: req.body.email });

  // Save the new subscriber to the database
  newSubscriber.save()
    .then(() => {
      console.log('Email saved to database:', req.body.email);
      res.status(200).send('Email received successfully!');
    })
    .catch(err => {
      console.error('Error saving to database', err);
      res.status(500).send('Error saving to database');
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});