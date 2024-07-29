const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDb } = require('./utils/db.js');
const itemRoutes = require('./routes/itemRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const discountRoutes = require('./routes/discountRoutes.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

connectToDb();

app.use('/items', itemRoutes);
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/discount', discountRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
