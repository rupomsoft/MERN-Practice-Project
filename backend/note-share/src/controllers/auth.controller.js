const authService = require("../services/auth.service");
const tokenService = require("../services/token.service");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const accessToken = await authService.login({ email, password });

    const response = {
      code: 200,
      message: "Login successful",
      data: {
        access_token: accessToken,
      },
      links: {
        self: req.url,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await authService.register({ name, email, password });

    // generate access token
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const accessToken = tokenService.generateToken({ payload });

    // response
    const response = {
      code: 201,
      message: "Signup successful",
      data: {
        access_token: accessToken,
      },
      links: {
        self: req.url,
        login: "/auth/login",
      },
    };

    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
};
