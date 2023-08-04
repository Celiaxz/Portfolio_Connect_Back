const router = require("express").Router();
const bcrypt = require("bcryptjs")
const User = require('../models/User.model')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require("../middlewares/isAuthenticated")


//POST sign up new user
router.post('/signup', async (req, res) => {
    //req.body should return username, email and password
    const { username, email, password } = req.body
    //hashing password before inserting it in DB
    const salt = bcrypt.genSaltSync(13)
    const passwordHash = bcrypt.hashSync(password, salt)
    try {
        await User.create({ username, email, password: passwordHash })
        res.status(201).json("new user created")
    } catch (error) {
        console.error(error)
    }
})

//POST login the user
router.post('/login', async (req, res) => {
    //req.body should return username and password
    const { username, password } = req.body
    try {
        const findUser = await User.findOne({ username })
        if (findUser) {
            //if user exist then check password
            if (bcrypt.compareSync(password, findUser.password)) {
                const authToken = jwt.sign({ userId: findUser._id }, process.env.TOKEN_SECRET, {
                    algorithm: "HS256",
                    expiresIn: "3h"
                })
                res.status(202).json({ token: authToken })
            } else {
                //wrong password
                res.status(403).json({ errorMessage: "Password incorrect" })
            }
        } else {
            //user not found
            res.status(403).json({ errorMessage: "User not found" })
        }
    } catch (error) {
        console.error(error)
    }
})

//GET verify
router.get('/verify', isAuthenticated, (req, res) => {
    //just making a route that will pass the middleware. The middleware is returning the token itself
    res.json("Middleware passed, token passed to data")
})

module.exports = router;
