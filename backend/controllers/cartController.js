const Cart = require('../models/Cart.js');

const updateCart = async (req, res) => {
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
};

module.exports = { updateCart };
