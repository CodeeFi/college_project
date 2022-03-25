const express = require("express");
const Router = express.Router();
const { login, register, adminLogin, adminRegister } = require("../Controllers/authController")
const { home } = require("../Controllers/home");
const Validator = require("../Middleware/validator");
const { userauth } = require("../Middleware/auth");

// Authorization Routes.
Router.route("/login").post(login)
Router.route("/register").post(Validator, register);

Router.route("/").get(home)

Router.route("/admin/login").post(adminLogin);
Router.route("/admin/register").post(Validator, adminRegister);

module.exports = Router;