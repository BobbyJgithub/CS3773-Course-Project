const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, email });
  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    console.error('Failed to register user:', err);
    res.status(500).send({ error: 'Failed to register user' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ error: 'Invalid username or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    res.send({ token });
  } catch (err) {
    console.error('Failed to login user:', err);
    res.status(500).send({ error: 'Failed to login user' });
  }
};

const updateUser = async (req, res) => {
  const { token, username, email, password } = req.body;
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.send(user);
  } catch (err) {
    console.error('Failed to update user:', err);
    res.status(500).send({ error: 'Failed to update user' });
  }
};

module.exports = { registerUser, loginUser, updateUser };
