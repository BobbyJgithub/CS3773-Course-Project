const express = require('express');
const { getItems, addItem } = require('../controllers/itemController.js');

const router = express.Router();

router.get('/', getItems);
router.post('/', addItem);

module.exports = router;
