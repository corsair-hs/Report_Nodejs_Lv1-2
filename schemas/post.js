const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
    // _id: {
    //     type: mongoose.Types.ObjectId,
    //     required: true
    // },
    userId: {
        type: String,
        required: true
    },
    nickname: {
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
    },
    updatedAt: {
        type: Date
    }
});


// PostsSchema.virtual("postId").get(() => {
//     return this._id.toHexString();
// });

// PostsSchema.set("toJSON", {
//     virtuals: true   // JSON 형태로 가공할 때, postId를 출력시켜준다.
// });

module.exports = mongoose.model("post", PostsSchema);

// default: () => mongoose.Types.ObjectId().toString()