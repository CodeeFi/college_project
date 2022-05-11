const mongoose = require("mongoose");


const result = mongoose.Schema({

    title: {
        type: String,
        require: true,
        trim: true
    },
    sessionStartYear: {
        type: String,
        require: true,
        trim: true
    },
    sessionEndYear: {
        type: String,
        require: true,
        trim: true
    },
    publishDate: {
        type: Date,
        require: true,
        default: new Date().toDateString()
    },
    semester: {
        type: Number,
        require: true,
        trim: true
    },
    type: {
        type: String,
        require: true,
        trim: true
    },
    session: {
        type: String,
        trim: true
    },
    fileUrl: {
        type: String,
        trim: true,
        require: true
    },
    result: {
        type: Array
    },
    publish: {
        type: Boolean,
        default: false
    }

})


const Result = mongoose.model("Result", result);

module.exports = Result;
