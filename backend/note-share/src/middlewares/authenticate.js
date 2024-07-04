const tokenService = require("../services/token.service");
const userService = require("../services/user.service");
const CustomError = require("../utils/CustomError");

const authenticate = async (req, _res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  try {
    const decoded = tokenService.verifyToken({ token });
    const user = await userService.findUserByEmail(decoded.email);

    if (!user) {
      next(new CustomError(401, "Unauthorized"));
    }

    req.user = { ...user._doc, id: user._id };
    next();
  } catch (e) {
    next(new CustomError(401, "Unauthorized"));
  }
};

module.exports = authenticate;
