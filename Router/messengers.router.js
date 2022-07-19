const express = require('express');
const { createNewMessenger, getMessagesByRoomId, sendImageMessage } = require('../Controller/messengers.controller');
const { uploadImg } = require('../Middleware/Upload/uploadImg');
const messengerRouter = express.Router();

messengerRouter.post('/create', createNewMessenger)
messengerRouter.get('/getmessage/:roomId' ,getMessagesByRoomId)
messengerRouter.post('/sendimage/:roomId/:userSendId',uploadImg('MessImage'), sendImageMessage)
module.exports = {
    messengerRouter
}