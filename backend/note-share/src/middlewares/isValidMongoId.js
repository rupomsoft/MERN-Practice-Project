const CustomError = require("../utils/CustomError");

const isValidId = (req, _res, next) => {
  if (!req.params.id) {
    throw next(new CustomError(400));
  }

  var mongoValidIdReg = /^[0-9a-fA-F]{24}$/;

  if (req.params.id.match(mongoValidIdReg)) {
    next();
  } else {
    throw next(new CustomError(400, "invalid params id"));
  }
};

module.exports = {
  isValidId,
};
