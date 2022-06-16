const {posts, postimgaes, likes, comments} = require('../models')

const createNewPost = async (req, res) => {
  const {userId, status, content} = req.body;
  try {
    const newPost = await posts.create({userId, status, content});
    res.status(201).send(newPost)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deletePost = async (req, res) => {
  const {id} = req.params;
  try {
    await posts.destroy({where: {id}})
    res.send("Deleted!")
  } catch (error) { 
    res.status(500).send(error)
  }
}

const uploadPostImages =async (req, res) => {
    const { file } = req;
    const pathImg = `http://localhost:6969/${file.path}`;
    const {postId} = req.params;
    try {
        const newImage = await postimgaes.create({
            linkImg: pathImg,
            postId
        })
        res.status(201).send(newImage);
    } catch (error) {
        res.status(500).send(error)
    }
}

const likeThisPost = async (req, res) => {
  const {userId, postId} = req.body;
  try {
    const newConnection = await likes.create({userId, postId})
    res.status(202).send(newConnection);
  } catch (error) {
    res.status(500).send(error)
  }
}

const unlikeThisPost = async (req,res) => {
  const {userId, postId} = req.body;
  try {
    await likes.destroy({where: {userId, postId}});
    res.send("DELETED!")
  } catch (error) {
    res.status(500).send(error);
  }
}

const commentThisPost = async (req, res) => {
  const {userId, postId, content} = req.body;
  try {
    const newConnection = await comments.create({
      userId, postId, content
    })
    res.status(201).send(newConnection)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteComment = async (req, res) => {
  const {id} = req.params;
  try {
    await comments.destroy({where: {id}})
    res.send("deleted!")
  } catch (error) {
    res.status(500).send(error);
  }
}
module.exports = {
    createNewPost,
    deletePost,
    uploadPostImages,
    likeThisPost,
    unlikeThisPost,
    commentThisPost,
    deleteComment
}