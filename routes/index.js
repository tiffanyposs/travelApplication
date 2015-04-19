var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.session)
  if(req.session.valid_user === true){
    res.render('index');
  }else{
  	res.render('splash')
  }
});

router.get('/login', function(req, res){
	res.render('login')
})


router.get('/chat', function(req, res){
	res.render('chat')
})



module.exports = router;
