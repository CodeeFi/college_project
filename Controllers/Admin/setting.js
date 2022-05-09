

const wrapper = require("../../Middleware/wrapper");
const customError = require("../../errors/errors");
const TProfile = require("../../Models/admin/teacherProfile");


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


module.exports = {
    teacherProfile,
}