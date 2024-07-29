const express = require('express');
const { validateDiscount } = require('../controllers/discountController.js');

const router = express.Router();

router.post('/validate-discount', validateDiscount);

module.exports = router;
