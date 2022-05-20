const mongoose = require("mongoose");

const teacherProfile = mongoose.Schema({

    fullName: {
        type: String,
        require: true,
        trim: true,
        min: [3, "Fullname is to sort"],
        max: [30, "Fullname is to long"]
    },

    designation: {
        type: String,
        require: true,
        trim: true,
        min: [1, "Designation is to sort"],
        max: [15, "Designation is to long"]
    },
    specialization: {
        type: String,
        trim: true,
        require: true,
        min: [1, "specialization is to sort"],
        max: [15, "specialization is to long"]
    },
    imageUrl: {
        type: String,
        trim: true,
        require: true
    },
    fbUrl: {
        type: String,
        trim: true
    },
    twiterUrl: {
        type: String,
        trim: true
    },
    instagramUrl: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        require: true
    },
    phone: {
        type: Number,
        trim: true,
        require: true
    }

}, { timestamps: true })

const TProfile = mongoose.model("TeacherProfile", teacherProfile);

module.exports = TProfile;
