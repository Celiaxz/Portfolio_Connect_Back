const { expressjwt } = require('express-jwt')

//Getting token from the req headers
function getTokenFromHeaders(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer") {
        const token = req.headers.authorization.split(" ")[1]
        return token
    } else {
        return null
    }
}

const isAuthenticated = expressjwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    getToken: getTokenFromHeaders
})

module.exports = { isAuthenticated }