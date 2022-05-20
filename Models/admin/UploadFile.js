const mongoose = require("mongoose")

const uploads = mongoose.Schema({}, { strict: false })


const Upload = mongoose.model("upload", uploads);


module.exports = Upload;