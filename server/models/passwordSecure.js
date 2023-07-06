const bcrypt = require("bcrypt");

const hashPassword = async (plaintext) => {
  const SALT = await bcrypt.genSalt();
  const encryptedPass = await bcrypt.hash(plaintext, SALT);
  console.log("password encrypted " + encryptedPass);
  return encryptedPass;
};

module.exports = {
  hashPassword,
};
