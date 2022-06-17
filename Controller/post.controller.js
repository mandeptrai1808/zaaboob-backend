const {posts, postimgaes, likes, comments, users} = require('../models')

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

const uploadPostImages = async (req, res) => {
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

const getPostById = async (req, res) => {
  const {id} = req.params;
  try {
    const postDetail = await posts.findOne({where: {id}});
    const listLike = await likes.findAll({where: {postId: id}});
    const listCmt= await comments.findAll({where: {postId: id}});
    const listImg = await postimgaes.findAll({where: {postId: id}});
    const ownOfPost = await users.findOne({where: {id: postDetail.userId}})
    res.send({postDetail,listImg, listLike, listCmt, ownOfPost});
  } catch (error) {
    res.status(500).send(error)
  }
}

const getPostByUserId = async (req, res) => {
  const {userId} = req.params;
  try {
    const listPost = await posts.findAll({where: {userId}});
    let result = [];
    listPost.map(async (item, index) => {
      const listLike = await likes.findAll({where: {postId: item.id}});
      const listCmt= await comments.findAll({where: {postId: item.id}});
      const listImg = await postimgaes.findAll({where: {postId: item.id}});
      const ownOfPost = await users.findOne({where: {id: item.userId}});
      result.push({postDetail: item, listImg, listLike, listCmt, ownOfPost});
      if (index === listPost.length - 1) res.send(result);
    })
    // res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}
module.exports = {
    createNewPost,
    deletePost,
    uploadPostImages,
    likeThisPost,
    unlikeThisPost,
    commentThisPost,
    deleteComment,
    getPostById,
    getPostByUserId
}