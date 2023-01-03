var express = require('express');
var router = express.Router();

const {index, controlRegister, destroy} = require ('../controllers/indexController')
const loginValidation = require ('../validations/loginValidation')

/* GET home page. */

router
  .get('/', index)
  .post('/validacion',loginValidation, controlRegister)
  .get('/destroy',destroy)

module.exports = router;