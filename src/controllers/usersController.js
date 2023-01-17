const colors = require ('../data/colores')

module.exports = {

    msg: (req,res) => {
        res.render('msg')
    },

    logout: (req,res) => {
        res.render('logout')
    }
}