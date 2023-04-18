const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    commentId: {
        type: String,
        required: true,
        unique: true
    },
    postId: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model("comment", commentsSchema);