
// EDITED

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

const mongoConnectionString = 'mongodb+srv://chingutest2:wncf7guLWm7oS3Uf@cluster0.qty8vqm.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // Ensures the email addresses are unique in the collection
  }
});

const purchaseSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  subscriptionTier: String,
  price: String
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
const Purchase = mongoose.model('Purchase', purchaseSchema);

app.use(cors());
app.use(express.json());

app.post('/subscribe', (req, res) => {
  const newSubscriber = new Subscriber({ email: req.body.email });

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

app.post('/purchase', (req, res) => {
  const { firstName, email, subscriptionTier, price } = req.body;
  const newPurchase = new Purchase({ firstName, email, subscriptionTier, price });

  newPurchase.save()
    .then(() => res.status(200).json({ message: 'Purchase saved successfully!' }))
    .catch(err => res.status(500).json({ error: 'Error saving to database: ' + err.message }));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
