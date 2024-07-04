const User = require("../models/user.model");
const CustomError = require("../utils/CustomError");

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user ? user : false;
};

const userExist = async (email) => {
  const user = await findUserByEmail(email);
  return user ? true : false;
};

const createUser = async ({ name, email, password }) => {
  if (!name || !email || !password)
    throw new CustomError(400, "Invalid parameters");

  const user = new User({ name, email, password });
  await user.save();

  return { ...user._doc, id: user._id };
};

module.exports = {
  userExist,
  findUserByEmail,
  createUser,
};
