const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async function ({ email, password }) {
  const user = await User.findOne({ email: email });
  if (!user) {
    let error = new Error("User not found!!");
    error.code = 401;
    throw error;
  }
  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    const error = new Error("Wrong password entered!!");
    error.code = 401;
    throw error;
  }
  const token = jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
    },
    "SomeSuperSecret",
    { expiresIn: "1h" }
  );
  return {
    token: token,
    userId: user._id.toString(),
  };
};
