const expressJWT = require('express-jwt')
require('dotenv').config()

exports.requireSignIn = expressJWT({
    secret: process.env.TOKEN_SUCRET,
    algorithms: ["HS256"],
    userProperty: 'auth'
})

exports.isAuth = (req, res, next) => {
    // if(req.auth.role == 1) {
    //     return next()
    // }

    let user = req.profile && req.auth && (req.profile._id == req.auth._id)

    if(!user) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }

    next()
}

exports.isSuperAdmin = (req, res, next) => {
    if(req.auth.role == 0) {
        return res.status(403).json({
            error: "Admin Resource, Access Denied !"
        })
    }
    next()
}