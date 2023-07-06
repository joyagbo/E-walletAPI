const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const maxAge = 1000 * 60 * 60 * 24; // 24 hours

let message = "";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE, {
    expiresIn: maxAge,
  });
};

const verifyUser = (token) => {
  if (token) {
    jwt.verify(token, process.env.JWT_SECRETE, (err, result) => {
      if (err) console.log(" token verification failed " + err);
      console.log(" Token verified " + result);
    });
  }
  console.log("token does not exist... please register");
};

const confirmPassword = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword);
};

module.exports = {
  createToken,
  verifyUser,
  confirmPassword,
};
