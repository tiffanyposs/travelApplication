var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Note = require('../models/Note.js');


/* GET /notes listing. */
router.get('/', function(req, res, next) {
  Note.find(function (err, notes) {
    if (err) return next(err);
    res.json(notes);
  });
});

/* POST /notes */
router.post('/', function(req, res, next) {
  Note.create(req.body, function (err, notes) {
    if (err) return next(err);
    res.end()
  });
});

module.exports = router;
