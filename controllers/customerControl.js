const Customer  = require("../models/customer");
const errorResponse  = require("../errors/errorResponse");

const {
  createToken,
  verifyUser,
  confirmPassword,
} = require("../middleware/auth");

const tokenAge = 100 * 60 * 60 * 24; // 24 hour

//Customer login
module.exports.get_login = (req, res) => {

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

  const pass = confirmPassword(password, user.password);

  if (!pass) {
    res.json({
      status: 404,
      message: " Password incorrect, please try again  ",
    });
  }

  const verifyToken = verifyUser(req.headers.cookie);

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
    const newUser = await Customer.create({ email, password });

    const token = createToken(newUser._id);

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
      error: errorResponse(err),
    });
  }
  };








// const { Customer } = require("../models/customer");
// const errorResponse = require("../errors/errorResponse");
// const {
//   createToken,
//   verifyUser,
//   confirmPassword,
// } = require("../middleware/auth");

// const tokenAge = 100 * 60 * 60 * 24; // 24 hours

// // Customer login
// module.exports.get_login = async (req, res) => {
//   if (req.headers.cookie) {
//     res.json({
//       status: 200,
//       message: "Logged in successfully.",
//     });
//   } else {
//     res.json({
//       status: 404,
//       message: "Please log in first.",
//     });
//   }
// };

// module.exports.post_login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await Customer.findOne({ email });

//   if (!user) {
//     res.json({
//       status: 404,
//       message: "User not found. Please register first.",
//     });
//     return;
//   }

//   const pass = confirmPassword(password, user.password);

//   if (!pass) {
//     res.json({
//       status: 404,
//       message: "Password incorrect. Please try again.",
//     });
//     return;
//   }

//   const verifyToken = verifyUser(req.headers.cookie);

//   if (verifyToken) {
//     res.json({
//       status: 200,
//       message: "User logged in successfully.",
//     });
//   } else {
//     res.json({
//       status: 404,
//       message: "Please register first.",
//     });
//   }
// };

// module.exports.get_logout = async (req, res) => {
//   const cookie = req.headers.cookie;
//   if (cookie) {
//     res.clearCookie(cookie);
//     res.json({
//       status: 200,
//       message: "User logged out successfully.",
//       cookie: "Cookie destroyed.",
//     });
//   } else {
//     res.json({
//       status: 404,
//       message: "User is not logged in.",
//     });
//   }
// };

// module.exports.post_register = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const newUser = await Customer.create({ email: email, password: password });

//     const token = createToken(newUser._id);

//     res.cookie("jwt", token, {
//       maxAge: tokenAge,
//     });

//     res.json({
//       status: 201,
//       message: "Registered successfully. Please log in.",
//     });
//   } catch (err) {
//     res.json({
//       status: 404,
//       message: "Couldn't register user.",
//       error: errorResponse(err),
//     });
//   }
// };
