const express = require('express');
const { pushHistory, getListHistoryByUserId } = require('../Controller/chathistories.controller');
const chatHistoriesRouter= express.Router();

chatHistoriesRouter.post('/push', pushHistory)
chatHistoriesRouter.get('/getbyuser/:userId', getListHistoryByUserId)

module.exports = {
    chatHistoriesRouter
}