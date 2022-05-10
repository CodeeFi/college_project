
const wrapper = require("../../Middleware/wrapper");
const { customError } = require("../../errors/errors");
const Notice = require("../../Models/admin/publicNotice");

const setNotice = wrapper(async (req, res, next) => {

    const { noticeTitle, noticeDesc, issueDate, validUpto } = req.body;
    if (!noticeTitle || !noticeDesc || !issueDate || !validUpto)
        return next(customError("Bad request", 400))

    const noticeCreated = await Notice.create(req.body);
    if (noticeCreated) {
        return res.status(200).json({
            status: 200,
            msg: "Notice Created Sucessfully"
        });
    }
    next(customError("SomeThing Went Wrong", 500));
})



const noticList = wrapper(async (req, res, next) => {

    const notices = await Notice.find({}, {
        noticeTitle: 1,
        issueDate: 1,
        validUpto: 1,
        publish: 1,
        verified: 1
    });

    if (notices)
        return res.status(200).json({
            notices
        })
    next(customError("SomeThing Went Wrong", 500));
})


const updateNoteceStatus = wrapper(async (req, res, next) => {

    const { id } = req.body;

    if (!id)
        return res.status(400).json({
            status: 400,
            msg: "Bad Request"
        })
    const publish = await Notice.findByIdAndUpdate({ _id: id }, { publish: true, verified: true })

    if (publish)
        return res.status(200).json({
            status: 200,
            msg: "Your Notice is live now"
        })
    next(customError("Something Went Wrong", 500));

});

const deleteNotice = wrapper(async (req, res, next) => {

    const { id } = req.body;
    if (!id)
        return res.status(400).json({
            status: 400,
            msg: "Bad Request"
        });



    const deleted = await Notice.findByIdAndDelete({ _id: id });

    if (deleted)
        return res.status(200).json({
            status: 200,
            msg: "Notice Deleted Successful"
        })
    next(customError("Something Went Wrong", 500));

});


module.exports = {
    setNotice,
    noticList,
    updateNoteceStatus,
    deleteNotice
}