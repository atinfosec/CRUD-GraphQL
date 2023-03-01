const Post = require("../../models/post");

module.exports = async function ({ id }, req) {
  const post = await Post.findById(id).populate("creator");
  if (!post) {
    let error = new Error("No post found");
    throw error;
  }

  return {
    _id: post._id.toString(),
    title: post.title,
    content: post.content,
    imageUrl: post.imageUrl,
    creator: post.creator,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
};
