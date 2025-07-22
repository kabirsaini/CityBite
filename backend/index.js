require('dotenv').config();
const express = require('express');
const app  = express();
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });
const db = require('./config/db');
const cors = require('cors');
const port =  3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use(cors({
    origin: 'http://localhost:5173', // React app's origin
    credentials: true
}));

// Importing user routes
const userRoutes = require('./routes/userRoutes');
 
// Importing product routes
const productRoutes = require('./routes/productRoutes');

// Importing restaurant routes
const restaurantRoutes = require('./routes/restaurantRoutes');

// Importing cart routes
const cartRoutes = require('./routes/cartRoutes');

// Importing review routes
const reviewRoutes = require('./routes/reviewRoutes');

// Importing order routes
const orderRoutes = require('./routes/orderRoutes');

// Importing payment routes
const paymentRoutes = require('./routes/paymentRoutes');

// database connection
db();

app.get('/', (req, res) => {
    console.log('Received a GET request on /');
    res.send('Hello World!');
});

// Using user routes
app.use('/api/users', userRoutes);

// Using product routes
app.use('/api/products', productRoutes);

// Using restaurant routes
app.use('/api/restaurants', restaurantRoutes);

// Using cart routes
app.use('/api/cart', cartRoutes);

// Using review routes
app.use('/api/reviews', reviewRoutes);

// Using order routes
app.use('/api/orders', orderRoutes);

// Using payment routes
app.use('/api/payments', paymentRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});