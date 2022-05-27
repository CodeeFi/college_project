const express = require("express");
const Router = express.Router();
const { home } = require("../Controllers/home/home");
const { userauth } = require("../Middleware/auth");
const { getCollege, getCourse } = require("../Controllers/Admin/setting");

// MiddleWare Funcion import.
const { teacherList } = require("../Controllers/home/teacherList");
const { studentQuery, getQuery, queryList } = require("../Controllers/home/studentQuery");
const { ResponseFile } = require("../Controllers/home/ResponceFile");

const { NoticeList, notice } = require("../Controllers/home/notice");

const { findResult } = require("../Controllers/home/findResult");


Router.route("/").get(userauth, home);


Router.route("/image/:url").get(ResponseFile);

Router.route("/teacherList").get(teacherList);
Router.route("/studentQuery").post(studentQuery);


// Get The Query list based on email list on User.
Router.route("/queryList/:email").get(userauth, queryList);


// Show Ther Reply
Router.route("/getReply/:id").get(userauth, getQuery);


Router.route("/findResult").post(userauth, findResult);

Router.route("/collegeList").get(getCollege);
Router.route("/getCourse/:id").get(getCourse);

// Router.route("/queryStatus/:id").get(userauth, home);



// // Notic Section
Router.route("/noticList").get(NoticeList);
Router.route("/noticList/:limit").get(NoticeList);
Router.route("/notice/:id").get(notice);


module.exports = Router;