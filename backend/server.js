const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://bobbyjmain:ikIXV00OR5BuY6NC@cluster0.zuse5zd.mongodb.net/candyshop?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const itemSchema = new mongoose.Schema({
    name: String,
    id: String,
    description: String,
    price: Number,
    availability: Boolean,
    image: String
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

const Item = mongoose.model('Item', itemSchema);
const User = mongoose.model('User', userSchema);

app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        console.error('Failed to fetch items:', err);
        res.status(500).send({ error: 'Failed to fetch items' });
    }
});

app.post('/items', async (req, res) => {
    const newItem = new Item(req.body);
    try {
        await newItem.save();
        res.status(201).send(newItem);
    } catch (err) {
        console.error('Failed to add item:', err);
        res.status(500).send({ error: 'Failed to add item' });
    }
});

app.post('/register', async (req, res) => {
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
});

app.post('/login', async (req, res) => {
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
});

app.put('/user', async (req, res) => {
    const { token, email } = req.body;
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        user.email = email;
        await user.save();
        res.send(user);
    } catch (err) {
        console.error('Failed to update user:', err);
        res.status(500).send({ error: 'Failed to update user' });
    }
});

app.post('/cart', async (req, res) => {
    const { userId, items } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items });
        } else {
            cart.items = items;
        }
        await cart.save();
        res.status(200).send(cart);
    } catch (err) {
        console.error('Failed to update cart:', err);
        res.status(500).send({ error: 'Failed to update cart' });
    }
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});