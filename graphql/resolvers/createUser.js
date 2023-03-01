const User = require("../../models/user");
const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = async function ({ userInput }, req) {
  const user = await User.findOne({ email: userInput.email });
  const errors = [];

  if (!validator.isEmail(userInput.email)) {
    errors.push({ message: "Email is invalid" });
  }

  if (
    validator.isEmpty(userInput.password) ||
    !validator.isLength(userInput.password, { min: 5 })
  ) {
    errors.push({ message: "Password too short!" });
  }

  if (errors.length > 0) {
    let error = new Error("Invalid input.");
    error.data = errors;
    error.code = 422;
    throw error;
  }

  if (user) {
    throw new Error("User already exists!!!");
  }
  const hashedPwd = await bcrypt.hash(userInput.password, 12);
  const newUser = new User({
    email: userInput.email,
    name: userInput.name,
    password: hashedPwd,
  });

  const createdUser = await newUser.save();

  return {
    ...createdUser._doc,
    id: createdUser._id.toString(),
  };
};
