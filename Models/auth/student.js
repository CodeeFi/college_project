const mongoose = require("mongoose");
const { pwdHash } = require("../../Middleware/pwdHash");
const { createToken } = require("../../Middleware/auth")

const userSchema = mongoose.Schema({

    enrolment_no: {
        type: Number,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true,
        min: [3, "First Name is to sort"],
        max: [20, "First name is to long"],
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        min: [3, "First Name is to sort"],
        max: [20, "First name is to long"],
        trim: true
    },
    college: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    session_start_year: {
        type: String,
        required: true
    },
    session_end_year: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    repassword: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    session: {
        type: Array,
    }

});



userSchema.pre("save", createToken)

userSchema.pre("save", pwdHash);

const Student = mongoose.model("student", userSchema);
module.exports = Student;