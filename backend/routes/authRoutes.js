const express = require('express');
const { registerUser, loginUser, updateUser } = require('../controllers/authController.js');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/user', updateUser);

module.exports = router;
