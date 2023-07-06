const { Router } = require("express");
const {
  get_login,
  post_login,
  get_logout,
  post_register,
} = require("../controllers/customerControl");

const route = Router();

route.get("/login", get_login);
route.post("/login", post_login);
route.get("/logout", get_logout);
route.post("/register", post_register);

module.exports = route;
