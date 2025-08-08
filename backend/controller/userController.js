const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// generating JWT token

const signToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
}

// Register User

exports.register = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;
        // check if the user already exists
        const existingUser = await User.findOne({
            email: email
        });

        if (existingUser) {

            return res.status(400).json({ message: "User already exists" });
        }
        // step:1 (validating the entries--> email, phone, password)

        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email" });
        }
        if (!/^\+?[1-9]\d{1,14}$/.test(phone)) {
            return res.status(400).json({ message: "Please enter a valid phone number" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // step:2 (hashing the password)
        const hashedPassword = await bcrypt.hash(password, 10);

        // step:3 (creating the user)

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role: role
        });

        // step:4 (generating the token)

        const token = signToken(user);

        res.status(201).json({ token, user });

    }

    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// for login

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // step:1 (check if the user exists)

        const user = await User.findOne({
            email: email
        })

        if (!user) {

            return res.status(401).json({ message: "Invalid credentials" });
        }

        // step:2 (check if the password is correct)

        const ispasswordValid = await bcrypt.compare(password, user.password);

        if (!ispasswordValid) {

            return res.status(401).json({ message: "Invalid credentials" });
        }

        // step:3 (generate the token)

        const token = signToken(user);

        res.status(200).json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}



// Save or Update Address
exports.saveAddress = async (req, res) => {
    try {
        const userId = req.user.id; // assuming auth middleware sets `req.user`
        const { street, city, state, pincode } = req.body;

        if (!street || !city || !state) {
            return res.status(400).json({ message: "Street, city, and state are required." });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            {
                address: { street, city, state, pincode }
            },
            { new: true }
        );

        res.status(200).json({ message: "Address saved successfully", address: user.address });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get Address
exports.getAddress = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ address: user.address });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


