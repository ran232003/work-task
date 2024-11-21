const MyError = require("../models/MyError");
const Post = require("../models/post-schema");

const getPosts = async (req, res, next) => {
  try {
    console.log("getPosts");
    const posts = await Post.find({});
    return res.json({ status: "ok", data: posts });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
const getPostsSearch = async (req, res, next) => {
  try {
    console.log("getPostsSearch");
    const { search, sort, category, limit } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    // Build the sort object
    const sortOptions = {};
    if (sort === "Latest") {
      sortOptions.createdAt = -1; // Sort by date descending
    } else if (sort === "Oldest") {
      sortOptions.createdAt = 1; // Sort by title ascending
    }
    if (limit) {
      const queryLimit = limit ? parseInt(limit, 10) : 10;
    }
    // Query the database
    const posts = await Post.find(query).sort(sortOptions).limit(limit);

    // Send the response
    res.json({
      status: "ok",
      data: posts,
    });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
const deletePost = async (req, res, next) => {
  try {
    console.log("deletePost");
    const postId = req.params.id;
    const post = await Post.deleteOne({ _id: postId });
    const posts = await Post.find({});
    return res.json({ status: "ok", data: posts });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
const createPost = async (req, res, next) => {
  try {
    console.log("createPost", req.user, req.file, req.body);
    const { text, category, title } = req.body;
    let newImage = "http://localhost:5000/" + req.file.path.replace(/\\/g, "/");
    const post = new Post({
      category: category,
      title: title,
      content: text,
      userId: req.user.id,
      image: newImage,
    });
    await post.save();
    const posts = await Post.find({});
    return res.json({ status: "ok", posts });
  } catch (error) {
    console.log(error);
    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};
module.exports = {
  getPosts,
  deletePost,
  createPost,
  getPostsSearch,
};
