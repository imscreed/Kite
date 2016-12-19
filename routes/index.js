const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
  //res.send('INDEX');
  res.render('index');
});

module.exports = router;
