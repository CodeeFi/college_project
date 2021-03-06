
require("dotenv").config
const s3 = require("../../aws/awsConfig");
const { customError } = require("../../errors/errors");
const wrapper = require("../../Middleware/wrapper");


const ResponseFile = wrapper(async (req, res, next) => {
    const { url } = req.params;

    if (!url) {
        return next(customError("Bad Request", 400));
    }

    const data = s3.getObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: url }).createReadStream();

    data.on("error", (err) => {
        if (err)
            return next(customError("Invalid Url", 400));
    });
    return data.pipe(res);
})

module.exports = {
    ResponseFile
}

