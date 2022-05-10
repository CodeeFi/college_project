

const mongoose = require("mongoose");

const CollegeCourseSchema = mongoose.Schema({

    collegeName: {
        type: String,
        require: true,
        trim: true,
        min: [2, "Invalid University name"]
    },
    university: {
        type: String,
        require: true,
        trim: true,
        min: [2, "Invalid University Name"]
    },
    courses: {
        type: Array,
    }
}, { timestapms: true })

const Course = mongoose.model("CollegeAndCources", CollegeCourseSchema);

module.exports = Course