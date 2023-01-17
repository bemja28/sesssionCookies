const {loadUsers,saveUser} = require('../data/db_modules');
const {validationResult} = require ('express-validator');
const colors = require ('../data/colores')


module.exports={

    index: (req, res, next) => {
        res.render('index', {colors});
      },
    

    controlRegister: (req, res, next) => {
        const errors = validationResult(req);
        const {name,email,colores,saveColor} = req.body;
        const users = loadUsers();

        if (errors.isEmpty()){
            const newUser = {
                id: users[users.length - 1] ? users[users.length-1].id + 1 : 1,
                name: name.trim(),
                email : email.trim(),
                
                colores,
                saveColor
            }
            const usersModify = [...users,newUser];
            saveUser(usersModify);
            

            req.session.login = {
                id: users.id,
                name,
                email,
                
                colores,
                saveColor
            }
            
            res.cookie('login',req.session.login,{maxAge: 150 * 60})
            if(saveColor){
                res.cookie('login',req.session.login,{maxAge: 4000 * 60})
            }
            res.redirect('/users/mensaje');
        } else {
            return res.render('index',{
                title : "Usando Session",
                colors,
                errors : errors.mapped(),
                old : req.body
            })
          }
    },
 
    destroy: (req, res) => {
        req.session.destroy();
        res.cookie('login', null,{maxAge:-1})
        res.redirect('/')
    },

}