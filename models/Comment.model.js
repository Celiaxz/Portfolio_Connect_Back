const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    projectId: { type: Schema.Types.ObjectId, ref: "Project" },
    comment: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Comment = model("Comment", commentSchema);

module.exports = Comment;
