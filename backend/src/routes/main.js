const express = require('express')
const router = express.Router();
const userRouter = require("./userRoutes");
const workspaceRouter = require('./quizRoutes');


router.use('/user', userRouter);  // domain/v1/user
// router.use('/workspace', workspaceRouter);  // domain/v1/workspace

module.exports = router;