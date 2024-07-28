const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://bobbyjmain:ikIXV00OR5BuY6NC@cluster0.zuse5zd.mongodb.net/candyshop?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const discountSchema = new mongoose.Schema({
    code: String,
    discount: Number
});

const Discount = mongoose.model('Discount', discountSchema);

const discount = new Discount({
    code: 'SAVE10',
    discount: 0.10
});

discount.save()
    .then(() => {
        console.log('Discount code saved.');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error saving discount code:', err);
    });
