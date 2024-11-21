const MyError = require("../models/MyError");
const Comment = require("../models/comment-schema");

const getComments = async (req, res, next) => {
  try {
    console.log("getComments");
    const comments = await Comment.find({});
    return res.json({ status: "ok", data: comments });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
const getPostComments = async (req, res, next) => {
  try {
    console.log("getPostComments");
    const postId = req.params.id;
    const comments = await Comment.find({ postId: postId })
      .populate("userId", "userName email image")
      .exec();
    return res.json({ status: "ok", data: comments });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
const deleteComment = async (req, res, next) => {
  try {
    console.log("deleteComment");
    const commentId = req.params.id;
    const comment = await Comment.deleteOne({ _id: commentId });
    const comments = await Comment.find();

    return res.json({ status: "ok", data: comments });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
const addRemoveLike = async (req, res, next) => {
  try {
    console.log("addRemoveLike", req.user, req.body);
    const { commentId, like } = req.body;
    let data;
    if (like) {
      //add like
      data = await Comment.findByIdAndUpdate(
        { _id: commentId },
        { $push: { likes: req.user.id } },
        { new: true }
      );
    } else {
      data = await Comment.findByIdAndUpdate(
        { _id: commentId },
        { $pull: { likes: req.user.id } },
        { new: true }
      );
    }
    console.log(data);
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
const addPostComment = async (req, res, next) => {
  try {
    console.log("addPostComment", req.user);
    const { comment, postId } = req.body;
    console.log("content, postId, userId", comment, postId);
    const newComment = new Comment({
      userId: req.user.id,
      postId: postId,
      content: comment,
    });
    await newComment.save();
    const comments = await Comment.find({ postId: postId });
    return res.json({ status: "ok", data: comments });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
const editComment = async (req, res, next) => {
  try {
    console.log("editComment", req.user);
    const { commentId, content, postId } = req.body;
    console.log(commentId, content, postId);
    await Comment.updateOne({ _id: commentId }, { $set: { content: content } });
    const comments = await Comment.find({ postId: postId });

    return res.json({ status: "ok", data: comments });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
module.exports = {
  getComments,
  deleteComment,
  getPostComments,
  addPostComment,
  addRemoveLike,
  editComment,
};
