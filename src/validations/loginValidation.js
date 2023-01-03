const {check,body} = require ('express-validator');
const {loadUsers} = require ('../data/db_modules');


module.exports = [

    check('name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min:2,
        }).withMessage('Debe ingresar mas de 2 caracteres').bail()
        .isAlpha('es-ES').withMessage('Solo caracteres alfabeticos'),

    body('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debe ingresar un email valido')
        .custom((value,{req})=> {
            const user = loadUsers().find(user => user.email === value)
            if (user){
                return false
            } else {
                return true
            }
        }).withMessage('El email ya se encuentra registrado'),
    
  ]