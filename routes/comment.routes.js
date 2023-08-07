const router = require("express").Router();
const Comment = require("../models/Comment.model");
const Project = require("../models/Project.model");


//POST comment
router.post("/:projectId/comment", async (req, res) => {
    //should receive {user, comment}
    const projectId = req.params.projectId
    try {
        const postComment = await Comment.create(req.body)
        await Project.findByIdAndUpdate({ _id: projectId }, { $push: { comments: postComment._id } })
        res.status(201).json("Comment added")
    } catch (error) {
        console.error(error)
        res.status(500).json("Cannot create the comment")
    }
})

//GET comment
router.get("/:projectId/comment/:commentId", async (req, res) => {
    const commentId = req.params.commentId
    try {
        const currentComment = await Comment.findById(commentId).populate("userId")
        res.status(201).json(currentComment)
    } catch (error) {
        console.error(error)
    }
})


//PUT edit comment

//DELETE delete comment


module.exports = router;