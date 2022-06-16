const {users} = require('../models');
const bcrypt = require('bcryptjs');
const jsonwt = require('jsonwebtoken')

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
  
const uploadAvatar= async (req, res) => {
    const { file } = req;
    const pathImg = `http://localhost:6969/${file.path}`;
    const { email } = req.user;
    const foundUser = await users.findOne({ where: { email } });
    // foundUser.avatar = pathImg;
    // await foundUser.save();

    await users.update({avatar: pathImg}, {where: {email}});
    
    res.send({ msg: "Da upload avatar", file: pathImg, user: foundUser });
    // res.send({file: file, body: req.body});
}



module.exports = {
    registerUser,
    loginUser,
    updateUser,
    uploadAvatar
}