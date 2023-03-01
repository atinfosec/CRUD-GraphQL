const Post = require("../../models/post");

module.exports = async function ({ postInput }, req) {
  if (!req.isAuth) {
    let error = new Error("User not authenticated!!!");
    error.code = 401;
    throw error;
  }

  const post = await Post.findById(postInput.id).populate("creator");
  if (!post) {
    let error = new Error("Post not found");
    error.code = 404;
    throw error;
  }

  if (req.userId.toString() !== post.creator._id.toString()) {
    let error = new Error("You are not authorized to update this post");
    error.code = 403;
    throw error;
  }

  post.title = postInput.title;
  post.content = postInput.content;
  post.imageUrl = postInput.imageUrl;
  post.updatedAt = new Date().now;

  const updatedPost = await post.save();

  return {
    ...updatedPost._doc,
    createdAt: updatedPost.createdAt.toISOString(),
    updatedAt: updatedPost.updatedAt.toISOString(),
  };
};
