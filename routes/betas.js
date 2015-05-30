var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Beta = require('../models/Beta.js');


/* GET /betas . gets all betas*/
router.get('/', function(req, res, next) {
  Beta.find(function (err, betas) {
    if (err) return next(err);
    res.json(betas);
  });
});

//creates a beta
router.post('/', function(req, res, next){
  Beta.create(req.body, function (err, betas){
    if (err) return next(err);
    res.json(betas)
  })
})

module.exports = router;
