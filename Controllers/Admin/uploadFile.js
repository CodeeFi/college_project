require("dotenv").config;
const s3 = require("../../aws/awsConfig")
var multer = require('multer');
var multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
const { customError } = require("../../errors/errors");
const wrapper = require("../../Middleware/wrapper");
const Upload = require("../../Models/admin/UploadFile")


// FILE FILTER FUNCION. USE MULTER TO FILTER TO FILE BASED ON TYPE.
function filefilter(req, file, cb) {

    console.log(file.mimetype);
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        cb(null, true);
    }
    else {
        return cb(new Error('Invalid File Type.'));
    }
}


// mulTER S3 CONFIGURATION.
let upload
try {
    upload = multer({
        storage: multerS3({
            s3,
            bucket: process.env.AWS_BUCKET_NAME,
            metadata: function (req, file, cb) {
                console.log(req.file);
                cb(null, { fieldName: uuidv4() + file.originalname });
            },
            key: function (req, file, cb) {
                cb(null, uuidv4() + file.originalname);
            },
        }),
        fileFilter: filefilter,
        limits: {
            fileSize: 1024 * 1024 * 2
        },
    })
} catch (error) {
    console.log(error);
}



const fileupload = upload.single("file");// its give me a middleware funcion 
const uploadfile = wrapper(async (req, res, next) => {

    fileupload(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                status: 400,
                mag: err.message
            })
        }
        else if (req.file) {
            Upload.create(req.file);
            const { key, originalname } = req.file;
            return res.status(200).json({
                "status": 200,
                "msg": `${originalname} Uploaded Sucessfully`,
                "url": key
            })
        }
        else {
            next(customError("Something Went Wrong", 500))
        }
    })
})


module.exports = {
    uploadfile
}