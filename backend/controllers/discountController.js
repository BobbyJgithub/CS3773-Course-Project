const Discount = require('../models/Discount.js');

const validateDiscount = async (req, res) => {
  const { code } = req.body;
  try {
    const discount = await Discount.findOne({ code });
    if (discount) {
      res.json({ valid: true, discount: discount.discount });
    } else {
      res.json({ valid: false });
    }
  } catch (err) {
    console.error('Failed to validate discount code:', err);
    res.status(500).send({ error: 'Failed to validate discount code' });
  }
};

module.exports = { validateDiscount };
