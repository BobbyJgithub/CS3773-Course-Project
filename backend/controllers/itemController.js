const Item = require('../models/Item.js');

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error('Failed to fetch items:', err);
    res.status(500).send({ error: 'Failed to fetch items' });
  }
};

const addItem = async (req, res) => {
  const newItem = new Item(req.body);
  try {
    await newItem.save();
    res.status(201).send(newItem);
  } catch (err) {
    console.error('Failed to add item:', err);
    res.status(500).send({ error: 'Failed to add item' });
  }
};

module.exports = { getItems, addItem };
