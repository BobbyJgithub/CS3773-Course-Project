const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  code: String,
  discount: Number
});

module.exports = mongoose.model('Discount', discountSchema);
