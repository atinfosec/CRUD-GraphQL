//resolvers
const login = require("./resolvers/login");
const createUser = require("./resolvers/createUser");
const createPost = require("./resolvers/createPost");
const getPosts = require("./resolvers/getPosts");
const getSinglePost = require("./resolvers/getSinglePost");
const updatePost = require("./resolvers/updatepost");
const deletePost = require("./resolvers/deletePost");

module.exports = {
  createUser,
  login,
  createPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
};
