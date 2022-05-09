const express = require("express");
const Router = express.Router();
const { home } = require("../Controllers/home/home");
const { userauth } = require("../Middleware/auth");





Router.route("/").get(userauth, home);
Router.route("/teacherList").get(userauth, home);
Router.route("/studentQuery").get(userauth, home);
Router.route("/findResult").post(userauth, home);
Router.route("/queryList").get(userauth, home);
Router.route("/queryStatus/:id").get(userauth, home);



// Notic Section
Router.route("/noticList").get(userauth, home);
Router.route("/notice/:id").get(userauth, home);


// Student send Query.
Router.route("/submitQuery").post(userauth, home);

