var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.session)
  if(req.session.valid_user === true){
    res.render('index', { title: 'Express' });
  }else{
  	res.redirect('/login')
  }
});

router.get('/login', function(req, res){
	res.render('login')
})



module.exports = router;
