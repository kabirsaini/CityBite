require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const cartRoutes = require('./routes/cartRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

const db = require('./config/db');
const cors = require('cors');
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use(cors({
    origin: ["https://food-website-frontend-j9ak.onrender.com", "http://localhost:5173"],
    credentials: true,
}));

app.options("/*splat", cors());



db();

app.get('/', (req, res) => {
    console.log('Received a GET request on /');
    res.send('Hello World!');
});

//user routes
app.use('/api/users', userRoutes);

// product routes
app.use('/api/products', productRoutes);

// restaurant routes
app.use('/api/restaurants', restaurantRoutes);

//cart routes
app.use('/api/cart', cartRoutes);

//review routes
app.use('/api/reviews', reviewRoutes);

//order routes
app.use('/api/orders', orderRoutes);

//payment routes
app.use('/api/payments', paymentRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
