const {chathistories, users, messengers} = require('../models')

const pushHistory = async (req, res) => {
  const {userId, friendId} = req.body;
  try {
    await chathistories.destroy({where: {userId, friendId}})
    const newHistory = await chathistories.create({userId, friendId});
    res.status(201).send(newHistory)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getListHistoryByUserId = async (req, res) => {
  const {userId} = req.params;
  try {
    let data = await chathistories.findAll({where: {userId}});
    if (data.length == 0) 
    res.send(data);
    data.map(async (item, index) => {
      let friendData = await users.findOne({where: {id: item.friendId}});
      let lastMess = await messengers.findAll({where: {roomId: parseInt(userId) + item.friendId}});
      lastMess = lastMess[lastMess.length - 1];
      friendData = {id: friendData.id,name: friendData.name, email: friendData.email,avatar: friendData.avatar, index: item.id, lastMess}
      data[index] = friendData
      if (index == data.length-1) res.send(data);
    })
  } catch (error) {
    res.status(500).send(error);    
  }
}

module.exports = {
    pushHistory,
    getListHistoryByUserId
}