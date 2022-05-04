
const mongoose = require("mongoose");
const { createToken } = require("../../Middleware/auth");
const { pwdHash } = require("../../Middleware/pwdHash");

const Adminschema = mongoose.Schema({

    firstName: {
        type: String,
        require: true,
        min: [3, "First Name is to sort"],
        max: [20, "First name is to long"],
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        min: [3, "First Name is to sort"],
        max: [20, "First name is to long"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    },
    rePassword: {
        type: String,
        require: true
    },
    adminType: {
        type: Boolean,
        require: true
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    session: {
        type: Array
    }
}, { timestamps: true })


Adminschema.pre("save", createToken);
Adminschema.pre("save", pwdHash);
const Admin = mongoose.model("Admin", Adminschema);

module.exports = Admin;