const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://bobbyjmain:ikIXV00OR5BuY6NC@cluster0.zuse5zd.mongodb.net/candyshop?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

const itemSchema = new mongoose.Schema({
    name: String,
    id: String,
    description: String,
    price: Number,
    availability: Boolean,
    image: String
});

const Item = mongoose.model('Item', itemSchema);

const items = [
    {
        name: 'Chocolate Bar',
        id: '10',
        description: 'Indulge in the rich, creamy goodness of our chocolate bar. Perfect for any sweet tooth!',
        price: 3.99,
        availability: true,
        image: '../site/images/chocolate.png'
    },
    {
        name: 'Croissant',
        id: '11',
        description: 'Enjoy a flaky, buttery croissant. Perfect for breakfast or a snack!',
        price: 2.49,
        availability: true,
        image: '../site/images/croissant.png'
    },
    {
        name: 'Muffin',
        id: '12',
        description: 'Satisfy your sweet tooth with a delicious Muffin!',
        price: 2.99,
        availability: true,
        image: '../site/images/muffin.png'
    },

    {
        name: 'Popsicle',
        id: '13',
        description: 'Cool off with a refreshing Popsicle. Available in a variety of flavors!',
        price: 1.49,
        availability: true,
        image: '../site/images/popsicle.png'
    },
    {
        name: 'Piece of Cake',
        id: '14',
        description: 'Treat yourself to a slice of cake. Perfect for any celebration!',
        price: 4.99,
        availability: true,
        image: '../site/images/piece-of-cake.png'
    },
    {
        name: 'Marshmallow',
        id: '15',
        description: 'Soft, fluffy, and delicious. Our marshmallows are perfect for roasting or snacking!',
        price: 0.99,
        availability: true,
        image: '../site/images/marshmallow.png'
    },
    {
        name: 'Marmalade',
        id: '16',
        description: 'Spread some sweetness with our delicious Marmalade. Perfect for toast or pastries!',
        price: 3.49,
        availability: true,
        image: '../site/images/marmalade.png'
    },
    {
        name: 'Lollipop',
        id: '17',
        description: 'Enjoy a sweet treat with our colorful Lollipops. Available in a variety of flavors!',
        price: 0.99,
        availability: true,
        image: '../site/images/lollipop.png'
    
    },
    {
        name: 'Jelly',
        id: '18',
        description: 'Add some fun to your day with our fruity Jelly. Perfect for snacking or desserts!',
        price: 2.49,
        availability: true,
        image: '../site/images/jelly.png'

    },
    {
        name: 'Ice Cream',
        id: '19',
        description: 'Cool off with a scoop of our creamy Ice Cream. Available in a variety of flavors!',
        price: 3.49,
        availability: true,
        image: '../site/images/ice-cream.png'
    },
    {
        name: 'Gummy',
        id: '20',
        description: 'Chewy, fruity, and fun. Our Gummies are perfect for snacking or sharing!',
        price: 1.99,
        availability: true,
        image: '../site/images/gummy.png'
    }




];

Item.insertMany(items).then(() => {
    console.log('Items added successfully');
    mongoose.connection.close();
}).catch(err => {
    console.error('Failed to add items', err);
});
