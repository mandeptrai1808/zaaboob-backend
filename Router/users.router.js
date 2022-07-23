const express = require('express');
const { updatePostStatus } = require('../Controller/post.controller');
const { registerUser, loginUser, updateUser, uploadAvatar, addFriend, unFriend, loginWithFacebook, getAllUser, findUserByName, sendRequestAddFriend, deleteRequestAddFriend, getRequestHasSendByUserId, getRequestHasGetByUserId, getUserByUserId } = require('../Controller/users.controller');
const { authenticate } = require('../Middleware/Auth/authenticate');
const { uploadImg } = require('../Middleware/Upload/uploadImg');
const userRouter = express.Router();


userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.put('/update/:id', updateUser)
userRouter.post("/upload-avatar/:id", uploadImg("Avatar"), uploadAvatar)
userRouter.post("/addfriend", addFriend);
userRouter.delete("/unfriend", unFriend)
userRouter.post("/loginfacebook", loginWithFacebook)
userRouter.get("/getall/", getAllUser)
userRouter.get("/finduser/:name", findUserByName)
userRouter.post("/sendrequest", sendRequestAddFriend)
userRouter.delete("/deleterequest", deleteRequestAddFriend)
userRouter.get("/request-has-send/:userSend", getRequestHasSendByUserId)
userRouter.get("/request-has-get/:userGet", getRequestHasGetByUserId)
userRouter.get("/user/:id", getUserByUserId)
module.exports = {
    userRouter
}