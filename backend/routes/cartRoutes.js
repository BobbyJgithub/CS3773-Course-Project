const express = require('express');
const { updateCart } = require('../controllers/cartController.js');

const router = express.Router();

router.post('/cart', updateCart);

module.exports = router;
