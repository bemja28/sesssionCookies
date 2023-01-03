var express = require('express');
var router = express.Router();

/* GET users listing. */

const {msg, logout} = require ('../controllers/usersController');

router
  .get('/mensaje', msg)
  .get('/logout', logout)

module.exports = router;