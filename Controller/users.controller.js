const {users, friends, requestfriend} = require('../models');
const bcrypt = require('bcryptjs');
const jsonwt = require('jsonwebtoken')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const registerUser = async (req, res) => {
    const { name,email, phone, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
  try {
    const avatar = 'https://cdn.memes.com/profilepics/26946701617040571/imageThumb/1617040787_thumb.jpg'
    const newUser = await users.create({
        name,
        email,
        phone,
        password: hashPassword,
        avatar
    })

    res.status(201).send(newUser);
    
  } catch (error) {
    res.status(500).send(error)
  }  
}

const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try {
      const userFind = await users.findOne({where: {email}});
      if (userFind){
        const isLogin = bcrypt.compareSync(password, userFind.password);
        if (isLogin){
            const token = jsonwt.sign({email: userFind.email, id: userFind.id}, "mandeptrai30cm", {expiresIn: 60*60*24});
            res.send({msg:"Login success!",userFind, token})
        }
        else res.status(400).send("Password incorrect!");
      } 
      else res.status(400).send("Email not found!")
    
    } catch (error) {
        res.status(500).send(error);
    }
  }

const getUserByUserId = async (req, res) => {
  const {id} = req.params;
  try {
    let data = await users.findOne({where: {id}})
    res.send(data);
  } catch (error) {
    res.status(500).send(error);    
  }
}
const updateUser = async (req, res) => {
    const {name, phone, avatar} = req.body;
    const {id} = req.params;
    try {
      if(name) await users.update({name}, {where: {id}});
      if(phone) await users.update({phone}, {where: {id}});
      if(avatar) await users.update({avatar},{where: {id}})
      const userFind = await users.findOne({where: {id}});
      res.send({msg: "Updated!", userFind});
        
    } catch (error) {
      res.status(500).send(error);
    }
  }
  
const getAllUser = async (req, res) => {
  // const {userId} = req.params;
  try {
    // let result = []
    let userlist = await users.findAll();
    if (userlist.length == 0) res.send([]);
    userlist.map( async (item, index) => {
      let listFriends = await friends.findAll({where: {userId: item.id}});
      userlist[index] = {user: userlist[index], listFriends};
      if (userlist.length - 1  === index) res.send(userlist)
      // result.push({...item,listFriends});

      // res.send(result);
    })
    // res.send(result);
  } catch (error) {
    res.status(500).send(error)
  }
}

const findUserByName = async (req, res) => {
  const {name} = req.params;
  console.log(name)
  try {
    let userlist = await users.findAll({where: {name: {[Op.like]: `%${name}%`}}});
    if (userlist.length == 0) res.send([]);
    userlist.map( async (item, index) => {
      let listFriends = await friends.findAll({where: {userId: item.id}});
      userlist[index] = {user: userlist[index], listFriends};
      if (userlist.length - 1  === index) res.send(userlist)
    })
  } catch (error) {
    res.status(500).send(error)
    
  }
}
const uploadAvatar= async (req, res) => {
    const { file } = req;
    const pathImg = `http://localhost:6969/${file.path}`;
    const { id } = req.params;
    // foundUser.avatar = pathImg;
    // await foundUser.save();
    
    await users.update({avatar: pathImg}, {where: {id}});
    const foundUser = await users.findOne({ where: { id } });
    
    res.send({ msg: "Da upload avatar", file: pathImg, user: foundUser });
    // res.send({file: file, body: req.body});
}

const addFriend = async (req, res) => {
  const {userId, friendId} = req.body;
  try {
    const newConect1 = await friends.create({userId, friendId});
    const newConect2 = await friends.create({userId: friendId, friendId: userId});
    res.status(201).send({newConect1, newConect2});
  } catch (error) {
    res.status(500).send(error)
  }
}

const unFriend = async (req, res) => {
  const {userId, friendId} = req.body;

  try {
    await friends.destroy({where: {userId, friendId}});
    await friends.destroy({where: {userId: friendId, friendId: userId}});
    res.send("deleted!")
  } catch (error) {
    res.status(500).send(error)
  }
}

const loginWithFacebook = async (req, res) => {
  const {name, avatar, email} = req.body;
  try {
    const userFind = await users.findOne({where: {email}});
    if (!userFind) {
      const newUser = await users.create({
        name, avatar, email, phone: 696969
      })
      res.status(201).send(newUser);
    }
    else res.send(userFind);
    
  } catch (error) {
    res.status(500).send(error);
  }
}

const sendRequestAddFriend = async (req, res) => {
  const {userGet, userSend, content} = req.body;
  try {
    let newRequest = await requestfriend.create({userGet, userSend, content});
    res.status(201).send(newRequest);
  } catch (error) {
    res.status(500).send(error);
  }
}

const deleteRequestAddFriend = async (req, res) => {
  // const {id} = req.params;
  const {userGet, userSend} = req.body;

  try {
    await requestfriend.destroy({where: {userGet, userSend}});
    res.send("DELETED!");
  } catch (error) {
    res.status(500).send(error)
  }
}

const getRequestHasSendByUserId = async (req, res) => {
  const {userSend} = req.params;
  try {
    let data = await requestfriend.findAll({where: {userSend}});
    res.send(data);
  } catch (error) {
    res.send(error)    
  }
}

const getRequestHasGetByUserId = async (req, res) => {
  const {userGet} = req.params;
  try {
    let data = await requestfriend.findAll({where: {userGet}});
    if (data.length == 0) res.send([]);
    data.map( async (item, index) => {
      let userInfo = await users.findOne({where: {id: item.userSend}});
      data[index] = {user: userInfo, content: item.content};
      if (data.length - 1  === index) res.send(data)
      // result.push({...item,listFriends});

      // res.send(result);
    })
  } catch (error) {
    res.status(500).send(error)
  }
}
module.exports = {
    registerUser,
    loginUser,
    updateUser,
    uploadAvatar,
    addFriend,
    unFriend,
    loginWithFacebook,
    getAllUser,
    findUserByName,
    sendRequestAddFriend,
    deleteRequestAddFriend,
    getRequestHasSendByUserId,
    getRequestHasGetByUserId,
    getUserByUserId
}