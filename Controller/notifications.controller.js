const {notifications, users} = require("../models")

const createNewNotification = async (req, res) => {
  const {userId, content,status, userSendId, postId} = req.body;
  try {
    const newNotification = await notifications.create({
        userId, content, userSendId, status, postId
    })
    res.status(201).send(newNotification);
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteNotification = async (req, res) => {
  const {id} = req.params;
  try {
    await notifications.destroy({where: {id}});
    res.send("Deleted!")
  } catch (error) {
    res.status(500).send(error)
  }
}

const getNotificationByUserId = async (req, res) => {
  const {userId} = req.params;
  try {
    let data = await notifications.findAll({where: {userId}});
    if (data.length === 0) res.send(data);
    data.map( async (item, index) => {
      let userSend = await users.findOne({where: {id: item.userSendId}})
      data[index] = {id:item.id,content: item.content, status: item.status,postId: item.postId, userSend}
      if (index === data.length - 1) res.send(data)
    })
  } catch (error) {
    res.status(500).send(error);    
  }
}

const deleteNotificationsByUserId = async (req, res) => {
  const {userId} = req.params;
  try {
    await notifications.destroy({where: {userId}});
    res.send("Deleted!");
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
    createNewNotification,
    deleteNotification,
    getNotificationByUserId,
    deleteNotificationsByUserId
}