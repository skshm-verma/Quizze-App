const User = require('../models/User');
const statusCodes = require('../utils/constants');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/tokenGenerator');
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors/error')

// NOTE: I HAVE HANDLED All ERRORS GLOBALLY AT ERROR-HANDLER MIDDLEWARE

const userSignUp = async (req, res) => {

    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) throw new BadRequestError('User already exist with this email');
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name: name.trim(),
        email: email.trim(),
        password: hashedPassword,
    })
    await newUser.save();
    const token = generateToken(newUser._id.toString(), newUser.name);
    res.status(statusCodes.CREATED).json({ message: "SUCCESS", name: newUser.name, email: newUser.email, token });
}

const userSignIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new NotFoundError('Invalid Email');
    }

    const verifyingPassword = await bcrypt.compare(password, user.password)
    if (!verifyingPassword) {
        throw new UnauthenticatedError('Invalid Password');
    }
    const token = generateToken(user._id.toString(), user.name);

    res.status(statusCodes.OK).json({ message: { status: "SUCCESS", email: user.email }, token });
}


const verifyUser = async (req, res) => {

    const userId = req.userId;
    const userName = req.userName;
    const user = await User.findById(userId);
    if (!user) {
        throw new UnauthenticatedError('Token Malfunctioned');
    }

    if (user._id.toString() !== userId) {
        throw new UnauthenticatedError("Permissons didn't matched");
    }

    res.status(statusCodes.OK).json({ userName, userId });
}

module.exports = { userSignUp, userSignIn, verifyUser }