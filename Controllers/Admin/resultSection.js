require("dotenv").config;
const s3 = require("../../aws/awsConfig")
const fs = require("fs");
const wrapper = require("../../Middleware/wrapper");
const customError = require("../../errors/errors");
const Result = require("../../Models/admin/resultUpload");
const path = require("path");
const { wrap } = require("module");
convertExcel = require('excel-as-json2').processFile;
const datafile = path.join(__dirname, "../../data/result.xlsx");

options = {
    sheet: '1',
    isColOriented: false,
    omitEmptyFields: true,
    trimValues: true
}

const resolvStatus = {
    status: 200,
    type: "success"
}
const rejectStatus = {
    status: 400,
    type: "faild"
}

//Convert excel to json function is convert the data into a json objet and set the data into a database.ss
async function ConvertExceltoJson(id) {
    return new Promise((resolve, rejects) => {
        convertExcel(datafile, null, options, async (err, data) => {
            if (err)
                rejects({ ...rejectStatus, msg: "SomeThing went wrong in excel file" });
            if (data) {
                try {
                    const resultupdated = await Result.findByIdAndUpdate({ _id: id }, {
                        $push: {
                            "result": {
                                $each: data
                            }
                        }
                    });
                    if (resultupdated)
                        resolve({ ...resolvStatus, msg: "Data Publish in Database" });
                    else
                        rejects({ ...rejectStatus, msg: "SomeThing Went Wrong" });
                } catch (error) {
                    rejects({ ...rejectStatus, msg: error.message });
                }

            }
        });
    });

}




// this funcion is download the file in s3 and call the corvertExcelto json funcion.
async function DownloadFile(Key, id) {
    return new Promise((resolve, rejects) => {
        try {
            /// Create Readable stream is use to take a data into a 
            const readablestream = s3.getObject({ Bucket: process.env.AWS_BUCKET_NAME, Key }, (err, data) => {
                if (err) {
                    rejects({ ...rejectStatus, msg: "something went wrong" });
                }
            }).createReadStream();

            const writestream = fs.createWriteStream(datafile); // datafile is a file where Result Data is exist.
            readablestream.pipe(writestream);
            readablestream.on("end", async () => {
                const result = await ConvertExceltoJson(id);
                if (result.status !== 200) {
                    rejects({ ...rejectStatus, msg: "Something went wrong file" });
                }
                resolve({ ...resolvStatus, msg: "Json File is extracted and publish DBA" });
            });

        } catch (error) {
            console.log(error);
            rejects({ ...rejectStatus, msg: "SomeThing Went Wrong" });
        }
    });
}


///  MiddleFunction which call when user is send the request.
const uploadResult = wrapper(async (req, res, next) => {

    const { title, sessionStartYear, sessionEndYear, type, fileUrl } = req.body;

    if (!title || !sessionEndYear || !sessionStartYear || !type || !fileUrl) {
        return next(customError("SomeThing Went Wrong ", 400));
    }

    const ResultExist = await Result.findOne({ fileUrl });
    if (ResultExist)
        return res.status(409).json({
            "status": 409,
            "msg": "Result is already publish Or FileName is same"
        });

    const result = await Result.create(req.body);
    if (result) {
        const { _id } = result;
        // Download File is function which download fiel in the database to to local server.
        const publishStatus = await DownloadFile(fileUrl, _id);

        if (publishStatus.statue === 400) {
            await Result.findByIdAndDelete({ _id });
            next(customError("Something Went Wrong", 500));
        }
        return res.status(200).json({
            "status": 200,
            "msg": "Result Publish"
        });
    }
    next(customError("Something Went Wrong", 500));

})




const resultList = wrapper(async (req, res, next) => {

    const result = await Result.find({}, {
        title: 1,
        sessionStartYear: 1,
        sessionEndYear: 1,
        type: 1,
    });

    if (result)
        return res.status(200).json(result);

    next(customError("SomeThing Went Wront", 500))

})



const publishResult = wrapper(async (req, res, next) => {
    const { id } = req.body;
    if (!id)
        next(customError("SomeThing Went Wrong", 400));

    const publish = await Result.findOneAndUpdate({ _id: id }, { publish: true });

    if (publish)
        return res.status(200).json({
            status: 200,
            msg: "Your Result is Live Now"
        });

    next(customError("SomeThing Went Wrong", 500));
})



const RemoveResult = wrapper(async (req, res, next) => {

    const { id } = req.body;
    if (!id)
        next(customError("SomeThing Went Wrong", 400));

    const remove = await Result.findOneAndDelete({ _id: id }, { publish: true });

    if (remove)
        return res.status(200).json({
            status: 200,
            msg: "Result Deleted Sucessfull"
        });

    next(customError("SomeThing Went Wrong", 500));

})


module.exports = {
    uploadResult,
    resultList,
    publishResult,
    RemoveResult
}