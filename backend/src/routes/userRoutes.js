const express = require('express')
const userRouter = express.Router();
const { userSignUp, userSignIn, verifyUser} = require('../controllers/userControllers');
const verifyToken = require('../middlewares/verifyToken');

userRouter.post('/signUp', userSignUp);   // domain/v1/user/signUp
userRouter.post('/signIn', userSignIn);   // domain/v1/user/signIn
userRouter.get('/verify', verifyToken, verifyUser);

module.exports = userRouter;