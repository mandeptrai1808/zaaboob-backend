const express = require('express');
const { chatHistoriesRouter } = require('./chatHistories.router');
const { messengerRouter } = require('./messengers.router');
const { notificationRouter } = require('./notifications.router');
const { postRouter } = require('./posts.router');
const { userRouter } = require('./users.router');
const rootRouter = express.Router();

rootRouter.use('/users', userRouter)
rootRouter.use('/posts', postRouter)
rootRouter.use('/notifications', notificationRouter)
rootRouter.use('/chat-histories', chatHistoriesRouter)
rootRouter.use('/messengers', messengerRouter)
module.exports = {
    rootRouter
}