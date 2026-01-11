const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 
// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// @desc Signup new user
// @route POST /api/auth/signup
// @access Public
exports.signup = async (req, res) => {
    const { name, email, phone, password, role } = req.body;
    try {
        console.log("Signup request body:", req.body);

        const existingUser = await User.findOne({ email });
        console.log("Existing user:", existingUser);

        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const user = await User.create({ name, email, phone, password, role });
        console.log("User created:", user);

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        console.log("Token generated:", token);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token,
        });
    } catch (error) {
        console.error("Signup error:", error); // 🔥 prints exact error
        res.status(500).json({ message: error.message });
    }
};


// @desc Login user
// @route POST /api/auth/login
// @access Public
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
