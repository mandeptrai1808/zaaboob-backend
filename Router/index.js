const express = require('express');
const { postRouter } = require('./posts.router');
const { userRouter } = require('./users.router');
const rootRouter = express.Router();

rootRouter.use('/users', userRouter)
rootRouter.use('/posts', postRouter)
module.exports = {
    rootRouter
}