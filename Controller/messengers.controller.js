const {messengers, users} = require('../models');

const createNewMessenger = async (req, res) => {
  const {roomId, content,status, userSendId} = req.body;
  try {
    const newMess = await messengers.create({
        roomId,
        content,
        status,
        userSendId
    })
    res.status(201).send(newMess)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getMessagesByRoomId = async (req, res) => {
  const {roomId} = req.params;
  try {
    let data = await messengers.findAll({where: {roomId}});
    if (data.length == 0) 
    res.send(data);
    data.map( async (item, index) => {
      let userSend = await users.findOne({where: {id: item.userSendId}});
      data[index] = {content:data[index], userSend};
      if (index == data.length-1) res.send(data);
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

const sendImageMessage = async (req, res) => {
  const { file } = req;
    const pathImg = `http://localhost:6969/${file.path}`;
    const {roomId, userSendId} = req.params;
    try {
    
        const newImageMess = await messengers.create({
            roomId,
            content: pathImg,
            status: "IMAGE",
            userSendId
        })
        res.status(201).send(newImageMess);
    } catch (error) {
        res.status(500).send(error)
    }
}
module.exports = {
    createNewMessenger,
    getMessagesByRoomId,
    sendImageMessage
}