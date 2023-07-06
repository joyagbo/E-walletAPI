const mongoose = require("mongoose");
const { isEmail } = require("validator");
const passwordSecure = require("./passwordSecure");

const PASS_LENGTH = 8;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email field must not be empty"],
    unique: true,
    validate: [isEmail, "please enter a valid email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password field must not be empty"],
    minlength: [PASS_LENGTH, "password must be at least 8 characters long"],
  },
});

// secure password before saving
userSchema.pre("save", async function (next) {
  this.password = await passwordSecure.hashPassword(this.password);
  next();
});

module.exports = mongoose.model("Customer", userSchema);
