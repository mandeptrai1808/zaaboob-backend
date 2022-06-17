const express = require('express');
const { registerUser, loginUser, updateUser, uploadAvatar, addFriend, unFriend, loginWithFacebook } = require('../Controller/users.controller');
const { authenticate } = require('../Middleware/Auth/authenticate');
const { uploadImg } = require('../Middleware/Upload/uploadImg');
const userRouter = express.Router();


userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.put('/update', updateUser)
userRouter.post("/upload-avatar", authenticate, uploadImg("Avatar"), uploadAvatar)
userRouter.post("/addfriend", addFriend);
userRouter.delete("/unfriend", unFriend)
userRouter.post("/loginfacebook", loginWithFacebook)
module.exports = {
    userRouter
}