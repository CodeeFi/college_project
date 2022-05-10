
const wrapper = require("../../Middleware/wrapper");
const { customError } = require("../../errors/errors");
const TProfile = require("../../Models/admin/teacherProfile");
const Course = require("../../Models/admin/setCourses");

const teacherProfile = wrapper(async (req, res, next) => {
    const { fullName, designation, specialization, imageUrl, email, phone } = req.body;
    if (!fullName || !designation || !specialization || !imageUrl || !email || !phone) {
        return res.status(400).json({
            "status": 400,
            "msg": "Bad Request"
        })
    }
    const profile = await TProfile.create(req.body);

    if (profile) {
        return res.status(200).json({
            "status": 200,
            "msg": "Profile uploaded successfully"
        })
    }
    next(customError("SomeThing went wrong", 500))

});




// Set Colleges And Courses..
const setCollege = wrapper(async (req, res, next) => {

    const { collegeName, university } = req.body;

    if (!collegeName || !university)
        return next(customError("Bad Request", 200));

    const founded = await Course.findOne({ collegeName });
    if (founded)
        return next(customError("College Is Already Register", 409));

    const responce = await Course.create(req.body);

    if (responce)
        return res.status(200).json({
            status: 200,
            msg: "College Register Succussfully"
        });

    next(customError("SomeThing Went Wrong", 500));

})


const setCource = wrapper(async (req, res, next) => {

    const { id, course } = req.body;

    if (!id || !course)
        return next(customError("Bad Request", 400))

    const responce = await Course.findByIdAndUpdate({ _id: id }, {
        $push: {
            courses: course
        }
    });

    if (responce)
        return res.status(200).json({
            status: 200,
            msg: "Course Update Successfulle"
        });
    next(customError("SomeThing Went Wrong", 500));
});



const removeCourse = wrapper(async (req, res, next) => {

    const { id, course } = req.body;

    if (!id || !course)
        return next(customError("Bad Request", 400))

    const responce = await Course.findByIdAndUpdate({ _id: id }, {
        $pull: {
            courses: course
        }
    });

    if (responce)
        return res.status(200).json({
            status: 200,
            msg: "Course Removed Successfully"
        });
    next(customError("SomeThing Went Wrong", 500));
});



const getCollege = wrapper(async (req, res, next) => {
    const colleges = await Course.find({}, {
        collegeName: 1
    });

    if (colleges)
        return res.status(200).json(colleges);

    next(customError("something Went Wrong", 500));
})



const getCourse = wrapper(async (req, res, next) => {
    const { id } = req.params;
    if (!id)
        return next(customError("Bad Request", 400));

    const course = await Course.findOne({ _id: id }, {
        courses: 1
    });

    if (course)
        return res.status(200).json(course);

    next(customError("something Went Wrong", 500));
});


module.exports = {
    teacherProfile,
    setCollege,
    setCource,
    getCollege,
    removeCourse,
    getCourse
}