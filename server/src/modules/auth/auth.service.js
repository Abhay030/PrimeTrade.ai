const User = require("../../models/User");
const { signToken } = require("../../utils/jwt");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email already registered");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({ name, email, password });
  const token = signToken(user._id);

  return { user, token };
};

const loginUser = async ({ email, password }) => {
  // Explicitly select password since it's excluded by default
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = signToken(user._id);

  return { user, token };
};

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
};

module.exports = { registerUser, loginUser, getCurrentUser };
