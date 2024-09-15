const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000' // URL of your frontend app
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB without deprecated options
mongoose.connect('mongodb://localhost/fruit-ai', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Models
const Fruit = mongoose.model('Fruit', new mongoose.Schema({
  name: String,
  details: String,
}));

const Faq = mongoose.model('Faq', new mongoose.Schema({
  question: String,
  answer: String,
}));

// Routes
app.get('/api/fruits', async (req, res) => {
  const fruits = await Fruit.find();
  res.json(fruits);
});

app.post('/api/faqs', async (req, res) => {
  const faq = new Faq(req.body);
  await faq.save();
  res.json(faq);
});

app.delete('/api/faqs/:id', async (req, res) => {
  await Faq.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
