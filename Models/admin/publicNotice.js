
const mongoose = require("mongoose");

const publicNotice = mongoose.Schema({

    noticeTitle: {
        type: String,
        require: true,
        trim: true,
        Min: [3, "NoticeTitle is to sort"]
    },
    noticeDesc: {
        type: String,
        require: true,
        trim: true
    },
    noticeDate: {
        type: Date,
        require: true,
        default: new Date()
    },
    noticeImg: {
        type: String
    },
    issueDate: {
        type: Date,
        require: true
    },
    validUpto: {
        type: Date,
        require: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    publish: {
        type: Boolean,
        default: false
    }

})

const Notice = mongoose.model("publicNotice", publicNotice);
module.exports = Notice;