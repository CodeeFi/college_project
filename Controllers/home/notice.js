const { customError } = require("../../errors/errors");
const wrapper = require("../../Middleware/wrapper");
const Notice = require("../../Models/admin/publicNotice");

const NoticeList = wrapper(async (req, res, next) => {

    let limit = 7;
    limit = req.params?.limit;
    const curDate = new Date().toISOString();
    const noticeList = await Notice.find({ validUpto: { $gt: curDate }, verified: true, publish: true }, {
        noticeTitle: 1,
        noticeImg: 1,
        validUpto: 1
    }).sort({ _id: -1 }).limit(limit);

    if (noticeList) {
        return res.status(200).json(noticeList)
    }
    next(customError("SomeThing Went Wrong", 400))
})




// Notice sent a all the imformantion in client.
const notice = wrapper(async (req, res, next) => {

    const { id } = req.params;
    if (!id) {
        return next(customError("Bad Request", 400));
    }
    const notice = await Notice.findById({ _id: id });
    if (notice) {
        return res.status(200).json(notice)
    }
    return next(customError("SomeThing Went Wrong.", 400));
})



module.exports = {
    NoticeList,
    notice
}