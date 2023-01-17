var express = require('express');
var router = express.Router();

const {index, controlRegister, destroy} = require ('../controllers/indexController')
const validation = require ('../validations/validation')

/* GET home page. */

router
  .get('/', index)
  .post('/validacion',validation, controlRegister)
  .get('/destroy',destroy)

module.exports = router;