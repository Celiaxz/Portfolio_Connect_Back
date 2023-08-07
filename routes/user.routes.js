const router = require("express").Router()
const User = require("../models/User.model");

router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const user = await User.findById(id).populate("projects")
        console.log(user)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router;