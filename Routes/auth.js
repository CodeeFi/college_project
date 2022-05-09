const express = require("express");
const Router = express.Router();
const { login, register, adminLogin, adminRegister } = require("../Controllers/auth/authController")

const { Validator } = require("../Middleware/validator");
const { AdminValidator } = require("../Middleware/validator");



// Authorization Routes.
Router.route("/login").post(login)
Router.route("/register").post(Validator, register);


Router.route("/admin/login").post(adminLogin);
Router.route("/admin/register").post(AdminValidator, adminRegister);



module.exports = Router;