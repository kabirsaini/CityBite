const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
    const { credential, role } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, name, picture, sub: googleId } = payload;

        let user = await User.findOne({ email });

        if (!user) {
            if (!['vendor', 'customer'].includes(role)) {
                return res.status(400).json({ message: "Role must be 'vendor' or 'customer'" });
            }

            // Create user with selected role
            user = await User.create({
                name,
                email,
                profileImage: picture,
                password: null,
                isGoogleUser: true,
                role  //  Assign selected role
            });
        }

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({ token, user });

    } catch (err) {
        console.error("Google login error:", err);
        res.status(401).json({ message: "Google login failed" });
    }
};
