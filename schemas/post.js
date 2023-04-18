const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    title: {
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

module.exports = mongoose.model("post", postsSchema);