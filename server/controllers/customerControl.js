const { Customer } = require("../models/customer");
const { errorResponse } = require("../errors/errorResponse");
const { successResponse } = require("../succes_handler/success");
const {
  createToken,
  verifyUser,
  confirmPassword,
} = require("../middleware/auth");

const tokenAge = 100 * 60 * 60 * 24; // 24 hour

//Customer login

module.exports.get_login = async (req, res) => {
  if (req.headers.cookie) {
    res.json({
      status: 200,
      message: "Login successfully logged in..",
    });
  }

  res.json({
    status: 404,
    message: "Please login in first ",
  });
};

module.exports.post_login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Customer.findOne({ email });

  const pass = auth.confirmPassword(password, user.password);

  if (!pass) {
    res.json({
      status: 404,
      message: " Password incorrect, please try again  ",
    });
  }

  const verifyToken = auth.verifyUser(req.headers.cookie);

  if (verifyToken) {
    res.json({
      status: 200,
      message: "User successfully logged in...",
    });
  }
  res.json({
    status: 404,
    message: "please register first ",
  });
};

module.exports.get_logout = async (req, res) => {
  const cookie = req.headers.cookie;
  if (cookie) {
    res.clearCookie(cookie);
    res.json({
      status: 200,
      message: "User logged out successfully",
      cookie: " cookie destroyed",
    });
  }
  console.log("User logged out successfully");
};

module.exports.post_register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await Customer.create({ email: email, password: password });

    const token = auth.createToken(newUser._id);

    res.cookie("jwt", token, {
      maxAge: tokenAge,
    });

    res.json({
      status: 201,
      message: "Registered, please login ",
      // error: handleErrors.errorMessage()
    });
  } catch (err) {
    res.json({
      status: 404,
      message: "couldn't register user",
      error: handleErrors.errorResponse(err),
    });
  }
};
