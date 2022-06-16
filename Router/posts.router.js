const express = require('express');
const { createNewPost, deletePost, uploadPostImages, likeThisPost, unlikeThisPost, commentThisPost, deleteComment } = require('../Controller/post.controller');
const { uploadImg } = require('../Middleware/Upload/uploadImg');
const postRouter  = express.Router();

postRouter.post("/newpost", createNewPost)
postRouter.delete('/delete/:id', deletePost)
postRouter.post("/upload-image/:postId", uploadImg("PostImage"), uploadPostImages)
postRouter.post("/likepost", likeThisPost)
postRouter.delete("/unlikepost", unlikeThisPost)
postRouter.post("/comment", commentThisPost)
postRouter.delete("/deletecomment/:id", deleteComment)
module.exports = {
    postRouter
}