
const { customError } = require("../../errors/errors");
const wrapper = require("../../Middleware/wrapper");
const Admin = require("../../Models/auth/admin");
const adminList = wrapper(async (req, res, next) => {
    const adminList = await Admin.find({

    }, {
        firstName: 1,
        lastName: 1,
        email: 1,
        isApproved: 1,
        adminType: 1,
    });

    if (adminList) {
        return res.status(200).json(adminList)
    }
    next(customError("SomeThing Went Wrong", 500))

})
const adminDelete = wrapper(async (req, res, next) => {
    const { id } = req.body;
    if (!id)
        next(customError("Bad Request", 500));
    const adminList = await Admin.findByIdAndDelete({ _id: id });

    if (adminList) {
        return res.status(200).json({
            status: 200,
            msg: "user Delete Successfully"
        })
    }
    next(customError("SomeThing Went Wrong", 500))


});

const adminApprove = wrapper(async (req, res, next) => {
    const { id } = req.body;
    if (!id)
        next(customError("Bad Request", 500));
    const adminList = await Admin.findByIdAndUpdate({ _id: id }, { isApproved: true });
    if (adminList) {
        return res.status(200).json({
            status: 200,
            msg: "User approved Successfully"
        })
    }
    next(customError("SomeThing Went Wrong", 500))


});

const profileImg = wrapper(async (req, res, next) => {
    const { url, id } = req.body;
    if (!url && !id)
        next(customError("Bad Request", 500));
    const adminList = await Admin.findByIdAndUpdate({ _id: id }, { imgUrl: url });
    if (adminList) {
        return res.status(200).json({
            status: 200,
            msg: "image upload successfull",
            url: adminList.imgUrl
        });
    }
    next(customError("SomeThing Went Wrong", 500))
});





module.exports = {
    adminList,
    adminDelete,
    adminApprove,
    profileImg
}