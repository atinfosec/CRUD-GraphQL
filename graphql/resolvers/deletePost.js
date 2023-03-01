const Post = require("../../models/post");
const User = require("../../models/user");

module.exports = async function ({ id }, req) {
  if (!req.isAuth) {
    let error = new Error("User not authenticated!!!");
    error.code = 401;
    throw error;
  }
  const post = await Post.findById(id).populate("creator");

  if (!post) {
    let error = new Error("Post not found");
    error.code = 404;
    throw error;
  }

  if (req.userId.toString() !== post.creator._id.toString()) {
    let error = new Error("You are not authorized to delete this post");
    error.code = 403;
    throw error;
  }

  const DeletedPost = await Post.findByIdAndDelete(id);
  const user = await User.findById(req.userId);
  user.posts.pull(id);
  await user.save();

  return {
    message: "Post Deleted Successfully!!!",
    _id: DeletedPost._id,
  };
};
