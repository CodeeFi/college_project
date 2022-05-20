const mongoose = require("mongoose");


const studenQuerySchema = mongoose.Schema({



    name: {
        type: String,
        require: true,
        trim: true,
        min: [3, "Name is To Sort"]
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    subject: {
        type: String,
        require: true,
        max: [250, "Max Limit Exided"],
        trim: true
    },
    message: {
        type: String,
        require: true,
        trim: true
    },
    reply: {
        type: String,
        trim: true,
        default: false
    },
    visiblity: {
        type: Boolean,
        default: false,
        require: true
    },
    studentId: {
        type: String,
        trim: true,
        default: null
    }

});

const Query = mongoose.model("StudenQuery", studenQuerySchema);

module.exports = Query;