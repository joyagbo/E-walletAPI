const { Router } = require("express");
const {
  get_login,
  post_login,
  get_logout,
  post_register,
} = require("../controllers/customerControl");

const customerRoute = Router();

customerRoute.get("/login", get_login);
customerRoute.post("/login", post_login);
customerRoute.get("/logout", get_logout);
customerRoute.post("/register", post_register);

module.exports = customerRoute;
