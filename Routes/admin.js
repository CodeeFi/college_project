const express = require("express");
const Router = express.Router();
const { uploadfile } = require("../Controllers/Admin/uploadFile");
const { teacherProfile } = require("../Controllers/Admin/setting");
const { uploadResult, resultList, publishResult, RemoveResult } = require("../Controllers/Admin/resultSection");
const { userauth } = require("../Middleware/auth");
const {
    student,
    studentsInfo,
    studentsContect,
    studentsApprove,
    studentsApproved,
    studentsDelete

} = require("../Controllers/Admin/studentInfo");


// const { resultSection } = require("../Controllers/Admin/resultSection")



// Routes of student information.
Router.route("/students").get(userauth, student);
Router.route("/studentsInfo").get(userauth, studentsInfo);
Router.route("/studentsInfo/:limit/:offset").get(userauth, studentsInfo);
Router.route("/studentsInfo/:limit").get(userauth, studentsInfo);

// Contect information => which also avliable in limit section.
Router.route("/studentsContect").get(userauth, studentsContect);
Router.route("/studentsContect/:limit/:offset").get(userauth, studentsContect);
Router.route("/studentsContect/:limit").get(userauth, studentsContect);

Router.route("/studentsApprove").get(userauth, studentsApprove).put(userauth, studentsApproved).delete(userauth, studentsDelete);



// Routes for annousment.
Router.route("/resultList").get(userauth, resultList);
Router.route("/publishResult").put(userauth, publishResult);
Router.route("/removeResult").delete(userauth, RemoveResult);
Router.route("/resultUpload").post(userauth, uploadResult);

// Router.route("/studentQuery").get(userauth, studentQuery);
// Router.route("/noticeList").get(userauth, studentQuery);

// Router.route("/publicNotice").post(userauth, publicNotic);



// //Routes for admin
// Router.route("/getProfile").post(userauth, profile);
Router.route("/setTeacher").post(userauth, teacherProfile);
Router.route("/uploadFile").post(userauth, uploadfile);
// Router.route("/setCources").post(userauth, profile);







module.exports = Router