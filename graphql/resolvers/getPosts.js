const Post = require("../../models/post");

module.exports = async function ({ page }, req) {
  if (!req.isAuth) {
    let error = new Error("User not authenticated");
    throw error;
  }

  if (!page) {
    page = 1;
  }

  let perPage = 2; // you want 2 post per page

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .populate("creator");
  const totalPosts = await Post.find().countDocuments();

  return {
    posts: posts.map((p) => {
      return {
        ...p._doc,
        _id: p._id.toString(),
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      };
    }),
    totalPosts: totalPosts,
  };
};
