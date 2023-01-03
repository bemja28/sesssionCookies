module.exports = (req,res,next) => {
    req.session.login = req.cookies.login
    next()
}