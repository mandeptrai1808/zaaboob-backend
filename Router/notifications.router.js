const express = require('express');
const { createNewNotification, deleteNotification, getNotificationByUserId, deleteNotificationsByUserId } = require('../Controller/notifications.controller');
const notificationRouter = express.Router();

notificationRouter.post("/create", createNewNotification)
notificationRouter.delete("/delete/:id", deleteNotification)
notificationRouter.get("/byuser/:userId", getNotificationByUserId)
notificationRouter.delete("/deletebyuser/:userId", deleteNotificationsByUserId)
module.exports = {
    notificationRouter
}