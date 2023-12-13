const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { error } = require('console');

//register new user
// @routes/user/register
// @access Public
const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    //
    if (!name || !email || !password) {
        // return res.status(400).json({ message: 'Please include all fields' });
        res.status(400);
        throw new Error('please include all fields');
    }
    //  find user if it exists
    const userExists = await User.findOne({ email });
    //  if user already exist show error msg
    if (userExists) {
        res.status(400);
        throw new Error('User aldready exists');
    }
    //  cript or hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            toke: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new error('invalid credentials');
    }
});
//
//Login user
// @routes/user/login
// @access Public
const userLogins = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            toke: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid Credentials');
    }
});

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '90d' });
};

//
//
module.exports = {
    userRegister,
    userLogins,
    getMe,
};
