const {loadUsers,writeUser} = require('../data/db_modules');
const {validationResult} = require ('express-validator');
const colores = require ('../data/colores')


module.exports={

    index: (req, res) => {
        res.render('index', {colores});
      },
    

    controlRegister: (req, res) => {
        const errors = validationResult(req);
        const {name,email,color,save} = req.body;
        const users = loadUsers();

        if (errors.isEmpty()){
            const newUser = {
                id: users[users.length - 1] ? users[users.length-1].id + 1 : 1,
                name: name.trim(),
                email : email.trim(),
                color,
                save
            }
            const usersModify = [...users,newUser];
            writeUser(usersModify);
            

            req.session.login = {
                id: users.id,
                name,
                email,
                color,
                save
            }
            
            res.cookie('login',req.session.login,{maxAge: 200 * 60})
            if(save){
                res.cookie('login',req.session.login,{maxAge: 2000 * 60})
            }
            res.redirect('/users/mensaje');
        } else {
            return res.render('index',{
                title : "Session",
                colores,
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