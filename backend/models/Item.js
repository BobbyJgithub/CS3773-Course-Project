const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  id: String,
  description: String,
  price: Number,
  availability: Boolean,
  image: String
});

module.exports = mongoose.model('Item', itemSchema);
