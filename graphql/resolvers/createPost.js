const validator = require("validator");
const User = require("../../models/user");
const Post = require("../../models/post");

module.exports = async function ({ postInput }, req) {
  const errors = [];

  if (!req.isAuth) {
    let error = new Error("User not authenticated");
    throw error;
  }

  if (validator.isEmpty(postInput.title)) {
    errors.push({ message: "Title is invalid!!" });
  }

  if (errors.length > 0) {
    let error = new Error("Invalid input.");
    error.data = errors;
    error.code = 422;
    throw error;
  }

  const user = await User.findById(req.userId);
  if (!user) {
    let error = new Error("User not found !!!");
    throw error;
  }

  const post = new Post({
    title: postInput.title,
    imageUrl: postInput.imageUrl,
    content: postInput.content,
    creator: user,
  });
  const isCreated = await post.save();
  user.posts.push(isCreated);
  await user.save();
  if (!isCreated) {
    let error = new Error("Post not created!!");
    throw error;
  }
  return {
    ...isCreated._doc,
    id: isCreated._id.toString(),
    createdAt: isCreated.createdAt.toISOString(),
    updatedAt: isCreated.updatedAt.toISOString(),
  };
};
