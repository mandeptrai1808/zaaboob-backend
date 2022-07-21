const express = require('express');
const { createNewMessenger, getMessagesByRoomId, sendImageMessage, seenMessageByRoomId } = require('../Controller/messengers.controller');
const { uploadImg } = require('../Middleware/Upload/uploadImg');
const messengerRouter = express.Router();

messengerRouter.post('/create', createNewMessenger)
messengerRouter.get('/getmessage/:roomId' ,getMessagesByRoomId)
messengerRouter.post('/sendimage/:roomId/:userSendId',uploadImg('MessImage'), sendImageMessage)
messengerRouter.put('/seenmess/:roomId/:userId', seenMessageByRoomId)
module.exports = {
    messengerRouter
}