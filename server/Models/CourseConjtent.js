const mongoose = require("mongoose");
const CourseContentSchema = new mongoose.Schema({
    content_subject: {
        type: String,
        required: true,
    },
    content_category: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    approved: {
        type: Boolean,
        default: false,
    },
})

const CourseContentModel = mongoose.model("CourseContent", CourseContentSchema);
module.exports = CourseContentModel;