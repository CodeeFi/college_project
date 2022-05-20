
const wrapper = require("../../Middleware/wrapper");
const { customError } = require("../../errors/errors");
const Result = require("../../Models/admin/resultUpload");

const findResult = wrapper(async (req, res, next) => {

    const { semester, type, session, EnrolmentNo } = req.body;

    if (!semester || !type || !EnrolmentNo) {
        return next(customError("Bad Request", 400))
    }

    const sturesult = await Result.findOne({ semester, type, session }, {
        "result": {
            $elemMatch: { EnrolmentNo }
        },
        type: 1
    });

    console.log(sturesult);
    if (sturesult?.result[0]) {
        const { _id, result: [studentResult] } = sturesult;
        return res.status(200).json({
            id: _id,
            studentResult
        });
    } else {
        return next(customError("Result Not Found", 400))
    }

})


module.exports = {
    findResult
}
