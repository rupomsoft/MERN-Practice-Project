const tokenService = require("./token.service");
const userService = require("./user.service");
const hashing = require("../utils/hashing");
const CustomError = require("../utils/CustomError");

const register = async ({ name, email, password }) => {
  const hasUser = await userService.userExist(email);

  if (hasUser) {
    throw new CustomError(400, "User already exist");
  }

  password = await hashing.generateHash(password);
  const user = await userService.createUser({ name, email, password });

  return user;
};

const login = async ({ email, password }) => {
  const user = await userService.findUserByEmail(email);
  if (!user) {
    throw new CustomError(401, "Invalid Credentials");
  }

  const matched = await hashing.hashMatched(password, user.password);
  if (!matched) {
    throw new CustomError(401, "Invalid Credentials");
  }

  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return tokenService.generateToken({ payload });
};

module.exports = {
  register,
  login,
};
