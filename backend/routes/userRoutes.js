
const express = require('express');

const { register, login ,saveAddress,getAddress,Profile} = require('../controller/userController');
const { googleLogin } = require('../controller/googleController');
const { isAuthenticated, restrictTo } = require('../middlewares/auth.js'); //changed
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Register route

router.post('/google-login', googleLogin);

router.get('/me', isAuthenticated, (req, res) => {
    res.status(200).json({ user: req.user });
});// changed


router.post('/register', register);

// Login route

router.post('/login', login);

// Export the router

router.post("/saveAddress", isAuthenticated, saveAddress);

// Get address
router.get("/getAddress", isAuthenticated, getAddress);

router.get('/profile', isAuthenticated,Profile);

module.exports = router;