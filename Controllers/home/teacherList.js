const wrapper = require("../../Middleware/wrapper");
const { customError } = require("../../errors/errors");
const TProfile = require("../../Models/admin/teacherProfile");

const teacherList = wrapper(async (req, res, next) => {

    const Tprofile = await TProfile.find({}, {
        fullName: 1,
        designation: 1,
        specialization: 1,
        imageUrl: 1,
        fbUrl: 1,
        twiterUrl: 1,
        email: 1,
        instagramUrl: 1
    })

    if (Tprofile) {
        return res.status(200).json(Tprofile);
    }
    next(customError("SomeThing Went Wrong"))

})





module.exports = {
    teacherList
}