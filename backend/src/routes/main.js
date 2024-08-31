const express = require('express')
const router = express.Router();
const userRouter = require("./userRoutes");
const quizRouter = require('./quizRoutes');


router.use('/user', userRouter);  // domain/v1/user
router.use('/quiz', quizRouter);

module.exports = router;