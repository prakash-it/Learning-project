const Usermodel = require('../models/usresmodels');
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');
const { sendVerificationEmail, sendWelcomeEmail } = require('../Mailtrap/emails'); 

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userAlreadyExists = await Usermodel.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new Usermodel({
            username,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });

        await user.save();

        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            message: 'User created successfully',
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const verifyEmail = async (req, res) => {
    const { code } = req.body;

    try {
        const user = await Usermodel.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or Expired verification code" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

        await sendWelcomeEmail(user.email, user.username);

        res.status(200).json({
            message: "Verification is Successful",
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    res.send("login route");
};

const logout = async (req, res) => {
    res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

module.exports = { signup, login, logout, verifyEmail };
