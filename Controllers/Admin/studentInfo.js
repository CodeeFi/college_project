
// Route -> localhost:5000/api/v0/admin/students  
const wrapper = require("../../Middleware/wrapper");
const Student = require("../../Models/auth/student");
const { customError } = require("../../errors/errors");
const Query = require("../../Models/home/studentQuery");
// In Student section send the responce and send the data total student and approved students
const student = wrapper(async (req, res, next) => {

    const totalStudents = await Student.find({}).count();
    const approvedStudent = await Student.find({ approved: true }).count();
    const totalQuery = await Query.find({ visiblity: false }).count();

    if (totalStudents || approvedStudent || totalQuery)
        return res.status(200).json({
            totalStudents,
            approvedStudent,
            totalQuery
        });
    next(customError("something went wrong", 400))
});


// Student information sent the student record if student is verifiede or not.
// its send all the record. as well as limit record.
const studentsInfo = wrapper(async (req, res, next) => {

    const limit = Number(req.params?.limit);
    const offset = Number(req.params?.offset);

    const studentInfo = await Student.find({}, {
        enrolment_no: 1,
        first_name: 1,
        last_name: 1,
        course: 1,
        approved: 1
    }).sort({ _id: -1 }).skip(offset).limit(limit);

    if (studentInfo)
        return res.status(200).json({
            studentInfo,
        });
    return next(customError("something went wrong", 400));
})

// StudentContect middleware send the contect information in student.
// its also send the responce in limit bases.
const studentsContect = wrapper(async (req, res, next) => {

    const limit = Number(req.params?.limit);
    const offset = Number(req.params?.offset);

    const studentContect = await Student.find({}, {
        enrolment_no: 1,
        first_name: 1,
        last_name: 1,
        email: 1,
        phone: 1
    }).skip(offset).limit(limit);

    if (studentContect)
        return res.status(200).json({
            studentContect,
        })
    next(customError("Something went wrong", 400));

})


// Student approvle send the responce whose student is not approved.
const studentsApprove = wrapper(async (req, res, next) => {
    const approvleList = await Student.find({ approved: false }, {
        enrolment_no: 1,
        first_name: 1,
        last_name: 1,
        course: 1,
        approved: 1
    });


    if (approvleList)
        return res.status(200).json({
            approvleList,
        })

    next(customError("something went wrong", 400))
});

const approvedStudent = wrapper(async (req, res, next) => {
    const approvleList = await Student.find({ approved: true }, {
        enrolment_no: 1,
        first_name: 1,
        last_name: 1,
        course: 1,
        approved: 1
    });


    if (approvleList)
        return res.status(200).json({
            approvleList,
        })

    next(customError("something went wrong", 400))
});

// Find by id and change the approved status true;
const studentsApproved = wrapper(async (req, res, next) => {
    const { id } = req.body;
    const approved = await Student.findByIdAndUpdate({ _id: id }, { approved: true });
    if (approved) {
        return res.status(200).json({
            "status": 200,
            "msg": "User Approved Sucessful"
        })
    }
    next(customError("SomeThing Went Wrong", 400));

});

const studentsDelete = wrapper(async (req, res, next) => {
    const { id } = req.body;
    const deleted = await Student.findByIdAndDelete({ _id: id });
    if (deleted) {
        return res.status(200).json({
            "status": 200,
            "msg": "User Deleted Sucessfull"
        })
    }
    next(customError("User Does't Exist ", 404))

});

module.exports = {
    student,
    studentsInfo,
    studentsContect,
    studentsApprove,
    studentsApproved,
    studentsDelete,
    approvedStudent
}