// EDITED

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// const mongoConnectionString = 'YOUR_MONGODB_CONNECTION_STRING';
const mongoConnectionString = 'mongodb+srv://chingutest2:wncf7guLWm7oS3Uf@cluster0.qty8vqm.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const subscriberSchema = new mongoose.Schema({
  email: String,
  confirmed: Boolean
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

const purchaseSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  subscriptionTier: String,
  price: String
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

app.use(cors());
app.use(express.json());

app.post('/subscribe', (req, res) => {
  const newSubscriber = new Subscriber({
    email: req.body.email,
    confirmed: false // Initially false, would be set to true after email confirmation
  });

  newSubscriber.save()
    .then(() => res.status(200).send('Email received successfully!'))
    .catch(err => res.status(500).send('Error saving to database'));
});

app.post('/purchase', (req, res) => {
  const newPurchase = new Purchase({
    firstName: req.body.firstName,
    email: req.body.email,
    subscriptionTier: req.body.subscriptionTier,
    price: req.body.price
  });

  newPurchase.save()
    .then(() => res.status(200).send('Purchase recorded successfully!'))
    .catch(err => res.status(500).send('Error saving purchase to database'));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
